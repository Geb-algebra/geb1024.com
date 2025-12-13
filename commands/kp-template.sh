#!/bin/bash

# Check if piece-name argument is provided
if [ -z "$1" ]; then
  echo "Error: piece-name is required"
  echo "Usage: ./commands/kp-template.sh {piece-name}"
  exit 1
fi

PIECE_NAME="$1"
CONTENT_DIR="app/contents/knowledge-pieces/${PIECE_NAME}"
CONTENT_FILE="${CONTENT_DIR}/content.ts"

# Create directory if it doesn't exist
mkdir -p "${CONTENT_DIR}"

# Check if content.ts already exists
if [ -f "${CONTENT_FILE}" ]; then
  echo "Error: ${CONTENT_FILE} already exists"
  exit 1
fi

# Get today's date
YEAR=$(date +%Y)
MONTH=$(date +%-m)
DAY=$(date +%-d)

# If date +%-m doesn't work (some systems), use alternative
if [ -z "$MONTH" ] || [ -z "$DAY" ]; then
  MONTH=$(date +%m | sed 's/^0//')
  DAY=$(date +%d | sed 's/^0//')
fi

# JavaScript Date month is 0-based (0 = January, 11 = December)
JS_MONTH=$((MONTH - 1))

# Create content.ts template
cat > "${CONTENT_FILE}" << EOF
import type { KnowledgePiece } from "~/domain/models";
import slide from "./slide.png";

export default {
  title: "",
  slug: "${PIECE_NAME}",
  date: new Date(${YEAR}, ${JS_MONTH}, ${DAY}),
  content: [
    "",
  ],
  figure: slide,
  related: [],
} as KnowledgePiece;
EOF

echo "Created ${CONTENT_FILE}"

