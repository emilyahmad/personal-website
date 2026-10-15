import { useEffect, useState } from "react";

type Props = {
  images: string[];
  /** Tailwind height class for the frame, e.g. "h-36". */
  className?: string;
  /** object-position for the first image (the cover). */
  coverPosition?: string;
  /** Called when the image itself (not an arrow) is clicked. */
  onImageClick?: () => void;
  /** Milliseconds between automatic slides. */
  interval?: number;
  /** Used to stagger autoplay so a row of cards doesn't flip in unison. */
  seed?: string;
  size?: "sm" | "lg";
};

/** Cross-fading image slideshow with prev/next arrows and dots. Autoplays, pausing on hover. */
export function ImageCarousel({
  images,
  className = "",
  coverPosition,
  onImageClick,
  interval = 4500,
  seed = "",
  size = "sm",
}: Props) {
  const [failed, setFailed] = useState<string[]>([]);
  const slides = images.filter((src) => !failed.includes(src));
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Only mount images once they're about to be shown, so a row of cards doesn't download every photo up front.
  const [seen, setSeen] = useState<number[]>([0]);

  const count = slides.length;
  const current = count ? index % count : 0;
  const go = (delta: number) => setIndex((i) => (((i + delta) % count) + count) % count);

  useEffect(() => {
    setSeen((s) => (s.includes(current) ? s : [...s, current]));
  }, [current]);

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Deterministic per-card offset (0–2s) so neighbouring cards change at different moments.
    const offset = [...seed].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 2000, 0);
    let timer: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      timer = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    }, offset);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [count, paused, interval, seed]);

  if (!count) return null;

  const next = (current + 1) % count;
  const arrow =
    "absolute top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-cream/85 text-stone-700 shadow-sm backdrop-blur transition hover:bg-cream focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-berry-500 group-hover/carousel:opacity-100 [@media(hover:none)]:opacity-100 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:bg-stone-900 " +
    (size === "lg" ? "h-9 w-9 text-lg opacity-0" : "h-7 w-7 text-sm opacity-0");

  return (
    <div
      className={`group/carousel relative w-full overflow-hidden bg-stone-100 dark:bg-stone-800 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="absolute inset-0" onClick={onImageClick}>
        {slides.map((src, i) =>
          seen.includes(i) || i === next ? (
            <img
              key={src}
              src={src}
              alt=""
              onError={() => setFailed((f) => [...f, src])}
              style={i === 0 && coverPosition ? { objectPosition: coverPosition } : undefined}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null,
        )}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className={`${arrow} left-2`}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className={`${arrow} right-2`}
          >
            ›
          </button>
          <div className="pointer-events-none absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1">
            {slides.map((src, i) => (
              <span
                key={src}
                className={`h-1.5 rounded-full shadow-sm transition-all ${
                  i === current ? "w-4 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/** The cover followed by any other images, without duplicates. */
export function slideList(cover?: string, images?: string[]) {
  return [...new Set([cover, ...(images ?? [])].filter((src): src is string => !!src))];
}
