"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Blogs.module.css";

const CATEGORIES = [
  "flower-crops",
  "landscape",
  "nutritional-values",
  "mysteries-of-flower",
  "plants",
  "landscaping",
  "gardening",
  "indoor-plants",
  "outdoor-plants",
  "plant-care",
  "soil-and-fertilizers",
];

export default function AddBlogs() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [sections, setSections] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const titleRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
    titleRef.current?.focus();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("https://green-world-backend-ydlf.onrender.com/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const addSection = (type) => {
    if (!type) return;
    setSections([...sections, { type, value: "", alt: "", linkText: "" }]);
  };

  const updateSection = (i, field, value) => {
    const updated = [...sections];
    updated[i][field] = value;
    setSections(updated);
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setSelectedId(blog._id);
    setTitle(blog.title);
    setSlug(blog.slug);
    setCategory(blog.category);
    setSections(blog.sections);
    titleRef.current?.focus();
  };

  const deleteBlog = async (id) => {
    try {
      await fetch(`https://green-world-backend-ydlf.onrender.com/api/blogs/${id}`, { method: "DELETE" });
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category) {
      alert("Title and category are required");
      return;
    }

    // H1 validation
    const hasH1 = sections.some((s) => s.type === "h1");
    if (!hasH1) {
      alert("At least one H1 section is required");
      return;
    }

    // Image validation
    const invalidImage = sections.some(
      (s) => s.type === "image" && (!s.value || !s.alt)
    );
    if (invalidImage) {
      alert("All images must have URL and Alt text");
      return;
    }

    const payload = {
      title,
      slug: slug || generateSlug(title),
      category,
      sections: sections.filter((s) => s.value || s.type === "link"),
    };

    const url = isEditing
      ? `https://green-world-backend-ydlf.onrender.com/api/blogs/${selectedId}`
      : "https://green-world-backend-ydlf.onrender.com/api/blogs";

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Blog save failed");

      resetForm();
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
      alert("Blog not saved. Check console.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setCategory("");
    setSections([]);
    setIsEditing(false);
    setSelectedId(null);
  };

  return (
    <section className={styles.blogs_Section}>
      <h2 className={styles.heading}>
        {isEditing ? "Edit Blog" : "Add Blog"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          ref={titleRef}
          placeholder="Blog Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSlug(generateSlug(e.target.value));
          }}
          required
        />

        <input
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Sections */}
        {sections.map((sec, i) => (
          <div key={i} className={styles.sectionBox}>
            {sec.type !== "link" && (
              <textarea
                placeholder={sec.type.toUpperCase()}
                value={sec.value}
                onChange={(e) => updateSection(i, "value", e.target.value)}
                required={sec.type === "h1"} // H1 mandatory
              />
            )}

            {sec.type === "image" && (
              <input
                placeholder="Image Alt Text (required)"
                value={sec.alt}
                onChange={(e) => updateSection(i, "alt", e.target.value)}
                required
              />
            )}

            {sec.type === "link" && (
              <>
                <input
                  placeholder="Link Text"
                  value={sec.linkText}
                  onChange={(e) => updateSection(i, "linkText", e.target.value)}
                />
                <input
                  placeholder="URL"
                  value={sec.value}
                  onChange={(e) => updateSection(i, "value", e.target.value)}
                />
              </>
            )}
          </div>
        ))}

        <select onChange={(e) => addSection(e.target.value)}>
          <option value="">Add Section</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="paragraph">Paragraph</option>
          <option value="image">Image</option>
          <option value="link">Link</option>
        </select>

        <button type="submit">
          {isEditing ? "Update" : "Create"} Blog
        </button>
      </form>

      <hr className={styles.divider} />

      <h2>Blogs</h2>
      <div className={styles.blogList}>
        {blogs.map((b) => (
          <div key={b._id} className={styles.blogCard}>
            <h3>{b.sections.find((s) => s.type === "h1")?.value}</h3>
            <div className={styles.blogButtons}>
              <button className={styles.editBtn} onClick={() => handleEdit(b)}>
                Edit
              </button>
              <button className={styles.deleteBtn} onClick={() => deleteBlog(b._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
