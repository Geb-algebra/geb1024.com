import fs from "node:fs";
import path from "node:path";

const knowledgePiecesDir = path.join(process.cwd(), "app/routes/_main.knowledge-pieces+");
const allKnowledgePiecesFile = path.join(
  process.cwd(),
  "app/routes/_main.knowledge-pieces+/_index/all-knowledge-pieces.ts",
);

const getKnowledgePieceInfo = (piecePath: string) => {
  const content = fs.readFileSync(piecePath, "utf-8");
  const slug = path.basename(path.dirname(piecePath));
  const titleMatch = content.match(/export const title = "(.*)";/);
  const dateMatch = content.match(/export const date = new Date\("(.*)"\);/);

  return {
    slug,
    title: titleMatch ? titleMatch[1] : "",
    date: dateMatch ? new Date(dateMatch[1]) : new Date(),
  };
};

export const updateAllKnowledgePieces = () => {
  const pieceDirs = fs.readdirSync(knowledgePiecesDir).filter((dir) => {
    const fullPath = path.join(knowledgePiecesDir, dir);
    return fs.statSync(fullPath).isDirectory() && dir !== "_index";
  });

  console.log(`Found knowledge piece directories: ${pieceDirs.join(", ")}`);

  const imports = pieceDirs
    .map((dir, index) => `import * as Piece${index + 1} from "../${dir}/Content";`)
    .join("\n");

  const pieces = pieceDirs
    .map((dir, index) => {
      const info = getKnowledgePieceInfo(path.join(knowledgePiecesDir, dir, "Content.tsx"));
      return `{
      title: Piece${index + 1}.title,
      slug: "${info.slug}",
      date: Piece${index + 1}.date,
      Figure: Piece${index + 1}.default,
    }`;
    })
    .join(",\n  ");

  const content = `
${imports}

export type KnowledgePiece = {
  title: string;
  slug: string;
  date: Date;
  Figure: React.ComponentType;
};

export const allKnowledgePieces: KnowledgePiece[] = [
  ${pieces}
];
`;

  console.log("Writing to all-knowledge-pieces.ts...");
  fs.writeFileSync(allKnowledgePiecesFile, content, "utf-8");
};
