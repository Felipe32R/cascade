import { useCallback, useEffect } from "react";
import { useBodyLock } from "../../hooks/useBodyLock";
import "../../styles/lightbox.css";

type Item = { src: string; caption: string };

type Props = {
  items: readonly Item[];
  index: number | null;
  onChange: (index: number | null) => void;
};

/** Full-screen image viewer with keyboard and arrow navigation. */
export function Lightbox({ items, index, onChange }: Props) {
  useBodyLock(index !== null);

  const close = useCallback(() => onChange(null), [onChange]);
  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, step]);

  const current = index !== null ? items[index] : null;
  if (!current) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.caption}>
      <button className="lightbox__backdrop" onClick={close} aria-label="Close gallery" />
      <button className="lightbox__close" onClick={close} aria-label="Close">
        ✕
      </button>
      <button className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Previous image">
        ←
      </button>
      <figure className="lightbox__figure" key={current.src}>
        <img src={current.src} alt={current.caption} />
        <figcaption className="caption lightbox__caption">
          {current.caption}
          <span className="lightbox__counter">
            {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </figcaption>
      </figure>
      <button className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Next image">
        →
      </button>
    </div>
  );
}
