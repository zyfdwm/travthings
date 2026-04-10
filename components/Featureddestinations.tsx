import Link from "next/link";
import styles from "./Featureddestinations.module.css";

const destinations = [
    {
        title: "The Bali Highlands",
        category: "Cultural Retreat",
        sub: "Ubud & Kintamani Collection",
        slug: "bali",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85",
        big: true,
    },
    {
        title: "Yogyakarta",
        category: "Heritage & Temples",
        sub: "Borobudur Edition",
        slug: "yogyakarta",
        image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=700&q=85",
        big: false,
    },
    {
        title: "Old Batavia",
        category: "Urban Explorer",
        sub: "Hidden Gems Edition",
        slug: "jakarta",
        image: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=700&q=85",
        big: false,
    },
];

export default function FeaturedDestinations() {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h2>Curated Destinations</h2>
                        <p>Handpicked escapes that define the new standard of editorial travel.</p>
                    </div>
                    <Link href="/destinations" className={styles.viewAll}>
                        Explore Destinations →
                    </Link>
                </div>

                {/* Grid */}
                <div className={styles.grid}>
                    {destinations.map((d) => (
                        <Link
                            key={d.slug}
                            href={`/destinations?category=${d.slug}`}
                            className={`${styles.card} ${d.big ? styles.cardBig : styles.cardSmall}`}
                        >
                            <img src={d.image} alt={d.title} />
                            <div className={styles.cardOverlay} />
                            <div className={styles.cardInfo}>
                                <p className={styles.cardCategory}>{d.category}</p>
                                <h3 className={styles.cardTitle}>{d.title}</h3>
                                <p className={styles.cardSub}>{d.sub}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}