"use client";

import { motion } from "framer-motion";
import styles from "./BlogMainHero.module.css";
import { optimizeImageUrl } from "@/lib/utils";

interface BlogMainHeroProps {
    mediaUrl: string;
    badge?: string;
    title: React.ReactNode;
    description: string;
}

export default function BlogMainHero({ mediaUrl, badge, title, description }: BlogMainHeroProps) {
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
                    <img
                        src={optimizeImageUrl(mediaUrl, 1920)}
                        alt="Hero Background"
                        className={styles.media}
                    />
                )}
                <div className={styles.overlay} />
            </div>

            <div className={styles.content}>
                {badge && (
                    <motion.span
                        className={styles.badge}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        variants={fadeIn}
                    >
                        {badge}
                    </motion.span>
                )}

                <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    variants={fadeIn}
                    className={styles.headingWrapper}
                >
                    <h1 className={styles.heading}>{title}</h1>
                </motion.div>

                {/* Subtitle / Description */}
                <motion.p
                    className={styles.subtitle}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    variants={fadeIn}
                >
                    {description}
                </motion.p>
            </div>
        </section>
    );
}
