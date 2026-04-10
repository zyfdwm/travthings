import React from "react";
import { Metadata } from "next";
import { getBlogPosts } from "@/lib/notion";
import BlogMainHero from "@/components/BlogMainHero";
import FeaturedPost from "@/components/FeaturedPost";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import styles from "./BlogPage.module.css";
import { redirect } from "next/navigation";

interface BlogPageProps {
    searchParams: Promise<{ page?: string; search?: string }>;
}

export const metadata: Metadata = {
    title: "Blog | Curated Destinations & Tailored Itineraries",
    description: "Get the latest travel tips, trends, and hidden gems from our expert contributors.",
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const searchQuery = params.search?.toLowerCase() || "";
    const postsPerPage = 6;

    // Fetch all published posts
    const allPosts = await getBlogPosts();

    // Filter posts if there is a search query
    const filteredPosts = searchQuery
        ? allPosts.filter(post =>
            post.title.toLowerCase().includes(searchQuery) ||
            post.description.toLowerCase().includes(searchQuery) ||
            post.category.toLowerCase().includes(searchQuery) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        )
        : allPosts;

    if (filteredPosts.length === 0 && searchQuery) {
        return (
            <main className={styles.container}>
                <BlogMainHero
                    mediaUrl="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
                    badge="Search Results"
                    title={<>Results for <span>"{params.search}"</span></>}
                    description={`We couldn't find any articles matching your search. Try a different keyword.`}
                />
                <div className={styles.empty}>
                    <p>No matches found.</p>
                </div>
            </main>
        );
    }

    if (allPosts.length === 0) {
        return (
            <main className={styles.container}>
                <BlogMainHero
                    mediaUrl="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
                    badge="Blog"
                    title={<>Some Places Don't Make the List — They Make the Journey.</>}
                    description="A curated space for the curious traveler. Deeper context, quieter discoveries, and editorial perspectives you won't find anywhere else."
                />
                <div className={styles.empty}>
                    <p>No posts found. Check back soon!</p>
                </div>
            </main>
        );
    }

    // Identify the featured post (only if explicitly checked and NOT searching)
    const featuredPost = !searchQuery ? filteredPosts.find(post => post.isFeatured) : null;

    // Grid posts (excluding the featured one if it exists)
    const gridPostsSource = featuredPost
        ? filteredPosts.filter(post => post.id !== featuredPost.id)
        : filteredPosts;

    // Pagination logic
    const totalPages = Math.ceil(gridPostsSource.length / postsPerPage);

    // Safety check for empty pages
    if (currentPage > totalPages && totalPages > 0) {
        redirect(searchQuery ? `/blog?search=${searchQuery}&page=1` : "/blog?page=1");
    }

    const startIndex = (currentPage - 1) * postsPerPage;
    const paginatedPosts = gridPostsSource.slice(startIndex, startIndex + postsPerPage);

    return (
        <main className={styles.container}>
            <BlogMainHero
                mediaUrl="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
                badge={searchQuery ? "Search Results" : "Blog"}
                title={searchQuery ? <>Results for <span>"{params.search}"</span></> : <>Some Places Don't Make the List — They Make the Journey.</>}
                description={searchQuery ? `Showing ${filteredPosts.length} matches for your query.` : "A curated space for the curious traveler. Deeper context, quieter discoveries, and editorial perspectives you won't find anywhere else."}
            />

            {/* Show Featured Post strictly if it exists, we're on page 1, and NOT searching */}
            {currentPage === 1 && featuredPost && !searchQuery && (
                <FeaturedPost post={featuredPost} />
            )}

            <section className={styles.gridSection}>
                <div className={styles.grid}>
                    {paginatedPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                <div className={styles.paginationWrapper}>
                    {/* We need a client wrapper for pagination to handle navigation or just use links */}
                    {/* For now, I'll pass a simple navigation handler to a Client component */}
                    <PaginationWrapper totalPages={totalPages} currentPage={currentPage} />
                </div>
            </section>
        </main>
    );
}

// Inline Pagination Wrapper for simplicity in this turn
// In a real scenario, this would be a separate file or handled more elegantly
function PaginationWrapper({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {
    return (
        <nav className={styles.paginationNav}>
            {currentPage > 1 && (
                <a href={`/blog?page=${currentPage - 1}`} className={styles.navBtn}>← Previous</a>
            )}

            <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <a
                        key={page}
                        href={`/blog?page=${page}`}
                        className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ""}`}
                    >
                        {page}
                    </a>
                ))}
            </div>

            {currentPage < totalPages && (
                <a href={`/blog?page=${currentPage + 1}`} className={styles.navBtn}>Next →</a>
            )}
        </nav>
    );
}
