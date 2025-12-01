"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Breadcrumb.module.css";

export default function Breadcrumb() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  if (pathname === "/") return null;

  const currentPage = parts[parts.length - 1].replace(/-/g, " ");

  return (
    <div className={styles.breadcrumbWrapper}>
      <p className={styles.path}>
        <Link href="/">Home</Link>
        {parts.map((part, i) => (
          <span key={i}> / {part.replace(/-/g, " ")}</span>
        ))}
      </p>

      <h1 className={styles.pageTitle}>{currentPage}</h1>
    </div>
  );
}
