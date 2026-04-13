"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import DestinationCard from "./DestinationCard";
import DestinationsHero from "./DestinationsHero";
import styles from "@/app/destinations/Destinations.module.css";
import { DestinationItem } from "@/lib/notion";

const CATEGORIES = ["All Destinations", "Jakarta", "Bandung", "Bali", "Yogyakarta"];

interface DestinationsClientProps {
    allDestinations: DestinationItem[];
}

export default function DestinationsClient({ allDestinations }: DestinationsClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // Read params from URL
    const categoryQuery = searchParams.get("category") || "all destinations";
    const searchQuery = searchParams.get("search") || "";
    const pageQuery = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;

    // Local state for the search input to keep it snappy
    const [localSearch, setLocalSearch] = useState(searchQuery);

    // Sync local search with URL if it changes (e.g. from Navbar)
    useEffect(() => {
        setLocalSearch(searchQuery);
    }, [searchQuery]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (localSearch.trim()) {
            params.set("search", localSearch.trim());
        } else {
            params.delete("search");
        }
        params.delete("page"); // Reset to page 1 on search
        router.push(`/destinations?${params.toString()}`);
    };

    const clearSearch = () => {
        setLocalSearch("");
        const params = new URLSearchParams(searchParams.toString());
        params.delete("search");
        params.delete("page");
        router.push(`/destinations?${params.toString()}`);
    };

    const itemsPerPage = 6;

    // Filter logic
    const filteredDestinations = useMemo(() => {
        return allDestinations.filter(item => {
            const matchesCategory = categoryQuery === "all destinations" || 
                                    item.category.toLowerCase() === categoryQuery.toLowerCase();
            
            const matchesSearch = !searchQuery || 
                                   item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   item.category.toLowerCase().includes(searchQuery.toLowerCase());
            
            return matchesCategory && matchesSearch;
        });
    }, [allDestinations, categoryQuery, searchQuery]);

    const selectedCategory = CATEGORIES.find(c => c.toLowerCase() === categoryQuery.toLowerCase()) || "All Destinations";
    
    // Pagination logic
    const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
    const currentPage = Math.max(1, Math.min(pageQuery, totalPages || 1));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedDestinations = filteredDestinations.slice(startIndex, startIndex + itemsPerPage);

    const getBaseUrl = (pageNumber: number) => {
        const params = new URLSearchParams();
        if (categoryQuery && categoryQuery !== "all destinations") params.set("category", categoryQuery);
        if (searchQuery) params.set("search", searchQuery);
        params.set("page", pageNumber.toString());
        return `/destinations?${params.toString()}`;
    };

    return (
        <main className={styles.container}>
            <DestinationsHero mediaUrl="https://res.cloudinary.com/dgz4njcvb/image/upload/v1775817730/steptodown.com563945_kzhfu9.jpg" />

            <div className={styles.filterSection}>
                <div className={styles.filterInner}>
                    <div className={styles.filterBar}>
                        <div className={styles.pillContainer}>
                            {CATEGORIES.map((cat) => {
                                const active = selectedCategory === cat;
                                const params = new URLSearchParams();
                                if (cat !== "All Destinations") params.set("category", cat.toLowerCase());
                                if (searchQuery) params.set("search", searchQuery);
                                const href = params.toString() ? `/destinations?${params.toString()}` : "/destinations";
                                
                                return (
                                    <a
                                        key={cat}
                                        href={href}
                                        className={`${styles.pill} ${active ? styles.pillActive : ""}`}
                                    >
                                        {cat}
                                    </a>
                                );
                            })}
                        </div>
                        
                        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
                            <Search className={styles.searchIcon} size={18} />
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                className={styles.searchInput}
                            />
                            {localSearch && (
                                <button type="button" onClick={clearSearch} className={styles.clearBtn}>
                                    <X size={14} />
                                </button>
                            )}
                        </form>
                    </div>

                    <div className={styles.stats}>
                        {searchQuery ? (
                            <>Results for &quot;{searchQuery}&quot; in {selectedCategory}</>
                        ) : (
                            <>Showing {paginatedDestinations.length} of {filteredDestinations.length} {selectedCategory === "All Destinations" ? "destinations" : `destinations in ${selectedCategory}`}</>
                        )}
                    </div>
                </div>
            </div>

            <section className={styles.gridSection}>
                {filteredDestinations.length > 0 ? (
                    <>
                        <div className={styles.grid}>
                            {/* Row 1: First 3 Destinations */}
                            {paginatedDestinations.slice(0, 3).map((item) => (
                                <DestinationCard key={item.id} item={item} />
                            ))}

                            {/* Row 2: GetYourGuide Widget - Now shown on all pages */}
                            <div className={styles.gygWidgetContainer}>
                                <div 
                                    data-gyg-widget="auto" 
                                    data-gyg-partner-id="KJBNEUM" 
                                    data-gyg-cmp="Activity"
                                ></div>
                            </div>

                            {/* Row 3: Remaining Destinations (indices 3-5) */}
                            {paginatedDestinations.slice(3).map((item) => (
                                <DestinationCard key={item.id} item={item} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className={styles.paginationWrapper}>
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
                            </div>
                        )}
                    </>
                ) : (
                    <div className={styles.noResults}>
                        <h3>No destinations found</h3>
                        <p>Try adjusting your search or filters to find what you&apos;re looking for.</p>
                        <a href="/destinations" className={styles.clearFilter}>Clear all filters</a>
                    </div>
                )}
            </section>
        </main>
    );
}
