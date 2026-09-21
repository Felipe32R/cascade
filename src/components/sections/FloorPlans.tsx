import { useState } from "react";
import { floorPlans } from "../../content/site";
import { SectionHead } from "../ui/SectionHead";
import { Reveal } from "../ui/Reveal";
import "../../styles/floor-plans.css";

export function FloorPlans() {
  const [active, setActive] = useState(0);
  const level = floorPlans.levels[active];

  return (
    <section className="section floor-plans" id="floor-plans">
      <div className="container">
        <SectionHead index={floorPlans.index} label={floorPlans.label} />

        <div className="floor-plans__head">
          <Reveal>
            <h2 className="display display--xl">
              Building <em>Levels</em>
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="body-text floor-plans__intro">{floorPlans.intro}</p>
          </Reveal>
        </div>

        <Reveal className="floor-plans__tabs" delay={80}>
          <div className="floor-plans__tablist" role="tablist" aria-label="Building levels">
            {floorPlans.levels.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={i === active}
                className={`floor-plans__tab ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="floor-plans__tab-letter display display--md">{item.id}</span>
                <span className="floor-plans__tab-name caption">{item.floor}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="floor-plans__panel" key={level.id}>
          <a
            className="floor-plans__viewer"
            href={level.image}
            target="_blank"
            rel="noopener"
            aria-label={`${level.name}, ${level.floor}: open full drawing`}
          >
            <img
              src={level.image}
              alt={`${level.name} (${level.floor}) architectural floor plan showing residences ${level.units}`}
              loading="lazy"
              decoding="async"
            />
          </a>

          <div className="floor-plans__details">
            <h3 className="display display--lg">
              {level.name} <em>— {level.floor}</em>
            </h3>
            <dl className="floor-plans__facts">
              <div>
                <dt className="label">{floorPlans.unitsLabel}</dt>
                <dd>{level.units}</dd>
              </div>
            </dl>
            <div className="floor-plans__actions">
              <a href={level.image} target="_blank" rel="noopener" className="link-line">
                {floorPlans.openLabel}
                <span className="link-line__arrow">↗</span>
              </a>
              <a href="#contact" className="link-line">
                {floorPlans.cta}
                <span className="link-line__arrow">→</span>
              </a>
            </div>
            <p className="caption floor-plans__note">{floorPlans.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
