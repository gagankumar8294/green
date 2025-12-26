
import Head from "next/head";
import CommentsSection from "../../../../components/comments/CommentsSection";
import { timeAgo } from "../../../../utils/timeAgo";
import styles from "./BlogPage.module.css";

export default async function BlogPage({ params }) {
  const { slug } = await params;
  if (!slug) return <p>Blog not found.</p>;

  const res = await fetch(
    `http://localhost:3200/api/blogs/${slug.toLowerCase()}`,
    { cache: "no-store" }
  );

  if (!res.ok) return <p>Blog not found.</p>;

  const blog = await res.json();

  const postedAgo = timeAgo(blog.createdAt);
  const updatedAgo = timeAgo(blog.updatedAt);
  const isUpdated = blog.createdAt !== blog.updatedAt;

  return (
    <>
      {/* SEO HEAD */}
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.metaDescription} />
        <link rel="canonical" href={blog.canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.ogTitle} />
        <meta property="og:description" content={blog.ogDescription} />
        <meta property="og:image" content={blog.ogImage} />
        <meta property="og:url" content={blog.canonicalUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.twitterTitle} />
        <meta name="twitter:description" content={blog.twitterDescription} />
        <meta name="twitter:image" content={blog.twitterImage} />
      </Head>

      <section className={styles.blogSection}>
        {/* ⏰ TIMESTAMP */}
        <div className={styles.meta}>
          <span>Posted {postedAgo}</span>
          {isUpdated && <span> • Updated {updatedAgo}</span>}
        </div>

        {/* BLOG TITLE (H1) */}
        <h1>{blog.title}</h1>

        {/* BLOG CONTENT */}
        {blog.sections.map((sec, i) => {
          switch (sec.type) {
            case "h2":
            case "h3": {
              const Tag = sec.type;
              return <Tag key={i}>{sec.value}</Tag>;
            }
            case "paragraph":
              return <p key={i}>{sec.value}</p>;
            case "image":
              return <img key={i} src={sec.value} alt={sec.alt} />;
            case "link":
              return (
                <p key={i}>
                  <a
                    href={sec.value}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sec.linkText || sec.value}
                  </a>
                </p>
              );
            default:
              return null;
          }
        })}

        {/* COMMENTS SECTION */}
        <CommentsSection blogId={blog._id} />
      </section>
    </>
  );
}
