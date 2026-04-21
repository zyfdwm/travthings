"use client";

import { useEffect } from 'react';
import styles from './ExpediaWidget.module.css';

export default function ViatorWidget() {
  useEffect(() => {
    // Remove any existing Viator script to avoid duplicates on re-render
    const existing = document.querySelector('script[src*="viator.com/orion/partner/widget.js"]');
    if (existing) existing.remove();

    // Inject script AFTER the div is guaranteed to be in the DOM
    const script = document.createElement('script');
    script.src = 'https://www.viator.com/orion/partner/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const s = document.querySelector('script[src*="viator.com/orion/partner/widget.js"]');
      if (s) s.remove();
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          {/* <span className={styles.eyebrow}>Plan Your Trip</span> */}
          <h2 className={styles.title}>Explore Tours & Activities.</h2>
          <p className={styles.description}>
            Discover our handpicked tours, activities, and experiences worldwide.
          </p>
        </div>

        <div className={styles.widgetContainer}>
          <div
            data-vi-partner-id="P00296791"
            data-vi-widget-ref="W-98030bf2-25b7-44ce-99db-2cb82b9ea483"
          ></div>
        </div>
      </div>
    </section>
  );
}
