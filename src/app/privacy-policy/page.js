import styles from "./PrivacyPolicy.module.css";

export default function PrivacyPolicy() {
  return (
    <section className={styles.policyWrapper}>
      <h1 className={styles.policyTitle}>Privacy Policy</h1>
      <p className={styles.policyUpdated}>
        Last updated: 26 December 2025
      </p>

      <div className={styles.policySection}>
        <h2 className={styles.sectionTitle}>Introduction</h2>
        <p className={styles.policyText}>
          Happy Greenery respects your privacy and is committed to protecting
          your personal information.
        </p>
      </div>

      <div className={styles.policySection}>
        <h2 className={styles.sectionTitle}>Information We Collect</h2>
        <ul className={styles.policyList}>
          <li>Name, phone number, email</li>
          <li>Shipping & billing address</li>
          <li>Order and transaction details</li>
        </ul>
      </div>

      <div className={styles.policySection}>
        <h2 className={styles.sectionTitle}>Payments</h2>
        <div className={styles.highlight}>
          Payments are securely processed via <strong>Razorpay</strong>.
          We do not store card or UPI details.
        </div>
      </div>

      <div className={styles.contactBox}>
        <p className={styles.policyText}>
          {/* 📧 support@happygreenery.in <br /> */}
          📧 happygreenery.supplier@gmail.com <br />
          📍 Bangalore, Karnataka, India
        </p>
      </div>
    </section>
  );
}
