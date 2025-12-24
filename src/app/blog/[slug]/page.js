import { timeAgo } from '../../../../utils/timeAgo';
import styles from './BlogPage.module.css';

export default async function BlogPage({ params })
 {
  const { slug } = await params;
  if (!slug) return <p>Blog not found.</p>;

  const res = await fetch(`http://localhost:3200/api/blogs/${slug.toLowerCase()}`, { cache: "no-store" });
  if (!res.ok) return <p>Blog not found.</p>;

  const blog = await res.json();

  const postedAgo = timeAgo(blog.createdAt);
  const updatedAgo = timeAgo(blog.updatedAt);
  const isUpdated = blog.createdAt !== blog.updatedAt;

  return (
    <section className={styles.blogSection}>

              {/* ⏰ TIMESTAMP */}
      <div className={styles.meta}>
        <span>Posted {postedAgo}</span>
        {isUpdated && <span> • Updated {updatedAgo}</span>}
      </div>
      {blog.sections.map((sec, i) => {
        switch (sec.type) {
          case "title": return <h1 key={i}>{sec.value}</h1>;
          case "h1":
          case "h2":
          case "h3": {
            const Tag = sec.type;
            return <Tag key={i}>{sec.value}</Tag>;
          }
          case "paragraph": return <p key={i}>{sec.value}</p>;
          case "image": return <img key={i} src={sec.value} alt={sec.alt} />;
          case "link": return <p key={i}><a href={sec.value} target="_blank" rel="noopener noreferrer">{sec.linkText || sec.value}</a></p>;
          default: return null;
        }
      })}
    </section>
  );
}
