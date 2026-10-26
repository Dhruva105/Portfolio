"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./site-nav.module.scss";

type Page = "home" | "certifications";

const sections = [
  { href: "#questions", label: "The questions" },
  { href: "#work", label: "Selected work" },
  { href: "#research", label: "Research" },
  { href: "#about", label: "About" },
];

export function SiteNav({ page = "home" }: { page?: Page }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const destination = (hash: string) => page === "home" ? hash : `/${hash}`;

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggle.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const certificationCurrent = page === "certifications" ? "page" as const : undefined;

  return (
    <header className={styles.header}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <nav className={styles.navigation} aria-label="Main navigation">
        <a className={styles.index} href="#top" aria-label="Back to the top">
          <span>FIELD NOTES</span>
          <span className={styles.indexNumber}>01 — 07</span>
        </a>

        <div className={styles.desktopLinks}>
          {sections.map((link, index) => (
            <a href={destination(link.href)} key={link.href}>
              <span className={styles.linkIndex}>0{index + 2}</span>
              {link.label}
            </a>
          ))}
          <Link
            className={styles.credentialsLink}
            href="/certifications"
            aria-current={certificationCurrent}
          >
            <span className={styles.linkIndex}>06</span>
            Certifications &amp; Badges
          </Link>
        </div>

        <a className={styles.contactLink} href={destination("#contact")}>
          Start a conversation <span aria-hidden="true">↗</span>
        </a>

        <button
          ref={menuToggle}
          className={styles.menuToggle}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div
        className={styles.mobileMenu}
        id="mobile-navigation"
        hidden={!menuOpen}
      >
        <p className={styles.mobileCaption}>Jump to a section or credential index</p>
        {sections.map((link, index) => (
          <a href={destination(link.href)} key={link.href} onClick={closeMenu}>
            <span>0{index + 2}</span>
            {link.label}
            <span aria-hidden="true">↘</span>
          </a>
        ))}
        <Link
          href="/certifications"
          aria-current={certificationCurrent}
          onClick={closeMenu}
        >
          <span>06</span>
          Certifications &amp; Badges
          <span aria-hidden="true">↘</span>
        </Link>
        <a className={styles.mobileContact} href={destination("#contact")} onClick={closeMenu}>
          <span>07</span>
          Get in touch
          <span aria-hidden="true">↘</span>
        </a>
      </div>
    </header>
  );
}
