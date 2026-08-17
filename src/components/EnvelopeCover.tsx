"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Phase = "closed" | "opening" | "rising" | "expanding" | "done";

interface EnvelopeCoverProps {
  heroImage: string;
  monogram: string;
  names: [string, string];
  guestName?: string;
}

export default function EnvelopeCover({ heroImage, monogram, names, guestName }: EnvelopeCoverProps) {
  const [phase, setPhase] = useState<Phase>("closed");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const open = () => {
    if (phase !== "closed") return;
    window.scrollTo(0, 0);
    setPhase("opening");
    timers.current.push(setTimeout(() => setPhase("rising"), 900));
    timers.current.push(setTimeout(() => setPhase("expanding"), 2300));
    timers.current.push(setTimeout(() => setPhase("done"), 3600));
  };

  if (phase === "done") return null;

  const started = phase !== "closed";
  const rising = phase === "rising" || phase === "expanding";
  const expanding = phase === "expanding";

  return (
    <>
      <motion.div
        animate={{ opacity: expanding ? 0 : 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "fixed", inset: 0, zIndex: 50, background: "#3f3b38" }}
      />
      <motion.div
        animate={{ opacity: expanding ? 0 : 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          overflow: "hidden",
          pointerEvents: rising ? "none" : "auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 26px",
          }}
        >
          <div
            onClick={open}
            style={{
              position: "relative",
              width: "min(88vw, 400px)",
              aspectRatio: "1.42",
              cursor: "pointer",
              pointerEvents: "auto",
              perspective: 1500,
              boxShadow: "0 30px 64px rgba(0,0,0,.55)",
            }}
          >
            {/* envelope base */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(150deg,#FBF3E4 0%,#F2E6D2 55%,#EADDC7 100%)",
              }}
            />

            {/* card slot: clipped to the front flap's triangular gap, opening
                upward without bound so the card can bleed past the envelope
                once risen — this is what sells "pulled out from inside" */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 4,
                clipPath: "polygon(-250% -300%, 50% 61.2%, 350% -300%)",
                pointerEvents: "none",
              }}
            >
            <motion.div
              animate={{
                y: expanding ? "-30%" : rising ? "-38%" : "55%",
                rotateX: rising ? 0 : 9,
                scale: expanding ? 2.15 : rising ? 1 : 0.94,
                opacity: expanding ? 0 : rising ? 1 : 0,
                boxShadow: rising ? "0 26px 60px rgba(0,0,0,.5)" : "0 6px 14px rgba(0,0,0,.3)",
              }}
              transition={{
                default: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                opacity: expanding
                  ? { duration: 0.9, ease: "easeOut", delay: 0.3 }
                  : { duration: 0.8, ease: "easeOut" },
                boxShadow: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{
                position: "absolute",
                left: "12%",
                right: "12%",
                bottom: "7%",
                height: "128%",
                pointerEvents: "auto",
                visibility: rising ? "visible" : "hidden",
                background: "#FCF6EA",
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={names.join(" & ")}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  width: "100%",
                  height: "62%",
                  objectFit: "cover",
                  objectPosition: "50% 18%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "8%",
                  right: "8%",
                  top: "64%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  role="img"
                  aria-label="Monogram"
                  style={{
                    width: 38,
                    height: 34,
                    background: "#A6303C",
                    opacity: 0.55,
                    WebkitMaskImage: `url(${monogram})`,
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    maskImage: `url(${monogram})`,
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                  }}
                />
                <div style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 22, lineHeight: 1.15, color: "#7E1220", fontWeight: 500, marginTop: 8 }}>
                  {names[0]}
                </div>
                <div style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 13, color: "#A6303C" }}>&amp;</div>
                <div style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 22, lineHeight: 1.15, color: "#7E1220", fontWeight: 500 }}>
                  {names[1]}
                </div>
                <div style={{ fontFamily: "var(--font-be-vietnam), sans-serif", fontSize: 7, letterSpacing: ".28em", color: "#8a7565", marginTop: 9 }}>
                  20 . 09 . 2026
                </div>
              </div>
            </motion.div>
            </div>

            {/* front triangle flap (bottom, stays put) */}
            <motion.div
              animate={{ y: rising ? "1.2%" : "0%", scaleY: rising ? 1.012 : 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                clipPath: "polygon(0 0, 50% 61.2%, 100% 0, 100% 100%, 0 100%)",
                background: "linear-gradient(170deg,#FFFCF4 0%,#F7EEDF 58%,#F1E5D1 100%)",
                boxShadow: "0 -4px 12px rgba(90,60,30,.10), inset 0 3px 6px rgba(90,60,30,.18)",
              }}
            >
              {/* fold crease lines toward the flap's peak */}
              <motion.div
                animate={{ opacity: started ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "66%",
                  height: 3,
                  transformOrigin: "0 0",
                  transform: "rotate(40.8deg)",
                  background: "linear-gradient(180deg, rgba(80,52,26,.32) 0%, rgba(255,255,255,.45) 55%, rgba(80,52,26,0) 100%)",
                  pointerEvents: "none",
                }}
              />
              <motion.div
                animate={{ opacity: started ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  width: "66%",
                  height: 3,
                  transformOrigin: "100% 0",
                  transform: "rotate(-40.8deg)",
                  background: "linear-gradient(180deg, rgba(80,52,26,.32) 0%, rgba(255,255,255,.45) 55%, rgba(80,52,26,0) 100%)",
                  pointerEvents: "none",
                }}
              />
            </motion.div>

            {/* top flap (opens) */}
            <motion.div
              animate={{ rotateX: started ? -174 : 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: "62.6%",
                zIndex: 3,
                transformOrigin: "top center",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg,#FFFEFA 0%,#F8EFE1 70%,#F1E5D2 100%)",
                filter: "drop-shadow(0 1px 0 rgba(126,18,32,.16))",
              }}
            >
              {/* fold crease lines toward the flap's peak */}
              <motion.div
                animate={{ opacity: started ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "67%",
                  height: 3,
                  transformOrigin: "0 0",
                  transform: "rotate(41.4deg)",
                  background: "linear-gradient(180deg, rgba(80,52,26,.32) 0%, rgba(255,255,255,.45) 55%, rgba(80,52,26,0) 100%)",
                  pointerEvents: "none",
                }}
              />
              <motion.div
                animate={{ opacity: started ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  width: "67%",
                  height: 3,
                  transformOrigin: "100% 0",
                  transform: "rotate(-41.4deg)",
                  background: "linear-gradient(180deg, rgba(80,52,26,.32) 0%, rgba(255,255,255,.45) 55%, rgba(80,52,26,0) 100%)",
                  pointerEvents: "none",
                }}
              />
              <motion.div
                animate={{ opacity: started ? 0 : 1 }}
                transition={{ duration: 0.35 }}
                style={{
                  position: "absolute",
                  left: "10%",
                  right: "10%",
                  top: "11%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  textAlign: "center",
                }}
              >
                <div
                  role="img"
                  aria-label="Monogram"
                  style={{
                    width: "clamp(56px, 19%, 80px)",
                    height: 58,
                    background: "#A6303C",
                    opacity: 0.55,
                    WebkitMaskImage: `url(${monogram})`,
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    maskImage: `url(${monogram})`,
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                  }}
                />
                <div style={{ fontFamily: "var(--font-be-vietnam), sans-serif", fontSize: 9, letterSpacing: ".3em", color: "#b0a08d" }}>
                  20 . 09 . 2026
                </div>
              </motion.div>
            </motion.div>

            {/* wax seal */}
            <div style={{ position: "absolute", left: "50%", top: "59%", zIndex: 4, transform: "translate(-50%,-50%)", width: 38, height: 38 }}>
              <motion.div
                animate={
                  started
                    ? { y: -14, rotate: -14, scale: 0.72, opacity: 0 }
                    : { scale: [1, 1.035, 1], opacity: 1 }
                }
                transition={
                  started
                    ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                }
                style={{ position: "absolute", inset: 0 }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 34% 28%, #C22C40 0%, #8E1424 45%, #620B16 100%)",
                    boxShadow: "0 8px 20px rgba(60,5,12,.5)",
                  }}
                />
                <div style={{ position: "absolute", inset: 3, borderRadius: "50%", border: "1px solid rgba(255,225,225,.26)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={monogram}
                  alt="Monogram"
                  style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "74%" }}
                />
              </motion.div>
            </div>

            {/* invite line above envelope base */}
            <div
              style={{
                position: "absolute",
                left: "16%",
                right: "16%",
                bottom: "7%",
                zIndex: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  fontSize: 15,
                  color: "#8a7565",
                  marginBottom: guestName ? 4 : 14,
                }}
              >
                Trân trọng kính mời
              </div>
              {guestName && (
                <div style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 20, color: "#A6303C", marginBottom: 2 }}>
                  {guestName}
                </div>
              )}
              <div style={{ width: "100%", borderBottom: "1px dotted rgba(126,18,32,.3)" }} />
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 52, display: "flex", justifyContent: "center", pointerEvents: "auto" }}>
          <motion.div
            onClick={open}
            animate={started ? { opacity: 0 } : { opacity: 1, y: [0, -6, 0] }}
            transition={
              started
                ? { duration: 0.4 }
                : { y: { duration: 2.6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.4 } }
            }
            style={{
              cursor: "pointer",
              fontFamily: "var(--font-be-vietnam), sans-serif",
              fontSize: 11,
              letterSpacing: ".28em",
              color: "#cbbba6",
              textTransform: "uppercase",
            }}
          >
            Chạm để mở thiệp
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
