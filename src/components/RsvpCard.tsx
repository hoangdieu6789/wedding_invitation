"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { Side, Wish } from "@/lib/types";

interface RsvpCardProps {
  sent: boolean;
  side: Side;
  guestName?: string;
  onSubmit: (wish: Wish | null) => void;
}

const MAX_COMPANIONS = 10;

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

export default function RsvpCard({ sent, side, guestName, onSubmit }: RsvpCardProps) {
  const [attend, setAttend] = useState(true);
  const [companions, setCompanions] = useState(0);
  const [editing, setEditing] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const name = nameRef.current?.value.trim() || "Quý khách";
    const text = msgRef.current?.value.trim() || "";
    onSubmit(text ? { name, text } : null);
    setEditing(false);

    fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, attend, companions: attend ? companions : 0, text, side, locked: !!guestName }),
    }).catch((error) => {
      console.error("RSVP: failed to sync to sheet", error);
    });
  };

  const toggleBtnStyle = (isSelected: boolean): React.CSSProperties => ({
    cursor: "pointer",
    textAlign: "center",
    fontFamily: "var(--font-be-vietnam), sans-serif",
    fontSize: 12,
    letterSpacing: ".1em",
    padding: "14px 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
    background: isSelected ? "#7E1220" : "transparent",
    color: isSelected ? "#FCF6EA" : "#8a7565",
    border: isSelected ? "1px solid #7E1220" : "1px solid rgba(126,18,32,.25)",
  });

  return (
    <div
      style={{
        margin: "44px 26px 0",
        border: "1px solid rgba(126,18,32,.2)",
        background: "rgba(255,255,255,.55)",
        padding: "28px 22px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 32, color: "#7E1220", fontWeight: 500 }}>
          Xác nhận tham dự
        </div>
        <div style={{ fontSize: 16, fontStyle: "italic", color: "#8a7565", marginTop: 4, lineHeight: 1.6 }}>
          Sự hiện diện của Quý khách là niềm vinh hạnh cho gia đình chúng tôi
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!sent || editing ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 22 }}
          >
            <label htmlFor="rsvp-name" style={srOnly}>Tên của Quý khách</label>
            <input
              id="rsvp-name"
              ref={nameRef}
              defaultValue={guestName}
              readOnly={!!guestName}
              placeholder="Tên của Quý khách"
              style={{
                fontFamily: "var(--font-be-vietnam), sans-serif",
                fontSize: 14,
                color: "#4A3B35",
                background: guestName ? "#F3E8D5" : "#FFFDF7",
                border: "1px solid rgba(126,18,32,.25)",
                padding: "13px 14px",
                outline: "none",
                minHeight: 46,
                cursor: guestName ? "default" : "text",
              }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <motion.div
                whileTap={{ scale: 0.97 }}
                onClick={() => setAttend(true)}
                role="button"
                aria-pressed={attend}
                aria-label="Xác nhận sẽ tham dự"
                style={toggleBtnStyle(attend)}
              >
                Có, tôi sẽ đến
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.97 }}
                onClick={() => setAttend(false)}
                role="button"
                aria-pressed={!attend}
                aria-label="Xin phép vắng mặt"
                style={toggleBtnStyle(!attend)}
              >
                Xin phép vắng mặt
              </motion.div>
            </div>
            {attend && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid rgba(126,18,32,.25)",
                  background: "#FFFDF7",
                  padding: "10px 14px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-be-vietnam), sans-serif",
                    fontSize: 14,
                    color: "#4A3B35",
                  }}
                >
                  Tệp đính kèm
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCompanions((c) => Math.max(0, c - 1))}
                    role="button"
                    aria-label="Giảm số người đi cùng"
                    style={{
                      cursor: "pointer",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(126,18,32,.35)",
                      color: "#7E1220",
                      fontSize: 16,
                      userSelect: "none",
                    }}
                  >
                    −
                  </motion.div>
                  <span
                    aria-live="polite"
                    style={{
                      minWidth: 16,
                      textAlign: "center",
                      fontFamily: "var(--font-be-vietnam), sans-serif",
                      fontSize: 14,
                      color: "#4A3B35",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {companions}
                  </span>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCompanions((c) => Math.min(MAX_COMPANIONS, c + 1))}
                    role="button"
                    aria-label="Tăng số người đi cùng"
                    style={{
                      cursor: "pointer",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(126,18,32,.35)",
                      color: "#7E1220",
                      fontSize: 16,
                      userSelect: "none",
                    }}
                  >
                    +
                  </motion.div>
                </div>
              </div>
            )}
            <label htmlFor="rsvp-message" style={srOnly}>Lời chúc gửi tới cô dâu chú rể</label>
            <textarea
              id="rsvp-message"
              ref={msgRef}
              rows={3}
              placeholder="Lời chúc gửi tới cô dâu chú rể"
              style={{
                fontFamily: "var(--font-be-vietnam), sans-serif",
                fontSize: 14,
                color: "#4A3B35",
                background: "#FFFDF7",
                border: "1px solid rgba(126,18,32,.25)",
                padding: "13px 14px",
                outline: "none",
                resize: "none",
              }}
            />
            <motion.div
              whileTap={{ scale: 0.98 }}
              whileHover={{ background: "#A6303C" }}
              onClick={handleSubmit}
              role="button"
              aria-label="Gửi xác nhận tham dự"
              style={{
                cursor: "pointer",
                textAlign: "center",
                fontFamily: "var(--font-be-vietnam), sans-serif",
                fontSize: 12,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                background: "#7E1220",
                color: "#FCF6EA",
                padding: 16,
                minHeight: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Gửi xác nhận
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginTop: 22, textAlign: "center" }}
          >
            <div style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 30, color: "#7E1220" }}>
              Cảm ơn Quý khách!
            </div>
            <div style={{ fontSize: 16, fontStyle: "italic", color: "#8a7565", marginTop: 6 }}>
              Gia đình chúng tôi đã nhận được xác nhận của Quý khách.
            </div>
            <motion.div
              whileTap={{ scale: 0.97 }}
              onClick={() => setEditing(true)}
              role="button"
              aria-label="Sửa lại xác nhận tham dự"
              style={{
                display: "inline-block",
                marginTop: 14,
                cursor: "pointer",
                fontFamily: "var(--font-be-vietnam), sans-serif",
                fontSize: 12,
                letterSpacing: ".08em",
                color: "#8a7565",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Chỉnh sửa lại xác nhận
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
