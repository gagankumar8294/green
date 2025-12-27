// app/shop/[slug]/page.js
import styles from "./ProductPage.module.css";
import ReactMarkdown from "react-markdown";

export async function generateMetadata({ params }) {
  const { slug } = params;

  let product;

  try {
    const res = await fetch(
      `https://green-world-backend-ydlf.onrender.com/api/products/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) return { title: "Product not found" };

    const data = await res.json();
    if (!data?.success || !data?.product) return { title: "Product not found" };

    product = data.product;
  } catch (error) {
    console.error("❌ Fetch product error for metadata:", error);
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} | Happy Greenery`,
    description: product.shortDescription || "Buy plants online from Happy Greenery",
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `https://www.happygreenery.in/shop/${slug}`,
      images: [
        {
          url: product.mainImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "product",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: [product.mainImage],
    },
  };
}


export default async function ProductPage({ params }) {
  const { slug } = await params;

  let data;

  try {
    const res = await fetch(
      `https://green-world-backend-ydlf.onrender.com/api/products/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return <h2>Product not found</h2>;
    }

    data = await res.json();
  } catch (error) {
    console.error("❌ Fetch product error:", error);
    return <h2>Something went wrong</h2>;
  }

  if (!data?.success || !data?.product) {
    return <h2>Product not found</h2>;
  }

  const product = data.product;

  return (
<>
      {/* TOP GRID SECTION */}
      <div className={styles.productPage}>
        {/* IMAGE */}
        <div className={styles.imageWrapper}>
          <img
            src={product.mainImage}
            alt={product.name}
            className={styles.image}
          />
        </div>

        {/* DETAILS */}
        <div className={styles.details}>
          <h1 className={styles.title}>{product.name}</h1>

          <p className={styles.price}>₹{product.price}</p>

          {product.features?.length > 0 && (
            <ul className={styles.features}>
              {product.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  ✔ {feature}
                </li>
              ))}
            </ul>
          )}

          <div className={styles.meta}>
            <p>Weight: {product.weight} gm</p>
            <p>
              Size: {product.dimension?.length} × {product.dimension?.width}
             cm</p>
          </div>

          <button className={styles.addToCart}>Add to Cart</button>
        </div>
      </div>

      {/* FULL WIDTH DESCRIPTION SECTION */}
      <section className={styles.descriptionSection}>
        <h2 className={styles.descriptionHeading}>
            Product Description
        </h2>
        <div className={styles.description}>
          <ReactMarkdown>
            {product.description}
          </ReactMarkdown>
        </div>
      </section>
    </>
  );
}
