"use client";

import React, { useMemo } from "react";
import { useSearchParams, redirect } from "next/navigation";
import BlogMainHero from "./BlogMainHero";
import FeaturedPost from "./FeaturedPost";
import BlogCard from "./BlogCard";
import styles from "@/app/blog/BlogPage.module.css";
import { BlogPost } from "@/lib/notion";

interface BlogClientProps {
    allPosts: BlogPost[];
}

export default function BlogClient({ allPosts }: BlogClientProps) {
    const searchParams = useSearchParams();
    
    // Read params from URL
    const searchQuery = searchParams.get("search") || "";
    const pageQuery = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
    
    const postsPerPage = 6;

    // Filtering logic
    const filteredPosts = useMemo(() => {
        if (!searchQuery) return allPosts;
        
        const q = searchQuery.toLowerCase();
        return allPosts.filter(post => 
            post.title.toLowerCase().includes(q) ||
            post.description.toLowerCase().includes(q) ||
            post.category.toLowerCase().includes(q) ||
            post.tags.some(tag => tag.toLowerCase().includes(q))
        );
    }, [allPosts, searchQuery]);

    // Identify the featured post (only if explicitly checked and NOT searching)
    const featuredPost = !searchQuery ? filteredPosts.find(post => post.isFeatured) : null;

    // Grid posts (excluding the featured one if it exists)
    const gridPostsSource = featuredPost
        ? filteredPosts.filter(post => post.id !== featuredPost.id)
        : filteredPosts;

    // Pagination logic
    const totalPages = Math.ceil(gridPostsSource.length / postsPerPage);
    const currentPage = Math.max(1, Math.min(pageQuery, totalPages || 1));

    // Redirect if page is out of bounds (only on client)
    // Actually, it's better to just show page 1 or the last page
    
    const startIndex = (currentPage - 1) * postsPerPage;
    const paginatedPosts = gridPostsSource.slice(startIndex, startIndex + postsPerPage);

    const getBaseUrl = (pageNumber: number) => {
        const params = new URLSearchParams();
        if (searchQuery) params.set("search", searchQuery);
        params.set("page", pageNumber.toString());
        return `/blog?${params.toString()}`;
    };

    if (allPosts.length === 0) {
        return (
            <main className={styles.container}>
                <BlogMainHero
                    mediaUrl="https://res.cloudinary.com/dgz4njcvb/image/upload/v1775920048/steptodown.com423139_qgdmdt.jpg"
                    badge="Blog"
                    title={<>Let's Make the Journey.</>}
                    description="A curated space for the curious traveler. Deeper context, quieter discoveries, and editorial perspectives you won't find anywhere else."
                />
                <div className={styles.empty}>
                    <p>No posts found. Check back soon!</p>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <BlogMainHero
                mediaUrl="https://res.cloudinary.com/dgz4njcvb/image/upload/v1775920048/steptodown.com423139_qgdmdt.jpg"
                badge="Blog"
                title={<>Let's Make the Journey.</>}
                description="A curated space for the curious traveler. Deeper context, quieter discoveries, and editorial perspectives you won't find anywhere else."
            />

            {/* Show search status if searching */}
            {searchQuery && (
                <div className={styles.searchStatus}>
                    <h2>Search results for &quot;{searchQuery}&quot;</h2>
                    <p>Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}</p>
                    <a href="/blog" className={styles.clearSearch}>Clear search</a>
                </div>
            )}

            {/* Show Featured Post strictly if it exists, we're on page 1, and NOT searching */}
            {currentPage === 1 && featuredPost && !searchQuery && (
                <FeaturedPost post={featuredPost} />
            )}

            <section className={styles.gridSection}>
                {paginatedPosts.length > 0 ? (
                    <>
                        <div className={styles.grid}>
                            {paginatedPosts.map((post) => (
                                <BlogCard key={post.id} post={post} />
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
                    <div className={styles.empty}>
                        <p>No posts match your search criteria.</p>
                        <a href="/blog" className={styles.navBtn}>Back to all posts</a>
                    </div>
                )}
            </section>
        </main>
    );
}
