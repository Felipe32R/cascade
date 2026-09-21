import { location } from "../../content/site";
import { SectionHead } from "../ui/SectionHead";
import { Reveal } from "../ui/Reveal";
import { Figure } from "../ui/Figure";
import "../../styles/location.css";

export function Location() {
  return (
    <section className="section location surface-tint" id="location">
      <div className="container">
        <SectionHead index={location.index} label={location.label} />

        <div className="location__grid">
          <Reveal>
            <h2 className="display display--xl location__heading">
              A serene <em>coastal</em> lifestyle
            </h2>
          </Reveal>

          <div className="location__text">
            <Reveal delay={110} className="location__copy">
              {location.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="body-text">
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <Reveal delay={200} className="location__place">
              <span className="label">Negril</span>
              <span className="location__place-rule" />
              <span className="label">Jamaica</span>
            </Reveal>
          </div>
        </div>

        <div className="location__media">
          <Figure
            src={location.image}
            alt="Entrance canopy and landscaped approach at Cascade Residences"
            caption={location.imageCaption}
            ratio="2400 / 1339"
          />
        </div>
      </div>
    </section>
  );
}
