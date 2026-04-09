import type { KnowledgePiece } from "~/domain/models";
import { createKnowledgePieceAsset } from "../../../utils/assets";

const asset = createKnowledgePieceAsset("webstd6-how-to-align");

export default {
  title: "Web標準に沿ってコードを書くには",
  slug: "webstd6-how-to-align",
  date: new Date(2025, 11, 18),
  content: [
    "Web標準に沿ってコードを書くには、あなたが書くコードに気をつけるだけでなく、Web標準に準拠したライブラリ(React Router, Hono等)のみを使う必要があることに注意しましょう。",
    "",
    "標準外の仕様を使ったライブラリを採用した時点で、そのコードはWeb標準に沿っていないことになります。",
    "",
    "例えば express (Node.js用のWebサーバー構築ライブラリ) は、Node.jsランタイム独自の非標準的なHTTP処理API（reqやresオブジェクトなど）に強く依存しています。そのため、expressを採用した時点で、そのアプリケーションはNode.js（またはそれをエミュレートする環境）でしか動作しなくなります。",
  ],
  figure: asset("slide.png"),
  related: ["webstd4-ex-specs", "webstd5-runs-in-everywhere"],
} as KnowledgePiece;
