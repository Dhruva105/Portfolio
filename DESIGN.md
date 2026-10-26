# Design reference notes

## Source and capture

- Reference: [Sarthak Sharma portfolio](https://sarthak-sharma-portfolio-six.vercel.app/)
- Captured with Firecrawl on 2026-10-26 at a 1440 × 1000 viewport. Markdown, branding data, and a screenshot capture were requested.
- The reference page's content and extracted branding data were available. Firecrawl returned the screenshot as a signed remote URL, but the image could not be fetched into this workspace for pixel inspection. Exact spacing, card dimensions, animation timing, and mobile behavior are therefore unverified; the implementation uses the reference as a high-level direction only.

## Extracted reference signals

These values came from Firecrawl's branding extraction, not pixel-by-pixel measurement:

- Dark near-black background (`#030303`) with warm ivory text (`#F1EEE8` / `#F4E8D5`) and a coral-orange accent (`#FF8C59`).
- DM Sans, Instrument Serif, and SF Mono were identified as font families.
- The page uses a spacious editorial hero, a compact descriptor and location line, oversized display text, and concise calls to action.
- Extracted corner treatment was close to square, with no prominent drop shadow.

## Portfolio implementation notes

- The portfolio retains its own dark charcoal palette, Space Grotesk / Inter / IBM Plex Mono type, and lime accent (`#D7FF3F`).
- The homepage retains its earlier open, image-led hero: the copy overlays the portrait without a bordered card.
- Existing hero copy, portrait, actions, education details, and the rest of the portfolio content remain in place.
- The portrait remains the prioritized hero image and is served from a compressed WebP source. Below-the-fold section reveals use one native IntersectionObserver and CSS transitions; reduced-motion users and browsers without IntersectionObserver see the content without reveal effects.
- No implementation details were copied from the reference site. Its screenshot pixels and animation behavior were unavailable for direct verification.

## Unresolved reference details

A rendered screenshot of the reference at desktop and mobile widths would be needed to verify its exact border treatment, spacing, responsive composition, and motion timing. The current hero is intentionally based on extracted branding and the supplied request rather than guessed pixel measurements.
