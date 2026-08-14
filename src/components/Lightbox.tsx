"use client";

import { AnimatePresence, motion } from "motion/react";

interface LightboxProps {
  photos: string[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function Lightbox({ photos, index, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const active = index ?? 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            background: "rgba(24,12,12,.95)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 18px",
              color: "rgba(255,244,232,.8)",
              fontFamily: "var(--font-be-vietnam), sans-serif",
              fontSize: 12,
              letterSpacing: ".16em",
            }}
          >
            <span>
              {active + 1} / {photos.length}
            </span>
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "1px solid rgba(255,244,232,.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" />
              </svg>
            </motion.div>
          </div>
          <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: 10, padding: "0 12px" }}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={() => onIndexChange((active - 1 + photos.length) % photos.length)}
              style={{
                flex: "0 0 40px",
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,244,232,.12)",
                color: "#FFF4E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M15 5 8 12l7 7" />
              </svg>
            </motion.div>
            <div style={{ flex: 1, minWidth: 0, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={photos[active]}
                  src={photos[active]}
                  alt="Ảnh cưới"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    boxShadow: "0 20px 60px rgba(0,0,0,.55)",
                  }}
                />
              </AnimatePresence>
            </div>
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={() => onIndexChange((active + 1) % photos.length)}
              style={{
                flex: "0 0 40px",
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,244,232,.12)",
                color: "#FFF4E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px 18px 22px" }}>
            {photos.map((src, i) => (
              <motion.div
                key={src}
                whileTap={{ scale: 0.92 }}
                onClick={() => onIndexChange(i)}
                style={{
                  width: 54,
                  height: 54,
                  overflow: "hidden",
                  cursor: "pointer",
                  opacity: i === active ? 1 : 0.45,
                  outline: i === active ? "1px solid #E8C9A0" : "none",
                  outlineOffset: 2,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Ảnh cưới" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
