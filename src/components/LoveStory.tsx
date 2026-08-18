"use client";

import { motion } from "motion/react";

interface StoryItem {
  label: string;
  text: string;
}

export default function LoveStory({ items }: { items: StoryItem[] }) {
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
        Câu chuyện của chúng tôi
      </div>
      <div
        style={{
          textAlign: "center",
          fontFamily: "var(--font-dancing), cursive",
          fontSize: 32,
          color: "#7E1220",
          fontWeight: 500,
          marginTop: 6,
        }}
      >
        Hành trình yêu thương
      </div>

      <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 0 }}>
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: 16, paddingBottom: i < items.length - 1 ? 22 : 0 }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 14 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#7E1220", flexShrink: 0 }} />
              {i < items.length - 1 && (
                <div style={{ flex: 1, width: 1, background: "rgba(126,18,32,.25)", marginTop: 4 }} />
              )}
            </div>
            <div style={{ paddingTop: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-be-vietnam), sans-serif",
                  fontSize: 10,
                  letterSpacing: ".2em",
                  color: "#A6303C",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </div>
              <div style={{ fontSize: 16, fontStyle: "italic", color: "#6f5b4d", marginTop: 4, lineHeight: 1.6 }}>
                {item.text.split("\n").map((line, li, arr) => (
                  <span key={line}>
                    {line}
                    {li < arr.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
