"use client";
import styles from "./Products.module.css";
import { useEffect, useState, useCallback } from "react";
import { useCart } from "../../../context/CartContext";
import Link from "next/link";

export const metadata = {
  title: "Shop Indoor & Outdoor Plants Online in Bangalore | Delivery Across India",
  description:
    "Buy indoor plants, outdoor plants, succulents & air-purifying plants online in Bangalore. Fresh & affordable.",

  openGraph: {
    title: "Shop Plants Online | Happy Greenery",
    description:
      "Explore a wide range of indoor & outdoor plants with fast delivery in Bangalore.",
    images: ["/og-home.png"],
  },
};


export default function ProductsPage() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // GIF + Skeleton control
  const [showGif, setShowGif] = useState(false);
  const [gifExpired, setGifExpired] = useState(false);

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1500 });
  const [showSidebar, setShowSidebar] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setShowGif(true);
    setGifExpired(false);

    const controller = new AbortController();

    // GIF visible for max 10 seconds
    const gifTimer = setTimeout(() => {
      setGifExpired(true);
      setShowGif(false);
    }, 10000);

    try {
      const query = new URLSearchParams({
        search,
        sort,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        categories: selectedCategories.join(","),
      });

      const res = await fetch(
        `https://green-world-backend-ydlf.onrender.com/api/products/list?${query.toString()}`,
        { signal: controller.signal }
      );

      const data = await res.json();
      setProducts(data.success ? data.products : []);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("❌ Fetch error:", error);
      }
    } finally {
      clearTimeout(gifTimer);
      setIsLoading(false);
      setShowGif(false);
      setGifExpired(false);
    }

    return () => controller.abort();
  }, [search, sort, priceRange, selectedCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // CATEGORY TOGGLE
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // SKELETON LOADER
  const renderSkeletons = (count = 12) =>
    Array.from({ length: count }).map((_, i) => (
      <div key={`skeleton-${i}`} className={`${styles.card} ${styles.skeleton}`}>
        <div className={styles.image}></div>
        <h3></h3>
        <p></p>
      </div>
    ));

  const categories = [
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
    <div className={styles.pageWrapper}>
      {/* ---------------- MOBILE TOP BAR ---------------- */}
      <div className={styles.mobileTopBar}>
        <button
          className={styles.filterBtn}
          onClick={() => setShowSidebar(true)}
        >
          ☰ Filters
        </button>

        <select
          className={styles.mobileSort}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
        </select>
      </div>

      {/* ---------------- SIDEBAR ---------------- */}
      <div className={`${styles.sidebar} ${showSidebar ? styles.sidebarOpen : ""}`}>
        <h3 className={styles.sidebarTitle}>Categories</h3>

        <div className={styles.categoriesWrapper}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryBtn} ${
                selectedCategories.includes(cat) ? styles.activeCategory : ""
              }`}
              onClick={() => toggleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.priceFilter}>
          <label>Min Price</label>
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: Number(e.target.value) })
            }
          />

          <label>Max Price</label>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
          />
        </div>

        <div
          className={styles.closeSidebar}
          onClick={() => setShowSidebar(false)}
        >
          ✖ Close
        </div>
      </div>

      {showSidebar && (
        <div
          className={styles.backdrop}
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className={styles.mainContent}>
        <div className={styles.topBar}>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchBox}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className={styles.sortBox}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_low_high">Price: Low to High</option>
            <option value="price_high_low">Price: High to Low</option>
          </select>
        </div>

        {/* ---------------- PRODUCTS GRID ---------------- */}
        <div className={styles.grid}>
          {isLoading && showGif && !gifExpired && (
            <div className={styles.plantGifWrapper}>
              <img
                src="/svg/plant-loading.gif"
                alt="Loading..."
                className={styles.plantGif}
              />
              <p>Loading...</p>
            </div>
          )}

          {isLoading && gifExpired && renderSkeletons()}

          {!isLoading &&
            products.map((p) => (
              <div key={p._id} className={styles.card}>
                <Link className={styles.linkscard} href={`/shop/${p.slug}`}>
                  <img
                    src={p.mainImage}
                    alt={p.name}
                    className={styles.image}
                  />
                </Link>

                <Link className={styles.linkscard} href={`/shop/${p.slug}`}>
                  <h3 className={styles.title}>{p.name}</h3>
                </Link>

                <p>₹{p.price}</p>

                {p.inStock ? (
                  <div
                    className={styles.addToCartBtn}
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart
                  </div>
                ) : (
                  <div
                    className={`${styles.addToCartBtn} ${styles.outOfStock}`}
                  >
                    Out of Stock
                  </div>
                )}
              </div>
            ))}
        </div>

        {!isLoading && products.length === 0 && (
          <p className={styles.noResults}>No products found.</p>
        )}
      </div>
    </div>
  );
}