"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./OurInsight.module.css";

import { BlogPost } from "@/lib/notion";

export default function OurInsight({ posts }: { posts: BlogPost[] }) {
    const isLive = posts.length > 0;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.21, 0.45, 0.32, 0.9] as any,
            },
        },
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {/* Header Row */}
                <motion.div
                    className={styles.header}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <motion.div className={styles.headerLeft} variants={itemVariants}>
                        <h2 className={styles.title}>Our Insight</h2>
                    </motion.div>
                    <motion.div className={styles.headerRight} variants={itemVariants}>
                        <p>A closer look at Indonesia.
                            Through places, people, and journeys that stay with you.</p>
                        {!isLive && <p className={styles.previewTag}>No published stories found</p>}
                    </motion.div>
                </motion.div>

                {/* Grid */}
                <motion.div
                    className={styles.grid}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                >
                    {posts.map((post) => (
                        <motion.div key={post.id} className={styles.card} variants={itemVariants}>
                            <Link href={`/${post.slug}`} className={styles.imageLink}>
                                <div className={styles.imageWrapper}>
                                    <img src={post.cover} alt={post.title} className={styles.image} />
                                    <span className={styles.categoryBadge}>{post.category}</span>
                                </div>
                            </Link>
                            <div className={styles.cardBody}>
                                <Link href={`/${post.slug}`} className={styles.titleLink}>
                                    <h3 className={styles.cardTitle}>{post.title}</h3>
                                </Link>
                                <p className={styles.cardSummary}>{post.description}</p>
                                <div className={styles.cardFooter}>
                                    <span className={styles.readTime}>
                                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </span>
                                    <Link href={`/${post.slug}`} className={styles.readLink}>
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* More Link */}
                <motion.div
                    className={styles.moreContainer}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <Link href="/blog" className={styles.moreLink}>
                        More Insight
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
