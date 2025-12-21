"use client";
import { useState, useEffect } from "react";
import styles from "../ProductList/Inventory.module.css";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    weight: "",
    mainImage: "",
    subImages: [],
    categories: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
  });

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3200/api/products/list");
    const data = await res.json();
    setProducts(data.products || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // EDIT
  const handleEdit = (p) => {
    setEditId(p._id);
    setFormData({
      name: p.name || "",
      description: p.description || "",
      price: p.price || "",
      quantity: p.quantity || "",
      weight: p.weight || "",
      mainImage: p.mainImage || "",
      subImages: p.subImages || [],
      categories: (p.categories || []).join(", "),
      dimensions: {
        length: p.dimensions?.length || "",
        width: p.dimensions?.width || "",
        height: p.dimensions?.height || "",
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [name]: value },
    }));
  };

  // SUB IMAGES
  const addSubImage = () => {
    setFormData((p) => ({ ...p, subImages: [...p.subImages, ""] }));
  };

  const updateSubImage = (i, v) => {
    const updated = [...formData.subImages];
    updated[i] = v;
    setFormData((p) => ({ ...p, subImages: updated }));
  };

  const removeSubImage = (i) => {
    setFormData((p) => ({
      ...p,
      subImages: p.subImages.filter((_, idx) => idx !== i),
    }));
  };

  // SAVE
  const handleSave = async () => {
    await fetch(
      `http://localhost:3200/api/products/update/${editId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          categories: formData.categories
            .split(",")
            .map((c) => c.trim()),
        }),
      }
    );

    setEditId(null);
    fetchProducts();
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Weight</th>
          <th>Categories</th>
          <th>Dimensions</th>
          <th>Dates</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) =>
          editId === p._id ? (
            <>
              <tr key={p._id} className={styles.editRow}>
                <td>
                  <img src={formData.mainImage} className={styles.image} />
                </td>

                <td>
                  <input name="name" value={formData.name} onChange={handleChange} />
                </td>

                <td>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input name="price" value={formData.price} onChange={handleChange} />
                </td>

                <td>
                  <input
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
                    value={formData.categories}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, categories: e.target.value }))
                    }
                    placeholder="plant, indoor"
                  />
                </td>

                <td className={styles.dimensions}>
                  <input
                    placeholder="L"
                    name="length"
                    value={formData.dimensions.length}
                    onChange={handleDimensionChange}
                  />
                  <input
                    placeholder="W"
                    name="width"
                    value={formData.dimensions.width}
                    onChange={handleDimensionChange}
                  />
                  <input
                    placeholder="H"
                    name="height"
                    value={formData.dimensions.height}
                    onChange={handleDimensionChange}
                  />
                </td>

                <td className={styles.dates}>
                  <small>Created</small>
                  <small>Updated</small>
                </td>

                <td>
                  <button className={styles.saveBtn} onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>

              {/* SUB IMAGES */}
              <tr>
                <td colSpan="10" className={styles.subImagesRow}>
                  <strong>Sub Images</strong>

                  {formData.subImages.map((img, i) => (
                    <div key={i} className={styles.subImageInput}>
                      <input
                        value={img}
                        onChange={(e) => updateSubImage(i, e.target.value)}
                        placeholder="Image URL / base64"
                      />
                      <button onClick={() => removeSubImage(i)}>✕</button>
                    </div>
                  ))}

                  <button onClick={addSubImage} className={styles.addBtn}>
                    + Add Sub Image
                  </button>
                </td>
              </tr>
            </>
          ) : (
            <tr key={p._id}>
              <td>
                <img src={p.mainImage} className={styles.image} />
              </td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>₹{p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.weight}</td>
              <td>{(p.categories || []).join(", ")}</td>
              <td>
                {p.dimensions?.length}×{p.dimensions?.width}×
                {p.dimensions?.height}
              </td>
              <td>
                <small>{new Date(p.createdAt).toLocaleDateString()}</small>
                <br />
                <small>{new Date(p.updatedAt).toLocaleDateString()}</small>
              </td>
              <td>
                <button className={styles.editBtn} onClick={() => handleEdit(p)}>
                  Edit
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}


// "use client";
// import { useState, useEffect } from "react";
// import styles from "../ProductList/Inventory.module.css";

// export default function Inventory() {
//   const [products, setProducts] = useState([]);
//   const [editId, setEditId] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     quantity: "",
//     weight: "",
//     mainImage: "",
//     subImages: [],
//   });

//   // FETCH PRODUCTS
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("http://localhost:3200/api/products/list");
//       const data = await res.json();
//       setProducts(data.products || []);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // EDIT CLICK
//   const handleEdit = (product) => {
//     setEditId(product._id);
//     setFormData({
//       name: product.name || "",
//       description: product.description || "",
//       price: product.price || "",
//       quantity: product.quantity || "",
//       weight: product.weight || "",
//       mainImage: product.mainImage || "",
//       subImages: product.subImages || [],
//     });
//   };

//   // INPUT CHANGE
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // SUB IMAGES HANDLERS
//   const addSubImage = () => {
//     setFormData((prev) => ({
//       ...prev,
//       subImages: [...prev.subImages, ""],
//     }));
//   };

//   const updateSubImage = (index, value) => {
//     const updated = [...formData.subImages];
//     updated[index] = value;

//     setFormData((prev) => ({
//       ...prev,
//       subImages: updated,
//     }));
//   };

//   const removeSubImage = (index) => {
//     const updated = formData.subImages.filter((_, i) => i !== index);
//     setFormData((prev) => ({
//       ...prev,
//       subImages: updated,
//     }));
//   };

//   // SAVE UPDATE
//   const handleSave = async () => {
//     try {
//       await fetch(
//         `http://localhost:3200/api/products/update/${editId}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );

//       setEditId(null);
//       fetchProducts();
//     } catch (err) {
//       console.error("Update error:", err);
//     }
//   };

//   const handleCancel = () => {
//     setEditId(null);
//   };

//   return (
//     <table className={styles.table}>
//       <thead>
//         <tr>
//           <th>Image</th>
//           <th>Name</th>
//           <th>Description</th>
//           <th>Price</th>
//           <th>Quantity</th>
//           <th>Weight</th>
//           <th>Actions</th>
//         </tr>
//       </thead>

//       <tbody>
//         {products.length > 0 ? (
//           products.map((p) =>
//             editId === p._id ? (
//               // EDIT ROW
//               <>
//                 <tr key={p._id}>
//                   <td>
//                     <img
//                       src={formData.mainImage}
//                       alt="preview"
//                       className={styles.productImage}
//                     />
//                   </td>

//                   <td>
//                     <input
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                     />
//                   </td>

//                   <td>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                     />
//                   </td>

//                   <td>
//                     <input
//                       name="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                     />
//                   </td>

//                   <td>
//                     <input
//                       name="quantity"
//                       value={formData.quantity}
//                       onChange={handleChange}
//                     />
//                   </td>

//                   <td>
//                     <input
//                       name="weight"
//                       value={formData.weight}
//                       onChange={handleChange}
//                     />
//                   </td>

//                   <td>
//                     <button onClick={handleSave}>💾 Save</button>
//                     <button onClick={handleCancel}>❌ Cancel</button>
//                   </td>
//                 </tr>

//                 {/* SUB IMAGES ROW */}
//                 <tr>
//                   <td colSpan="7">
//                     <strong>Sub Images</strong>

//                     {formData.subImages.map((img, index) => (
//                       <div
//                         key={index}
//                         style={{
//                           display: "flex",
//                           gap: "10px",
//                           marginTop: "8px",
//                         }}
//                       >
//                         <input
//                           type="text"
//                           value={img}
//                           placeholder="Enter sub image URL"
//                           onChange={(e) =>
//                             updateSubImage(index, e.target.value)
//                           }
//                           style={{ flex: 1 }}
//                         />
//                         <button onClick={() => removeSubImage(index)}>
//                           ❌
//                         </button>
//                       </div>
//                     ))}

//                     <button
//                       onClick={addSubImage}
//                       style={{ marginTop: "10px" }}
//                     >
//                       ➕ Add Sub Image
//                     </button>
//                   </td>
//                 </tr>
//               </>
//             ) : (
//               // VIEW ROW
//               <tr key={p._id}>
//                 <td>
//                   <img
//                     src={p.mainImage}
//                     alt={p.name}
//                     className={styles.productImage}
//                   />
//                 </td>
//                 <td>{p.name}</td>
//                 <td>{p.description}</td>
//                 <td>₹{p.price}</td>
//                 <td>{p.quantity}</td>
//                 <td>{p.weight}</td>
//                 <td>
//                   <button onClick={() => handleEdit(p)}>✏️ Edit</button>
//                 </td>
//               </tr>
//             )
//           )
//         ) : (
//           <tr>
//             <td colSpan="7" className={styles.emptyRow}>
//               No products found
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// }

