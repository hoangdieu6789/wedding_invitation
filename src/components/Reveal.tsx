"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

/** Fade + rise into view once, matching the design's scroll-reveal. */
export default function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px", amount: 0.04 }}
      transition={{
        opacity: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] },
        y: { duration: 1, ease: [0.2, 0.7, 0.2, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
