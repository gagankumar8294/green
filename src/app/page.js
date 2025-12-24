import styles from "./HomePage.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.home}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Bring <span>Nature</span> Home
          </h1>
          <p>
            Discover healthy indoor & outdoor plants delivered fresh to your
            doorstep.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/shop" className={styles.LinkButton}>
              <button className={styles.primaryBtn}>
                  Shop Plants
              </button>
            </Link>
            <Link href="/blog" className={styles.LinkButton}>
            <button className={styles.secondaryBtn}>
                Explore Blog
            </button>
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src="/hero-plant.png" alt="Indoor-Plant-grrenplants" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.categories}>
        <h2>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          {[
            "Indoor Plants",
            "Outdoor Plants",
            "Succulents",
            "Air Purifying",
            "Flowering Plants",
            "Plant Combos",
          ].map((item, i) => (
            <div key={i} className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🌿</div>
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PLANTS */}
      <section className={styles.featured}>
        <h2>Best Sellers</h2>
        <div className={styles.productGrid}>
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className={styles.productCard}>
              <img src={`/plants/plant-${i + 1}.png`} alt="Plant" />
              <h3>Money Plant</h3>
              <p>₹399</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className={styles.whyUs}>
        <h2>Why Choose Us?</h2>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            🌱 <h3>Healthy Plants</h3>
            <p>Grown with expert care & quality soil.</p>
          </div>
          <div className={styles.featureCard}>
            🚚 <h3>Fast Delivery</h3>
            <p>Fresh plants delivered safely.</p>
          </div>
          <div className={styles.featureCard}>
            💧 <h3>Plant Care Support</h3>
            <p>Free guidance from experts.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className={styles.cta}>
        <h2>Start Your Green Journey Today 🌿</h2>
        <button className={styles.primaryBtn}>Browse All Plants</button>
      </section> */}
    </main>
  );
}
