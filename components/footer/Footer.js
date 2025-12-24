import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        {/* Brand Section */}
        <div className={styles.brand}>
          <h2>GreenLeaf</h2>
          <p>
            Bringing nature closer to your home.  
            Premium indoor & outdoor plants delivered with care.
          </p>
        </div>

        {/* Links */}
<div className={styles.links}>
  <h3>Useful Links</h3>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/plants">Plants</a></li>
    <li><a href="/about">About Us</a></li>
    <li><a href="/contact">Contact Us</a></li>
  </ul>
</div>

{/* Policies */}
<div className={styles.links}>
  <h3>Policies</h3>
  <ul>
    <li><a href="/privacy-policy">Privacy Policy</a></li>
    <li><a href="/terms-of-service">Terms of Service</a></li>
    <li><a href="/shipping-policy">Shipping Policy</a></li>
    <li><a href="/refund-returns">Refund & Returns</a></li>
  </ul>
</div>


        {/* Social Media */}
        <div className={styles.social}>
          <h3>Connect With Us</h3>
          <div className={styles.socialIcons}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="https://t.me/yourchannel" target="_blank" rel="noreferrer">Telegram</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} GreenLeaf. All rights reserved.</p>
      </div>
    </footer>
  );
}
