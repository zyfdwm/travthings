"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./HeroSection.module.css";

const destinations = [
    { label: "Jakarta, Indonesia", slug: "jakarta" },
    { label: "Bandung, Indonesia", slug: "bandung" },
    { label: "Bali, Indonesia", slug: "bali" },
    { label: "Yogyakarta, Indonesia", slug: "yogyakarta" },
];

function PinIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

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

    return (
        <section className={styles.hero}>
            <div className={styles.bg} />
            <div className={styles.overlay} />

            <div className={styles.content}>
                {/* Badge */}
                <span className={styles.badge}>Your Travel Partner</span>

                {/* Heading */}
                <span className={styles.headingBlack}>Discover the</span>
                <span className={styles.headingBlue}>Fluid Horizon.</span>

                {/* Subtitle */}
                <p className={styles.subtitle}>
                    Beyond the grid of standard travel booking. We curate
                    experiences that breathe, shift, and inspire the
                    modern explorer.
                </p>

                {/* CTA Bar */}
                <div className={styles.ctaBar}>
                    <div className={styles.ctaLeft}>
                        <PinIcon className={styles.pinIcon} />
                        <div className={styles.ctaText}>
                            <span className={styles.ctaLabel}>Where to go?</span>
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
                        Explore Now
                        <span className={styles.arrow}>→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}