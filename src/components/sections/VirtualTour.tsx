import { virtualTour } from "../../content/site";
import { SectionHead } from "../ui/SectionHead";
import { Reveal } from "../ui/Reveal";
import "../../styles/virtual-tour.css";

export function VirtualTour() {
  const embedUrl: string = virtualTour.embedUrl;

  return (
    <section className="section tour surface-tint" id="virtual-tour">
      <div className="container">
        <SectionHead index={virtualTour.index} label={virtualTour.label} />

        <div className="tour__head">
          <Reveal>
            <h2 className="display display--xl">
              Step <em>Inside</em>
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="body-text tour__description">{virtualTour.body}</p>
          </Reveal>
        </div>

        <Reveal variant="media" className="tour__frame">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="Cascade Residences virtual tour"
              allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="tour__placeholder">
              <img src={virtualTour.poster} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <span className="tour__scrim" />
              <div className="tour__status">
                <span className="tour__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="9" />
                    <ellipse cx="12" cy="12" rx="4" ry="9" />
                    <path d="M3 12h18" />
                  </svg>
                </span>
                <span className="display display--md tour__status-title">
                  360° tour <em>coming soon</em>
                </span>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
