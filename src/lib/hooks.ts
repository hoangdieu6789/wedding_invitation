"use client";

import { useCallback, useEffect, useState } from "react";
import { Wish } from "./types";

export interface CountdownValue {
  days: string;
  hours: string;
  mins: string;
  secs: string;
  done: boolean;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function useCountdown(targetIso: string): CountdownValue {
  const [value, setValue] = useState<CountdownValue>({
    days: "--",
    hours: "--",
    mins: "--",
    secs: "--",
    done: false,
  });

  useEffect(() => {
    const target = new Date(targetIso).getTime();

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setValue({ days: "0", hours: "00", mins: "00", secs: "00", done: true });
        return;
      }
      setValue({
        days: String(Math.floor(diff / 864e5)),
        hours: pad(Math.floor(diff / 36e5) % 24),
        mins: pad(Math.floor(diff / 6e4) % 60),
        secs: pad(Math.floor(diff / 1e3) % 60),
        done: false,
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  return value;
}

/** Wishes + RSVP-sent flag, persisted to localStorage under a per-side prefix. */
export function useWishes(storagePrefix: string) {
  const wishesKey = `${storagePrefix}-wishes-v2`;
  const sentKey = `${storagePrefix}-sent-v2`;

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [sent, setSent] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(wishesKey);
      if (raw) setWishes(JSON.parse(raw));
      if (localStorage.getItem(sentKey)) setSent(true);
    } catch {
      // ignore malformed/unavailable storage
    }
    setHydrated(true);
  }, [wishesKey, sentKey]);

  const submit = useCallback(
    (wish: Wish | null) => {
      setWishes((prev) => {
        const next = wish ? [wish, ...prev] : prev;
        try {
          localStorage.setItem(wishesKey, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
      setSent(true);
      try {
        localStorage.setItem(sentKey, "1");
      } catch {
        // ignore
      }
    },
    [wishesKey, sentKey],
  );

  return { wishes, sent, submit, hydrated };
}

/** Client-only, per-slot image picker persistence (data URL in localStorage). */
export function useImageSlot(id: string) {
  const key = `imgslot:${id}`;
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setSrc(raw);
    } catch {
      // ignore
    }
  }, [key]);

  const setImage = useCallback(
    (dataUrl: string) => {
      setSrc(dataUrl);
      try {
        localStorage.setItem(key, dataUrl);
      } catch {
        // ignore
      }
    },
    [key],
  );

  return { src, setImage };
}
