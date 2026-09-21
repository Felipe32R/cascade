import { useState } from "react";
import { brand, nav } from "../../content/site";
import { useScrolled } from "../../hooks/useScrolled";
import { useBodyLock } from "../../hooks/useBodyLock";
import "../../styles/header.css";

type Props = {
  /** Pages without a dark hero start with the solid header. */
  solid?: boolean;
};

export function Header({ solid = false }: Props) {
  const scrolled = useScrolled() || solid;
  const [menuOpen, setMenuOpen] = useState(false);
  useBodyLock(menuOpen);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`header ${scrolled ? "is-solid" : ""} ${menuOpen ? "is-menu-open" : ""}`}>
        <div className="header__inner">
          <a href="/#top" className="header__brand" aria-label={`${brand.name} — home`} onClick={close}>
            <img src={brand.logo} alt={brand.name} className="header__logo" />
          </a>

          <nav className="header__nav" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="header__link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <a href="/#contact" className="btn btn--light header__cta">
              Request Brochure
            </a>
            <button
              className="header__toggle"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav className="menu__nav" aria-label="Mobile">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="menu__link display display--md"
              onClick={close}
              style={{ transitionDelay: `${120 + i * 60}ms` }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="menu__footer">
          <a href={`mailto:${brand.email}`} className="menu__email caption">
            {brand.email}
          </a>
          <a href="/#contact" className="btn btn--light" onClick={close}>
            Request Brochure
          </a>
        </div>
      </div>
    </>
  );
}
