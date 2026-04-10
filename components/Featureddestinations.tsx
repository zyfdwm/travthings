"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./FeaturedDestinations.module.css";

const destinations = [
    {
        title: "The Arctic Glasshouse",
        category: "Norway",
        slug: "arctic-glasshouse",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqapeJtdyYj-v_no-qRtQghBqkOkaJyfR3Y15RoZSmO_oTB7kpF5qHUA9lgxlcr25DWK8OJzEYPyAzP58hulokIl3P5gVmV7JBuXuG2KCUqmH4Hse1Yo8r-oPVhWfJtgi8n1yZ2xolnrZ0ZOJsmLGul3FScy6BkxKfxNjdF_RO0s4IcNgLTFDrnKx8KnXh627FDvEhyiAVYaGonKNmFVvbnu5WMH1TADEDmFC1FosuB7LsmQPOlW5z1baavD5TYOXD0-_TeUq4BPQ?q=80&w=1200&auto=format&fit=crop",
        type: "feature",
    },
    {
        title: "Riad Emeraude",
        category: "Morocco",
        slug: "riad-emeraude",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwgSEnlttvFUDizZ4bsIkEFbCIu3TJfiFfyyHRvbcld_xC91aJ0B04lUCPP89kd_lT-regwoMVcrYM_heirBcyttjeZSGxiWUdmMMNV8VXoy9CFiTo-FjAHe9iJL9tZyTDi0TvNXFjVa0JooEEUhQx1yVbHcJVO7onbDKgRmisohVFT4LR8FVF2FjBL3G_qntTA_rlaxseQczN4N6Jg9aHangAuhcsv69IhC2wx7SyuuvFTuEl2Rv7dK5n2tH8Rh9m2_30QU93VV4?q=80&w=1200&auto=format&fit=crop",
        type: "small",
        isFeatured: true,
    },
    {
        title: "Maldivian Solitude",
        category: "Maldives",
        slug: "maldives",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop",
        type: "bottom-left",
    },
    {
        title: "Aegean Chronicles",
        category: "Greece",
        slug: "aegean",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
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
                        <p>Moving beyond luxury. We identify properties that possess a unique spirit, an architectural voice, and a deep sense of place.</p>
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
                                <span className={styles.cardLink}>Explore Retreat</span>
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
                        <h3 className={styles.guaranteeTitle}>The Concierge Guarantee.</h3>
                        <p className={styles.guaranteeText}>Every destination verified by our experts. Every itinerary tailored to your pulse.</p>
                        <Link href="/concierge" className={styles.guaranteeLink}>
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