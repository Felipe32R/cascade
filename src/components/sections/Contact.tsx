import { useState, type FormEvent } from "react";
import { brand, contact } from "../../content/site";
import { SectionHead } from "../ui/SectionHead";
import { Reveal } from "../ui/Reveal";
import "../../styles/contact.css";

// Visual only: submitting shows the confirmation state. No handler, storage or email is wired up yet.
export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section contact" id="contact">
      <div className="contact__grid">
        <div className="contact__media">
          <img src={contact.image} alt="Living and dining space with ocean views" loading="lazy" />
        </div>

        <div className="contact__panel">
          <SectionHead index={contact.index} label={contact.label} />

          <Reveal>
            <h2 className="display display--xl">
              Connect <em>with us</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="body-text contact__description">{contact.description}</p>
          </Reveal>

          <Reveal delay={160} className="contact__form-wrap">
            {submitted ? (
              <div className="contact__success">
                <p className="lede">{contact.successMessage}</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="name" className="field__label">
                    Full name
                  </label>
                  <input id="name" name="name" type="text" required className="field__input" autoComplete="name" />
                </div>

                <div className="field">
                  <label htmlFor="email" className="field__label">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className="field__input" autoComplete="email" />
                </div>

                <div className="field">
                  <label htmlFor="phone" className="field__label">
                    Phone
                  </label>
                  <input id="phone" name="phone" type="tel" className="field__input" autoComplete="tel" />
                </div>

                <div className="field">
                  <label htmlFor="interest" className="field__label">
                    I am interested in
                  </label>
                  <select id="interest" name="interest" className="field__input field__input--select">
                    {contact.interests.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn--solid btn--block contact__submit">
                  {contact.submitLabel}
                </button>
                <p className="caption contact__note">{contact.formNote}</p>
              </form>
            )}
          </Reveal>

          <Reveal delay={220} className="contact__footer">
            <a href={`mailto:${brand.email}`} className="contact__email">
              {brand.email}
            </a>
            <span className="contact__tour caption">{contact.virtualTour}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
