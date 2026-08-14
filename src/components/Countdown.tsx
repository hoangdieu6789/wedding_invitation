"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCountdown } from "@/lib/hooks";

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        border: "1px solid rgba(126,18,32,.22)",
        background: "rgba(255,255,255,.55)",
        padding: "14px 4px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-be-vietnam), sans-serif",
          fontSize: 28,
          fontWeight: 500,
          color: "#7E1220",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums lining-nums",
          height: 28,
          position: "relative",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ position: "absolute", left: 0, right: 0 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <div
        style={{
          fontFamily: "var(--font-be-vietnam), sans-serif",
          fontSize: 9,
          letterSpacing: ".2em",
          color: "#8a7565",
          marginTop: 8,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Countdown({ targetIso }: { targetIso: string }) {
  const cd = useCountdown(targetIso);

  return (
    <div style={{ padding: "34px 28px 6px", textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: 18,
          color: "#8a7565",
        }}
      >
        Còn lại
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
          marginTop: 14,
        }}
      >
        <Unit value={cd.days} label="Ngày" />
        <Unit value={cd.hours} label="Giờ" />
        <Unit value={cd.mins} label="Phút" />
        <Unit value={cd.secs} label="Giây" />
      </div>
    </div>
  );
}
