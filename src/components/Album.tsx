"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import ImageSlot from "./ImageSlot";

interface AlbumProps {
  photos: string[];
  storagePrefix: string;
  onOpenPhoto: (index: number) => void;
}

const SLIDE_COUNT_PLACEHOLDERS = 2;

export default function Album({ photos, storagePrefix, onOpenPhoto }: AlbumProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [active, setActive] = useState(0);
  const total = photos.length + SLIDE_COUNT_PLACEHOLDERS;

  const slideTo = (n: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[n] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({
        left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2,
        behavior: "smooth",
      });
    }
    setActive(n);
  };

  const manual = (n: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    slideTo((n + total) % total);
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || !el.children[0]) return;
    const width = (el.children[0] as HTMLElement).clientWidth + 16;
    const n = Math.max(0, Math.min(total - 1, Math.round(el.scrollLeft / width)));
    if (n !== active) setActive(n);
  };

  const cardStyle = (i: number): React.CSSProperties => ({
    flex: "0 0 74%",
    height: 430,
    scrollSnapAlign: "center",
    overflow: "hidden",
    background: "#F3E8D5",
  });

  const cardAnimate = (i: number) => {
    const isActive = i === active;
    const tiltSign = i % 2 === 0 ? -1 : 1;
    return {
      rotate: isActive ? 0 : 2.4 * tiltSign,
      scale: isActive ? 1 : 0.93,
      boxShadow: isActive
        ? "0 26px 50px rgba(60,20,20,.34)"
        : "0 10px 22px rgba(60,20,20,.2)",
    };
  };

  return (
    <div style={{ padding: "48px 0 0" }}>
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
        Album cưới
      </div>
      <div
        style={{
          textAlign: "center",
          fontFamily: "var(--font-dancing), cursive",
          fontSize: 36,
          color: "#7E1220",
          fontWeight: 500,
          marginTop: 6,
        }}
      >
        Khoảnh khắc của chúng tôi
      </div>

      <div style={{ position: "relative", marginTop: 22 }}>
        <div
          ref={trackRef}
          onScroll={handleScroll}
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            padding: "16px 13% 26px",
            scrollbarWidth: "none",
          }}
        >
          {photos.map((src, i) => (
            <motion.div
              key={src}
              style={{ ...cardStyle(i), cursor: "zoom-in" }}
              animate={cardAnimate(i)}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              onClick={() => onOpenPhoto(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Ảnh cưới"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 16%" }}
              />
            </motion.div>
          ))}
          {Array.from({ length: SLIDE_COUNT_PLACEHOLDERS }).map((_, i) => (
            <motion.div
              key={`slot-${i}`}
              style={cardStyle(photos.length + i)}
              animate={cardAnimate(photos.length + i)}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <ImageSlot
                id={`${storagePrefix}-album-${i + 1}`}
                placeholder="Kéo ảnh cưới vào đây"
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ background: "#7E1220" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => manual(active - 1)}
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(252,246,234,.9)",
            border: "1px solid rgba(126,18,32,.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,.18)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7E1220" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M15 5 8 12l7 7" />
          </svg>
        </motion.div>
        <motion.div
          whileHover={{ background: "#7E1220" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => manual(active + 1)}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(252,246,234,.9)",
            border: "1px solid rgba(126,18,32,.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,.18)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7E1220" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            onClick={() => manual(i)}
            animate={{
              width: i === active ? 22 : 6,
              background: i === active ? "#7E1220" : "rgba(126,18,32,.28)",
            }}
            transition={{ duration: 0.3 }}
            style={{ height: 6, borderRadius: 3, cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
}
