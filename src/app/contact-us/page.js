"use client";
import styles from "./Contact.module.css";
import { useState } from "react";

export default function ContactPage() {

  const [showPopup, setShowPopup] = useState(false);
  
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const res = await fetch("/api/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    setShowPopup(true);
    e.target.reset();
  }
};


  
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
<form className={styles.form} onSubmit={handleSubmit}>

  <div className={styles.field}>
    <label>Name *</label>
    <input
      type="text"
      name="name"
      placeholder="Enter your name"
      required
    />
  </div>

  <div className={styles.field}>
    <label>Phone Number *</label>
    <input
      type="tel"
      name="phone"
      placeholder="Enter phone number"
      required
    />
  </div>

  <div className={styles.field}>
    <label>Email *</label>
    <input
      type="email"
      name="email"
      placeholder="Enter email address"
      required
    />
  </div>

  <div className={styles.field}>
    <label>Comment or Message</label>
    <textarea
      name="message"
      rows="5"
      placeholder="Write your message..."
    />
  </div>

  <button type="submit" className={styles.submitBtn}>
    Submit
  </button>
</form>
{showPopup && (
  <div className={styles.popupOverlay}>
    <div className={styles.popup}>
      <h3>Thank you! 🌱</h3>
      <p>
        Thanks for submitting your query.  
        Our team will contact you shortly.
      </p>
      <button onClick={() => setShowPopup(false)}>
        Close
      </button>
    </div>
  </div>
)}



        {/* Contact Info */}
        <div className={styles.info}>
          <p>
            <strong>Address :</strong><br />
            BEML layout, Rajarajeshwari Nagar, Banglore , Karnataka - 560098, India
          </p>

          <p>
            <strong>Call us :</strong><br />
            +91 6362209490
          </p>

          <p>
            <strong>Mail us :</strong><br />
              happygreenery.seller@gmail.com
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
