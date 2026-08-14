import Link from "next/link";

export default function Home() {
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
          href="/nha-gai"
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
          Thiệp nhà gái
        </Link>
        <Link
          href="/nha-trai"
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
          Thiệp nhà trai
        </Link>
      </div>
    </main>
  );
}
