'use client';

import { useState } from "react";
import axios from "axios";
import styles from "./AddProductForm.module.css";

const CATEGORY_OPTIONS = [
  "Uncategorized",
  "Air Plant",
  "Air Purifying Plants",
  "Assorted Succulents",
  "Beginner Friendly Plants",
  "Cacti & Succulents",
  "Cactus",
  "Climbers",
  "Creepers/Groundcovers",
  "Feng Shui Plants",
  "Flowering Plants",
  "Focal Plants",
  "Gifting Combos",
  "Hanging Plants",
  "Indoor Plants",
  "Low Maintenance Plants",
  "Office Desk Plants",
  "Online Plant Nursery",
  "Oxygen Plants",
  "Plant Combos",
  "Premium Ceramic Pots",
  "succulents",
  "Trees and Landscaping Services",
  "Vastu Plants",
];

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    mainImage: "",
    subImages: [""],
    description: "",
    quantity: "",
    weight: "",
    length: "",
    width: "",
  });

  // ✅ FIXED — initialize categories state properly
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [errors, setErrors] = useState({});

  // Validate inputs
  const validate = () => {
    let err = {};

    if (!formData.name.trim()) err.name = "Product name is required";
    if (!formData.price || isNaN(formData.price)) err.price = "Valid price required";
    if (!formData.mainImage.trim()) err.mainImage = "Main image URL required";
    if (!formData.description.trim()) err.description = "Description required";
    if (!formData.quantity || isNaN(formData.quantity)) err.quantity = "Valid quantity required";
    if (!formData.weight.trim()) err.weight = "Weight required";
    if (!formData.length.trim()) err.length = "Length required";
    if (!formData.width.trim()) err.width = "Width required";
    if (selectedCategories.length === 0) err.categories = "Please select at least 1 category";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubImageChange = (index, value) => {
    const updated = [...formData.subImages];
    updated[index] = value;
    setFormData({ ...formData, subImages: updated });
  };

  const addSubImageField = () => {
    setFormData({ ...formData, subImages: [...formData.subImages, ""] });
  };

  // Category select handler
  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      name: formData.name,
      price: Number(formData.price),
      mainImage: formData.mainImage,
      subImages: formData.subImages.filter((img) => img.trim() !== ""),
      description: formData.description,
      quantity: Number(formData.quantity),
      weight: formData.weight,
      dimension: {
        length: formData.length,
        width: formData.width,
      },
      categories: selectedCategories, // ✅ BACKEND-READY
    };

    try {
      const res = await axios.post("https://green-world-backend-ydlf.onrender.com/api/products/add", payload);

      alert("Product added successfully!");

      // Reset form
      setFormData({
        name: "",
        price: "",
        mainImage: "",
        subImages: [""],
        description: "",
        quantity: "",
        weight: "",
        length: "",
        width: "",
      });
      setSelectedCategories([]);
      setErrors({});
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      
      <h2 className={styles.title}>Add Product</h2>

      {/* Basic Inputs */}
      <input className={styles.input} name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
      {errors.name && <p className={styles.errorText}>{errors.name}</p>}

      <input className={styles.input} name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
      {errors.price && <p className={styles.errorText}>{errors.price}</p>}

      <input className={styles.input} name="mainImage" placeholder="Main Image URL" value={formData.mainImage} onChange={handleChange} />
      {errors.mainImage && <p className={styles.errorText}>{errors.mainImage}</p>}

      {/* Sub Images */}
      <h4>Sub Images</h4>
      {formData.subImages.map((img, index) => (
        <input
          key={index}
          className={styles.input}
          placeholder={`Sub Image URL ${index + 1}`}
          value={img}
          onChange={(e) => handleSubImageChange(index, e.target.value)}
        />
      ))}

      <button type="button" className={styles.subImageBtn} onClick={addSubImageField}>
        + Add More Images
      </button>

      {/* Description */}
      <textarea className={styles.textarea} name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      {errors.description && <p className={styles.errorText}>{errors.description}</p>}

      {/* Other fields */}
      <input className={styles.input} name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
      {errors.quantity && <p className={styles.errorText}>{errors.quantity}</p>}

      <input className={styles.input} name="weight" placeholder="Weight (ex: 200g, 2kg)" value={formData.weight} onChange={handleChange} />
      {errors.weight && <p className={styles.errorText}>{errors.weight}</p>}

      <input className={styles.input} name="length" placeholder="Length" value={formData.length} onChange={handleChange} />
      {errors.length && <p className={styles.errorText}>{errors.length}</p>}

      <input className={styles.input} name="width" placeholder="Width" value={formData.width} onChange={handleChange} />
      {errors.width && <p className={styles.errorText}>{errors.width}</p>}

      {/* Category Selector */}
      <h3 className={styles.catTitle}>Select Categories</h3>

      <div className={styles.catBox}>
        {CATEGORY_OPTIONS.map((cat) => (
          <div key={cat} className={styles.catItem}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}   // FIXED
              onChange={() => toggleCategory(cat)}
            />
            <label>{cat}</label>
          </div>
        ))}
      </div>

      {errors.categories && <p className={styles.errorText}>{errors.categories}</p>}

      <button type="submit" className={styles.addBtn}>Add Product</button>
    </form>
  );
}
