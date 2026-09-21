import { useState, type FormEvent } from "react";
import { brand, contact } from "../../content/site";
import { SectionHead } from "../ui/SectionHead";
import { Reveal } from "../ui/Reveal";
import "../../styles/contact.css";

// Posts to the /api/leads Pages Function, which stores the lead in D1.
export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, source: window.location.href }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? contact.errorMessage);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error && err.message !== "Failed to fetch" ? err.message : contact.errorMessage);
    } finally {
      setSubmitting(false);
    }
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

                <div className="contact__trap" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <button type="submit" className="btn btn--solid btn--block contact__submit" disabled={submitting}>
                  {submitting ? "Sending…" : contact.submitLabel}
                </button>
                {error ? (
                  <p className="contact__error" role="alert">
                    {error}
                  </p>
                ) : null}
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
