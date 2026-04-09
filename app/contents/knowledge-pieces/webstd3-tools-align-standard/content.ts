import type { KnowledgePiece } from "~/domain/models";
import { createKnowledgePieceAsset } from "../../../utils/assets";

const asset = createKnowledgePieceAsset("webstd3-tools-align-standard");

export default {
  title: "Web系ツールはWeb標準仕様に対応",
  slug: "webstd3-tools-align-standard",
  date: new Date(2025, 11, 15),
  content: [
    "Webの世界で使われるツールやサービスはWeb標準仕様に沿って動くように実装されています。",
    "",
    "例えばchromeなど主要なブラウザは、Web標準に沿ったHTTPで通信でき、Web標準に沿って書かれたHTML、CSS、JavaScriptを実行できます。",
    "nginxなどのWebサーバー、Node.jsなどのJavaScriptランタイムなども同様です。",
  ],
  figure: asset("slide.png"),
  related: ["webstd4-ex-specs", "webstd1-what-is"],
} as KnowledgePiece;
