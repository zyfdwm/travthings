import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/notion";
import styles from "./BlogCard.module.css";
import { optimizeImageUrl } from "@/lib/utils";

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <article className={styles.card}>
            <Link href={`/${post.slug}`} className={styles.imageLink}>
                <div className={styles.imageWrapper}>
                    <img src={optimizeImageUrl(post.cover, 800)} alt={post.title} className={styles.image} />
                    <span className={styles.categoryBadge}>{post.category}</span>
                </div>
            </Link>
            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.indicator}></span>
                    <span className={styles.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        })}
                    </span>
                </div>
                <Link href={`/${post.slug}`} className={styles.titleLink}>
                    <h3 className={styles.title}>{post.title}</h3>
                </Link>
                <p className={styles.summary}>{post.description}</p>
                <Link href={`/${post.slug}`} className={styles.readMore}>
                    Read More <span className={styles.arrow}>→</span>
                </Link>
            </div>
        </article>
    );
}
