"use server";

import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "listings");
const THUMB_DIR = path.join(process.cwd(), "public", "uploads", "listings", "thumbs");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

async function ensureDirs() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
  if (!existsSync(THUMB_DIR)) {
    await mkdir(THUMB_DIR, { recursive: true });
  }
}

export async function uploadListingImage(file: File) {
  await ensureDirs();

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: `Invalid file type: ${file.type}. Only JPG, PNG, and WebP are allowed.` };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max 10MB.` };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueName = `${uuidv4()}`;
  const webpName = `${uniqueName}.webp`;
  const thumbName = `thumb-${uniqueName}.webp`;

  const optimized = await sharp(buffer)
    .resize(1920, 1280, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  const thumbnail = await sharp(buffer)
    .resize(400, 300, { fit: "cover" })
    .webp({ quality: 70 })
    .toBuffer();

  const fullPath = path.join(UPLOAD_DIR, webpName);
  const thumbPath = path.join(THUMB_DIR, thumbName);

  await writeFile(fullPath, optimized);
  await writeFile(thumbPath, thumbnail);

  return {
    url: `/uploads/listings/${webpName}`,
    thumbnailUrl: `/uploads/listings/thumbs/${thumbName}`,
    originalName: file.name,
    size: file.size,
  };
}

export async function uploadListingImages(files: File[]) {
  const results: { url: string; thumbnailUrl: string; originalName: string; size: number }[] = [];
  const errors: string[] = [];

  for (const file of files) {
    const result = await uploadListingImage(file);
    if ("error" in result) {
      errors.push(`${file.name}: ${result.error}`);
    } else {
      results.push(result);
    }
  }

  return { results, errors };
}
