import { apartmentPlan } from "../../content/site";
import { SectionHead } from "../ui/SectionHead";
import { Reveal } from "../ui/Reveal";
import "../../styles/apartment-plan.css";

export function ApartmentPlan() {
  return (
    <section className="section apartment-plan surface-tint" id="apartment-plan">
      <div className="container">
        <SectionHead index={apartmentPlan.index} label={apartmentPlan.label} />

        <div className="apartment-plan__head">
          <Reveal>
            <h2 className="display display--xl">
              Apartment <em>Floor Plan</em>
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="body-text apartment-plan__intro">{apartmentPlan.intro}</p>
          </Reveal>
        </div>

        <div className="apartment-plan__panel">
          <Reveal className="apartment-plan__viewer" delay={80}>
            <img
              src={apartmentPlan.image}
              alt="Furnished floor plan of the Cascade apartment: two suites, open living and dining, kitchen, office and three balconies"
              loading="lazy"
              decoding="async"
            />
          </Reveal>

          <Reveal className="apartment-plan__details" delay={160}>
            <ul className="apartment-plan__features" role="list">
              {apartmentPlan.features.map((feature) => (
                <li key={feature} className="apartment-plan__feature">
                  <span className="apartment-plan__feature-mark" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="caption apartment-plan__note">{apartmentPlan.note}</p>
            <a href="#contact" className="link-line">
              {apartmentPlan.cta}
              <span className="link-line__arrow">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
