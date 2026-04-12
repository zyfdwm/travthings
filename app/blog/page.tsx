import React, { Suspense } from "react";
import { Metadata } from "next";
import { getBlogPosts } from "@/lib/notion";
import BlogClient from "@/components/BlogClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Blog | Curated Destinations & Tailored Itineraries",
    description: "Get the latest travel tips, trends, and hidden gems from our expert contributors.",
};

export default async function BlogPage() {
    // Fetch all published posts at build time
    const allPosts = await getBlogPosts();

    return (
        <Suspense fallback={<div>Loading blog...</div>}>
            <BlogClient allPosts={allPosts} />
        </Suspense>
    );
}
