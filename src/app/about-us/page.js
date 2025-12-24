import React from "react";
import styles from "./AboutUs.module.css";
import philodendronImage from "../../../public/philodendron.jpg"; // replace with your image path

const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
      <h1 className={styles.heading}>About Us</h1>
      <h2 className={styles.subHeading}>Who We Are</h2>

      <p className={styles.description}>
        Farm Storey, established in 2022, is a plant nursery and landscaping
        design firm located in Bhimtal, Uttarakhand. We specialize in offering
        a wide variety of plants, including succulents, cacti, and air-purifying
        indoor plants. With a focus on sustainability and creativity, our goal
        is to bring natural beauty into homes and corporate spaces alike.
      </p>

      <p className={styles.description}>
        As an online plant-selling platform, we cater to individual plant
        enthusiasts, as well as businesses looking for corporate gifting
        solutions or wedding favors. Our customizable plant combos make for
        unique and thoughtful gifts for family, friends, and special events.
      </p>

      <div className={styles.featured}>
        <img
          src={philodendronImage.src}
          alt="Philodendron Plant Combo"
          className={styles.featuredImage}
        />
        <div className={styles.featuredText}>
          <h3>Philodendron Plant Combo</h3>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>5+</span>
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
        <div className={styles.stat}>
          <span className={styles.statNumber}>3</span>
          <span className={styles.statLabel}>Awards</span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
