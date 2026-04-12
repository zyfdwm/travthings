import React from "react";
import { Metadata } from "next";
import styles from "../SecondaryPage.module.css";

export const metadata: Metadata = {
    title: "Privacy Policy | Travel Things",
    description: "Our commitment to protecting your personal information and privacy.",
};

export default function PrivacyPage() {
    return (
        <main className={styles.container}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <span className={styles.eyebrow}>Legal</span>
                    <h1 className={styles.title}>Privacy Policy</h1>
                </header>

                <div className={styles.content}>
                    <p>
                        At Travel Things, we specialize in curated experiences and high-end discovery. 
                        To provide our services, we collect certain information about our readers and clients. 
                        Your privacy is not just a legal requirement for us—it is a core value of our premium brand.
                    </p>

                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect information that allows us to personalize your travel discovery experience. This includes:
                    </p>
                    <ul>
                        <li>Subscription details (email addresses and names) for our curated newsletters.</li>
                        <li>Interaction data to understand which destinations and articles resonate most with our audience.</li>
                        <li>Technical information such as IP addresses and browser types to ensure our platform performs impeccably across all devices.</li>
                    </ul>

                    <h2>2. How We Use Your Data</h2>
                    <p>
                        Your data is used exclusively to enhance your experience with Travel Things. We do not sell your personal information to third parties. We use your data to:
                    </p>
                    <ul>
                        <li>Deliver tailored travel insights and iteneraries.</li>
                        <li>Improve the aesthetic and functional performance of our website.</li>
                        <li>Communicate important updates regarding our community and services.</li>
                    </ul>

                    <h2>3. Data Protection</h2>
                    <p>
                        We implement industry-leading security measures to protect your sensitive data from unauthorized access, alteration, or disclosure. As a premium platform, we prioritize the integrity of our relationship with you.
                    </p>

                    <h2>4. Your Rights</h2>
                    <p>
                        You have the right to access, update, or request the deletion of your personal data at any time. For such inquiries, please contact our privacy team directly.
                    </p>

                    <p className={styles.lastUpdated}>
                        Last updated: April 12, 2026
                    </p>
                </div>
            </div>
        </main>
    );
}
