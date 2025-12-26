import React from "react";
import styles from "./AboutUs.module.css";
import philodendronImage from "../../../public/philodendron.jpg"; // replace with your image path

const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
      <h1 className={styles.heading}>About Us</h1>
      <h2 className={styles.subHeading}>Who We Are</h2>

      <p className={styles.description}>
        We are a Bangalore-based online plant delivery store, 
        just starting our journey with a passion for greenery 
        and sustainable living. 
        Our aim is to make buying healthy, 
        beautiful plants easy and affordable for everyone. 
        From indoor plants and succulents to air-purifying greens, 
        we carefully select and pack each plant to ensure 
        it reaches your doorstep fresh and thriving.
      </p>

      <p className={styles.description}>
        Whether you’re a plant lover looking to green your 
        home or searching for thoughtful gifts for loved ones, 
        we’ve got you covered. We offer custom plant combos, 
        perfect for gifting, home décor, and small celebrations, 
        with reliable delivery across Bangalore. As a growing local business, 
        we’re committed to quality, care, and spreading happiness—one plant at a time 🌱
      </p>

      <div className={styles.featured}>
        <img
          src={philodendronImage.src}
          alt="Philodendron Plant Combo"
          className={styles.featuredImage}
        />
        <div className={styles.featuredText}>
          {/* <h3>Philodendron Plant Combo</h3> */}
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>2+</span>
          <span className={styles.statLabel}>Years</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>1,000+</span>
          <span className={styles.statLabel}>Happy Customers</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>100%</span>
          <span className={styles.statLabel}>Satisfaction</span>
        </div>
        {/* <div className={styles.stat}>
          <span className={styles.statNumber}>3</span>
          <span className={styles.statLabel}>Awards</span>
        </div> */}
      </div>
    </div>
  );
};

export default AboutUs;
