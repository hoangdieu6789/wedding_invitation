import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { normalizePrivateKey } from "@/lib/google-auth";

export const runtime = "nodejs";

interface RsvpPayload {
  name: string;
  attend: boolean;
  companions: number;
  text: string;
  side: "gai" | "trai";
}

const SIDE_TAB: Record<RsvpPayload["side"], string> = {
  gai: process.env.GOOGLE_SHEET_TAB_GAI || "NhaGai",
  trai: process.env.GOOGLE_SHEET_TAB_TRAI || "NhaTrai",
};

function isValidPayload(value: unknown): value is RsvpPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === "string" &&
    typeof v.attend === "boolean" &&
    typeof v.companions === "number" &&
    Number.isFinite(v.companions) &&
    typeof v.text === "string" &&
    (v.side === "gai" || v.side === "trai")
  );
}

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
  const privateKey = privateKeyRaw ? normalizePrivateKey(privateKeyRaw) : undefined;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !privateKey || !spreadsheetId) return null;

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json({ ok: false, error: "invalid payload" }, { status: 400 });
  }

  const client = getSheetsClient();
  if (!client) {
    console.error("RSVP: missing Google Sheets env vars");
    return NextResponse.json({ ok: false, error: "server not configured" }, { status: 500 });
  }

  try {
    // Sheet columns (row 6 header): B=STT C=Tên quý khách D=Nhóm quan hệ
    // E=Xác nhận tham gia F=Số người đi cùng G=Lời chúc H=Ghi chú
    await client.sheets.spreadsheets.values.append({
      spreadsheetId: client.spreadsheetId,
      range: `${SIDE_TAB[body.side]}!B:H`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [["", body.name, "", body.attend ? "Có" : "Không", body.companions, body.text, ""]],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("RSVP: failed to append row", error);
    return NextResponse.json({ ok: false, error: "failed to write to sheet" }, { status: 502 });
  }
}

export async function GET(request: NextRequest) {
  const side = request.nextUrl.searchParams.get("side");
  if (side !== "gai" && side !== "trai") {
    return NextResponse.json({ ok: false, error: "invalid side" }, { status: 400 });
  }

  const client = getSheetsClient();
  if (!client) {
    console.error("RSVP: missing Google Sheets env vars");
    return NextResponse.json({ ok: false, error: "server not configured" }, { status: 500 });
  }

  try {
    // C=Tên quý khách ... G=Lời chúc (rows start at 7, row 6 is the header)
    const res = await client.sheets.spreadsheets.values.get({
      spreadsheetId: client.spreadsheetId,
      range: `${SIDE_TAB[side]}!C7:G`,
    });

    const wishes = (res.data.values || [])
      .map((row) => ({ name: (row[0] || "").trim(), text: (row[4] || "").trim() }))
      .filter((w) => w.text)
      .reverse();

    return NextResponse.json({ ok: true, wishes });
  } catch (error) {
    console.error("RSVP: failed to read sheet", error);
    return NextResponse.json({ ok: false, error: "failed to read sheet" }, { status: 502 });
  }
}
