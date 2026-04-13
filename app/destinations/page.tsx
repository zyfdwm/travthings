import React, { Suspense } from "react";
import { Metadata } from "next";
import { getDestinations } from "@/lib/notion";
import DestinationsClient from "@/components/DestinationsClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Travel Things | Curated Destinations & Tailored Itineraries",
    description: "Discover Jakarta, Bandung, Bali, and more. Hand picked spots and expert travel tips curated by the Travel Things team.",
};

export default async function DestinationsPage() {
    // Fetch real destinations from Notion at build time
    const allDestinations = await getDestinations();

    return (
        <Suspense fallback={<div>Loading destinations...</div>}>
            <DestinationsClient allDestinations={allDestinations} />
        </Suspense>
    );
}
