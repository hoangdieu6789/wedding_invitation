"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
}

function makePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.round((i / count) * 100 + (i % 3) * 4 - 4),
    size: 8 + (i % 4) * 3,
    duration: 14 + (i % 5) * 3,
    delay: (i % count) * 1.4,
    drift: i % 2 === 0 ? 24 : -24,
    rotate: i % 2 === 0 ? 200 : -200,
  }));
}

export default function FallingPetals({ count = 10 }: { count?: number }) {
  const petals = useMemo(() => makePetals(count), [count]);
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: "50%",
        width: "100%",
        maxWidth: 460,
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-5vh", x: 0, opacity: 0, rotate: 0 }}
          animate={{ y: "105vh", x: [0, p.drift, 0], opacity: [0, 0.8, 0.8, 0], rotate: p.rotate }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            x: { duration: p.duration, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: p.duration, repeat: Infinity, times: [0, 0.1, 0.85, 1] },
          }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size * 0.8,
            borderRadius: "0% 70% 0% 70%",
            background: "linear-gradient(135deg, #F2B9C4 0%, #C9455A 100%)",
          }}
        />
      ))}
    </div>
  );
}
