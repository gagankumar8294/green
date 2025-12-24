"use client";
import styles from "./Contact.module.css";

export default function ContactPage() {
  return (
    <section className={styles.contactPage}>
      <div className={styles.header}>
        <h1>Contact Us</h1>
        <h2>Get In Touch With Us</h2>
        <p>
          Wish to buy a product? Customise your design? Facing problems with your
          order or have a complaint regarding your purchase? We are always there
          for you. Contact us via email, WhatsApp, or call and we’ll do our best
          to resolve your issues.
        </p>
      </div>

      <div className={styles.content}>
        {/* Contact Form */}
        <form className={styles.form}>
          <div className={styles.field}>
            <label>Name *</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className={styles.field}>
            <label>Phone Number *</label>
            <input type="tel" placeholder="Enter phone number" required />
          </div>

          <div className={styles.field}>
            <label>Email *</label>
            <input type="email" placeholder="Enter email address" required />
          </div>

          <div className={styles.field}>
            <label>Comment or Message</label>
            <textarea rows="5" placeholder="Write your message..." />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>

        {/* Contact Info */}
        <div className={styles.info}>
          <p>
            <strong>Address :</strong><br />
            Street no:1, Square House, Mallital, Bhimtal,<br />
            Distt: Nainital, Uttarakhand - 263136, India
          </p>

          <p>
            <strong>Call us :</strong><br />
            +91 9816310873
          </p>

          <p>
            <strong>Mail us :</strong><br />
            farmstorey0@gmail.com
          </p>

          <p>
            <strong>Open time :</strong><br />
            10:00 AM – 6:00 PM
          </p>
        </div>
      </div>
    </section>
  );
}
