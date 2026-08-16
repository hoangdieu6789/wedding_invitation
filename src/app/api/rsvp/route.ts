import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json({ ok: false, error: "invalid payload" }, { status: 400 });
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetTab = SIDE_TAB[body.side];

  if (!email || !privateKey || !spreadsheetId) {
    console.error("RSVP: missing Google Sheets env vars");
    return NextResponse.json({ ok: false, error: "server not configured" }, { status: 500 });
  }

  try {
    const auth = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    // Sheet columns (row 6 header): B=STT C=Tên quý khách D=Nhóm quan hệ
    // E=Xác nhận tham gia F=Số người đi cùng G=Lời chúc H=Ghi chú
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetTab}!B:H`,
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
