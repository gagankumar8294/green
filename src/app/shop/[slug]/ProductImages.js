'use client';

import { useState } from "react";
import styles from "./ProductPage.module.css";

export default function ProductImages({ mainImage, subImages = [], name }) {
  const [activeImage, setActiveImage] = useState(mainImage);

  const images = [mainImage, ...subImages];

  return (
    <div className={styles.imageWrapper}>
      {/* MAIN IMAGE */}
      <img
        src={activeImage}
        alt={name}
        className={styles.image}
      />

      {/* IMAGE SWITCH BUTTONS */}
      {images.length > 1 && (
        <div className={styles.imageButtons}>
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              className={`${styles.imageBtn} ${
                activeImage === img ? styles.activeImage : ""
              }`}
            >
              <img src={img} alt={`product-${index}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
