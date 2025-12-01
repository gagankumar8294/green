'use client';

import { useEffect, useState, useCallback } from "react";
import styles from "./Products.module.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 99999 });

  const LIMIT_FIRST = 20;
  const LIMIT_NEXT = 15;

  // FETCH PRODUCTS
  const fetchProducts = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);

    const query = new URLSearchParams({
      skip,
      limit: skip === 0 ? LIMIT_FIRST : LIMIT_NEXT,
      search,
      sort,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      categories: selectedCategories.join(",")
    });

    const res = await fetch(`http://localhost:3200/api/products/list?${query.toString()}`);
    const data = await res.json();

    if (!data.success) {
      setIsLoading(false);
      return;
    }

    if (data.products.length === 0) {
      setHasMore(false);
      setIsLoading(false);
      return;
    }

    // Append without duplicates
    setProducts(prev => {
      const map = new Map();
      [...prev, ...data.products].forEach(p => map.set(p._id, p));
      return Array.from(map.values());
    });

    setIsLoading(false);
  }, [skip, search, sort, priceRange, selectedCategories, hasMore, isLoading]);

  // INITIAL + INFINITE LOAD
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // RESET WHEN FILTERS CHANGE
  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setHasMore(true);
  }, [search, sort, priceRange, selectedCategories]);

  // INFINITE SCROLL HANDLER
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        hasMore &&
        !isLoading
      ) {
        setSkip(prev => prev + LIMIT_NEXT);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  // CATEGORY TOGGLE
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // RENDER LOADING SKELETON
  const renderSkeletons = (count = LIMIT_FIRST) => {
    return Array.from({ length: count }).map((_, i) => (
      <div key={`skeleton-${i}`} className={`${styles.card} ${styles.skeleton}`}>
        <div className={styles.image}></div>
        <h3></h3>
        <p></p>
      </div>
    ));
  };

  return (
    <div className={styles.container}>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        className={styles.searchBox}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* SORT */}
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

      {/* CATEGORIES */}
      <div className={styles.categoriesWrapper}>
        {[
          "Uncategorized",
          "Air Plant",
          "Air Purifying Plants",
          "Assorted Succulents",
          "Cactus",
          "Indoor Plants",
          "Low Maintenance Plants",
          "succulents"
        ].map(cat => (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${selectedCategories.includes(cat) ? styles.activeCategory : ""}`}
            onClick={() => toggleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRICE FILTER */}
      <div className={styles.priceFilter}>
        <label>Min Price</label>
        <input
          type="number"
          value={priceRange.min}
          onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
        />

        <label>Max Price</label>
        <input
          type="number"
          value={priceRange.max}
          onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
        />
      </div>

      {/* PRODUCT GRID */}
      <div className={styles.grid}>
        {products.map((p) => (
          <div key={p._id} className={styles.card}>
            <img src={p.mainImage} alt={p.name} className={styles.image} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
          </div>
        ))}

        {/* SHOW SKELETONS WHEN LOADING */}
        {isLoading && renderSkeletons(8)}
      </div>

      {(isLoading || hasMore) && (
        <p className={styles.loader}>Loading more...</p>
      )}
    </div>
  );
}
