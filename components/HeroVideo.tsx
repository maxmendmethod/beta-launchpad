"use client";

import { useEffect, useRef } from "react";

export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // iOS only autoplays when the element is actually muted. React does not
    // reliably emit the `muted` attribute to the DOM, so enforce it here and
    // kick off playback programmatically to avoid the native play-button overlay.
    v.muted = true;
    v.defaultMuted = true;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    return () => v.removeEventListener("loadeddata", tryPlay);
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className}
    >
      <source src="/hero-section.mp4" type="video/mp4" />
    </video>
  );
}
