"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, ArrowRight } from "lucide-react";
import styles from "./HeroSection.module.css";

const destinations = [
    { label: "Jakarta, Indonesia", slug: "jakarta" },
    { label: "Bandung, Indonesia", slug: "bandung" },
    { label: "Bali, Indonesia", slug: "bali" },
    { label: "Yogyakarta, Indonesia", slug: "yogyakarta" },
];

export default function HeroSection({ minimal = false }: { minimal?: boolean }) {
    const [index, setIndex] = useState(0);
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % destinations.length);
            setAnimKey((prev) => prev + 1);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    const current = destinations[index];

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 1,
                ease: [0.21, 0.45, 0.32, 0.9] as any,
            },
        }),
    };

    return (
        <section className={styles.hero}>
            <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=90" 
                alt="Travel Things Hero" 
                className={styles.bg} 
                fetchPriority="high" 
            />
            <div className={styles.overlay} />

            <div className={styles.content}>
                {/* Badge */}
                <motion.span
                    className={styles.badge}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    variants={fadeIn}
                >
                    Explore Indonesia
                </motion.span>

                {/* Heading */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    variants={fadeIn}
                    className={styles.headingWrapper}
                >
                    <h1 className={styles.heading}>
                        Unforgettable <br />
                        <span className={styles.headingAccent}>Cultural Journeys.</span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    className={styles.subtitle}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    variants={fadeIn}
                >
                    Turn every trip into a memorable experience. Discover beautiful places, connect with local culture, and travel in comfort.
                </motion.p>

                {/* CTA Bar */}
                {!minimal && (
                    <motion.div
                        className={styles.ctaBar}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                        variants={fadeIn}
                    >
                        <div className={styles.ctaLeft}>
                            <div className={styles.iconCircle}>
                                <Compass className={styles.compassIcon} size={18} />
                            </div>
                            <div className={styles.ctaText}>
                                <span className={styles.ctaLabel}>Where To Go?</span>
                                <div className={styles.tickerWrapper}>
                                    <div
                                        key={animKey}
                                        className={`${styles.tickerItem} ${styles.animate}`}
                                    >
                                        {current.label}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={`/destinations?category=${current.slug}`}
                            className={styles.ctaButton}
                        >
                            <ArrowRight size={24} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}