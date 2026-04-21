"use client";

import Script from 'next/script';
import styles from './ExpediaWidget.module.css';

export default function ExpediaWidget() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Plan Your Trip</span>
          <h2 className={styles.title}>Book Your Next Trip.</h2>
          <p className={styles.description}>
            Find the best deals on flights and stays worldwide through our trusted partner, Expedia.
          </p>
        </div>
        
        <div className={styles.widgetContainer}>
            <div 
              className="eg-widget" 
              data-widget="search" 
              data-program="us-expedia" 
              data-lobs="stays,flights" 
              data-network="pz" 
              data-camref="1011l5I4zS" 
              data-pubref=""
            ></div>
            <Script 
              src="https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js"
              strategy="lazyOnload"
            />
        </div>
      </div>
    </section>
  );
}
