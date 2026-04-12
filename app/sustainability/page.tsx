import React from "react";
import { Metadata } from "next";
import styles from "../SecondaryPage.module.css";

export const metadata: Metadata = {
    title: "Sustainability | Travel Things",
    description: "Our commitment to responsible travel and environmental stewardship.",
};

export default function SustainabilityPage() {
    return (
        <main className={styles.container}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <span className={styles.eyebrow}>Commitment</span>
                    <h1 className={styles.title}>Sustainability</h1>
                </header>

                <div className={styles.content}>
                    <p>
                        Travel is a privilege that comes with a responsibility. At Travel Things, we believe that high-end exploration must exist in harmony with the environment and the local communities that host us.
                    </p>

                    <h2>1. Responsible Discovery</h2>
                    <p>
                        We prioritize destinations and partners that demonstrate a commitment to low-impact travel. From eco-conscious stays to supporting local artisans, we believe in travel that preserves the beauty of the world for future generations.
                    </p>

                    <h2>2. Cultural Preservation</h2>
                    <p>
                        True sustainability is not just about the environment; it is about preserving the cultural integrity of a place. We encourage our readers to engage deeply and respectfully with local traditions, ensuring that travel remains a force for cultural exchange and mutual growth.
                    </p>

                    <h2>3. Reducing Our Footprint</h2>
                    <p>
                        Digital efficiency is part of our strategy. By optimizing our platform and partnering with carbon-neutral hosting services, we strive to keep our digital footprint as minimal as possible.
                    </p>

                    <h2>4. Looking Forward</h2>
                    <p>
                        Our mission is an ongoing journey. We are constantly seeking new ways to integrate sustainable practices into our curated itineraries and stories, helping our community travel more consciously without compromising on experience.
                    </p>

                    <p className={styles.lastUpdated}>
                        &quot;Take only memories, leave only footprints.&quot; — Chief Seattle
                    </p>
                </div>
            </div>
        </main>
    );
}
