"use client";

import { AnimatePresence, motion } from "motion/react";
import { Wish } from "@/lib/types";

export default function WishesBook({ wishes }: { wishes: Wish[] }) {
  return (
    <div style={{ padding: "40px 26px 0" }}>
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
        Sổ lưu bút
      </div>

      {wishes.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
          <AnimatePresence initial={false}>
            {wishes.map((w, i) => (
              <motion.div
                key={`${w.name}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i === 0 ? 0 : 0.03 }}
                style={{ borderLeft: "1px solid rgba(126,18,32,.35)", padding: "4px 0 4px 14px" }}
              >
                <div style={{ fontFamily: "var(--font-be-vietnam), sans-serif", fontSize: 12, letterSpacing: ".08em", color: "#7E1220" }}>
                  {w.name}
                </div>
                <div style={{ fontSize: 17, fontStyle: "italic", color: "#6f5b4d", marginTop: 4, lineHeight: 1.6 }}>
                  {w.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div style={{ marginTop: 14, textAlign: "center", fontSize: 16, fontStyle: "italic", color: "#a89684" }}>
          Lời chúc của Quý khách sẽ được lưu lại tại đây.
        </div>
      )}
    </div>
  );
}
