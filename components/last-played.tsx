"use client";

import { useEffect, useState } from "react";
import type { LastPlayed } from "@/lib/spotify";

export function LastPlayedWidget() {
  const [data, setData] = useState<LastPlayed | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/last-played")
      .then((res) => (res.ok ? res.json() : null))
      .then((json: LastPlayed | null) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        // No API route (static export), no credentials, or a network error —
        // all of these should just mean the widget doesn't exist.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) return null;

  return (
    <a
      href={data.trackUrl || undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 z-10 flex max-w-[260px] items-center gap-3 rounded border border-border bg-bg px-3 py-2 text-sm transition-opacity hover:opacity-80"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.albumArt}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded"
      />
      <span className="min-w-0">
        <span className="block text-xs text-muted">last played</span>
        <span className="block truncate">
          {data.track} — {data.artist}
        </span>
      </span>
    </a>
  );
}
