"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Search, X, Menu } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/blog", label: "Blog" },
];

function NavbarSearch() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const isBlogPage = pathname === "/blog";
    
    // Sync search value with URL if on meaningful pages
    useEffect(() => {
        const query = searchParams.get("search");
        if (query && (pathname === "/destinations" || pathname === "/blog")) {
            setSearchValue(query);
            setSearchFocused(true);
        } else if (!query) {
            setSearchValue("");
            if (!searchFocused) setSearchFocused(false);
        }
    }, [searchParams, pathname]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            const target = isBlogPage ? "/blog" : "/destinations";
            router.push(`${target}?search=${encodeURIComponent(searchValue.trim())}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch(e);
        }
    };

    return (
        <form 
            onSubmit={handleSearch}
            className={`${styles.searchBox} ${searchFocused || searchValue ? styles.searchBoxFocused : ""}`}
        >
            <Search
                className={`${styles.searchIcon} ${searchFocused ? styles.searchIconFocused : ""}`}
            />
            <input
                type="text"
                placeholder={isBlogPage ? "Search..." : "Search destinations..."}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => { if (!searchValue) setSearchFocused(false); }}
                onKeyDown={handleKeyDown}
                className={styles.searchInput}
            />
            {searchValue && (
                <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={() => { 
                        setSearchValue(""); 
                        setSearchFocused(false);
                        if (pathname === "/destinations" || pathname === "/blog") {
                            router.push(pathname);
                        }
                    }}
                >
                    <X size={13} />
                </button>
            )}
        </form>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>

                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    Travel Things
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
                    <Suspense fallback={<div className={styles.searchBox}><Search className={styles.searchIcon} /></div>}>
                        <NavbarSearch />
                    </Suspense>

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
