"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PhotoItem } from "@/content/photos";

export function PhotoGrid({ items }: { items: PhotoItem[] }) {
  const videoRefs = useRef(new Map<string, HTMLVideoElement>());
  const [openId, setOpenId] = useState<string | null>(null);
  const openItem = items.find((item) => item.id === openId) ?? null;

  useEffect(() => {
    if (!openItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openItem]);

  useEffect(() => {
    const videos = videoRefs.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      videos.forEach((video) => video.pause());
      return;
    }

    // One observer for every clip on the page, rather than one per clip,
    // so we're not paying for N observers when scrolling a long grid.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {items.map((item) => (
          <div key={item.id} className="mb-6 break-inside-avoid">
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full cursor-zoom-in rounded-lg"
                onClick={() => setOpenId(item.id)}
              />
            ) : (
              <video
                ref={(el) => {
                  if (el) videoRefs.current.set(item.id, el);
                  else videoRefs.current.delete(item.id);
                }}
                className="w-full cursor-zoom-in rounded-lg"
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
                poster={item.poster}
                aria-label={item.alt}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onClick={() => setOpenId(item.id)}
              >
                <source src={item.src} type="video/mp4" />
              </video>
            )}
          </div>
        ))}
      </div>

      {openItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openItem.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setOpenId(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute top-4 right-4 text-3xl leading-none text-white/70 transition-colors hover:text-white"
            onClick={() => setOpenId(null)}
          >
            &times;
          </button>
          {openItem.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={openItem.src}
              alt={openItem.alt}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              className="max-h-[90vh] max-w-[90vw] rounded-lg"
              poster={openItem.poster}
              aria-label={openItem.alt}
              autoPlay
              muted
              loop
              playsInline
              controls
              onClick={(e) => e.stopPropagation()}
            >
              <source src={openItem.src} type="video/mp4" />
            </video>
          )}
        </div>
      )}
    </>
  );
}
