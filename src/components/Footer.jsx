// File: src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const SOCIAL_ICONS = {
  instagram: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  facebook: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  ),
  twitter: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  ),
  youtube: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
  ),
};

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/aso-ebi", label: "Aso-Ebi" },
  { to: "/collections", label: "Collections" },
  { to: "/contact", label: "Contact" },
];

const SOCIALS = [
  { icon: "instagram", label: "I", href: "#" },
  { icon: "facebook", label: "FB", href: "#" },
  { icon: "twitter", label: "X", href: "#" },
  { icon: "youtube", label: "YT", href: "#" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand Column */}
        <div className={styles.brand}>
          <div className={styles.logoWrap}>
            <span className={styles.logoMark}>R</span>
            <span className={styles.logoText}>Rehoboth Fabrics</span>
          </div>
          <p className={styles.brandTagline}>
            Premium clothing materials &amp; curated Aso-Ebi for every occasion.
            Rooted in culture, woven with excellence.
          </p>
          <div className={styles.socials}>
            {SOCIALS.map(({ icon, label, href }) => (
              <a
                key={icon}
                href={href}
                aria-label={label}
                className={styles.socialIcon}
              >
                {SOCIAL_ICONS[icon]}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.colLis}>
            {QUICK_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={styles.colLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Categories</h4>
          <ul className={styles.colList}>
            {[
              "Lace",
              "Ankara",
              "Silk",
              "George",
              "Aso-Ebi",
              "Guinea",
              "Kampala",
              "Cashmere",
              "Cotton",
              "Denim",
              "Chiffon",
              "Satin",
              "Organza",
              "Damask",
              "Kente",
            ].map((c) => (
              <li key={c}>
                <Link to="/shop" className={styles.colLink}>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contact Us</h4>
          <ul className={styles.contactList}>
            <li>
              <span className="material-symbols-outlined">location_on</span>
              <span>Shop 2 Boldan Complex, Olonde, Oyo State, Nigeria</span>
            </li>
            <li>
              <span className="material-symbols-outlined">phone</span>
              <a href="tel:+2348012345678" className={styles.colLink}>
                +234 810 266 0622
              </a>
            </li>
            <li>
              <span className="material-symbols-outlined">mail</span>
              <a href="mailto:taivicky68@gmail.com" className={styles.colLink}>
                taivicky68@gmail.com
              </a>
            </li>
            <li>
              <span className="material-symbols-outlined">schedule</span>
              <span>Mon – Sat: 9am – 6pm</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} Rehoboth Fabrics. Your No.1 Fabrics
          Store.
        </p>
        <div className={styles.bottomLinks}>
          <a href="#" className={styles.bottomLink}>
            Privacy Policy
          </a>
          <a href="#" className={styles.bottomLink}>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
