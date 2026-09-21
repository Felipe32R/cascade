import { useEffect, useRef, useState } from "react";
import { film } from "../../content/site";
import { SectionHead } from "../ui/SectionHead";
import { Reveal } from "../ui/Reveal";
import { useBodyLock } from "../../hooks/useBodyLock";
import "../../styles/film.css";

export function Film() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useBodyLock(open);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (open) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="section film surface-dark" id="film">
      <div className="container">
        <SectionHead index={film.index} label={film.label} />

        <div className="film__head">
          <Reveal>
            <h2 className="display display--xl">
              The Cascade <em>Film</em>
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="body-text film__description">{film.description}</p>
          </Reveal>
        </div>

        <Reveal variant="media" className="film__trigger-wrap">
          <button className="film__trigger" onClick={() => setOpen(true)} aria-label="Play the Cascade film">
            <img src={film.poster} alt="" aria-hidden="true" />
            <span className="film__scrim" />
            <span className="film__play">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <polygon points="7,4 20,12 7,20" fill="currentColor" />
              </svg>
            </span>
            <span className="film__meta caption">
              <span>Watch the film</span>
              <span>{film.duration}</span>
            </span>
          </button>
        </Reveal>
      </div>

      <div className={`film__modal ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <button className="film__modal-backdrop" onClick={() => setOpen(false)} aria-label="Close film" />
        <button className="film__modal-close" onClick={() => setOpen(false)} aria-label="Close">
          ✕
        </button>
        <video ref={videoRef} className="film__video" controls playsInline preload="none" poster={film.poster}>
          <source src={film.src} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
