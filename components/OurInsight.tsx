"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./OurInsight.module.css";

// Mock data to ensure the layout is visible even if Notion is not configured yet
const mockPosts = [
    {
        id: "mock-1",
        title: "Finding Silence in the Sahara",
        summary: "How the vast emptiness of the dunes provides the perfect canvas for modern introspection.",
        category: "Philosophy",
        readTime: "8",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: "mock-2",
        title: "The Art of Slow Travel",
        summary: "Moving through landscapes with intention, favoring quality of experience over quantity of stops.",
        category: "Guides",
        readTime: "12",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: "mock-3",
        title: "Sanctuaries of Architecture",
        summary: "Exploring hotels that are more than just stays; they are sculptural masterpieces of comfort.",
        category: "Design",
        readTime: "10",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
    }
];

// We wrap the component logic to allow for server/client hybrid if needed, 
// but for simplicity and since we want animations on scroll, we keep it client-side for now 
// or use a wrapper. Next.js 13+ RSC can still be used if we fetch outside.

export default function OurInsight() {
    // In a real scenario, you'd fetch this in a parent RSC and pass it down, 
    // or use a client-side fetch. For the sake of adding animations to the current structure:
    const posts = mockPosts;
    const isLive = false;

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
                        <p>Stories of silence, architecture, and the transformative power of a journey well-taken.</p>
                        {!isLive && <p className={styles.previewTag}>Preview Mode</p>}
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
                            <div className={styles.imageWrapper}>
                                <img src={post.image} alt={post.title} className={styles.image} />
                                <span className={styles.categoryBadge}>{post.category}</span>
                            </div>
                            <div className={styles.cardBody}>
                                <h3 className={styles.cardTitle}>{post.title}</h3>
                                <p className={styles.cardSummary}>{post.summary}</p>
                                <div className={styles.cardFooter}>
                                    <span className={styles.readTime}>{post.readTime} MIN READ</span>
                                    <Link href={isLive ? `/journal/${post.id}` : "#"} className={styles.readLink}>
                                        READ STORY
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
