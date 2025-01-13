import fs from "node:fs";
import path from "node:path";

const knowledgePiecesDir = path.join(process.cwd(), "app/contents/knowledge-pieces");
const allKnowledgePiecesFile = path.join(
  process.cwd(),
  "app/domain/knowledge-pieces/get-all-knowledge-pieces.server.ts",
);

export async function updateAllKnowledgePieces() {
  const knowledgePieceSlugs = fs.readdirSync(knowledgePiecesDir);
  const knowledgePiecesImportStatement = knowledgePieceSlugs
    .map(
      (slug, i) => `import piece${i} from "../../app/contents/knowledge-pieces/${slug}/content";`,
    )
    .join("\n");

  const knowledgePiecesArray = knowledgePieceSlugs.map((_, i) => `piece${i}`).join(", ");

  const scriptContent = `// This file is auto-generated by update-knowledge-piece-list.ts

// should not import using path alias "~" as it won't be resolved when parsing react-router.config.ts on typegen, build, etc.
${knowledgePiecesImportStatement}

export function getAllKnowledgePieces() {
  return [${knowledgePiecesArray}];
}
`;

  fs.writeFileSync(allKnowledgePiecesFile, scriptContent);
  console.log(`Updated ${allKnowledgePiecesFile}`);
}
