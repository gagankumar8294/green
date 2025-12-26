import styles from "./Terms.module.css";

export default function TermsOfService() {
  return (
    <section className={styles.termsWrapper}>
      <h1 className={styles.termsTitle}>Terms of Service</h1>

      <p className={styles.termsUpdated}>
        Last updated: 26 December 2025
      </p>

      {/* Acceptance */}
      <div className={styles.termsSection}>
        <h2 className={styles.sectionHeading}>Acceptance of Terms</h2>
        <p className={styles.termsText}>
          By accessing or using Happy Greenery, you agree to be bound by
          these Terms of Service.
        </p>
      </div>

      {/* Products */}
      <div className={styles.termsSection}>
        <h2 className={styles.sectionHeading}>Products & Services</h2>
        <p className={styles.termsText}>
          Plants are living products. Variations in size, shape, and color
          may occur and do not constitute defects.
        </p>
      </div>

      {/* Orders */}
      <div className={styles.termsSection}>
        <h2 className={styles.sectionHeading}>Orders & Payments</h2>
        <p className={styles.termsText}>
          All prices are in INR. Payments are securely processed via
          <strong> Razorpay</strong>.
        </p>

        <div className={styles.termsHighlight}>
          We do not store card, UPI, or banking details.
        </div>
      </div>

      {/* User Responsibility */}
      <div className={styles.termsSection}>
        <h2 className={styles.sectionHeading}>User Responsibilities</h2>
        <ul className={styles.termsList}>
          <li>Provide accurate information</li>
          <li>Use the website lawfully</li>
          <li>Avoid fraudulent activities</li>
        </ul>
      </div>

      {/* Liability */}
      <div className={styles.termsSection}>
        <h2 className={styles.sectionHeading}>Limitation of Liability</h2>
        <p className={styles.termsText}>
          Happy Greenery is not responsible for damage caused by improper
          plant care after delivery.
        </p>
      </div>

      {/* Termination */}
      <div className={styles.termsSection}>
        <h2 className={styles.sectionHeading}>Termination</h2>
        <p className={styles.termsText}>
          We reserve the right to suspend or terminate access for violations
          of these terms.
        </p>
      </div>

      {/* Contact */}
      <div className={styles.termsContact}>
        <p className={styles.termsText}>
          {/* 📧 support@happygreenery.in <br /> */}
          📧 happygreenery.supplier@gmail.com <br />
          📍 Bangalore, Karnataka, India
        </p>
      </div>
    </section>
  );
}
