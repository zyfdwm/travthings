import React from "react";
import styles from "./NotionRenderer.module.css";
import { optimizeImageUrl } from "@/lib/utils";

interface NotionRendererProps {
    blocks: any[];
}



const RichText = ({ text }: { text: any[] }) => {
    if (!text) return null;

    return (
        <>
            {text.map((t, i) => {
                const { annotations, plain_text, href } = t;
                const classNames = [];
                if (annotations.bold) classNames.push(styles.bold);
                if (annotations.italic) classNames.push(styles.italic);
                if (annotations.strikethrough) classNames.push(styles.strikethrough);
                if (annotations.underline) classNames.push(styles.underline);
                if (annotations.code) classNames.push(styles.inlineCode);
                if (annotations.color && annotations.color !== "default") {
                    classNames.push(styles[annotations.color] || annotations.color);
                }

                const element = (
                    <span key={i} className={classNames.join(" ")}>
                        {plain_text}
                    </span>
                );

                if (href) {
                    return (
                        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
                            {element}
                        </a>
                    );
                }

                return element;
            })}
        </>
    );
};

export default function NotionRenderer({ blocks }: NotionRendererProps) {
    return (
        <div className={styles.notionContent}>
            {blocks.map((block) => {
                const { type, id } = block;
                const value = block[type];

                switch (type) {
                    case "paragraph":
                        return (
                            <p key={id} className={styles.text}>
                                <RichText text={value.rich_text} />
                            </p>
                        );
                    case "heading_1":
                        return (
                            <h1 key={id} className={styles.heading1}>
                                <RichText text={value.rich_text} />
                            </h1>
                        );
                    case "heading_2":
                        return (
                            <h2 key={id} className={styles.heading2}>
                                <RichText text={value.rich_text} />
                            </h2>
                        );
                    case "heading_3":
                        return (
                            <h3 key={id} className={styles.heading3}>
                                <RichText text={value.rich_text} />
                            </h3>
                        );
                    case "bulleted_list_item":
                        return (
                            <ul key={id} className={styles.bulletList}>
                                <li className={styles.listItem}>
                                    <RichText text={value.rich_text} />
                                </li>
                            </ul>
                        );
                    case "numbered_list_item":
                        return (
                            <ol key={id} className={styles.numberedList}>
                                <li className={styles.listItem}>
                                    <RichText text={value.rich_text} />
                                </li>
                            </ol>
                        );
                    case "quote":
                        return (
                            <blockquote key={id} className={styles.quote}>
                                <div className={styles.quoteText}>
                                    <RichText text={value.rich_text} />
                                </div>
                            </blockquote>
                        );
                    case "callout":
                        const isEmoji = value.icon?.type === "emoji";
                        const iconUrl = value.icon?.type === "external" ? value.icon.external?.url : (value.icon?.type === "file" ? value.icon.file?.url : "");
                        const bgColorClass = value.color && value.color !== 'default' ? styles[`callout_${value.color}`] : styles.callout_default;
                        
                        return (
                            <div key={id} className={`${styles.callout} ${bgColorClass || ''}`}>
                                <div className={styles.calloutIcon}>
                                    {isEmoji ? value.icon.emoji : (iconUrl ? <img src={iconUrl} alt="icon"/> : "💡")}
                                </div>
                                <div className={styles.calloutText}>
                                    <RichText text={value.rich_text} />
                                </div>
                            </div>
                        );
                    case "image":
                        const rawImageUrl = value.type === "external" ? value.external.url : value.file.url;
                        const finalImageUrl = optimizeImageUrl(rawImageUrl);
                        return (
                            <figure key={id} className={styles.image}>
                                <img src={finalImageUrl} alt={value.caption?.[0]?.plain_text || "Article image"} />
                                {value.caption?.length > 0 && (
                                    <figcaption className={styles.caption}>
                                        <RichText text={value.caption} />
                                    </figcaption>
                                )}
                            </figure>
                        );
                    case "divider":
                        return <hr key={id} className={styles.divider} />;
                    case "code":
                        return (
                            <pre key={id} className={styles.code}>
                                <code>
                                    <RichText text={value.rich_text} />
                                </code>
                            </pre>
                        );
                    default:
                        console.warn(`Unsupported block type: ${type}`);
                        return null;
                }
            })}
        </div>
    );
}
