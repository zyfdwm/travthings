"use client";

import React from 'react';
import { motion } from "framer-motion";
import styles from './Philosophy.module.css';

const Philosophy: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.21, 0.45, 0.32, 0.9] as any,
      },
    }),
  };

  return (
    <section className={styles.philosophy}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className={styles.quoteIcon} custom={0} variants={fadeIn}>
          <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4286 0L0 12.8571V28.5714H14.2857V12.8571H5.71429L14.2857 0H11.4286ZM37.1429 0L25.7143 12.8571V28.5714H40V12.8571H31.4286L40 0H37.1429Z" fill="currentColor" />
          </svg>
        </motion.div>
        <motion.h2 className={styles.quoteText} custom={1} variants={fadeIn}>
          Travel is the only thing you buy that makes you <span className={styles.highlight}>richer.</span>
        </motion.h2>
        <motion.p className={styles.attribution} custom={2} variants={fadeIn}>
          Travel Things
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Philosophy;
