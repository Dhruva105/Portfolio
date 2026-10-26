# Dhruv Pal — Portfolio

A Next.js App Router portfolio built with TypeScript, SCSS Modules, Sass, GSAP, and Lenis.

## Run locally

- Install Node.js 20.9 or newer.
- Run npm install.
- Run npm run dev and open http://localhost:3000.

## Quality checks

- npm run lint
- npm run typecheck
- npm run build

## Deployment configuration

Set NEXT_PUBLIC_SITE_URL to the real production origin before deployment, for example https://your-domain.example. The value is used for Open Graph image URLs, structured data, and the sitemap and robots metadata routes. No public domain is assumed in the source.

The site uses Next.js Image optimization for the supplied portraits. The original images remain in public/images. The static diagrams beside projects are explicitly labeled as illustrations; no project screenshots or demo deployments are implied.

The email links open the visitor’s email client using mailto. There is no contact form or submission backend.

## Motion and accessibility

GSAP owns section reveal timelines and ScrollTrigger instances. Lenis owns wheel smoothing and is synchronized through the GSAP ticker; touch scrolling remains native. Both are skipped when the visitor requests reduced motion, and component cleanup removes the ticker callback, event listener, ScrollTriggers, and Lenis instance.

No WebGL, shader, or third-party analytics code is used. The main content is server-rendered and readable without animation.
