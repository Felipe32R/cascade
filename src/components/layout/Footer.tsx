import { brand, footer, nav } from "../../content/site";
import "../../styles/footer.css";

export function Footer() {
  return (
    <footer className="footer surface-dark">
      <div className="container footer__inner">
        <div className="footer__top">
          <a href="/#top" className="footer__brand">
            <img src={brand.logo} alt={brand.name} className="footer__logo" />
          </a>

          <nav className="footer__nav" aria-label="Footer">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="footer__link caption">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer__contact">
            <span className="label">Enquiries</span>
            <a href={`mailto:${brand.email}`} className="footer__email">
              {brand.email}
            </a>
            <span className="caption footer__place">{brand.location}</span>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__disclaimer">{footer.disclaimer}</p>
          <p className="footer__copy caption">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
