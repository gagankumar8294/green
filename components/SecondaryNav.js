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

  const categoryLinks = [
    "Uncategorized",
    "Air Plant",
    "Air Purifying Plants",
    "Assorted Succulents",
    "Cactus",
    "Indoor Plants",
    "Low Maintenance Plants",
    "succulents",
  ];

  return (
    <div className={styles.secondaryWrapper}>
      <ul className={styles.navList}>
        {links.map((link) => {
          const isActive = pathname === link.path;

          // ✅ Categories with dropdown
          if (link.name === "Categories") {
            return (
              <li
                key={link.name}
                className={`${styles.navItem} ${styles.dropdown}`}
              >
                <Link
                  href={link.path}
                  className={`${styles.navLink} ${
                    isActive ? styles.active : ""
                  }`}
                >
                  {link.name}
                </Link>

                {/* FULL WIDTH DROPDOWN */}
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownInner}>
                    <div className={styles.dropdownGrid}>
                      {categoryLinks.map((item) => (
                        <Link
                          key={item}
                          href={`/categories/${item
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className={styles.dropdownItem}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>

                    {/* IMAGE AREA (ready for future images) */}
                    <div className={styles.dropdownImageArea} />
                  </div>
                </div>
              </li>
            );
          }

          // ✅ Normal nav items
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
