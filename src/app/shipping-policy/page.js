import styles from "./shipping.module.css";

export default function ShippingPolicy() {
  return (
    <section className={styles.shippingWrapper}>
      <h1 className={styles.shippingTitle}>Shipping Policy</h1>

      <p className={styles.shippingUpdated}>
        Last updated: 26 December 2025
      </p>

      <div className={styles.shippingSection}>
        <h2 className={styles.sectionHeading}>Shipping Locations</h2>
        <p className={styles.shippingText}>
          We ship plants across India from Bangalore.
        </p>
      </div>

      <div className={styles.shippingSection}>
        <h2 className={styles.sectionHeading}>Delivery Timeline</h2>
        <ul className={styles.shippingList}>
          <li>Bangalore: 2–4 business days</li>
          <li>Other cities: 4–7 business days</li>
        </ul>

        <div className={styles.shippingHighlight}>
          Delivery timelines may vary due to weather or courier delays.
        </div>
      </div>

      <div className={styles.shippingContact}>
        <p className={styles.shippingText}>
          {/* 📧 support@happygreenery.in <br /> */}
          📧 happygreenery.supplier@gmail.com <br />
          📍 Bangalore, Karnataka, India
        </p>
      </div>
    </section>
  );
}
