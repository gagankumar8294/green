"use client";
import React, { useState, useContext } from "react";
import styles from "./Navbar.module.css";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useContext(ThemeContext); // Get current theme
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={`${styles.navbar} ${theme === "dark" ? styles.dark : styles.light}`}>
      {/* ======= Left Section (Large Screen) ======= */}
      <div className={styles.leftSection}>
        <svg xmlns="http://www.w3.org/2000/svg" className={styles.phoneIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.09 15.09 0 006.59 6.59l2.2-2.2a1 1 0 011-.27 11.36 11.36 0 003.56.57 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.27 1z" />
        </svg>
        <span className={styles.callText}>Call us: +91 98442 99703</span>
      </div>

      {/* ======= Mobile Left Section ======= */}
      <div className={styles.mobileLeft}>
        <button onClick={toggleMenu} className={styles.menuButton}>
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.menuIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12l-4.9 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.menuIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
        <img src="/logo.png" alt="Logo" className={styles.mobileLogo} />
      </div>

      {/* ======= Center Section (Logo) ======= */}
      <div className={styles.centerSection}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </div>

      {/* ======= Right Section (Icons) ======= */}
      <div className={styles.rightSection}>
        <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21a8.38 8.38 0 0113 0" />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.98-1.7L23 6H6" />
        </svg>
      </div>

      {/* ======= Mobile Menu ======= */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.showMenu : ""} ${theme === "dark" ? styles.darkMenu : ""}`}>
        <button onClick={toggleMenu} className={styles.closeButton}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.menuIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12l-4.9 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
          </svg>
        </button>
        <ul>
          <li>Home</li>
          <li>Categories</li>
          <li>Shop</li>
          <li>Blog</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Wedding Favours</li>
          <li>Corporate Gifting</li>
        </ul>
      </div>
    </nav>
  );
}
