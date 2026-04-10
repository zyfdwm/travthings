import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/notion";
import styles from "./FeaturedPost.module.css";

export default function FeaturedPost({ post }: { post: BlogPost }) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                        <img src={post.cover} alt={post.title} className={styles.image} />
                    </div>
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
                        <h2 className={styles.title}>{post.title}</h2>
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
