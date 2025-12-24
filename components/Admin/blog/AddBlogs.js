"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Blogs.module.css";

export default function AddBlogs() {
  const [sections, setSections] = useState([{ type: "title", value: "", alt: "" }]);
  const [blogs, setBlogs] = useState([]);
  const [slug, setSlug] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const titleRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
    titleRef.current?.focus();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:3200/api/blogs", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("❌ Fetch blogs error:", err);
    }
  };

  const addSection = (type) => {
    if (!type) return;
    setSections([...sections, { type, value: "", alt: "", linkText: "" }]);
  };

  const updateSection = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slug) {
      alert("Please enter a slug");
      return;
    }

    const filteredSections = sections.filter(
      (sec) => sec.value || sec.type === "image" || sec.type === "link"
    );

    const payload = {
      slug,
      sections: filteredSections,
    };

    try {
      let res;
      if (isEditing) {
        res = await fetch(`http://localhost:3200/api/blogs/${selectedId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
      } else {
        res = await fetch("http://localhost:3200/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
      }

      if (!res.ok) throw new Error("Blog save failed");

      const data = await res.json();
      console.log("✅ Blog saved:", data);

      resetForm();
      fetchBlogs();
    } catch (err) {
      console.error("❌ Error saving blog:", err);
      alert("Blog not saved. Check console.");
    }
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setSelectedId(blog._id);
    setSlug(blog.slug);
    setSections(blog.sections);
    titleRef.current?.focus();
  };

  const deleteBlog = async (id) => {
    try {
      await fetch(`http://localhost:3200/api/blogs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchBlogs();
    } catch (err) {
      console.error("❌ Delete blog error:", err);
    }
  };

  const resetForm = () => {
    setSections([{ type: "title", value: "", alt: "" }]);
    setSlug("");
    setIsEditing(false);
    setSelectedId(null);
  };

  return (
    <section className={styles.blogs_Section}>
      <h2 className={styles.heading}>{isEditing ? "Edit Blog" : "Add Blog"}</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Slug</label>
        <input
          className={styles.input}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Enter slug"
        />

        {sections.map((sec, i) => (
          <div key={i} className={styles.sectionBlock}>
            {sec.type === "title" && (
              <input
                ref={i === 0 ? titleRef : null}
                className={styles.input}
                placeholder="Title"
                value={sec.value}
                onChange={(e) => updateSection(i, "value", e.target.value)}
              />
            )}

            {["h1", "h2", "h3", "paragraph"].includes(sec.type) && (
              <textarea
                className={styles.textarea}
                placeholder={sec.type.toUpperCase()}
                value={sec.value}
                onChange={(e) => updateSection(i, "value", e.target.value)}
              />
            )}

            {sec.type === "image" && (
              <>
                <input
                  className={styles.input}
                  placeholder="Image URL"
                  value={sec.value}
                  onChange={(e) => updateSection(i, "value", e.target.value)}
                />
                <input
                  className={styles.input}
                  placeholder="Alt text"
                  value={sec.alt}
                  onChange={(e) => updateSection(i, "alt", e.target.value)}
                />
              </>
            )}

            {sec.type === "link" && (
              <>
                <input
                  className={styles.input}
                  placeholder="Link Text"
                  value={sec.linkText}
                  onChange={(e) => updateSection(i, "linkText", e.target.value)}
                />
                <input
                  className={styles.input}
                  placeholder="URL"
                  value={sec.value}
                  onChange={(e) => updateSection(i, "value", e.target.value)}
                />
              </>
            )}
          </div>
        ))}

        <select className={styles.input} onChange={(e) => addSection(e.target.value)}>
          <option value="">Add Section</option>
          <option value="title">Title</option>
          <option value="h2">H2</option>
          <option value="paragraph">Paragraph</option>
          <option value="image">Image</option>
          <option value="link">Link</option>
        </select>

        <button type="submit" className={styles.submitBtn}>
          {isEditing ? "Update Blog" : "Create Blog"}
        </button>
      </form>

      <hr className={styles.divider} />

      <h2>Blogs</h2>
      <div className={styles.blogList}>
        {blogs.map((b) => (
          <div key={b._id} className={styles.blogCard}>
            <h3>{b.sections.find((s) => s.type === "title")?.value}</h3>
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
