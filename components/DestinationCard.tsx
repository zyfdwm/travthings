import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./DestinationCard.module.css";

export interface DestinationItem {
    id: string;
    title: string;
    location: string;
    category: string;
    badge?: string;
    duration: string;
    activityType: string;
    price: string;
    description: string;
    image: string;
    url: string;
}

interface DestinationCardProps {
    item: DestinationItem;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ item }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.imageCircleButton}>
                    <ArrowUpRight size={20} />
                </a>
            </div>
            
            <div className={styles.content}>
                <div className={styles.metaRow}>
                    <span className={styles.metaInfo}>
                        {item.duration} • {item.activityType}
                    </span>
                    <span className={styles.price}>{item.price}</span>
                </div>
                
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.location}>{item.location}</p>
                <p className={styles.description}>{item.description}</p>
            </div>
        </div>
    );
};

export default DestinationCard;
