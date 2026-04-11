import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/notion";
import styles from "./FeaturedPost.module.css";

export default function FeaturedPost({ post }: { post: BlogPost }) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <Link href={`/${post.slug}`} className={styles.imageWrapper}>
                        <img src={post.cover} alt={post.title} className={styles.image} />
                    </Link>
                    <div className={styles.content}>
                        <div className={styles.meta}>
                            <span className={styles.badge}>Featured Post</span>
                            <span className={styles.dot}>•</span>
                            <time className={styles.date}>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </time>
                        </div>
                        <Link href={`/${post.slug}`} className={styles.titleLink}>
                            <h2 className={styles.title}>{post.title}</h2>
                        </Link>
                        <p className={styles.summary}>{post.description}</p>
                        <Link href={`/${post.slug}`} className={styles.readMore}>
                            Read More <span className={styles.arrow}>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
