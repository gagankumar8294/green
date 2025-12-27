import ServiceHighlights from "../../components/Homepage/serviceHighlights";
import AboutUs from "./about-us/page";
import ContactPage from "./contact-us/page";
import styles from "./HomePage.module.css";
import Link from "next/link";

export const metadata = {
  title: "Buy Indoor & Outdoor Plants Online | Happy Greenery | Bangalore | Delivery Across India",
  description:
    "Buy healthy indoor & outdoor plants online from Happy Greenery | Bangalore. Fresh plants, easy care, fast delivery, and affordable prices. Bring nature home today 🌿",

  keywords: [
    "buy plants online",
    "indoor plants online",
    "outdoor plants",
    "house plants",
    "succulent plants",
    "air purifying plants",
    "plant delivery india",
    "happy greenery plants",
    "online nursery india",
  ],

  authors: [{ name: "Happy Greenery" }],
  creator: "Happy Greenery",
  publisher: "Happy Greenery",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.happygreenery.in",
  },

  openGraph: {
    title: "Buy Indoor & Outdoor Plants Online | Happy Greenery | Bangalore | Delivery Across India",
    description:
      "Shop healthy indoor & outdoor plants online | Banglore. Fresh, affordable & doorstep delivery across India 🌱",
    url: "https://www.happygreenery.in",
    siteName: "Happy Greenery",
    images: [
      {
        url: "https://www.happygreenery.in/og-home.png",
        width: 1200,
        height: 630,
        alt: "Happy Greenery - Buy Plants Online",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Buy Indoor & Outdoor Plants Online | Happy Greenery | Banglore | Delivery Across India",
    description:
      "Fresh indoor & outdoor plants delivered to your home. Shop now at Happy Greenery 🌿",
    images: ["https://www.happygreenery.in/og-home.png"],
  },

  category: "Ecommerce",
};


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
            Buy healthy indoor & outdoor plants online with fast delivery.
            Perfect for home, office & gifting.
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
          <img 
            src="/hero-plant.png" 
            alt="Buy indoor and outdoor plants online from Happy Greenery"
            loading="eager" />
        </div>
      </section>

      {/* CATEGORIES */}
      {/* <section className={styles.categories}>
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
      </section> */}

      {/* FEATURED PLANTS */}
      {/* <section className={styles.featured}>
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
      </section> */}

      <ServiceHighlights />
      <AboutUs />
      <ContactPage />

      {/* CTA */}
      {/* <section className={styles.cta}>
        <h2>Start Your Green Journey Today 🌿</h2>
        <button className={styles.primaryBtn}>Browse All Plants</button>
      </section> */}
    </main>
  );
}
