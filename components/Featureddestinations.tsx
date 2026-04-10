"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./FeaturedDestinations.module.css";

const destinations = [
    {
        title: "Jakarta",
        slug: "?category=jakarta",
        image: "https://res.cloudinary.com/dgz4njcvb/image/upload/v1775839851/Explore_Jakarta_cfyo7b.jpg?q=80&w=1200&auto=format&fit=crop",
        type: "feature",
    },
    {
        title: "Bali",
        slug: "?category=bali",
        image: "https://res.cloudinary.com/dgz4njcvb/image/upload/v1775840218/steptodown.com926926_yzche5.jpg?q=80&w=1200&auto=format&fit=crop",
        type: "small",
        isFeatured: false,
    },
    {
        title: "Bandung",
        // category: "?category=bandung",
        slug: "?category=bandung",
        image: "https://res.cloudinary.com/dgz4njcvb/image/upload/v1775840320/steptodown.com912575_svnoje.jpg?q=80&w=1200&auto=format&fit=crop",
        type: "bottom-left",
    },
    {
        title: "Yogyakarta",
        category: "Yogyakarta",
        slug: "?category=yogyakarta",
        image: "https://res.cloudinary.com/dgz4njcvb/image/upload/v1775840482/steptodown.com996184_s8flth.jpg?q=80&w=1200&auto=format&fit=crop",
        type: "bottom-wide",
    },
];

export default function FeaturedDestinations() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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
        <section className={styles.section} id="destinations">
            <div className={styles.inner}>
                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <motion.div className={styles.headerTitleContainer} variants={itemVariants}>
                        <span className={styles.eyebrow}>Destinations</span>
                        <h2 className={styles.title}>Curated Havens.</h2>
                    </motion.div>
                    <motion.div className={styles.headerDescription} variants={itemVariants}>
                        <p>Travel deeper into Indonesia.
                            Find stays that bring you closer to its culture, nature, and everyday life.</p>
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
                    {/* Big Feature Card */}
                    <motion.div className={styles.cardFeature} variants={itemVariants}>
                        <Link
                            href={`/destinations/${destinations[0].slug}`}
                            className={`${styles.card} ${styles.fullHeight}`}
                        >
                            <img src={destinations[0].image} alt={destinations[0].title} className={styles.cardImage} />
                            <div className={styles.cardOverlay} />
                            <div className={styles.cardContent}>
                                <p className={styles.cardCategory}>{destinations[0].category}</p>
                                <h3 className={styles.cardTitle}>{destinations[0].title}</h3>
                                {/* <span className={styles.cardLink}>Explore Retreat</span> */}
                            </div>
                        </Link>
                    </motion.div>

                    {/* Small Right Card */}
                    <motion.div className={styles.cardSmallWrapper} variants={itemVariants}>
                        <Link
                            href={`/destinations/${destinations[1].slug}`}
                            className={styles.card}
                        >
                            <img src={destinations[1].image} alt={destinations[1].title} className={styles.cardImage} />
                            {destinations[1].isFeatured && <span className={styles.featuredBadge}>Featured</span>}
                            <div className={styles.cardOverlay} />
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitleSmall}>{destinations[1].title}</h3>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Guarantee Card */}
                    <motion.div className={styles.guaranteeCard} variants={itemVariants}>
                        <div className={styles.guaranteeIcon}>
                            <ShieldCheck size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className={styles.guaranteeTitle}>Beyond the Destination.</h3>
                        <p className={styles.guaranteeText}>Explore the extraordinary with total peace of mind. Our experts vet every corner of the globe so we can tailor every second of your escape to your unique pace.</p>
                        <Link href="/destinations" className={styles.guaranteeLink}>
                            Learn more →
                        </Link>
                    </motion.div>

                    {/* Bottom Left Card */}
                    <motion.div className={styles.cardBottomLeft} variants={itemVariants}>
                        <Link
                            href={`/destinations/${destinations[2].slug}`}
                            className={styles.card}
                        >
                            <img src={destinations[2].image} alt={destinations[2].title} className={styles.cardImage} />
                            <div className={styles.cardOverlay} />
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitleSmall}>{destinations[2].title}</h3>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Bottom Wide Card */}
                    <motion.div className={styles.cardBottomWide} variants={itemVariants}>
                        <Link
                            href={`/destinations/${destinations[3].slug}`}
                            className={styles.card}
                        >
                            <img src={destinations[3].image} alt={destinations[3].title} className={styles.cardImage} />
                            <div className={styles.cardOverlay} />
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitleSmall}>{destinations[3].title}</h3>
                            </div>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}