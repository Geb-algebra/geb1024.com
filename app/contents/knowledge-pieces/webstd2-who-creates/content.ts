import type { KnowledgePiece } from "~/domain/models";
import { createKnowledgePieceAsset } from "../../../utils/assets";

const asset = createKnowledgePieceAsset("webstd2-who-creates");

export default {
  title: "Web標準は非営利団体によって策定",
  slug: "webstd2-who-creates",
  date: new Date(2025, 11, 14),
  content: [
    "Web標準は特定の一企業ではなく、W3C, ECMA, WHATWGといった標準化団体・コミュニティによって策定されています。",
    "",
    "これにより、Webが複数の企業・団体の合意形成のもと作られ、特定の企業や製品、サービスに特化しないように保たれています。",
    "",
    "逆にいうとWeb以外の仕様、例えばiOSや androidのアプリ開発周りの仕様などは、AppleやGoogleといった特定の企業が自社の製品・サービス・ポリシーに沿って決めています。",
  ],
  figure: asset("slide.png"),
  related: ["webstd3-tools-align-standard", "webstd2-who-creates"],
} as KnowledgePiece;
