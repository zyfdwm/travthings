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
    const [blocks, relatedPosts] = await Promise.all([
        getPageBlocks(post.id),
        getMoreInsightPosts(post.id, 3)
    ]);

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
                        <span className={styles.dot}>•</span>
                        <time className={styles.date}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                        <span className={styles.dot}>•</span>
                        <div className={styles.authorBadge}>
                            <User size={16} className={styles.authorIcon} />
                            <span className={styles.authorName}>{post.author}</span>
                        </div>
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
