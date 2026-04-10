import React from "react";
import styles from "./BlogHero.module.css";

export default function BlogHero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Perspectives on the <span className={styles.accent}>Fluid Horizon.</span>
                </h1>
                <p className={styles.subtitle}>
                    Expert insights, hidden trails, and curated itineraries designed for the modern explorer.
                    No standard lists, just editorial depth.
                </p>
            </div>
        </section>
    );
}
