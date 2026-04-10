"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./DestinationsHero.module.css";

interface DestinationsHeroProps {
    mediaUrl: string;
}

export default function DestinationsHero({ mediaUrl }: DestinationsHeroProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isVideo = (url: string) => {
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
        const isExtMatch = videoExtensions.some(ext => url.toLowerCase().includes(ext));
        const isCloudinaryVideo = url.toLowerCase().includes('/video/upload/');
        return isExtMatch || isCloudinaryVideo;
    };

    const isVideoFile = isVideo(mediaUrl);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 1,
                ease: [0.21, 0.45, 0.32, 0.9] as any,
            },
        }),
    };

    return (
        <section className={styles.hero}>
            <div className={styles.bg}>
                {isVideoFile ? (
                    <video
                        src={mediaUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={styles.media}
                    />
                ) : (
                    <Image
                        src={mediaUrl}
                        alt="Hero Background"
                        fill
                        className={styles.media}
                        priority
                        unoptimized={mediaUrl.includes('cloudinary')}
                    />
                )}
            </div>
            <div className={styles.overlay} />

            <div className={styles.content}>
                {isMounted && (
                    <>
                        {/* Badge */}
                        <motion.span
                            className={styles.badge}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                            variants={fadeIn}
                        >
                            YOUR JOURNEY BEGINS HERE
                        </motion.span>

                        {/* Heading */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            custom={1}
                            variants={fadeIn}
                            className={styles.headingWrapper}
                        >
                            <h1 className={styles.heading}>
                                Find Places <br />
                                <span className={styles.headingAccent}>That Feel Right</span>
                            </h1>
                        </motion.div>

                        {/* Subtitle / Description */}
                        <motion.p
                            className={styles.subtitle}
                            initial="hidden"
                            animate="visible"
                            custom={2}
                            variants={fadeIn}
                        >
                            Curated destinations across Indonesia, built for real experiences.
                        </motion.p>
                    </>
                )}

                {!isMounted && (
                    <>
                        <span className={styles.badge}>YOUR JOURNEY BEGINS HERE</span>
                        <div className={styles.headingWrapper}>
                            <h1 className={styles.heading}>
                                Find Places<br />
                                <span className={styles.headingAccent}>That Feel Right</span>
                            </h1>
                        </div>
                        <p className={styles.subtitle}>
                            Curated destinations across Indonesia, built for real experiences.
                        </p>
                    </>
                )}
            </div>
        </section>
    );
}
