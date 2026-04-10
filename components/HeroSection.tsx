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

export default function HeroSection() {
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
            <div className={styles.bg} />
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
                    Your Travel Partner
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
                        Discover the <br />
                        <span className={styles.headingAccent}>Fluid Horizon.</span>
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
                    Beyond the grid of standard travel booking. We curate
                    experiences that breathe, shift, and inspire the
                    modern explorer.
                </motion.p>

                {/* CTA Bar */}
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
                            <span className={styles.ctaLabel}>Destination</span>
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
            </div>
        </section>
    );
}