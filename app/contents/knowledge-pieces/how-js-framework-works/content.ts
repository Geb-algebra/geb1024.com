import type { KnowledgePiece } from "~/domain/models";
import { createKnowledgePieceAsset } from "../../../utils/assets";

const asset = createKnowledgePieceAsset("how-js-framework-works");

export default {
  title: "ブラウザでreactやvueが動く仕組み",
  slug: "how-js-framework-works",
  date: new Date(2024, 5, 30),
  content: [
    "reactやvueがvite、web packといったトランスパイラでHTML、CSS、JavaScriptに変換されるからです。",
    "reactやvueは、そのままだと書きにくいHTML、CSS、JavaScriptを簡単に書けるようにしてくれるライブラリ、というわけです。",
  ],
  figure: asset("slide.svg"),
  related: ["spa-ssr"],
} as KnowledgePiece;
