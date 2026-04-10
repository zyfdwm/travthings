"use client";

import React, { useState } from "react";
import DestinationsHero from "@/components/DestinationsHero";
import DestinationCard, { DestinationItem } from "@/components/DestinationCard";
import styles from "./Destinations.module.css";

const CATEGORIES = ["All Curations", "Jakarta", "Bandung", "Bali", "Yogyakarta"];

const MOCK_DESTINATIONS: DestinationItem[] = [
    {
        id: "bali-1",
        title: "Ubud Sanctuary",
        location: "Bali, Indonesia",
        category: "Bali",
        badge: "TRENDING",
        duration: "7 NIGHTS",
        activityType: "WELLNESS",
        price: "From $4,200",
        description: "Immerse yourself in the spiritual heart of Bali with our curated meditation and jungle...",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
        url: "#"
    },
    {
        id: "bali-2",
        title: "Uluwatu Sunset Bar",
        location: "Bali, Indonesia",
        category: "Bali",
        badge: "COASTAL",
        duration: "5 NIGHTS",
        activityType: "LEISURE",
        price: "From $3,100",
        description: "Witness the most stunning cliffside sunsets in Indonesia with exclusive beach club access.",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop",
        url: "#"
    },
    {
        id: "jakarta-1",
        title: "Menteng Heritage",
        location: "Jakarta, Indonesia",
        category: "Jakarta",
        badge: "HISTORIC",
        duration: "3 NIGHTS",
        activityType: "CULTURAL",
        price: "From $1,800",
        description: "Discover the colonial charm of Jakarta's most prestigious neighborhood in a boutique setting.",
        image: "https://img.jakpost.net/c/2017/07/13/2017_07_13_29757_1499945184._large.jpg?q=80&w=1200&auto=format&fit=crop",
        url: "#"
    },
    {
        id: "jakarta-2",
        title: "Sudirman Skyline",
        location: "Jakarta, Indonesia",
        category: "Jakarta",
        badge: "URBAN",
        duration: "Mainly Business",
        activityType: "MODERN",
        price: "From $2,200",
        description: "Experience the pulse of the capital from skyscrapers with private helipad tours.",
        image: "https://citywalkjakarta.com/storage/media/2025/04/04/citywalk-sudirman.png?q=80&w=1200&auto=format&fit=crop",
        url: "#"
    },
    {
        id: "bandung-1",
        title: "Dago Highlands",
        location: "Bandung, Indonesia",
        category: "Bandung",
        badge: "ALPINE",
        duration: "4 NIGHTS",
        activityType: "RETREAT",
        price: "From $1,500",
        description: "Cool mountain breezes and tea plantation vistas await in the Paris of Java.",
        image: "https://assets.promediateknologi.id/crop/0x0:0x0/1200x0/webp/photo/p3/264/2025/11/01/Hotel-Dago-Bandung-4198116116.jpg?q=80&w=1200&auto=format&fit=crop",
        url: "#"
    },
    {
        id: "yogyakarta-1",
        title: "Keraton Elegance",
        location: "Yogyakarta, Indonesia",
        category: "Yogyakarta",
        badge: "ROYAL",
        duration: "4 NIGHTS",
        activityType: "CULTURAL",
        price: "From $2,000",
        description: "Step into the soul of Javanese culture with private visits to the Sultan's Palace.",
        image: "https://geoparkjogja.jogjaprov.go.id/uploads/site/1683517798_e7978510b2b1a5671686.jpg?q=80&w=1200&auto=format&fit=crop",
        url: "#"
    }
];

export default function DestinationsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All Curations");

    const filteredDestinations = selectedCategory === "All Curations"
        ? MOCK_DESTINATIONS
        : MOCK_DESTINATIONS.filter(item => item.category === selectedCategory);

    return (
        <main className={styles.container}>
            {/* Dedicated Hero for Destinations Page */}
            <DestinationsHero mediaUrl="https://res.cloudinary.com/dgz4njcvb/image/upload/v1775817730/steptodown.com563945_kzhfu9.jpg" />

            {/* Filter Bar */}
            <div className={styles.filterSection}>
                <div className={styles.filterInner}>
                    <div className={styles.pillContainer}>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                className={`${styles.pill} ${selectedCategory === cat ? styles.pillActive : ""}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className={styles.stats}>
                        Showing {filteredDestinations.length} of {MOCK_DESTINATIONS.length} destinations
                    </div>
                </div>
            </div>

            {/* Grid */}
            <section className={styles.gridSection}>
                <div className={styles.grid}>
                    {filteredDestinations.map((item) => (
                        <DestinationCard key={item.id} item={item} />
                    ))}
                </div>
            </section>
        </main>
    );
}
