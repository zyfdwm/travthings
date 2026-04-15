import React from "react";
import Link from "next/link";
import { Globe, Mail } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.brandSection}>
            <h2 className={styles.logo}>Travel Things.</h2>
            <p className={styles.description}>
              Redefining exploration through the lens of modern luxury.
              Our global network ensures every detail of your journey is as
              impeccable as the destination itself.
            </p>
          </div>
          <div className={styles.socialIcons}>
            <Link href="/" className={styles.socialLink}>
              <Globe size={20} />
            </Link>
            <Link href="mailto:faizxdwm@gmail.com" className={styles.socialLink}>
              <Mail size={20} />
            </Link>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.linksGrid}>
            <div className={styles.linksRow}>
              <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
              <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
              <Link href="/press" className={styles.footerLink}>Press Inquiries</Link>
            </div>
            <div className={`${styles.linksRow} ${styles.secondRow}`}>
              <Link href="/sustainability" className={styles.footerLink}>Sustainability</Link>
              <a href="mailto:faizxdwm@gmail.com" className={styles.footerLink} id="contact-link">Contact</a>
            </div>
          </div>
          <p className={styles.copy}>
            © 2026 Travel Things . The Art of Modern Exploration.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
