'use client';
import styles from "./Products.module.css";
import { useEffect, useState, useCallback } from "react";
import { useCart } from "../../../context/CartContext";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showGif, setShowGif] = useState(true); // for first 5 seconds

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1500 });
  const [showSidebar, setShowSidebar] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const query = new URLSearchParams({
      search,
      sort,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      categories: selectedCategories.join(","),
    });

    const res = await fetch(
      `http://localhost:3200/api/products/list?${query.toString()}`
    );
    const data = await res.json();
    setProducts(data.success ? data.products : []);
    setIsLoading(false);
  }, [search, sort, priceRange, selectedCategories]);

  useEffect(() => {
    // Show GIF for first 5 seconds
    const gifTimer = setTimeout(() => setShowGif(false), 10000);

    fetchProducts();

    return () => clearTimeout(gifTimer);
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
  const renderSkeletons = (count = 12) => {
    return Array.from({ length: count }).map((_, i) => (
      <div key={`skeleton-${i}`} className={`${styles.card} ${styles.skeleton}`}>
        <div className={styles.image}></div>
        <h3></h3>
        <p></p>
      </div>
    ));
  };

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
      {/* --------------------- MOBILE TOP BAR --------------------- */}
      <div className={styles.mobileTopBar}>
        <button className={styles.filterBtn} onClick={() => setShowSidebar(true)}>
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

      {/* --------------------- SIDEBAR --------------------- */}
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

        <div className={styles.closeSidebar} onClick={() => setShowSidebar(false)}>
          ✖ Close
        </div>
      </div>

      {showSidebar && (
        <div className={styles.backdrop} onClick={() => setShowSidebar(false)}></div>
      )}

      {/* --------------------- MAIN CONTENT --------------------- */}
      <div className={styles.mainContent}>
        {/* SEARCH + SORT */}
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

        {/* PRODUCTS GRID */}
        <div className={styles.grid}>
          {showGif ? (
            <div className={styles.plantGifWrapper}>
              <img
                src="/svg/plant-loading.gif" // your plant gif in public folder
                alt="Loading Plants..."
                className={styles.plantGif}
              />
              <p> Loading...</p>
            </div>
          ) : isLoading ? (
            renderSkeletons()
          ) : (
            products.map((p) => (
              <div key={p._id} className={styles.card}>
                <img src={p.mainImage} alt={p.name} className={styles.image} />
                <h3>{p.name}</h3>
                <p>₹{p.price}</p>
                {p.inStock ? (
                  <div
                    className={styles.addToCartBtn}
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart
                  </div>
                ) : (
                  <div className={`${styles.addToCartBtn} ${styles.outOfStock}`}>
                    Out of Stock
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {!isLoading && products.length === 0 && !showGif && (
          <p className={styles.noResults}>No products found.</p>
        )}
      </div>
    </div>
  );
}
