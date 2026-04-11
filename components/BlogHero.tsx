import React from "react";
import styles from "./BlogHero.module.css";

export default function BlogHero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Let's Make the Journey.
                </h1>
                <p className={styles.subtitle}>
                    A curated space for the curious traveler. Deeper context, quieter discoveries, and editorial perspectives you won't find anywhere else.
                </p>
            </div>
        </section>
    );
}
