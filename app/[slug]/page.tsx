import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPageBlocks, getMoreInsightPosts, getBlogPosts } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import ArticleSidebar from "@/components/ArticleSidebar";
import BlogCard from "@/components/BlogCard";
import { User } from "lucide-react";
import styles from "./Article.module.css";
import Link from "next/link";

interface ArticlePageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found | Travel Things",
        };
    }

    return {
        title: `${post.title} | Travel Things`,
        description: post.description,
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;

    // Fetch the post metadata
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Fetch block content and related posts
    const [rawBlocks, relatedPosts] = await Promise.all([
        getPageBlocks(post.id),
        getMoreInsightPosts(post.id, 3)
    ]);

    // Inject GYG Widgets into the content dynamically
    const transformBlocks = (blocks: any[]) => {
        const transformed = [];
        const widgetInterval = 5; // Reduced from 8 for more frequent injection
        let blocksSinceLastWidget = 0; // Start at 0 so widgets appear earlier
        let lastWidgetType = "viator"; // Start with GYG next
        
        // Ambil lokasi dari Tag pertama (karena Category isinya Travel Guide, Tips, dll)
        const locationKeyword = post.tags?.[0] || post.category || "Indonesia";

        // VARIATIONS: biar gak muncul itu-itu aja tiap scroll
        const viatorVariations = [
            `Things to do in ${locationKeyword}`,
            `Best tours in ${locationKeyword}`,
            `Private tours in ${locationKeyword}`,
            `Top rated activities in ${locationKeyword}`
        ];
        let viatorCounter = 0;

        for (let i = 0; i < blocks.length; i++) {
            transformed.push(blocks[i]);
            blocksSinceLastWidget++;

            if (blocksSinceLastWidget >= widgetInterval && i < blocks.length - 2) {
                const isGYG = lastWidgetType === "viator";
                const widgetType = isGYG ? "gyg_widget" : "viator_widget";
                
                transformed.push({
                    id: `injected-widget-${i}`,
                    type: widgetType,
                    [widgetType]: { 
                        title: isGYG ? "Recommended for Your Trip" : "Must-Do Activities",
                        ref: isGYG ? undefined : "W-bf601b97-c77c-4223-acf5-883f005364ec",
                        query: isGYG 
                            ? locationKeyword 
                            : viatorVariations[viatorCounter++ % viatorVariations.length]
                    }
                });
                
                lastWidgetType = isGYG ? "gyg" : "viator";
                blocksSinceLastWidget = 0;
            }
        }

        return transformed;
    };

    const blocks = transformBlocks(rawBlocks);

    return (
        <main className={styles.mainContainer}>
            {/* Immersive Hero Section */}
            <header className={styles.hero}>
                <div className={styles.heroBg}>
                    {post.cover && (
                        <img src={post.cover} alt={post.title} className={styles.heroImage} />
                    )}
                    <div className={styles.overlay} />
                </div>

                <div className={styles.heroContent}>
                    <div className={styles.heroMeta}>
                        <span className={styles.category}>{post.category}</span>
                    </div>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.heroDescription}>{post.description}</p>
                </div>
            </header>

            {/* Layout Wrapper */}
            <div className={styles.layoutWrapper}>
                <div className={styles.contentLayout}>

                    {/* Main Article Content */}
                    <article className={styles.articleBody}>

                        {/* Author Profile Header */}
                        <div className={styles.authorProfile}>
                            <img
                                src="https://res.cloudinary.com/dgz4njcvb/image/upload/v1775924999/chrome_ZjACvfgLGJ_xcid2a.png"
                                alt={post.author}
                                className={styles.authorAvatar}
                            />
                            <div className={styles.authorDetails}>
                                <span className={styles.authorProfileName}>{post.author}</span>
                                <div className={styles.authorSubMeta}>
                                    <span className={styles.authorRole}>Your Travel Partner</span>
                                    <span className={styles.authorDot}>•</span>
                                    <time className={styles.authorDate}>
                                        {new Date(post.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        }).toUpperCase()}
                                    </time>
                                </div>
                            </div>
                        </div>

                        <NotionRenderer blocks={blocks} />

                        {/* Tags Footer */}
                        {post.tags.length > 0 && (
                            <footer className={styles.articleFooter}>
                                <div className={styles.tags}>
                                    {post.tags.map(tag => (
                                        <span key={tag} className={styles.tag}>#{tag}</span>
                                    ))}
                                </div>
                            </footer>
                        )}
                    </article>

                    {/* Sidebar */}
                    <ArticleSidebar title={post.title} slug={post.slug} />
                </div>
            </div>

            {/* More Insight section */}
            {relatedPosts.length > 0 && (
                <section className={styles.moreInsight}>
                    <div className={styles.inner}>
                        <h2 className={styles.sectionTitle}>More Insight</h2>
                        <div className={styles.relatedGrid}>
                            {relatedPosts.map((relatedPost) => (
                                <BlogCard key={relatedPost.id} post={relatedPost} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
