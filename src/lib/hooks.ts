"use client";

import { useCallback, useEffect, useState } from "react";
import { Side, Wish } from "./types";

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

/** Wishes + RSVP-sent flag. Wishes load from the shared Google Sheet (all guests);
 * the sent flag is local per-device, persisted to localStorage under a per-side prefix. */
export function useWishes(storagePrefix: string, side: Side) {
  const sentKey = `${storagePrefix}-sent-v2`;

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [sent, setSent] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(sentKey)) setSent(true);
    } catch {
      // ignore malformed/unavailable storage
    }
    setHydrated(true);
  }, [sentKey]);

  useEffect(() => {
    fetch(`/api/rsvp?side=${side}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setWishes(data.wishes);
      })
      .catch((error) => {
        console.error("RSVP: failed to load wishes", error);
      });
  }, [side]);

  const submit = useCallback(
    (wish: Wish | null) => {
      if (wish) setWishes((prev) => [wish, ...prev]);
      setSent(true);
      try {
        localStorage.setItem(sentKey, "1");
      } catch {
        // ignore
      }
    },
    [sentKey],
  );

  return { wishes, sent, submit, hydrated };
}

/** Album photos loaded from the shared Google Drive folder; falls back to
 * `fallback` while loading or if the folder isn't configured / unreachable. */
export function useAlbumPhotos(fallback: string[]) {
  const [photos, setPhotos] = useState<string[]>(fallback);

  useEffect(() => {
    fetch("/api/album")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.photos.length > 0) {
          setPhotos(data.photos.map((p: { src: string }) => p.src));
        }
      })
      .catch((error) => {
        console.error("Album: failed to load photos", error);
      });
  }, []);

  return photos;
}
