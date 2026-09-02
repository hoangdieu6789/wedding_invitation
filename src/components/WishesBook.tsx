"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";
import { Wish } from "@/lib/types";

const AUTOPLAY_MS = 4200;
const DOTS_MAX = 10;

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#A6303C" aria-hidden="true">
      <path d="M12 21s-7.5-4.6-10.2-9.1C.2 9.1 1.3 5.5 4.6 4.6c2-.5 3.9.4 5 2 .3.4.9.4 1.2 0 1.1-1.6 3-2.5 5-2 3.3.9 4.4 4.5 2.8 7.3C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

export default function WishesBook({ wishes }: { wishes: Wish[] }) {
  const t = useT();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const total = wishes.length;

  useEffect(() => {
    if (hovered || total <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active, total, hovered]);

  useEffect(() => {
    if (active >= total) setActive(0);
  }, [total, active]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: "40px 26px 0" }}
    >
      <div
        style={{
          textAlign: "center",
          fontFamily: "var(--font-be-vietnam), sans-serif",
          fontSize: 10,
          letterSpacing: ".32em",
          color: "#A6303C",
          textTransform: "uppercase",
        }}
      >
        {t.wishesBookTitle}
      </div>

      {total > 0 ? (
        <div style={{ marginTop: 20, minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(6px)", y: -8 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center", maxWidth: 320 }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                <HeartIcon />
              </div>
              <div style={{ fontSize: 17, fontStyle: "italic", color: "#6f5b4d", lineHeight: 1.65 }}>
                {wishes[active].text}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-be-vietnam), sans-serif",
                  fontSize: 12,
                  letterSpacing: ".1em",
                  color: "#7E1220",
                  marginTop: 10,
                }}
              >
                — {wishes[active].name}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div style={{ marginTop: 14, textAlign: "center", fontSize: 16, fontStyle: "italic", color: "#a89684" }}>
          {t.wishesEmpty}
        </div>
      )}

      {total > 1 && (
        total > DOTS_MAX ? (
          <div
            style={{
              textAlign: "center",
              marginTop: 8,
              fontFamily: "var(--font-be-vietnam), sans-serif",
              fontSize: 12,
              letterSpacing: ".12em",
              color: "#8a7565",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {active + 1} / {total}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>
            {wishes.map((_, i) => (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                role="button"
                aria-label={t.viewWish(i + 1)}
                animate={{
                  width: i === active ? 18 : 6,
                  background: i === active ? "#7E1220" : "rgba(126,18,32,.28)",
                }}
                transition={{ duration: 0.3 }}
                style={{ height: 6, borderRadius: 3, cursor: "pointer" }}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
