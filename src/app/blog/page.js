import Link from "next/link";
import styles from "./BlogList.module.css";

const API = "https://green-world-backend-ydlf.onrender.com/api/blogs";

export default async function BlogListPage() {
  const res = await fetch(API, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blogs");

  const blogs = await res.json();

  return (
    <section className={styles.blogPage}>
      <h1 className={styles.pageTitle}>All Blogs</h1>

      {blogs.length === 0 && <p>No blogs found.</p>}

      <div className={styles.blogGrid}>
        {blogs.map((blog) => {
          const title = blog.title;

          const image =
            blog.sections.find((s) => s.type === "image")?.value ||
            "/placeholder.jpg";

          const paragraph =
            blog.sections.find((s) => s.type === "paragraph")?.value || "";

          const excerpt =
            paragraph.length > 120
              ? paragraph.slice(0, 400) + "..."
              : paragraph;

          return (
            <div key={blog._id} className={styles.blogCard}>
              <div className={styles.imageWrapper}>
                <img src={image} alt={title} />
              </div>

              <div className={styles.cardContent}>
                <h2 className={styles.blogTitle}>{title}</h2>

                <p className={styles.blogExcerpt}>{excerpt}</p>

                <Link href={`/blog/${blog.slug}`} className={styles.readMore}>
                  Read More →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
