import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { normalizePrivateKey } from "@/lib/google-auth";

export const runtime = "nodejs";

interface RsvpPayload {
  name: string;
  attend: boolean;
  companions: number;
  text: string;
  side: "gai" | "trai" | "huynh";
  locked: boolean;
}

const SIDE_TAB: Record<RsvpPayload["side"], string> = {
  gai: process.env.GOOGLE_SHEET_TAB_GAI || "NhaGai",
  trai: process.env.GOOGLE_SHEET_TAB_TRAI || "NhaTrai",
  huynh: process.env.GOOGLE_SHEET_TAB_HUYNH || "PhuHuynh",
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
    (v.side === "gai" || v.side === "trai" || v.side === "huynh") &&
    typeof v.locked === "boolean"
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

  const sheetTab = SIDE_TAB[body.side];

  try {
    // Sheet columns (row 6 header): B=STT (filled by hand) C=Tên quý khách
    // D=Nhóm quan hệ (filled by hand) E=Xác nhận tham gia F=Số người đi cùng
    // G=Lời chúc H=Link (formula generated from C, must not be overwritten).
    // Names start at row 7 (row 6 is the header). We only ever write C and
    // E:G — never B, D, or H — so the couple's own data/formulas survive.
    const existing = await client.sheets.spreadsheets.values.get({
      spreadsheetId: client.spreadsheetId,
      range: `${sheetTab}!C7:C`,
    });
    const names = (existing.data.values || []).map((row) => (row[0] || "").trim());
    const rowIndex = names.indexOf(body.name.trim());

    const row = rowIndex !== -1 ? rowIndex + 7 : 7 + names.length;

    if (rowIndex === -1) {
      await client.sheets.spreadsheets.values.update({
        spreadsheetId: client.spreadsheetId,
        range: `${sheetTab}!C${row}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[body.name]] },
      });
    }

    await client.sheets.spreadsheets.values.update({
      spreadsheetId: client.spreadsheetId,
      range: `${sheetTab}!E${row}:G${row}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[body.attend ? "Có" : "Không", body.companions, body.text]],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("RSVP: failed to write row", error);
    return NextResponse.json({ ok: false, error: "failed to write to sheet" }, { status: 502 });
  }
}

export async function GET(request: NextRequest) {
  const side = request.nextUrl.searchParams.get("side");
  if (side !== "gai" && side !== "trai" && side !== "huynh") {
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
