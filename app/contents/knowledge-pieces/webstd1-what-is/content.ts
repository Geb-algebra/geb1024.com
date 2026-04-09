import type { KnowledgePiece } from "~/domain/models";
import { createKnowledgePieceAsset } from "../../../utils/assets";

const asset = createKnowledgePieceAsset("webstd1-what-is");

export default {
  title: "Web標準とは何か",
  slug: "webstd1-what-is",
  date: new Date(2025, 11, 13),
  content: [
    "HTTP, HTML, CSS, JavaScriptなどWebで使う技術の標準仕様です。",
    "",
    "例えば",
    "「JSONをHTTPリクエストで送る場合はヘッダに `Content-type: application/json` をつける」",
    "「`<a>`タグで囲ったテキストはハイパーリンクである」",
    "「HTML要素の幅を指定するにはwidth: 120px;」",
    "「javascript の変数宣言はlet a = 1のようにする」",
    "などが取り決められています。",
  ],
  figure: asset("slide.png"),
  related: ["how-js-framework-works", "webstd2-who-creates"],
} as KnowledgePiece;
