"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, X, Menu } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/blog", label: "Blog" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>

                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    TravThings
                </Link>

                {/* Nav Links */}
                <ul className={styles.links}>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right */}
                <div className={styles.right}>
                    <div className={`${styles.searchBox} ${searchFocused || searchValue ? styles.searchBoxFocused : ""}`}>
                        <Search
                            className={`${styles.searchIcon} ${searchFocused ? styles.searchIconFocused : ""}`}
                        />
                        <input
                            type="text"
                            placeholder="Search destinations..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => { if (!searchValue) setSearchFocused(false); }}
                            className={styles.searchInput}
                        />
                        {searchValue && (
                            <button
                                className={styles.clearBtn}
                                onClick={() => { setSearchValue(""); setSearchFocused(false); }}
                            >
                                <X size={13} />
                            </button>
                        )}
                    </div>

                    <button
                        className={styles.hamburger}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <Menu size={22} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className={styles.mobileMenu}>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </header>
    );
}
