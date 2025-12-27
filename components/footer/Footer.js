import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        {/* Brand Section */}
        <div className={styles.brand}>
          <h2>Happy Greenery</h2>
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
    <li><a href="/shop">Plants</a></li>
    <li><a href="/about-us">About Us</a></li>
    <li><a href="/contact-us">Contact Us</a></li>
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
    {/* Instagram */}
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noreferrer"
      aria-label="Instagram"
      className={`${styles.icon} ${styles.instagram}`}
    >
      <svg viewBox="0 0 24 24">
        <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z" />
      </svg>
    </a>

    {/* Facebook */}
    <a
      href="https://www.facebook.com/people/HappyGreenery/61585914081304/"
      target="_blank"
      rel="noreferrer"
      aria-label="Facebook"
      className={`${styles.icon} ${styles.facebook}`}
    >
      <svg viewBox="0 0 24 24">
        <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.692V11.41h3.129V8.797c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.296h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
      </svg>
    </a>

    {/* WhatsApp */}
    <a
      href="https://wa.me/+916362209490"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className={`${styles.icon} ${styles.whatsapp}`}
    >
      <svg viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.82 11.82 0 0012.01 0C5.38 0 .01 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.96 11.96 0 0012 24h.01c6.63 0 12-5.37 12-12a11.9 11.9 0 00-3.49-8.52zM12 22a9.94 9.94 0 01-5.1-1.39l-.36-.21-3.67.96.98-3.57-.23-.37A9.93 9.93 0 1122 12c0 5.51-4.49 10-10 10zm5.43-7.52c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.91 1.22 3.11c.15.2 2.11 3.22 5.11 4.52.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z"/>
      </svg>
    </a>

    {/* X (Twitter) */}
    <a
      href="https://x.com"
      target="_blank"
      rel="noreferrer"
      aria-label="X"
      className={`${styles.icon} ${styles.x}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/>x
      </svg>
    </a>
  </div>


        </div>

      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} Happy Greenery. All rights reserved.</p>
      </div>
    </footer>
  );
}
