import Link from "next/link";
import { getUiText } from "@/lib/i18n-text";
import { resolveLocale } from "@/lib/types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const locale = resolveLocale((await searchParams).lang);
  const t = getUiText(locale);
  const langSuffix = locale === "en" ? "?lang=en" : "";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        fontFamily: "var(--font-cormorant), Georgia, serif",
        color: "#FCF6EA",
      }}
    >
      <h1 style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 40, margin: 0 }}>
        Trần Mai &amp; Hoàng Diệu
      </h1>
      <div style={{ display: "flex", gap: 16 }}>
        <Link
          href={`/nha-gai${langSuffix}`}
          style={{
            border: "1px solid rgba(255,244,232,.4)",
            padding: "12px 22px",
            fontFamily: "var(--font-be-vietnam), sans-serif",
            fontSize: 12,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "#FCF6EA",
          }}
        >
          {t.linkBrideInvite}
        </Link>
        <Link
          href={`/nha-trai${langSuffix}`}
          style={{
            border: "1px solid rgba(255,244,232,.4)",
            padding: "12px 22px",
            fontFamily: "var(--font-be-vietnam), sans-serif",
            fontSize: 12,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "#FCF6EA",
          }}
        >
          {t.linkGroomInvite}
        </Link>
      </div>
    </main>
  );
}
