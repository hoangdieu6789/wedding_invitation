"use client";

import { motion } from "motion/react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  text: string;
}

export default function ShareButton({ title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title, text, url }).catch(() => {});
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard failure
    }
  };

  const zaloHref = () =>
    `https://zalo.me/share?u=${encodeURIComponent(window.location.href)}&d=${encodeURIComponent(title)}`;

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 18 }}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={share}
        role="button"
        aria-label="Chia sẻ thiệp cưới"
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-be-vietnam), sans-serif",
          fontSize: 12,
          letterSpacing: ".1em",
          color: "#7E1220",
          border: "1px solid rgba(126,18,32,.35)",
          padding: "10px 16px",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 10.5 15.4 6.5M8.6 13.5 15.4 17.5" />
        </svg>
        {copied ? "Đã sao chép!" : "Chia sẻ"}
      </motion.div>
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open(zaloHref(), "_blank", "noopener")}
        role="button"
        aria-label="Chia sẻ qua Zalo"
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-be-vietnam), sans-serif",
          fontSize: 12,
          letterSpacing: ".1em",
          color: "#FCF6EA",
          background: "#7E1220",
          padding: "10px 16px",
        }}
      >
        Zalo
      </motion.div>
    </div>
  );
}
