import { useState } from "react";
import { amenities } from "../../content/site";
import { SectionHead } from "../ui/SectionHead";
import { Reveal } from "../ui/Reveal";
import "../../styles/amenities.css";

export function Amenities() {
  const [active, setActive] = useState(0);

  return (
    <section className="section amenities" id="amenities">
      <div className="container">
        <SectionHead index={amenities.index} label={amenities.label} />
        <Reveal>
          <h2 className="display display--xl amenities__heading">
            <em>Amenities</em>
          </h2>
        </Reveal>

        {/* Horizontal amenity index: each item swaps the large image below it */}
        <Reveal className="amenities__showcase" delay={80}>
          <ul className="amenities__list" role="list">
            {amenities.items.map((item, i) => (
              <li key={item.name}>
                <button
                  className={`amenity ${i === active ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                >
                  <span className="amenity__index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="amenity__name display">{item.name}</span>
                  <span className="amenity__text body-text">{item.description}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="amenities__viewer">
            {amenities.items.map((item, i) => (
              <img
                key={item.name}
                src={item.image}
                alt={item.alt}
                className={`amenities__image ${i === active ? "is-active" : ""}`}
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
