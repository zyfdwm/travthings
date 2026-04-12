import React from "react";
import { Metadata } from "next";
import styles from "../SecondaryPage.module.css";

export const metadata: Metadata = {
    title: "Terms of Service | Travel Things",
    description: "The rules and conditions governing the use of the Travel Things platform.",
};

export default function TermsPage() {
    return (
        <main className={styles.container}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <span className={styles.eyebrow}>Legal</span>
                    <h1 className={styles.title}>Terms of Service</h1>
                </header>

                <div className={styles.content}>
                    <p>
                        Welcome to Travel Things. By accessing our platform, you agree to be bound by these terms and conditions. 
                        Please read them carefully to ensure our relationship remains as seamless as your travels.
                    </p>

                    <h2>1. Use of Content</h2>
                    <p>
                        All content provided on Travel Things, including text, imagery, and design, is the property of Travel Things protected by international copyright laws. You may access this content for personal, non-commercial use only.
                    </p>

                    <h2>2. Community Standards</h2>
                    <p>
                        We strive for a community built on respect and a shared love for exploration. Any interaction on our platform must remain professional and respectful. 
                        We reserve the right to restrict access to users who violate these standards.
                    </p>

                    <h2>3. Third-Party Links</h2>
                    <p>
                        Our platform may contain links to third-party websites for your convenience. We do not endorse these sites and are not responsible for their content or reliability.
                    </p>

                    <h2>4. Limitation of Liability</h2>
                    <p>
                        While we aim for perfection in our curated travel advice, Travel Things is not liable for any discrepancies or changes in destination availability, pricing, or conditions. Travel involves inherent risks, and we advise all readers to exercise their own judgement.
                    </p>

                    <h2>5. Governing Law</h2>
                    <p>
                        These terms shall be governed by and construed in accordance with international digital commerce standards.
                    </p>

                    <p className={styles.lastUpdated}>
                        Last updated: April 12, 2026
                    </p>
                </div>
            </div>
        </main>
    );
}
