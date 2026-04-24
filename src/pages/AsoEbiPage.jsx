// File: src/pages/AsoEbiPage.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { asoEbiCollections } from "../data/products";
import {
  dynamicCategories,
  getCategoryProducts,
  getMaterialByKey,
} from "../data/fabricUtils";
import styles from "./AsoEbiPage.module.css";

const OCCASIONS = [
  "All",
  "Wedding",
  "Naming Ceremony",
  "Birthday",
  "Funeral",
  "Other",
];

export default function AsoEbiPage() {
  const [occasion, setOccasion] = useState("All");

  // Pull Aso-Ebi images from JSON inside component
  const { asoHeroBg, asoMaterials, asoFabricImages } = useMemo(() => {
    const asoEbiCat = dynamicCategories.find((c) => c.key === "Aso-Ebi");
    const heroBg =
      asoEbiCat?.image ||
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1600&q=85";
    const materials = asoEbiCat ? getMaterialByKey("Aso-Ebi") : null;
    const fabricImages = materials?.images?.slice(0, 12) ?? [];

    return {
      asoHeroBg: heroBg,
      asoMaterials: materials,
      asoFabricImages: fabricImages,
    };
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    date: "",
    yards: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img
            src={asoHeroBg}
            alt="Aso-Ebi fabrics"
            className={styles.heroBgImg}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Group Fabric Orders</span>
          <h1 className={styles.heroTitle}>
            Unify Your
            <br />
            <em>Celebration</em> with Aso-Ebi
          </h1>
          <p className={styles.heroSub}>
            From intimate naming ceremonies to grand weddings — we supply
            premium Aso-Ebi fabrics with bulk discounts and dedicated event
            support.
          </p>
          <a href="#order" className={styles.heroBtn}>
            Order for Your Event
            <span className="material-symbols-outlined">south</span>
          </a>
        </div>
      </section>

      {/* How it Works */}
      <section className={styles.howSection}>
        <div className={styles.howInner}>
          <span className={styles.eyebrowDark}>Simple & Seamless</span>
          <h2 className={styles.howTitle}>How Aso-Ebi Ordering Works</h2>
          <div className={styles.stepsGrid}>
            {[
              {
                step: "01",
                icon: "palette",
                title: "Choose Your Collection",
                desc: "Browse our curated Aso-Ebi collections or request a custom fabric consultation.",
              },
              {
                step: "02",
                icon: "group",
                title: "Confirm Your Group Size",
                desc: "Tell us how many yards you need. We offer tiered bulk discounts from 5 yards.",
              },
              {
                step: "03",
                icon: "local_shipping",
                title: "We Deliver to You",
                desc: "Same-day Lagos delivery or nationwide within 48 hours — in time for your event.",
              },
              {
                step: "04",
                icon: "celebration",
                title: "Celebrate in Style",
                desc: "Your guests arrive coordinated, elegant, and unforgettable.",
              },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step}</div>
                <span
                  className={`material-symbols-outlined ${styles.stepIcon}`}
                >
                  {icon}
                </span>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aso-Ebi Fabrics Gallery from JSON */}
      {ASO_FABRIC_IMAGES.length > 0 && (
        <section className={styles.fabricGallerySection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.eyebrowDark}>
                  Aso-Ebi Fabric Selection
                </span>
                <h2 className={styles.sectionTitle}>Our Aso-Ebi Collection</h2>
                <p className={styles.sectionSubtitle}>
                  {ASO_MATERIALS?.description ||
                    "Handpicked premium Aso-Ebi fabrics for your celebration."}
                </p>
              </div>
            </div>
            <div className={styles.fabricGalleryGrid}>
              {ASO_FABRIC_IMAGES.map((img) => (
                <div
                  key={img.id}
                  className={`${styles.fabricCard} fabric-shimmer`}
                >
                  <img src={img.url} alt={img.alt} loading="lazy" />
                  <p className={styles.fabricAlt}>{img.alt}</p>
                </div>
              ))}
            </div>
            <div className={styles.galleryFooter}>
              <p>
                Colours available:{" "}
                {ASO_MATERIALS?.colors?.join(", ") || "Multiple"}
              </p>
              <Link to="/shop" className={styles.viewAllBtn}>
                View All Fabrics in Shop
                <span className="material-symbols-outlined">east</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Collections */}
      <section className={styles.collectionsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrowDark}>Curated Event Packages</span>
              <h2 className={styles.sectionTitle}>Aso-Ebi Collections</h2>
            </div>
          </div>

          {/* Occasion filter */}
          <div className={styles.pills}>
            {OCCASIONS.map((o) => (
              <button
                key={o}
                className={`${styles.pill} ${occasion === o ? styles.pillActive : ""}`}
                onClick={() => setOccasion(o)}
              >
                {o}
              </button>
            ))}
          </div>

          <div className={styles.collectionsGrid}>
            {asoEbiCollections.map((col, idx) => (
              <div key={col.id} className={styles.collectionCard}>
                <div className={`${styles.collectionImg} fabric-shimmer`}>
                  <img
                    src={ASO_CARD_IMAGES[idx + 1] || col.image}
                    alt={col.name}
                    loading="lazy"
                  />
                  <span className={styles.occBadge}>{col.occasion}</span>
                </div>
                <div className={styles.collectionBody}>
                  <h3 className={styles.collectionName}>{col.name}</h3>
                  <p className={styles.collectionDesc}>{col.description}</p>
                  <div className={styles.collectionMeta}>
                    <div className={styles.metaItem}>
                      <span className="material-symbols-outlined">group</span>
                      Min. {col.minOrder} yards
                    </div>
                    <div className={styles.metaItem}>
                      <span className="material-symbols-outlined">sell</span>₦
                      {col.pricePerYard.toLocaleString()}/yd
                    </div>
                  </div>
                  <a href="#order" className={styles.selectBtn}>
                    Select This Collection
                    <span className="material-symbols-outlined">south</span>
                  </a>
                </div>
              </div>
            ))}

            {/* Custom Card */}
            <div className={`${styles.collectionCard} ${styles.customCard}`}>
              <div className={styles.customCardInner}>
                <span
                  className={`material-symbols-outlined ${styles.customIcon}`}
                >
                  design_services
                </span>
                <h3 className={styles.customTitle}>Custom Aso-Ebi</h3>
                <p className={styles.customDesc}>
                  Don't see what you need? Tell us your vision — we'll source or
                  weave it for you.
                </p>
                <a href="#order" className={styles.customBtn}>
                  Request Custom Fabric
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className={styles.pricingSection}>
        <div className={styles.pricingInner}>
          <span className={styles.eyebrowLight}>Transparent Pricing</span>
          <h2 className={styles.pricingTitle}>Bulk Order Discounts</h2>
          <div className={styles.pricingGrid}>
            {[
              { range: "5–19 yards", disc: "5% off", tag: "" },
              { range: "20–49 yards", disc: "10% off", tag: "Popular" },
              { range: "50–99 yards", disc: "15% off", tag: "" },
              { range: "100+ yards", disc: "20% off", tag: "Best Value" },
            ].map(({ range, disc, tag }) => (
              <div
                key={range}
                className={`${styles.pricingCard} ${tag ? styles.pricingCardFeatured : ""}`}
              >
                {tag && <span className={styles.pricingTag}>{tag}</span>}
                <div className={styles.pricingRange}>{range}</div>
                <div className={styles.pricingDisc}>{disc}</div>
                <p className={styles.pricingNote}>applied at checkout</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className={styles.orderSection} id="order">
        <div className={styles.orderInner}>
          <div className={styles.orderInfo}>
            <span className={styles.eyebrowDark}>Get Started</span>
            <h2 className={styles.orderTitle}>Order Aso-Ebi for Your Event</h2>
            <p className={styles.orderSub}>
              Fill in your event details below and our Aso-Ebi specialist will
              contact you within 24 hours to confirm your order and discuss
              customisation options.
            </p>
            <div className={styles.contactHighlights}>
              {[
                { icon: "phone", text: "+234 801 234 5678" },
                { icon: "mail", text: "asoEbi@rehobothfabrics.ng" },
                { icon: "schedule", text: "Response within 24 hours" },
              ].map(({ icon, text }) => (
                <div key={icon} className={styles.contactItem}>
                  <span className="material-symbols-outlined">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.orderFormWrap}>
            {submitted ? (
              <div className={styles.successMsg}>
                <span
                  className={`material-symbols-outlined ${styles.successIcon}`}
                >
                  check_circle
                </span>
                <h3>Order Request Received!</h3>
                <p>
                  We'll reach out to <strong>{formData.email}</strong> within 24
                  hours to confirm your Aso-Ebi order.
                </p>
                <button
                  className={styles.resetFormBtn}
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form className={styles.orderForm} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Your name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Event Type *</label>
                    <select
                      name="event"
                      required
                      value={formData.event}
                      onChange={handleChange}
                      className={styles.input}
                    >
                      <option value="">Select occasion</option>
                      {OCCASIONS.filter((o) => o !== "All").map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Event Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Estimated Yards Needed
                    </label>
                    <input
                      type="number"
                      name="yards"
                      min="5"
                      value={formData.yards}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="e.g. 30"
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Additional Notes</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Tell us about your preferred colours, fabric type, or any other details…"
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  <span className="material-symbols-outlined">send</span>
                  Submit Order Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
