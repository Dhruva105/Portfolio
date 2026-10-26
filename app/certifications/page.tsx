import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/app/components/site-nav";
import { credentialInventory } from "@/app/data/credentials";
import { CertificationCatalog } from "./certifications-client";
import styles from "./certifications.module.scss";

export const metadata: Metadata = {
  title: "Certifications & Badges",
  description:
    "An inventory of Dhruv Pal’s professional certifications, course completions, workshops, internships, badges, and community contributions.",
  alternates: {
    canonical: "/certifications",
  },
};

export default function CertificationsPage() {
  return (
    <div className={styles.page} id="top">
      <SiteNav page="certifications" />
      <main id="main-content" className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Credentials</span>
        </div>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>CREDENTIAL INDEX / {String(credentialInventory.length).padStart(2, "0")} ITEMS</p>
          <h1>Certifications <em>&</em> Badges</h1>
          <p className={styles.lede}>
            A growing record of professional certifications, technical learning,
            workshops, research presentations, and community contributions.
            Filter by area or issuer, or search by title and skill.
          </p>
          <p className={styles.count}>
            <span>{credentialInventory.length}</span> distinct credentials
            <span aria-hidden="true">·</span> duplicates counted once
          </p>
        </header>

        <CertificationCatalog credentials={credentialInventory} />

        <p className={styles.privacyNote}>
          Preview copies mask personal credential IDs, registration numbers,
          QR codes, and private verification codes. Public verification links
          appear only when a source provides a confirmed URL.
        </p>
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} DHRUV PAL</p>
        <a href="#top">BACK TO TOP <span aria-hidden="true">↑</span></a>
      </footer>
    </div>
  );
}
