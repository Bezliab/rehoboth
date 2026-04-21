// File: src/pages/HomePage.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { products, categories, asoEbiCollections } from "../data/products";
import ProductCard from "../components/ProductCard";
import styles from "./HomePage.module.css";

/* Intersection Observer hook for reveal animations */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add(styles.revealed);
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`${styles.revealSection} ${className}`}>
      {children}
    </div>
  );
}

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.inStock).slice(0, 4);

  return (
    <div className={styles.page}>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img
            src="https://a.storyblok.com/f/165154/1456x816/e762fa38aa/01_hero_fabric-types-guide.png"
            alt="Premium luxury fabric"
            className={styles.heroBgImg}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>
            Welcome to Rehoboth Fabrics{" "}
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "1.2em",
                verticalAlign: "text-bottom",
                marginLeft: "4px",
              }}
            >
              handshake
            </span>
          </span>
          <h1 className={styles.heroHeadline}>
            Luxury Fabrics
            <br />
            <em>for Every Occasion</em>
          </h1>
          <p className={styles.heroSub}>
            Exquisite Aso-Ebi, hand-selected lace, vibrant Ankara, and the
            finest silks; crafted for those who celebrate in style.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/shop" className={styles.ctaPrimary}>
              Shop Now
              <span className="material-symbols-outlined">east</span>
            </Link>
            <Link to="/aso-ebi" className={styles.ctaSecondary}>
              Order Aso-Ebi
            </Link>
          </div>
        </div>
      </section>

      {/* ── Marquee Strip ─────────────────────────────── */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marquee}>
          {[
            "Lace",
            "Ankara",
            "Silk",
            "George",
            "Aso-Ebi",
            "Guinea Brocade",
            "Kampala",
            "Cashmere",
            "Cotton",
            "Denim",
            "Chiffon",
            "Satin",
            "Organza",
            "Damask",
            "Velvet",
            "Adire",
            "Kente",
          ]
            .concat([
              "Lace",
              "Ankara",
              "Silk",
              "George",
              "Aso-Ebi",
              "Guinea Brocade",
              "Kampala",
              "Cashmere",
              "Cotton",
              "Denim",
              "Chiffon",
              "Satin",
              "Organza",
              "Damask",
              "Velvet",
              "Adire",
              "Kente",
            ])
            .map((t, i) => (
              <span key={i} className={styles.marqueeItem}>
                <span className={styles.marqueeGold}>✦</span> {t}
              </span>
            ))}
        </div>
      </div>

      {/* ── Collections Grid ──────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <RevealSection>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>Curated for You</span>
              <h2 className={styles.sectionTitle}>Our Collections</h2>
            </div>
            <Link to="/collections" className={styles.seeAll}>
              View All Collections
              <span className="material-symbols-outlined">east</span>
            </Link>
          </div>
        </RevealSection>

        <RevealSection>
          <div className={styles.collectionsGrid}>
            {/* Large card */}
            <Link
              to="/shop"
              className={`${styles.collectionCard} ${styles.collectionCardLarge} fabric-shimmer`}
            >
              <img
                src={categories[0].image}
                alt={categories[0].name}
                className={styles.collectionImg}
              />
              <div className={styles.collectionOverlay} />
              <div className={styles.collectionInfo}>
                <span className={styles.collectionTag}>
                  {categories[0].count} styles
                </span>
                <h3 className={styles.collectionName}>{categories[0].name}</h3>
                <p className={styles.collectionTagline}>
                  {categories[0].tagline}
                </p>
              </div>
            </Link>
            {/* Right stacked cards */}
            <div className={styles.collectionStack}>
              {categories.slice(1, 4).map((cat) => (
                <Link
                  key={cat.id}
                  to="/shop"
                  className={`${styles.collectionCard} ${styles.collectionCardSmall} fabric-shimmer`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className={styles.collectionImg}
                  />
                  <div className={styles.collectionOverlay} />
                  <div className={styles.collectionInfo}>
                    <span className={styles.collectionTag}>
                      {cat.count} styles
                    </span>
                    <h3 className={styles.collectionName}>{cat.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── Featured Products ─────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionMuted}`}>
        <RevealSection>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>Handpicked for Excellence</span>
              <h2 className={styles.sectionTitle}>Featured Fabrics</h2>
            </div>
            <Link to="/shop" className={styles.seeAll}>
              Browse All Fabrics
              <span className="material-symbols-outlined">east</span>
            </Link>
          </div>
        </RevealSection>

        <RevealSection>
          <div className={styles.productsGrid}>
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ── Aso-Ebi Spotlight ─────────────────────────── */}
      <section className={`${styles.section} ${styles.asoSection}`}>
        <div className={styles.asoBg}>
          <img
            src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1400&q=80"
            alt="Aso-Ebi fabric display"
            className={styles.asoBgImg}
          />
          <div className={styles.asoOverlay} />
        </div>
        <RevealSection className={styles.asoContent}>
          <span className={styles.eyebrowLight}>Group Orders Welcome</span>
          <h2 className={styles.asoTitle}>
            Celebrate Together with
            <br />
            <em>Aso-Ebi Fabrics</em>
          </h2>
          <p className={styles.asoSub}>
            Unify your wedding party, naming ceremony, or birthday celebration
            with our curated Aso-Ebi selections. Minimum 5 yards. Bulk discounts
            available.
          </p>
          <div className={styles.asoFeatures}>
            {["Weddings", "Naming Ceremonies", "Birthdays", "Funerals"].map(
              (f) => (
                <span key={f} className={styles.asoFeature}>
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
                  {f}
                </span>
              ),
            )}
          </div>
          <Link to="/aso-ebi" className={styles.asoBtn}>
            Order Aso-Ebi for Your Event
            <span className="material-symbols-outlined">east</span>
          </Link>
        </RevealSection>
      </section>

      {/* ── Trust Signals ─────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <RevealSection>
          <div className={styles.trustGrid}>
            {[
              {
                icon: "verified",
                title: "Authentic Fabrics",
                sub: "Every fabric verified for quality and origin",
              },
              {
                icon: "local_shipping",
                title: "Nationwide Delivery",
                sub: "Same-day dispatch in Lagos, 2-3 days nationwide",
              },
              {
                icon: "groups",
                title: "Aso-Ebi Specialists",
                sub: "Trusted by 1,000+ events across Nigeria",
              },
              {
                icon: "workspace_premium",
                title: "Premium Quality",
                sub: "Only the finest materials make our collection",
              },
            ].map(({ icon, title, sub }) => (
              <div key={title} className={styles.trustCard}>
                <span
                  className={`material-symbols-outlined ${styles.trustIcon}`}
                >
                  {icon}
                </span>
                <h4 className={styles.trustTitle}>{title}</h4>
                <p className={styles.trustSub}>{sub}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ── Aso-Ebi Collections Preview ───────────────── */}
      <section className={`${styles.section} ${styles.sectionMuted}`}>
        <RevealSection>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>Curated Event Packages</span>
              <h2 className={styles.sectionTitle}>Aso-Ebi Collections</h2>
            </div>
            <Link to="/aso-ebi" className={styles.seeAll}>
              See All Packages
              <span className="material-symbols-outlined">east</span>
            </Link>
          </div>
        </RevealSection>
        <RevealSection>
          <div className={styles.asoCardsGrid}>
            {asoEbiCollections.map((col) => (
              <div key={col.id} className={`${styles.asoCard} fabric-shimmer`}>
                <div className={styles.asoCardImg}>
                  <img src={col.image} alt={col.name} />
                  <span className={styles.asoCardOccasion}>{col.occasion}</span>
                </div>
                <div className={styles.asoCardBody}>
                  <h3 className={styles.asoCardName}>{col.name}</h3>
                  <p className={styles.asoCardDesc}>{col.description}</p>
                  <div className={styles.asoCardMeta}>
                    <span>Min. {col.minOrder} yards</span>
                    <span className={styles.asoCardPrice}>
                      ₦{col.pricePerYard.toLocaleString()}/yd
                    </span>
                  </div>
                  <Link to="/aso-ebi" className={styles.asoCardBtn}>
                    Select This Collection
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ── Newsletter ────────────────────────────────── */}
      <section className={styles.newsletter}>
        <RevealSection>
          <span className={styles.eyebrow}>Stay Connected</span>
          <h2 className={styles.newsletterTitle}>
            Be the First to Access Our New Collections
          </h2>
          <p className={styles.newsletterSub}>
            Subscribe to our announcements, and members-only discounts.
          </p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Your email address"
              className={styles.newsletterInput}
            />
            <button className={styles.newsletterBtn}>
              Subscribe
              <span className="material-symbols-outlined">east</span>
            </button>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
