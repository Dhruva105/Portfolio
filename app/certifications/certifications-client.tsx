"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Credential } from "@/app/data/credentials";
import styles from "./certifications.module.scss";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function CredentialCard({
  credential,
  index,
}: {
  credential: Credential;
  index: number;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const period = credential.completionStart && credential.completionEnd
    ? credential.completionStart === credential.completionEnd
      ? formatDate(credential.completionStart)
      : `${formatDate(credential.completionStart)} – ${formatDate(credential.completionEnd)}`
    : undefined;

  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.category}>{credential.category}</span>
      </div>
      <h2>{credential.name}</h2>
      <p className={styles.issuer}>{credential.issuer}</p>
      <p className={styles.type}>{credential.type}</p>

      {(credential.issueDate || credential.dateLabel || credential.expiresAt || period || credential.completionPeriod) && (
        <dl className={styles.dates}>
          {(credential.issueDate || credential.dateLabel) && (
            <div>
              <dt>{credential.issueDate ? "Issued" : "Date"}</dt>
              <dd>
                {credential.issueDate ? (
                  <time dateTime={credential.issueDate}>{formatDate(credential.issueDate)}</time>
                ) : credential.dateLabel}
              </dd>
            </div>
          )}
          {period && (
            <div>
              <dt>Course / event</dt>
              <dd>{period}</dd>
            </div>
          )}
          {credential.completionPeriod && (
            <div>
              <dt>Course period</dt>
              <dd>{credential.completionPeriod}</dd>
            </div>
          )}
          {credential.expiresAt && (
            <div>
              <dt>Expires</dt>
              <dd><time dateTime={credential.expiresAt}>{formatDate(credential.expiresAt)}</time></dd>
            </div>
          )}
        </dl>
      )}

      {credential.description && <p className={styles.description}>{credential.description}</p>}
      {credential.skills && credential.skills.length > 0 && (
        <ul className={styles.skills} aria-label="Related skills">
          {credential.skills.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>
      )}

      {credential.image && (
        <details className={styles.preview}>
          <summary>View certificate or badge preview</summary>
          <div className={styles.previewFrame}>
            {imageFailed ? (
              <p className={styles.imageFallback} role="status">
                Preview unavailable. Credential details are listed above.
              </p>
            ) : (
              <Image
                src={credential.image}
                alt={`Sanitized preview of ${credential.name}`}
                fill
                sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 28vw"
                loading="lazy"
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
        </details>
      )}

      {credential.verificationUrl && (
        <a
          className={styles.verifyLink}
          href={credential.verificationUrl}
          target="_blank"
          rel="noreferrer"
        >
          Verify credential <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  );
}

export function CertificationCatalog({
  credentials,
}: {
  credentials: Credential[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [issuer, setIssuer] = useState("");
  const categories = useMemo(
    () => [...new Set(credentials.map((credential) => credential.category))].sort(),
    [credentials],
  );
  const issuers = useMemo(
    () => [...new Set(credentials.map((credential) => credential.issuer))].sort(),
    [credentials],
  );
  const filteredCredentials = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return credentials.filter((credential) => {
      const searchable = [
        credential.name,
        credential.issuer,
        credential.category,
        credential.type,
        credential.description,
        ...(credential.skills ?? []),
      ].filter(Boolean).join(" ").toLowerCase();
      return (!normalizedQuery || searchable.includes(normalizedQuery))
        && (!category || credential.category === category)
        && (!issuer || credential.issuer === issuer);
    });
  }, [category, credentials, issuer, query]);

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setIssuer("");
  };

  return (
    <section className={styles.catalog} aria-label="Credential catalog">
      <div className={styles.filters}>
        <div className={styles.searchField}>
          <label htmlFor="credential-search">Search title, issuer, or skill</label>
          <input
            id="credential-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “machine learning”"
          />
        </div>
        <div className={styles.selectField}>
          <label htmlFor="credential-category">Category</label>
          <select id="credential-category" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">All categories</option>
            {categories.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
        <div className={styles.selectField}>
          <label htmlFor="credential-issuer">Issuer</label>
          <select id="credential-issuer" value={issuer} onChange={(event) => setIssuer(event.target.value)}>
            <option value="">All issuers</option>
            {issuers.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
        <button className={styles.clearButton} type="button" onClick={clearFilters}>
          Clear filters
        </button>
      </div>

      <p className={styles.resultCount} role="status" aria-live="polite">
        Showing {filteredCredentials.length} of {credentials.length} credentials
      </p>

      {filteredCredentials.length > 0 ? (
        <div className={styles.grid}>
          {filteredCredentials.map((credential, index) => (
            <CredentialCard key={credential.id} credential={credential} index={index} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>No matching credentials</h2>
          <p>Try a broader search or clear one of the filters.</p>
          <button type="button" onClick={clearFilters}>Reset search and filters</button>
        </div>
      )}
    </section>
  );
}
