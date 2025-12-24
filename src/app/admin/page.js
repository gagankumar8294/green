"use client";
import { useState } from "react";
import AddProductForm from "../../../components/Products/AddProductsForm";
import Inventory from "../../../components/ProductList/Inventory";
import AdminOrdersPage from "../../../components/Admin/AdminOrderPage";
import AddBlogs from "../../../components/Admin/blog/AddBlogs";
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
        <button
          className={`${styles.button} ${
            activeTab === "order" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("order")}
        >
          Order Management
        </button>
        <button
          className={`${styles.button} ${
            activeTab === "addblog" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("addblog")}
        >
          Add Blog
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeTab === "addProduct" && <AddProductForm />}
        {activeTab === "inventory" && <Inventory />}
        {activeTab === "order" && <AdminOrdersPage />}
        {activeTab === "addblog" && <AddBlogs />}
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