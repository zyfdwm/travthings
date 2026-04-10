import React from "react";
import styles from "./Pagination.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className={styles.pagination}>
            <button
                className={styles.punc}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ChevronLeft size={20} />
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={`${styles.pageBtn} ${currentPage === page ? styles.active : ""}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={styles.punc}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <ChevronRight size={20} />
            </button>
        </nav>
    );
}
