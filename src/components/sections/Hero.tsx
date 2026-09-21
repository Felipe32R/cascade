import { useEffect, useRef, useState } from "react";
import { hero } from "../../content/site";
import "../../styles/hero.css";

export function Hero() {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  // React sets `muted` as a property but never writes the attribute, which iOS Safari
  // checks before allowing autoplay. Force it, then start playback manually; if the
  // browser still refuses (e.g. Low Power Mode), retry on the first user gesture.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");

    const events = ["touchstart", "pointerdown", "scroll", "keydown"] as const;
    const retry = () => {
      video.play().then(removeListeners).catch(() => {});
    };
    const removeListeners = () => events.forEach((e) => window.removeEventListener(e, retry));

    video.play().catch(() => {
      events.forEach((e) => window.addEventListener(e, retry, { passive: true }));
    });
    return removeListeners;
  }, []);

  return (
    <section className={`hero ${ready ? "is-ready" : ""}`} id="top">
      <div className="hero__media">
        <video
          ref={videoRef}
          src={hero.video}
          poster={hero.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="hero__scrim" />
      </div>

      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow label">
            <span className="hero__eyebrow-rule" />
            {hero.eyebrow}
          </p>

          <h1 className="hero__title display display--hero">
            <span className="line-mask">
              <span>{hero.titleTop}</span>
            </span>
            <span className="line-mask">
              <span className="italic">{hero.titleBottom}</span>
            </span>
          </h1>

          <p className="hero__tagline lede">{hero.tagline}</p>

          <div className="hero__actions">
            <a href="#contact" className="btn btn--light">
              {hero.primaryCta}
            </a>
            <a href="#intro" className="link-line hero__link">
              {hero.secondaryCta}
              <span className="link-line__arrow">↓</span>
            </a>
          </div>
        </div>

        <div className="hero__meta">
          <span className="hero__scroll-line" />
        </div>
      </div>
    </section>
  );
}
