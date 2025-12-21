"use client";
import { useState } from "react";
import AddProductForm from "../../../components/Products/AddProductsForm";
import Inventory from "../../../components/ProductList/Inventory";
import styles from "./AddProduct.module.css";

function AddProduct() {
  const [activeTab, setActiveTab] = useState("addProduct");

  return (
    <div className={styles.container}>
      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${
            activeTab === "addProduct" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("addProduct")}
        >
          Add Product
        </button>

        <button
          className={`${styles.button} ${
            activeTab === "inventory" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory Management
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeTab === "addProduct" && <AddProductForm />}
        {activeTab === "inventory" && <Inventory />}
      </div>
    </div>
  );
}

export default AddProduct;


// import AddProductForm from "../../../components/Products/AddProductsForm";

// function AddProduct() {
//     return (
//         <AddProductForm />
//     )
// }

// export default AddProduct;