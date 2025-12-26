import styles from "./Refund.module.css";

export default function RefundReturnsPolicy() {
  return (
    <section className={styles.policyWrapper}>
      <h1 className={styles.policyTitle}>Refund & Returns Policy</h1>

      <p className={styles.policyUpdated}>
        Last updated: 26 December 2025
      </p>

      {/* Nature of Products */}
      <div className={styles.policySection}>
        <h2 className={styles.sectionTitle}>Nature of Products</h2>
        <p className={styles.policyText}>
          Plants are living and perishable products. Due to their nature,
          returns are limited and subject to specific conditions.
        </p>
      </div>

      {/* Eligibility */}
      <div className={styles.policySection}>
        <h2 className={styles.sectionTitle}>Eligible Refund Cases</h2>
        <ul className={styles.policyList}>
          <li>Plant received in damaged or dead condition</li>
          <li>Incorrect plant or product delivered</li>
        </ul>
      </div>

      {/* Claim Process */}
      <div className={styles.policySection}>
        <h2 className={styles.sectionTitle}>Claim Process</h2>
        <p className={styles.policyText}>
          Customers must raise a refund or replacement request within
          <strong> 24 hours of delivery</strong>.
        </p>

        <div className={styles.highlight}>
          Clear unboxing photos or videos are mandatory for verification.
        </div>
      </div>

      {/* Non Refundable */}
      <div className={styles.policySection}>
        <h2 className={styles.sectionTitle}>Non-Refundable Cases</h2>
        <ul className={styles.policyList}>
          <li>Change of mind after order confirmation</li>
          <li>Incorrect or incomplete delivery address</li>
          <li>Damage caused due to improper plant care after delivery</li>
          <li>Delivery delays caused by courier partners or weather conditions</li>
        </ul>
      </div>

      {/* Cancellations */}
      <div className={styles.policySection}>
        <h2 className={styles.sectionTitle}>Order Cancellations</h2>
        <p className={styles.policyText}>
          Orders can be cancelled <strong>before dispatch only</strong>.
          Once shipped, cancellation requests will not be accepted.
        </p>
      </div>

      {/* Refund Method */}
      <div className={styles.policySection}>
        <h2 className={styles.sectionTitle}>Refund Method</h2>
        <div className={styles.highlight}>
          Approved refunds will be processed through the original payment
          method via <strong>Razorpay</strong> within
          <strong> 5–7 business days</strong>.
        </div>
      </div>

      {/* Contact */}
      <div className={styles.contactBox}>
        <p className={styles.policyText}>
          For refund-related queries, contact us at:
          <br />
          {/* 📧 <strong>support@happygreenery.in</strong> */}
          📧 <strong>happygreenery.supplier@gmail.com</strong>
          <br />
          📍 Bangalore, Karnataka, India
        </p>
      </div>
    </section>
  );
}
