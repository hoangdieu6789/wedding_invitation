"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";

export default function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (on) {
      audio.pause();
      setOn(false);
    } else {
      audio.play().catch(() => {});
      setOn(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/nhac.mp3" loop />
      <motion.div
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: on ? [1, 1.08, 1] : 1 }}
        transition={on ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
        title={on ? "Tắt nhạc" : "Bật nhạc"}
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "#7E1220",
          color: "#FCF6EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(0,0,0,.28)",
          zIndex: 40,
        }}
      >
        {on ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9 18a3 3 0 1 1-2-5.2V4l11-2v3L10 6.6v9.6c0 .4 0 .8-1 1.8z" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M9 18a3 3 0 1 1-2-5.2V4l11-2v3L10 6.6" />
            <path d="M4 20 20 4" />
          </svg>
        )}
      </motion.div>
    </>
  );
}
