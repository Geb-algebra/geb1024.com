import type { KnowledgePiece } from "~/domain/models";
import { createKnowledgePieceAsset } from "../../../utils/assets";

const asset = createKnowledgePieceAsset("webstd4-ex-specs");

export default {
  title: "Web標準でない仕様",
  slug: "webstd4-ex-specs",
  date: new Date(2025, 11, 16),
  content: [
    "Webに関わるツールやサービスはWeb標準仕様に沿って実装されていますが、追加で標準仕様ではない仕様を持っていたり、標準仕様を拡張していたりします。",
    "",
    "このような標準外の仕様を使ったコードは、そのサービス以外で動かないことがあるので注意が必要です。",
    "",
    '例えばJavaScriptランタイムNode.jsは"fs"というファイルシステムを扱う仕様(fs.readFile でファイルを読むなど)を持っていますが、これはWeb標準仕様ではありません。',
    "そのため、fsを使ったJavaScriptコードはブラウザなどNode.js以外では動きません。",
  ],
  figure: asset("slide.png"),
  related: ["webstd5-runs-in-everywhere"],
} as KnowledgePiece;
