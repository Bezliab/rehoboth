// File: src/pages/CollectionsPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { dynamicCategories } from "../data/fabricUtils";
import styles from "./CollectionsPage.module.css";

export default function CollectionsPage() {
  // Hero: first category (Lace)
  const hero = dynamicCategories[0];

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerInner}>
          <span className={styles.eyebrow}>Browse by Fabric Type</span>
          <h1 className={styles.pageTitle}>Our Collections</h1>
          <p className={styles.pageSub}>
            Discover the full breadth of Rehoboth Fabrics — from hand-dyed Adire
            to French-inspired lace, each collection tells a story of
            craftsmanship and culture.
          </p>
        </div>
      </div>

      {/* Hero Collection — Lace (full-width feature) */}
      <section className={styles.heroColl}>
        <div className={styles.heroCollInner}>
          <div className={`${styles.heroCollImg} fabric-shimmer`}>
            <img src={hero.image} alt={hero.name} />
          </div>
          <div className={styles.heroCollContent}>
            <span className={styles.eyebrowDark}>Feature Collection</span>
            <h2 className={styles.heroCollTitle}>{hero.name}</h2>
            <p className={styles.heroCollTagline}>{hero.description}</p>
            <p className={styles.heroCollDesc}>
              Our {hero.name} collection represents the pinnacle of fabric artistry.
              Each piece is sourced from master weavers who have spent generations
              perfecting the intricate art of creation. Perfect for weddings,
              galas, and high-society celebrations.
            </p>
            <div className={styles.heroCollMeta}>
              <span className={styles.collCount}>
                {hero.count} Styles Available
              </span>
            </div>
            <Link to="/shop" className={styles.heroCollBtn}>
              Shop {hero.name} Collection
              <span className="material-symbols-outlined">east</span>
            </Link>
          </div>
        </div>
      </section>

      {/* All Collections Grid */}
      <section className={styles.gridSection}>
        <div className={styles.gridInner}>
          <div className={styles.gridHeader}>
            <span className={styles.eyebrowDark}>All Fabric Types</span>
            <h2 className={styles.gridTitle}>Browse Every Collection</h2>
          </div>
          <div className={styles.collectionsGrid}>
            {dynamicCategories.map((col) => (
              <Link
                key={col.id}
                to="/shop"
                className={`${styles.collectionCard} fabric-shimmer`}
              >
                <div className={styles.cardImg}>
                  <img src={col.image} alt={col.name} loading="lazy" />
                  <div className={styles.cardOverlay} />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <span className={styles.cardCount}>{col.count} styles</span>
                  </div>
                  <div className={styles.cardBottom}>
                    <h3 className={styles.cardName}>{col.name}</h3>
                    <p className={styles.cardTagline}>{col.description}</p>
                    <span className={styles.cardCta}>
                      Explore
                      <span className="material-symbols-outlined">east</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rehoboth */}
      <section className={styles.whySection}>
        <div className={styles.whyInner}>
          <div className={styles.whyText}>
            <span className={styles.eyebrowDark}>Our Promise</span>
            <h2 className={styles.whyTitle}>
              Why Every Fabric in Our Collection is Worth Your Trust
            </h2>
            <p className={styles.whySub}>
              At Rehoboth Fabrics, we curate with intention. Every yard in our
              collection has passed through a rigorous quality process — from
              ethical sourcing to expert inspection — before it reaches your hands.
            </p>
            <Link to="/shop" className={styles.whyBtn}>
              Browse All Fabrics
              <span className="material-symbols-outlined">east</span>
            </Link>
          </div>
          <div className={styles.whyStats}>
            {[
              { num: `${dynamicCategories.length}`, label: "Fabric categories" },
              { num: "680+",  label: "Fabric styles in stock" },
              { num: "100%",  label: "Quality guaranteed on all pieces" },
              { num: "5 yrs", label: "Trusted fabric expertise" },
            ].map(({ num, label }) => (
              <div key={num} className={styles.statCard}>
                <span className={styles.statNum}>{num}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <h2 className={styles.ctaBannerTitle}>
            Can't Find What You're Looking For?
          </h2>
          <p className={styles.ctaBannerSub}>
            We source custom fabric requests. Tell us what you need.
          </p>
          <Link to="/contact" className={styles.ctaBannerBtn}>
            Contact Our Fabric Specialists
          </Link>
        </div>
      </div>
    </div>
  );
}
