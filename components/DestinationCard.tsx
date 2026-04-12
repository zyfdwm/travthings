import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { DestinationItem } from "@/lib/notion";
import styles from "./DestinationCard.module.css";
import { optimizeImageUrl } from "@/lib/utils";

interface DestinationCardProps {
    item: DestinationItem;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ item }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.imageLink}>
                    <img 
                        src={optimizeImageUrl(item.image, 800)} 
                        alt={item.title} 
                        className={styles.image}
                    />
                </a>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
                <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.imageCircleButton}
                >
                    <ArrowUpRight size={20} />
                </a>
            </div>
            
            <div className={styles.content}>
                <div className={styles.metaRow}>
                    {item.price && (
                        <span className={styles.price}>
                            Start from - {item.price}
                        </span>
                    )}
                </div>
                
                {item.title && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
                        <h3 className={styles.title}>{item.title}</h3>
                    </a>
                )}
                {item.location && <p className={styles.location}>{item.location}</p>}
                {item.description && <p className={styles.description}>{item.description}</p>}
            </div>
        </div>
    );
};

export default DestinationCard;
