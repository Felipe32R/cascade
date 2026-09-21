import { intro } from "../../content/site";
import { SectionHead } from "../ui/SectionHead";
import { Reveal } from "../ui/Reveal";
import { Figure } from "../ui/Figure";
import "../../styles/intro.css";

export function Intro() {
  return (
    <section className="section intro" id="intro">
      <div className="container">
        <SectionHead index={intro.index} label={intro.label} />

        <div className="intro__grid">
          <Reveal className="intro__heading-wrap">
            <h2 className="display display--xl intro__heading">
              Where sophistication meets the beauty of the <em>Caribbean Sea</em>
            </h2>
          </Reveal>

          <Reveal className="intro__body" delay={120}>
            {intro.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="body-text">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="intro__media container">
        <Figure
          src={intro.image}
          alt="Aerial view of the Negril coastline at sunset, with a map outline marking Negril, Jamaica"
          caption={intro.imageCaption}
          ratio="1480 / 825"
          className="figure--full"
        />
      </div>
    </section>
  );
}
