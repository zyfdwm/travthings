import React from "react";
import { Metadata } from "next";
import DestinationsHero from "@/components/DestinationsHero";
import DestinationCard from "@/components/DestinationCard";
import { getDestinations } from "@/lib/notion";
import styles from "./Destinations.module.css";

export const dynamic = 'force-static';


const CATEGORIES = ["All Destinations", "Jakarta", "Bandung", "Bali", "Yogyakarta"];

interface DestinationsPageProps {
    searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}

export const metadata: Metadata = {
    title: "Destinations | Curated Destinations & Tailored Itineraries",
    description: "Discover Jakarta, Bandung, Bali, and more. Hand-picked spots and expert travel tips curated by the Travel Things team.",
};

export default async function DestinationsPage() {
    const currentPage = 1;
    const itemsPerPage = 6;

    // Fetch real destinations from Notion
    const allDestinations = await getDestinations();


    const selectedCategory = "All Destinations";
    const filteredDestinations = allDestinations;

    // Pagination logic
    const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedDestinations = filteredDestinations.slice(startIndex, startIndex + itemsPerPage);

    return (
        <main className={styles.container}>
            {/* Dedicated Hero for Destinations Page */}
            <DestinationsHero mediaUrl="https://res.cloudinary.com/dgz4njcvb/image/upload/v1775817730/steptodown.com563945_kzhfu9.jpg" />

            {/* Filter Bar */}
            <div className={styles.filterSection}>
                <div className={styles.filterInner}>
                    <div className={styles.pillContainer}>
                        {CATEGORIES.map((cat) => (
                            <a
                                key={cat}
                                href={cat === "All Destinations" ? "/destinations" : `/destinations?category=${cat.toLowerCase()}`}
                                className={`${styles.pill} ${selectedCategory === cat ? styles.pillActive : ""}`}
                            >
                                {cat}
                            </a>
                        ))}
                    </div>
                    <div className={styles.stats}>
                        Showing {paginatedDestinations.length} of {filteredDestinations.length} filtered results
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <section className={styles.gridSection}>
                <div className={styles.grid}>
                    {paginatedDestinations.map((item) => (
                        <DestinationCard key={item.id} item={item} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className={styles.paginationWrapper}>
                        <PaginationWrapper
                            totalPages={totalPages}
                            currentPage={currentPage}
                        />
                    </div>
                )}
            </section>
        </main>
    );
}

function PaginationWrapper({
    totalPages,
    currentPage
}: {
    totalPages: number,
    currentPage: number,
}) {
    const getBaseUrl = (page: number) => {
        return `/destinations?page=${page.toString()}`;
    };

    return (
        <nav className={styles.paginationNav}>
            {currentPage > 1 && (
                <a href={getBaseUrl(currentPage - 1)} className={styles.navBtn}>← Previous</a>
            )}

            <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <a
                        key={page}
                        href={getBaseUrl(page)}
                        className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ""}`}
                    >
                        {page}
                    </a>
                ))}
            </div>

            {currentPage < totalPages && (
                <a href={getBaseUrl(currentPage + 1)} className={styles.navBtn}>Next →</a>
            )}
        </nav>
    );
}
