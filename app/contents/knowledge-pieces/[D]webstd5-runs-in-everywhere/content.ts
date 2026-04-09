import type { KnowledgePiece } from "~/domain/models";
import { createKnowledgePieceAsset } from "../../../utils/assets";

const asset = createKnowledgePieceAsset("webstd5-runs-in-everywhere");

export default {
  title: "Web標準に沿って実装するとどのサービスでも動く",
  slug: "webstd5-runs-in-everywhere",
  date: new Date(2025, 11, 17),
  content: [
    "Webアプリケーションを実装する場合、Web標準にしたがって実装すると、どのサービス・環境でも動くアプリになります。",
    "",
    "例えばchrome、Safari、Firefoxなどどのブラウザでも動作します(クロスブラウザ対応)。これによりどのユーザーもあなたのアプリを使えます。",
    "",
    "また、サーバーランタイムもnode js、deno、bun、workerなど何でも動きます。",
    "これにより、サポートされなくなった技術を手放したり、ホットな技術に乗り換えたりしやすくなります。",
  ],
  figure: asset("slide.png"),
  related: ["webstd6-how-to-align", "webstd3-tools-align-standard"],
} as KnowledgePiece;
