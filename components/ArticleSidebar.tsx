"use client";

import React from "react";
import { Share2, Send, Link as LinkIcon, ExternalLink } from "lucide-react";
import styles from "./ArticleSidebar.module.css";

interface ArticleSidebarProps {
    title: string;
    slug: string;
}

export default function ArticleSidebar({ title, slug }: ArticleSidebarProps) {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    const shareActions = [
        {
            icon: <Send size={18} />,
            label: "Share on Social",
            onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, "_blank")
        },
        {
            icon: <Share2 size={18} />,
            label: "Share",
            onClick: () => {
                if (navigator.share) {
                    navigator.share({
                        title: title,
                        url: shareUrl
                    });
                } else {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
                }
            }
        },
        {
            icon: <LinkIcon size={18} />,
            label: "Copy Link",
            onClick: () => {
                navigator.clipboard.writeText(shareUrl);
                alert("Link copied to clipboard!");
            }
        }
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.disclaimerSection}>
                <h3 className={styles.label}>Disclaimer</h3>
                <p className={styles.disclaimerText}>
                    This post may contain affiliate links, which means if you purchase something from this site, I may receive a small commission at no extra cost to you. It’s a win-win. Thanks for supporting me at Travel Things!
                </p>
            </div>
            
            <div className={`${styles.section} ${styles.stickySection}`}>
                <h3 className={styles.label}>Book Your Trip</h3>
                <div 
                    data-gyg-widget="auto" 
                    data-gyg-partner-id="KJBNEUM" 
                    data-gyg-cmp="Activity"
                ></div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.label}>Share this Article</h3>
                <div className={styles.shareGrid}>
                    {shareActions.map((action, i) => (
                        <button 
                            key={i} 
                            onClick={action.onClick}
                            className={styles.shareBtn}
                            aria-label={action.label}
                        >
                            {action.icon}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}
