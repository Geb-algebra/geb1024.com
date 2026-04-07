import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import * as readline from "node:readline";
import { GoogleGenAI } from "@google/genai";

function buildSystemPrompt(hasDraftImage: boolean): string {
  return `
あなたはエンジニアであり、エンジニアリングの知識をわかりやすく伝えるプレゼンターでもあります。
ユーザーがエンジニアリングに関するKnowledge Piece（ブログの1章・1節やSNSで共有する程度の分量の情報）をあなたに伝えるので、あなたはKnowledge pieceをわかりやすく直感的に伝える1枚の画像にしてください。

画像は以下を守って作成してください

## 形式

- 16x9のアスペクト比
- 背景は #fffff0。 コンテンツは#fffff0以外の色で描画
- フレームの端いっぱいまで使って、なるべく大きく表示。 フレーム端のmarginは厳密にゼロ。

## スタイル

- 文字の使用は最小限にして、なるべくイラストで説明
- 文字は英語で
- excalidrawのような手書き風で、でも「雑さ」は感じないように
- フォントはexcalifont、ただしコードのフォントはUbuntu mono。**最初に添付する画像（スタイル参考画像）**を参照
- イラストのトーンは**最初に添付する画像（スタイル参考画像）**に厳密に合わせる。レイアウト・図の形式などはスタイル参考画像を参考にしない。
${hasDraftImage ? "- レイアウト・図の形式などは**2番目に添付する画像（構図指示画像）**に従う。この構図に従って、提供されたKnowledge Pieceの内容に基づいて画像を生成。" : "- レイアウト・図の形式などはトピックを一番よく説明できる方法で自由に決める。"}

## 情報

- あなたの画像はKnowledge Pieceの文章と一緒に提示されるので、全てが画像から伝わる必要はない。 Knowledge Pieceの全てを伝えようとしない。
- タイトルは含めず、本文を伝えることに集中。 タイトルはOGPでもWebサイト上でも必ず画像と一緒に表示されるため。
- タイトルを除いた、本文の最初の一文 が最重要情報なので、これだけは画像だけ見て理解できるようにする。 他は必要に応じて省くかイラスト表現。
- OGP画像のサイズでトピックが把握でき、スマホ横幅一杯表示で全てが理解できるように、文字や図のサイズを調整（詰め込みすぎない）

**画像の参照について：**
- **最初に添付する画像**はスタイル（フォント、トーンなど）の参考例。この画像のスタイルを厳密に従う。**構図の参考にしてはいけない！**
${hasDraftImage ? "- **2番目に添付する画像**は構図の指示。この指示に従って、提供されたKnowledge Pieceの内容に基づいて画像を生成する。 **スタイルの参考にしてはいけない！**" : ""}
`;
}

type Content = {
  role?: "user" | "model";
  parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }>;
};

type ExtractedData = {
  title: string;
  content: string[];
};

function extractTitleAndContent(fileContent: string): ExtractedData {
  // titleを抽出
  const titleMatch = fileContent.match(/title:\s*"([^"]+)"/);
  if (!titleMatch) {
    throw new Error("Failed to extract title from content.ts");
  }
  const title = titleMatch[1];

  // content配列を抽出
  const contentStart = fileContent.indexOf("content: [");
  if (contentStart === -1) {
    throw new Error("Failed to find content array in content.ts");
  }

  // content: [の後の[から開始
  const arrayStart = contentStart + "content: [".length - 1; // [の位置
  let bracketCount = 1; // 最初の[をカウント
  let inString = false;
  let escapeNext = false;
  let contentArrayEnd = -1;

  for (let i = arrayStart + 1; i < fileContent.length; i++) {
    const char = fileContent[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === "\\") {
      escapeNext = true;
      continue;
    }

    if (char === '"' && !escapeNext) {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (char === "[") {
      bracketCount++;
    } else if (char === "]") {
      bracketCount--;
      if (bracketCount === 0) {
        contentArrayEnd = i;
        break;
      }
    }
  }

  if (contentArrayEnd === -1) {
    throw new Error("Failed to extract content array from content.ts");
  }

  // content配列の文字列部分を抽出
  const contentArrayText = fileContent.substring(arrayStart, contentArrayEnd + 1);

  // 配列内の文字列を抽出
  const contentStrings: string[] = [];
  const stringRegex = /"((?:[^"\\]|\\.)*)"/g;
  let match: RegExpExecArray | null = stringRegex.exec(contentArrayText);
  while (match !== null) {
    // エスケープシーケンスを処理
    const unescaped = match[1]
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
    contentStrings.push(unescaped);
    match = stringRegex.exec(contentArrayText);
  }

  if (contentStrings.length === 0) {
    throw new Error("Failed to extract content strings from content.ts");
  }

  return { title, content: contentStrings };
}

function loadKnowledgePiece(pieceName: string): ExtractedData {
  const contentPath = path.join(
    process.cwd(),
    "app/contents/knowledge-pieces",
    pieceName,
    "content.ts",
  );

  if (!fs.existsSync(contentPath)) {
    throw new Error(`Content file not found: ${contentPath}`);
  }

  const fileContent = fs.readFileSync(contentPath, "utf-8");
  return extractTitleAndContent(fileContent);
}

function askForModification(): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("\n修正依頼があれば入力してください（空文字で終了）: ", (answer: string) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function loadSampleImage(): string {
  const sampleImagePath = path.join(process.cwd(), "commands", "sample-image.png");

  if (!fs.existsSync(sampleImagePath)) {
    throw new Error(`Sample image not found: ${sampleImagePath}`);
  }

  const imageBuffer = fs.readFileSync(sampleImagePath);
  return imageBuffer.toString("base64");
}

function loadDraftImage(): string | null {
  const draftImagePath = path.join(process.cwd(), "commands", "draft.jpg");

  if (!fs.existsSync(draftImagePath)) {
    return null;
  }

  const imageBuffer = fs.readFileSync(draftImagePath);
  return imageBuffer.toString("base64");
}

async function generateImage(
  ai: GoogleGenAI,
  title: string,
  content: string[],
  chatHistory: Content[],
  disableCache: boolean = false,
): Promise<Buffer> {
  // サンプル画像とドラフト画像を読み込む
  const sampleImageBase64 = loadSampleImage();
  const draftImageBase64 = loadDraftImage();
  const hasDraftImage = draftImageBase64 !== null;

  // プロンプトを構築（画像の有無に応じて内容を変更）
  const prompt = buildSystemPrompt(hasDraftImage);

  const systemParts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> =
    [
      {
        text: prompt,
      },
      {
        inlineData: {
          mimeType: "image/png",
          data: sampleImageBase64,
        },
      },
    ];

  // draft.pngが存在する場合のみ追加
  if (hasDraftImage) {
    systemParts.push({
      inlineData: {
        mimeType: "image/png",
        data: draftImageBase64,
      },
    });
  }

  const systemInstruction = {
    parts: systemParts,
  };

  const knowledgePieceContent: Content = {
    parts: [
      {
        text: JSON.stringify({ title, content }),
      },
    ],
  };

  const contents: Content[] = [knowledgePieceContent, ...chatHistory];

  // キャッシュを無効化する場合は、リクエストに一意のパラメータを追加
  const config: {
    systemInstruction: typeof systemInstruction;
    cacheControl?: { ttl?: string; useCache?: boolean };
  } = {
    systemInstruction,
  };

  if (disableCache) {
    // キャッシュを無効化するため、リクエストに一意のタイムスタンプを追加
    // または config にキャッシュ無効化の設定を追加
    config.cacheControl = { useCache: false };
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents,
    config,
  });

  const parts = response.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      if (!imageData) {
        continue;
      }
      return Buffer.from(imageData, "base64");
    }
  }

  throw new Error("No image data found in response");
}

async function main() {
  const args = process.argv.slice(2);
  const deleteCache = args.includes("--delete-cache");

  // --delete-cache を除外して pieceName を取得
  const pieceName = args.find((arg: string) => arg !== "--delete-cache");

  if (!pieceName) {
    console.error("Error: piece-name argument is required");
    console.error("Usage: tsx generate-knowledge-piece-image.ts {piece-name} [--delete-cache]");
    process.exit(1);
  }

  if (deleteCache) {
    console.log("Cache will be disabled for this request...");
  }

  try {
    const knowledgePiece = loadKnowledgePiece(pieceName);
    const { title, content } = knowledgePiece;

    // APIキーを環境変数から取得
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error("Error: GEMINI_API_KEY or GOOGLE_API_KEY environment variable is required");
      console.error("Please set the API key: export GEMINI_API_KEY='your-api-key'");
      process.exit(1);
    }

    const ai = new GoogleGenAI({ apiKey });
    const chatHistory: Content[] = [];

    while (true) {
      console.log(`\nGenerating image for: ${title}`);
      const imageBuffer = await generateImage(ai, title, content, chatHistory, deleteCache);

      const outputPath = path.join(
        process.cwd(),
        "app/contents/knowledge-pieces",
        pieceName,
        "slide.png",
      );

      // ディレクトリが存在しない場合は作成
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`Image saved as ${outputPath}`);

      const modificationRequest = await askForModification();

      if (!modificationRequest) {
        console.log("Finished.");
        break;
      }

      // 修正依頼をチャット履歴に追加
      chatHistory.push({
        role: "user",
        parts: [{ text: modificationRequest }],
      });

      console.log("Applying modification request...");
    }
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
