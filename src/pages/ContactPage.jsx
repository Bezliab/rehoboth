// File: src/pages/ContactPage.jsx
import React, { useState } from "react";
import styles from "./ContactPage.module.css";

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerInner}>
          <span className={styles.eyebrow}>We'd Love to Hear from You</span>
          <h1 className={styles.pageTitle}>Contact Us</h1>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Contact Info Column */}
        <div className={styles.infoCol}>
          <div className={styles.infoCard}>
            <span className={`material-symbols-outlined ${styles.infoIcon}`}>
              location_on
            </span>
            <h3 className={styles.infoTitle}>Visit Our Showroom</h3>
            <p className={styles.infoText}>
              Shop 2 Boldan Complex, Olonde, Ologuneru
              <br />
              Oyo, Nigeria
            </p>
            <p className={styles.infoNote}>Open Mon–Sat: 9am – 7pm</p>
          </div>

          <div className={styles.infoCard}>
            <span className={`material-symbols-outlined ${styles.infoIcon}`}>
              phone
            </span>
            <h3 className={styles.infoTitle}>Call Us</h3>
            <a href="tel:+2348102660622" className={styles.infoLink}>
              +234 810 266 0622
            </a>
            <a href="tel:+2348050717574" className={styles.infoLink}>
              +234 805 071 7574
            </a>
            <p className={styles.infoNote}>Mon–Sat: 9am – 6pm</p>
          </div>

          <div className={styles.infoCard}>
            <span className={`material-symbols-outlined ${styles.infoIcon}`}>
              mail
            </span>
            <h3 className={styles.infoTitle}>Email Us</h3>
            <a href="mailto:taivicky68@gmail.com" className={styles.infoLink}>
              taivicky68@gmail.com
            </a>
            <p className={styles.infoNote}>Response within 24 hours</p>
          </div>

          <div className={styles.infoCard}>
            <span className={`material-symbols-outlined ${styles.infoIcon}`}>
              public
            </span>
            <h3 className={styles.infoTitle}>Follow Us</h3>
            <div className={styles.socials}>
              {["instagram", "facebook", "twitter", "youtube"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className={styles.socialBtn}
                  aria-label={icon}
                >
                  {SOCIAL_ICONS[icon]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className={styles.formCol}>
          <div className={styles.formWrap}>
            <h2 className={styles.formTitle}>Send Us a Message</h2>
            <p className={styles.formSub}>
              Whether it's a fabric inquiry, bulk order request, or just a hello
              — we're here.
            </p>

            {submitted ? (
              <div className={styles.successMsg}>
                <span
                  className={`material-symbols-outlined ${styles.successIcon}`}
                >
                  check_circle
                </span>
                <h3>Message Sent!</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. We'll reply to{" "}
                  <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  className={styles.resetBtn}
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
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
                    <label className={styles.label}>Email Address *</label>
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
                <div className={styles.formGroup}>
                  <label className={styles.label}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="What is this regarding?"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Tell us how we can help…"
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  <span className="material-symbols-outlined">send</span>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className={styles.mapSection}>
        <div className={styles.mapPlaceholder}>
          <span className={`material-symbols-outlined ${styles.mapIcon}`}>
            map
          </span>
          <p>14 Fabric Lane, Victoria Island, Lagos</p>
          <span className={styles.mapNote}>Interactive map coming soon</span>
        </div>
      </div>
    </div>
  );
}
