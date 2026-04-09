import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { normalizeContentAssetPath } from "../app/utils/assets";

const bucketName = "geb1024-com";
const contentsDir = path.join(process.cwd(), "app/contents");
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".gif", ".svg"]);

type UploadTarget = {
  filePath: string;
  objectKey: string;
  contentType: string;
};

let r2Client: S3Client | undefined;

function isImageFile(filePath: string) {
  return imageExtensions.has(path.extname(filePath).toLowerCase());
}

function getContentType(filePath: string) {
  switch (path.extname(filePath).toLowerCase()) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    default:
      throw new Error(`Unsupported image type: ${filePath}`);
  }
}

function collectImagePaths(directoryPath: string): string[] {
  const entries = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));

  return entries.flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      return collectImagePaths(entryPath);
    }

    return isImageFile(entryPath) ? [entryPath] : [];
  });
}

function toObjectKey(filePath: string) {
  const relativePath = path.relative(contentsDir, filePath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error(`File is outside app/contents: ${filePath}`);
  }

  return normalizeContentAssetPath(relativePath);
}

function createUploadTargets(filePaths: string[]): UploadTarget[] {
  return filePaths.map((filePath) => ({
    filePath,
    objectKey: toObjectKey(filePath),
    contentType: getContentType(filePath),
  }));
}

function getRequiredEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name];
    if (value) {
      return value;
    }
  }

  throw new Error(`Missing required environment variable: ${names.join(" or ")}`);
}

function getR2Client() {
  if (r2Client) {
    return r2Client;
  }

  const accountId = getRequiredEnv("CLOUDFLARE_ACCOUNT_ID");
  const accessKeyId = getRequiredEnv("CLOUDFLARE_R2_ACCESS_KEY_ID");
  const secretAccessKey = getRequiredEnv("CLOUDFLARE_R2_SECRET_ACCESS_KEY");

  r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return r2Client;
}

function formatR2Error(error: unknown) {
  if (error instanceof S3ServiceException) {
    const statusCode = error.$metadata.httpStatusCode;
    return `${error.name}${statusCode ? ` (${statusCode})` : ""}: ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function isMissingObjectError(error: unknown) {
  return error instanceof S3ServiceException && error.$metadata.httpStatusCode === 404;
}

async function uploadFile(target: UploadTarget) {
  await getR2Client().send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: target.objectKey,
      Body: fs.createReadStream(target.filePath),
      ContentType: target.contentType,
    }),
  );
}

async function objectExists(objectKey: string) {
  try {
    await getR2Client().send(
      new HeadObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      }),
    );

    return true;
  } catch (error) {
    // HeadObject returns generic HTTP status codes for missing objects.
    if (isMissingObjectError(error)) {
      return false;
    }

    throw new Error(`Failed to check whether ${objectKey} exists in R2.\n${formatR2Error(error)}`);
  }
}

function parseFlags() {
  return {
    dryRun: process.argv.includes("--dry-run"),
    force: process.argv.includes("--force"),
  };
}

async function main() {
  if (!fs.existsSync(contentsDir)) {
    throw new Error(`Contents directory not found: ${contentsDir}`);
  }

  const { dryRun, force } = parseFlags();
  const uploadTargets = createUploadTargets(collectImagePaths(contentsDir));

  if (uploadTargets.length === 0) {
    console.log("No images found under app/contents.");
    return;
  }

  let uploadCount = 0;
  let skipCount = 0;

  for (const target of uploadTargets) {
    const exists = force ? false : await objectExists(target.objectKey);

    if (exists) {
      skipCount++;
      console.log(
        `${dryRun ? "[dry-run] Skipping existing" : "Skipping existing"} ${target.objectKey}`,
      );
      continue;
    }

    uploadCount++;
    console.log(`${dryRun ? "[dry-run] Uploading" : "Uploading"} ${target.objectKey}`);

    if (!dryRun) {
      await uploadFile(target);
    }
  }

  console.log(
    `${dryRun ? "Would upload" : "Uploaded"} ${uploadCount} images to ${bucketName}${force ? " with force" : ""}. Skipped ${skipCount} existing images.`,
  );
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
