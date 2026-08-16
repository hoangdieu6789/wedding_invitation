import { readdir } from "fs/promises";
import { google } from "googleapis";
import { NextResponse } from "next/server";
import path from "path";
import { normalizePrivateKey } from "@/lib/google-auth";

export const runtime = "nodejs";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const LOCAL_ALBUM_DIR = path.join(process.cwd(), "public", "img", "album");

interface Photo {
  id: string;
  src: string;
}

function getDriveClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
  const folderId = process.env.GOOGLE_DRIVE_ALBUM_FOLDER_ID;

  if (!email || !privateKeyRaw || !folderId) return null;

  const auth = new google.auth.JWT({
    email,
    key: normalizePrivateKey(privateKeyRaw),
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  return { drive: google.drive({ version: "v3", auth }), folderId };
}

async function listDrivePhotos(): Promise<Photo[] | null> {
  const client = getDriveClient();
  if (!client) return null;

  const res = await client.drive.files.list({
    q: `'${client.folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id, name, thumbnailLink)",
    orderBy: "name",
    pageSize: 200,
  });

  return (res.data.files || [])
    .filter((f) => f.id && f.thumbnailLink)
    .map((f) => ({ id: f.id as string, src: (f.thumbnailLink as string).replace(/=s\d+$/, "=s1600") }));
}

async function listLocalPhotos(): Promise<Photo[]> {
  const entries = await readdir(LOCAL_ALBUM_DIR);
  return entries
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort()
    .map((name) => ({ id: name, src: `/img/album/${name}` }));
}

export async function GET() {
  try {
    const drivePhotos = await listDrivePhotos();
    if (drivePhotos && drivePhotos.length > 0) {
      return NextResponse.json({ ok: true, source: "drive", photos: drivePhotos });
    }
  } catch (error) {
    console.error("Album: failed to list Drive folder, falling back to local images", error);
  }

  try {
    const photos = await listLocalPhotos();
    return NextResponse.json({ ok: true, source: "local", photos });
  } catch (error) {
    console.error("Album: failed to read local fallback folder", error);
    return NextResponse.json({ ok: false, error: "failed to list photos" }, { status: 502 });
  }
}
