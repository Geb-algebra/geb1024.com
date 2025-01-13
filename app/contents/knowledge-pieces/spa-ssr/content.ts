import type { KnowledgePiece } from "~/domain/models";
import slide from "./slide.svg";

export default {
  title: "SPAと比較したSSRの利点",
  slug: "spa-ssr",
  date: new Date(2024, 5, 30),
  content: [
    "どちらも、小さなハリボテのHTMLと、そのHTMLにページ要素を書き込む大きなJavaScriptを持ってサーバーでリクエストを待っています。",
    "SPAはリクエストに対して、その両方を送り、ブラウザ上で大きなJavaScriptを実行して表示用のHTMLを生成します。",
    "一方、SSRはリクエストに対し、サーバー側でJavaScriptを実行して表示用のHTMLを生成し、まずそのHTMLを送って、JavaScriptなしのページを表示します。",
    "これにより、SPAより初期表示速度が上がります。",
    "また、JavaScriptを実行できないクローラーにもページが読めるので、SEOにも有利です。",
    "その後SPAと同様にJavaScriptを送ってJavaScriptありのページに置き換えるので、初期表示以外はほぼSPAと同じ挙動になります。",
  ],
  figure: slide,
  related: ["how-js-framework-works"],
} as KnowledgePiece;
