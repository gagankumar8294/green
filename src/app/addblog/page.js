'use client'
import { useState } from "react"

function AddBlog() {

    const [form, setForm] = useState({ title: "", content: "", author: ""});
    const [message, setMessage] = useState("");
    const [imageUrls, setImageUrls] = useState([""]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

     const handleImageChange = (index, value) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageField = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Submitting...");

        const res = await fetch("/api/addblog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, images: imageUrls.filter((url) => url.trim() !== "")} ),
        });

        if(res.ok) {
            setMessage("Blog added Successfully");
            setForm({ title: "", content: "", author: "" });
            setImageUrls([""]);
        } else {
            setMessage("Failed to add Blog");
        }
    }

    return (
        <div style={{maxWidth: "600px", margin: "40px auto", padding: "20px"}}>
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input 
                    type="text" 
                    name="title" 
                    value={form.title} 
                    onChange={handleChange}
                    required
                    style={{ width: "100%", marginBottom: "10px", padd: "8px"}}
                />

            <label>Content:</label>
                <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          style={{ width: "100%", height: "120px", marginBottom: "10px", padding: "8px" }}
        />

        <label>Author (optional):</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Image URLs:</label>
        {imageUrls.map((url, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Paste image URL here"
              value={url}
              onChange={(e) => handleImageChange(index, e.target.value)}
              style={{ width: "80%", padding: "8px" }}
            />
            <button
              type="button"
              onClick={() => removeImageField(index)}
              style={{
                marginLeft: "10px",
                background: "#ff4d4d",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              X
            </button>

            {url && (
              <div style={{ marginTop: "5px" }}>
                <img
                  src={url}
                  alt="Preview"
                  style={{ width: "100%", maxHeight: "180px", objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addImageField}
          style={{
            marginBottom: "15px",
            background: "#00b300",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          + Add Image
        </button>

        <br />
        

        <button
            type="submit"
            style={{
                background: "#0070f3",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
            }}
        >
            Add Blog
        </button>
            </form>
            {message && <p style={{marginTop: "15px"}}>{message}</p>}
        </div>
    )
}

export default AddBlog