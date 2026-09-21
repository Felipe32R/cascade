import { useState } from "react";
import { residences } from "../../content/site";
import { SectionHead } from "../ui/SectionHead";
import { Reveal } from "../ui/Reveal";
import "../../styles/residences.css";

export function Residences() {
  const [active, setActive] = useState(0);
  const { furniture } = residences;

  return (
    <section className="section residences" id="residences">
      <div className="container">
        <SectionHead index={residences.index} label={residences.label} />

        <Reveal>
          <h2 className="display display--xl residences__heading">
            The Art of <em>Space</em>
          </h2>
        </Reveal>

        <div className="residences__intro">
          <Reveal className="residences__copy" delay={120}>
            {residences.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="body-text">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className="furniture" delay={200}>
            <p className="label furniture__eyebrow">Optional</p>
            <h3 className="display display--md furniture__heading">
              Curated <em>Furniture</em> Package
            </h3>
            <p className="furniture__tagline">{furniture.tagline}</p>
            <p className="body-text">{furniture.body}</p>
          </Reveal>
        </div>

        {/* Interactive room index: hovering a room swaps the large image */}
        <Reveal className="rooms" delay={80}>
          <div className="rooms__index">
            <p className="caption rooms__hint">Select a room</p>
            <ul className="rooms__list" role="list">
              {residences.rooms.map((room, i) => (
                <li key={room.label}>
                  <button
                    className={`rooms__item ${i === active ? "is-active" : ""}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-label={`View ${room.label}`}
                    aria-pressed={i === active}
                  >
                    <span className="rooms__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="rooms__label display">{room.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rooms__viewer">
            {residences.rooms.map((room, i) => (
              <img
                key={room.label}
                src={room.image}
                alt={room.label}
                className={`rooms__image ${i === active ? "is-active" : ""}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
