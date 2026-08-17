"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AlbumProps {
  photos: string[];
  onOpenPhoto: (index: number) => void;
  autoplayPaused?: boolean;
}

const GAP = 16;
const CARD_RATIO = 0.74;
const DOTS_MAX = 10;
const AUTOPLAY_MS = 4500;

export default function Album({ photos, onOpenPhoto, autoplayPaused = false }: AlbumProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const total = photos.length;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setCardWidth(el.clientWidth * CARD_RATIO);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (hovered || autoplayPaused || total <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active, total, hovered, autoplayPaused]);

  const goTo = (n: number) => setActive(((n % total) + total) % total);

  const step = cardWidth + GAP;

  const cardAnimate = (i: number) => {
    const offset = i - active;
    const dist = Math.min(Math.abs(offset), 3);
    return {
      rotateY: offset === 0 ? 0 : Math.sign(offset) * -22,
      scale: offset === 0 ? 1 : 1 - dist * 0.08,
      opacity: offset === 0 ? 1 : 1 - dist * 0.2,
      boxShadow: offset === 0
        ? "0 26px 50px rgba(60,20,20,.34)"
        : "0 10px 22px rgba(60,20,20,.2)",
    };
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x < -60 || info.velocity.x < -400) goTo(active + 1);
    else if (info.offset.x > 60 || info.velocity.x > 400) goTo(active - 1);
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
          ref={viewportRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            overflow: "hidden",
            padding: "16px 13% 26px",
            perspective: 1200,
          }}
        >
          <motion.div
            style={{ display: "flex", gap: GAP, transformStyle: "preserve-3d", touchAction: "pan-y" }}
            drag="x"
            dragConstraints={{ left: -(total - 1) * step, right: 0 }}
            dragElastic={0.15}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            animate={{ x: -active * step }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {photos.map((src, i) => (
              <motion.div
                key={src}
                style={{
                  flex: `0 0 ${cardWidth}px`,
                  height: 430,
                  overflow: "hidden",
                  background: "#F3E8D5",
                  cursor: "zoom-in",
                }}
                animate={cardAnimate(i)}
                transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
                onClick={() => onOpenPhoto(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Ảnh cưới"
                  loading={Math.abs(i - active) <= 1 ? "eager" : "lazy"}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 16%" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          whileHover={{ background: "#7E1220" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => goTo(active - 1)}
          role="button"
          aria-label="Ảnh trước"
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            y: "-50%",
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
          onClick={() => goTo(active + 1)}
          role="button"
          aria-label="Ảnh tiếp theo"
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            y: "-50%",
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

      {total > DOTS_MAX ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              onClick={() => goTo(i)}
              role="button"
              aria-label={`Xem ảnh ${i + 1}`}
              animate={{
                width: i === active ? 22 : 6,
                background: i === active ? "#7E1220" : "rgba(126,18,32,.28)",
              }}
              transition={{ duration: 0.3 }}
              style={{ height: 6, borderRadius: 3, cursor: "pointer" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
