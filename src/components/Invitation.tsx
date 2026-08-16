"use client";

import { useState } from "react";
import { SIDES } from "@/lib/content";
import { useAlbumPhotos, useWishes } from "@/lib/hooks";
import { Side, VenueBlock } from "@/lib/types";
import Album from "./Album";
import Countdown from "./Countdown";
import EnvelopeCover from "./EnvelopeCover";
import Lightbox from "./Lightbox";
import MusicButton from "./MusicButton";
import Reveal from "./Reveal";
import RsvpCard from "./RsvpCard";
import WishesBook from "./WishesBook";

function QrImage({ src, size }: { src: string; size: number }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#a89684",
          fontFamily: "var(--font-be-vietnam), sans-serif",
          fontSize: 12,
          padding: 12,
          background: "#F3E8D5",
        }}
      >
        Chưa có ảnh QR
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="QR chuyển khoản mừng cưới"
      onError={() => setBroken(true)}
      style={{ width: size, height: size, objectFit: "cover" }}
    />
  );
}

function Venue({ venue, primary }: { venue: VenueBlock; primary: boolean }) {
  return (
    <div style={{ padding: "40px 32px 8px", textAlign: "center" }}>
      {primary ? (
        <>
          <div style={{ fontFamily: "var(--font-be-vietnam), sans-serif", fontSize: 10, letterSpacing: ".32em", color: "#A6303C", textTransform: "uppercase" }}>
            Hôn lễ được tổ chức tại
          </div>
          <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 27, fontWeight: 500, letterSpacing: ".08em", color: "#7E1220", marginTop: 12 }}>
            {venue.title}
          </div>
        </>
      ) : (
        <>
          <div style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 34, color: "#7E1220", fontWeight: 500 }}>
            Trân trọng kính mời
          </div>
          <div style={{ fontSize: 17, color: "#6f5b4d", marginTop: 10, lineHeight: 1.7 }}>
            Tới dự bữa tiệc mừng hạnh phúc
            <br />
            chung vui cùng gia đình chúng tôi
          </div>
          <div style={{ fontFamily: "var(--font-be-vietnam), sans-serif", fontSize: 10, letterSpacing: ".3em", color: "#A6303C", textTransform: "uppercase", marginTop: 22 }}>
            Được tổ chức
          </div>
          <div style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 34, color: "#7E1220", fontWeight: 500, marginTop: 6 }}>
            {venue.title}
          </div>
        </>
      )}
      <div style={{ fontSize: 17, fontStyle: "italic", color: "#6f5b4d", marginTop: 6, lineHeight: 1.6 }}>
        {venue.addressLines.map((line, i) => (
          <span key={line}>
            {line}
            {i < venue.addressLines.length - 1 && <br />}
          </span>
        ))}
      </div>
      <div style={{ marginTop: 18, fontSize: 17, color: "#4A3B35", fontVariantNumeric: "lining-nums tabular-nums" }}>
        Vào lúc <strong style={{ fontWeight: 500 }}>{venue.time}</strong>
      </div>
      <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 23, fontWeight: 600, letterSpacing: ".06em", color: "#7E1220", marginTop: 4, fontVariantNumeric: "lining-nums tabular-nums" }}>
        {venue.dateLabel}
      </div>
      <div style={{ fontSize: 15, fontStyle: "italic", color: "#8a7565", marginTop: 2 }}>{venue.lunarLabel}</div>
      <a
        href={venue.mapUrl}
        target="_blank"
        rel="noopener"
        style={
          primary
            ? {
                display: "inline-block",
                marginTop: 18,
                fontFamily: "var(--font-be-vietnam), sans-serif",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "#7E1220",
                border: "1px solid rgba(126,18,32,.4)",
                padding: "11px 20px",
              }
            : {
                display: "inline-block",
                marginTop: 18,
                fontFamily: "var(--font-be-vietnam), sans-serif",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "#FCF6EA",
                background: "#7E1220",
                padding: "12px 22px",
              }
        }
      >
        {venue.ctaLabel}
      </a>
      {!primary && (
        <div style={{ fontSize: 16, fontStyle: "italic", color: "#8a7565", marginTop: 20 }}>Rất hân hạnh được đón tiếp!</div>
      )}
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "34px 32px 0" }}>
      <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(126,18,32,.3))" }} />
      <svg width="46" height="20" viewBox="0 0 46 20" fill="none" stroke="#A6303C" strokeWidth="0.9" aria-hidden="true">
        <path d="M4 10h13M29 10h13" />
        <path d="M23 3.5c-3 2.2-4.4 4.4-4.4 6.5 0 2.1 1.4 4.3 4.4 6.5 3-2.2 4.4-4.4 4.4-6.5 0-2.1-1.4-4.3-4.4-6.5z" />
      </svg>
      <span style={{ flex: 1, height: 1, background: "linear-gradient(270deg, transparent, rgba(126,18,32,.3))" }} />
    </div>
  );
}

export default function Invitation({ side, guestName }: { side: Side; guestName?: string }) {
  const content = SIDES[side];
  const { wishes, sent, submit } = useWishes(content.storagePrefix, side);
  const albumPhotos = useAlbumPhotos(content.albumImages);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroImage = content.albumImages[0];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#3f3b38",
        display: "flex",
        justifyContent: "center",
        fontFamily: "var(--font-cormorant), Georgia, serif",
        color: "#4A3B35",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          position: "relative",
          background: "#FCF6EA",
          backgroundImage:
            "radial-gradient(120% 60% at 50% 0%, #FFFCF4 0%, #FCF6EA 55%, #F7EFE0 100%)",
          boxShadow: "0 24px 80px rgba(0,0,0,.45)",
          overflow: "hidden",
        }}
      >
        {/* Hero */}
        <Reveal>
        <div style={{ position: "relative" }}>
          <div style={{ position: "relative", height: 520, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt={content.heroNames.join(" & ")}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(252,246,234,.18) 0%, rgba(252,246,234,0) 34%, rgba(252,246,234,.62) 82%, #FCF6EA 100%)",
              }}
            />
            <div style={{ position: "absolute", top: 18, left: 18, right: 18, bottom: 18, border: "1px solid rgba(255,248,238,.45)", pointerEvents: "none" }} />
          </div>
          <div style={{ position: "relative", marginTop: -40, padding: "0 30px 10px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              role="img"
              aria-label="Monogram"
              style={{
                width: 64,
                height: 58,
                background: "#A6303C",
                opacity: 0.55,
                WebkitMaskImage: `url(${content.monogram})`,
                WebkitMaskSize: "contain",
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                maskImage: `url(${content.monogram})`,
                maskSize: "contain",
                maskPosition: "center",
                maskRepeat: "no-repeat",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20, fontFamily: "var(--font-be-vietnam), sans-serif", fontSize: 10, letterSpacing: ".36em", color: "#A6303C", textTransform: "uppercase" }}>
              <span style={{ width: 20, height: 1, background: "rgba(166,48,60,.45)" }} />
              <span>Trân trọng kính mời</span>
              <span style={{ width: 20, height: 1, background: "rgba(166,48,60,.45)" }} />
            </div>
            {guestName && (
              <div style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 26, color: "#A6303C", marginTop: 12 }}>
                {guestName}
              </div>
            )}
            <div style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 19, color: "#8a7565", marginTop: 14 }}>
              tới dự lễ thành hôn của
            </div>
            <div style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 54, lineHeight: 1.05, color: "#7E1220", fontWeight: 500, marginTop: 16 }}>
              {content.heroNames[0]}
            </div>
            <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 26, fontStyle: "italic", color: "#A6303C", margin: "6px 0" }}>&amp;</div>
            <div style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 54, lineHeight: 1.05, color: "#7E1220", fontWeight: 500 }}>
              {content.heroNames[1]}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 24, fontFamily: "var(--font-be-vietnam), sans-serif", fontSize: 12, letterSpacing: ".22em", color: "#6f5b4d" }}>
              <span style={{ width: 26, height: 1, background: "rgba(126,18,32,.35)" }} />
              <span style={{ fontVariantNumeric: "lining-nums tabular-nums" }}>{content.dateRibbon}</span>
              <span style={{ width: 26, height: 1, background: "rgba(126,18,32,.35)" }} />
            </div>
          </div>
        </div>
        </Reveal>

        <Reveal><Venue venue={content.leThanhHon} primary /></Reveal>
        <Reveal><Divider /></Reveal>
        <Reveal><Venue venue={content.tiecMung} primary={false} /></Reveal>

        {/* Song thân */}
        <Reveal>
        <div style={{ padding: "26px 26px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, textAlign: "center" }}>
          {[content.parents.left, content.parents.right].map((p) => (
            <div key={p.title}>
              <div style={{ fontFamily: "var(--font-be-vietnam), sans-serif", fontSize: 10, letterSpacing: ".28em", color: "#A6303C", textTransform: "uppercase" }}>
                {p.title}
              </div>
              <div style={{ marginTop: 10, fontSize: 17, fontWeight: 500, color: "#4A3B35", lineHeight: 1.7 }}>
                Bố: {p.father}
                <br />
                Mẹ: {p.mother}
              </div>
              <div style={{ marginTop: 6, fontSize: 15, fontStyle: "italic", color: "#8a7565", lineHeight: 1.6 }}>
                {p.addressLines.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < p.addressLines.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        </Reveal>

        <Reveal>
          <Album photos={albumPhotos} onOpenPhoto={setLightboxIndex} />
        </Reveal>

        <Lightbox
          photos={albumPhotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />

        <Reveal><Countdown targetIso={content.weddingDateIso} /></Reveal>

        <Reveal><RsvpCard sent={sent} side={side} guestName={guestName} onSubmit={submit} /></Reveal>

        <Reveal><WishesBook wishes={wishes} /></Reveal>

        {/* Mừng cưới */}
        <Reveal>
        <div style={{ margin: "44px 26px 0", textAlign: "center", border: "1px solid rgba(126,18,32,.2)", padding: "28px 22px", background: "rgba(255,255,255,.5)" }}>
          <div style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 32, color: "#7E1220", fontWeight: 500 }}>Hộp mừng cưới</div>
          <div style={{ fontSize: 16, fontStyle: "italic", color: "#8a7565", marginTop: 4, lineHeight: 1.6 }}>
            Nếu không thể tới chung vui, Quý khách có thể gửi lời chúc qua đây
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <QrImage src={`/img/qr-${content.storagePrefix}.png`} size={190} />
          </div>
          <div style={{ marginTop: 16, fontFamily: "var(--font-be-vietnam), sans-serif", fontSize: 13, color: "#6f5b4d", lineHeight: 1.9 }}>
            {content.bankOwnerName}
            <br />
            {content.bankAccountNumber} &middot; {content.bankName}
          </div>
        </div>
        </Reveal>

        {/* Thank you */}
        <Reveal>
        <div style={{ padding: "52px 26px 60px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-dancing), cursive", fontSize: 44, color: "#7E1220", fontWeight: 500 }}>Thank You!</div>
          <div style={{ fontSize: 16, fontStyle: "italic", color: "#8a7565", marginTop: 10, lineHeight: 1.7 }}>
            Sự hiện diện của Quý khách
            <br />
            là niềm vinh hạnh cho Gia đình chúng tôi!
          </div>
          <div
            role="img"
            aria-label="Monogram"
            style={{
              width: 64,
              height: 58,
              margin: "26px auto 0",
              background: "#A6303C",
              opacity: 0.55,
              WebkitMaskImage: `url(${content.monogram})`,
              WebkitMaskSize: "contain",
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              maskImage: `url(${content.monogram})`,
              maskSize: "contain",
              maskPosition: "center",
              maskRepeat: "no-repeat",
            }}
          />
        </div>
        </Reveal>

        <MusicButton />
      </div>

      <EnvelopeCover heroImage={heroImage} monogram={content.monogram} names={content.heroNames} />
    </div>
  );
}
