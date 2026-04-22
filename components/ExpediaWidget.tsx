"use client";

import styles from './ExpediaWidget.module.css';

export default function ViatorWidget() {
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
          <div data-gyg-widget="auto" data-gyg-partner-id="KJBNEUM" data-gyg-cmp="travelthings"></div> 
        </div>
      </div>
    </section>
  );
}
