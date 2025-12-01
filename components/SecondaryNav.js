"use client";
import Link from "next/link";
import styles from "./SecondaryNav.module.css";

export default function SecondaryNav() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "SALE", path: "/sale" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Wedding Favours", path: "/wedding-favours" },
    { name: "Corporate Gifting", path: "/corporate-gifting" },
  ];

  return (
    <div className={styles.secondaryWrapper}>
      <ul className={styles.navList}>
        {links.map((link) => (
          <li key={link.name} className={styles.navItem}>
            <Link href={link.path} className={styles.navLink}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
