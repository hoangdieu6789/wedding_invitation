"use client";

import { CSSProperties, DragEvent, useId, useState } from "react";
import { useImageSlot } from "@/lib/hooks";

interface ImageSlotProps {
  id: string;
  placeholder: string;
  style?: CSSProperties;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Click-to-browse / drag-and-drop image slot, persisted client-side. */
export default function ImageSlot({ id, placeholder, style }: ImageSlotProps) {
  const { src, setImage } = useImageSlot(id);
  const inputId = useId();
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImage(await readAsDataUrl(file));
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <label
      htmlFor={inputId}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        textAlign: "center",
        color: "#a89684",
        fontFamily: "var(--font-be-vietnam), sans-serif",
        fontSize: 13,
        padding: 12,
        background: src ? undefined : dragOver ? "#EFE3CC" : "#F3E8D5",
        border: src ? undefined : "1px dashed rgba(126,18,32,.3)",
        ...style,
      }}
    >
      <input
        id={inputId}
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0])}
        style={{ display: "none" }}
      />
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span>{placeholder}</span>
      )}
    </label>
  );
}
