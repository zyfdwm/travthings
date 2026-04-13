import React from "react";
import { Metadata } from "next";
import styles from "../SecondaryPage.module.css";

export const metadata: Metadata = {
    title: "Press Inquiries | Travel Things",
    description: "Media assets, press releases, and brand information for Travel Things.",
};

export default function PressPage() {
    return (
        <main className={styles.container}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <span className={styles.eyebrow}>Media</span>
                    <h1 className={styles.title}>Press Inquiries</h1>
                </header>

                <div className={styles.content}>
                    <p>
                        Travel Things is a leading digital destination for modern nomads and luxury seekers.
                        We welcome opportunities to collaborate with global media houses, journalists, and brand partners.
                    </p>

                    <h2>1. About Us</h2>
                    <p>
                        Founded with a vision to redefine travel through high-end curation and editorial-depth storytelling,
                        Travel Things has quickly become a trusted voice in the modern exploration space.
                        We focus on destinations that offer cultural depth, impeccable design, and human connection.
                    </p>

                    <h2>2. Brand Assets</h2>
                    <p>
                        High-resolution logos, brand guidelines, and selected photography from our curated destinations are available for download upon request. Any use of Travel Things assets requires prior written approval.
                    </p>

                    <h2>3. Interview Requests</h2>
                    <p>
                        Our founders and editorial team are available for interviews regarding travel trends, cultural discovery, and the future of experience-based luxury travel.
                    </p>

                    <h2>4. Contact Media Relations</h2>
                    <p>
                        For all press and media-related inquiries, please contact our global communications team at:
                        <br />
                        <a href="mailto:pres@travelthings.pages.dev" style={{ color: "var(--color-primary)", fontWeight: "bold" }}>
                            press@travelthings.com
                        </a>
                    </p>

                    <p className={styles.lastUpdated}>
                        We respond to all media inquiries within 24-48 business hours.
                    </p>
                </div>
            </div>
        </main>
    );
}
