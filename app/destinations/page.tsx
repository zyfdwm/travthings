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

export async function generateMetadata({ searchParams }: DestinationsPageProps): Promise<Metadata> {
    const { category } = await searchParams;

    // Logic for Destination Name
    let destinationName = "Indonesia";
    if (category && category.toLowerCase() !== "all destinations") {
        destinationName = category.charAt(0).toUpperCase() + category.slice(1);
    }

    return {
        title: `${destinationName} Destinations | Curated Destinations & Tailored Itineraries`,
        description: `Plan your trip to ${destinationName}. Discover hand-picked spots, expert tips, and tailored travel plans curated by the Travel Things team.`,
    };
}

export default async function DestinationsPage({ searchParams }: DestinationsPageProps) {
    const { category, search, page } = await searchParams;
    const currentPage = Number(page) || 1;
    const itemsPerPage = 6;

    // Fetch real destinations from Notion
    const allDestinations = await getDestinations();

    const selectedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Destinations";
    const searchQuery = search?.toLowerCase() || "";

    const filteredDestinations = allDestinations.filter(item => {
        const matchesCategory = selectedCategory === "All Destinations" || item.category === selectedCategory;
        const matchesSearch = !searchQuery ||
            item.title.toLowerCase().includes(searchQuery) ||
            item.location.toLowerCase().includes(searchQuery) ||
            item.category.toLowerCase().includes(searchQuery) ||
            item.description.toLowerCase().includes(searchQuery);

        return matchesCategory && matchesSearch;
    });

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
                            category={category}
                            search={search}
                        />
                    </div>
                )}
            </section>
        </main>
    );
}

function PaginationWrapper({
    totalPages,
    currentPage,
    category,
    search
}: {
    totalPages: number,
    currentPage: number,
    category?: string,
    search?: string
}) {
    const getBaseUrl = (page: number) => {
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        if (search) params.set("search", search);
        params.set("page", page.toString());
        return `/destinations?${params.toString()}`;
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
