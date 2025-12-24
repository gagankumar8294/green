"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SecondaryNav.module.css";

export default function SecondaryNav() {
  const pathname = usePathname();

  const links = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <div className={styles.secondaryWrapper}>
      <ul className={styles.navList}>
        {links.map((link) => {
          const isActive = pathname === link.path;

          return (
            <li key={link.name} className={styles.navItem}>
              <Link
                href={link.path}
                className={`${styles.navLink} ${
                  isActive ? styles.active : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
