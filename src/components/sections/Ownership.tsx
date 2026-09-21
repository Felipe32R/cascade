import { ownership } from "../../content/site";
import { SectionHead } from "../ui/SectionHead";
import { Reveal } from "../ui/Reveal";
import { Figure } from "../ui/Figure";
import "../../styles/ownership.css";

export function Ownership() {
  return (
    <section className="section ownership" id="ownership">
      <div className="container">
        <SectionHead index={ownership.index} label={ownership.label} />

        <div className="ownership__grid">
          <Figure
            src={ownership.image}
            alt="Balcony lounge overlooking the Caribbean Sea"
            ratio="4 / 5"
            className="ownership__figure"
          />

          <div className="ownership__text">
            <Reveal>
              <h2 className="display display--xl">
                A residence ready to be <em>lived in</em>
              </h2>
            </Reveal>
            <Reveal delay={110} className="ownership__copy">
              <p className="body-text">{ownership.body}</p>
            </Reveal>
            <Reveal delay={180}>
              <ul className="ownership__points" role="list">
                {ownership.points.map((point) => (
                  <li key={point} className="ownership__point">
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={240}>
              <a href="#contact" className="btn ownership__cta">
                {ownership.cta}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
