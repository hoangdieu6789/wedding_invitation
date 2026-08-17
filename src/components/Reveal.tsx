"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ReactNode, useRef } from "react";

/**
 * Scroll-linked reveal (Apple product-page style): opacity/scale/position
 * track scroll position continuously as the element crosses the viewport —
 * fades + settles in while entering, fades back out while leaving — instead
 * of firing once and holding. Falls back to a static, always-visible render
 * when the OS requests reduced motion.
 */
export default function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const reduceMotion = useReducedMotion();

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], reduceMotion ? [1, 1, 1, 1] : [0.94, 1, 1, 0.96]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], reduceMotion ? [0, 0, 0, 0] : [40, 0, 0, -16]);

  return (
    <motion.div ref={ref} style={{ opacity, scale, y }}>
      {children}
    </motion.div>
  );
}
