# Roland Schlösser — Personal Portfolio

Implementation roadmap for [rolandschlosser.dev](https://rolandschlosser.dev).

Repository: [RolandCSCHC/personal-portfolio](https://github.com/RolandCSCHC/personal-portfolio)

This document is the progress checklist. Detailed tasks and acceptance criteria are in [PHASES.md](PHASES.md). Architecture is in [ARCHITECTURE.md](ARCHITECTURE.md). Confirmed and open decisions are in [DECISIONS.md](DECISIONS.md).

Mark a phase complete only after its acceptance criteria pass and the work has been approved. Do not start the next phase automatically.

## Objectives

- Present Roland Schlösser as a software engineer.
- Show professional experience, education, technical skills, and selected projects.
- Link to [MediaShelf](https://mediashelf.rolandschlosser.dev) and [Relovia](https://relovia.rolandschlosser.dev).
- Make contact straightforward for recruiters and employers.
- Publish the site in English and Spanish, with English as the default.
- Offer a downloadable CV in each language.

## Technology stack

| Area            | Choice                                  |
| --------------- | --------------------------------------- |
| Framework       | Astro                                   |
| Language        | TypeScript, strict mode                 |
| Styling         | Tailwind CSS 4 with `@tailwindcss/vite` |
| Package manager | pnpm                                    |
| Runtime         | Node.js 24                              |
| Hosting         | Vercel                                  |
| DNS             | Cloudflare                              |
| Repository      | GitHub, public, `main`                  |

The site is static. It has no backend, database, authentication, or contact form.

## Design decisions

| Property         | Decision                                                                     |
| ---------------- | ---------------------------------------------------------------------------- |
| Visual style     | Minimal and professional                                                     |
| Themes           | Light and dark                                                               |
| Identity         | Professional photograph, supplied by Roland                                  |
| Languages        | English and Spanish                                                          |
| Default language | English                                                                      |
| Spanish URLs     | `/es` prefix, no prefix for English                                          |
| Animations       | None                                                                         |
| CV               | Downloadable PDF in each language                                            |
| Layout           | Responsive, about 1120px maximum content width and about 720px reading width |

Principles: timeless presentation, clear typography, generous whitespace, neutral colors, one restrained accent, subtle borders, accessible components, and the same structure in both themes and both languages.

## Phases

| Phase | Name                                      | Depends on                                     | Status      |
| ----- | ----------------------------------------- | ---------------------------------------------- | ----------- |
| 1     | Repository and project foundation         | —                                              | Completed   |
| 2     | Design system and global layout           | Phase 1                                        | Completed   |
| 3     | Homepage and professional profile         | Phase 2                                        | Completed   |
| 4     | Personal projects showcase                | Phases 2 and 3                                 | Completed   |
| 5     | Internationalization                      | Phases 3 and 4                                 | Completed   |
| 6     | Personal assets and CV                    | Phases 3 and 5 for the pages that display them | Not started |
| 7     | SEO, accessibility, and quality assurance | Phases 2–6                                     | Not started |
| 8     | Production deployment and launch          | Phase 7                                        | Not started |

Phases 3 and 6 share the photograph, and Phases 5 and 6 share the CV page. Those assets are supplied by Roland. Until they arrive, the implementation uses a clearly labeled placeholder and does not invent a photograph or a CV.

## Progress

- [x] Phase 1 — Repository and project foundation
- [x] Phase 2 — Design system and global layout
- [x] Phase 3 — Homepage and professional profile
- [x] Phase 4 — Personal projects showcase
- [x] Phase 5 — Internationalization
- [ ] Phase 6 — Personal assets and CV
- [ ] Phase 7 — SEO, accessibility, and quality assurance
- [ ] Phase 8 — Production deployment and launch

## Phase summaries

### Phase 1 — Repository and project foundation

Completed on 31 October 2026. The Astro project, Tailwind CSS 4, TypeScript strict mode, ESLint, Prettier, locale routing configuration, the placeholder homepage, and Vercel static-hosting preparation are in place. Development, checks, lint, formatting, build, and preview were verified.

### Phase 2 — Design system and global layout

Completed on 31 October 2026. Semantic colors, locally hosted Inter and JetBrains Mono, the shared header and footer, and light, dark, and system theme switching are in place. The homepage was still a placeholder at the end of this phase.

### Phase 3 — Homepage and professional profile

Completed on 31 October 2026. Home, About, Experience, and Projects are separate pages. Contact links, teaching, and education were filled from details Roland supplied the same day. The photograph is still a labeled placeholder.

### Phase 4 — Personal projects showcase

Completed on 31 October 2026. MediaShelf and Relovia are stored in one Astro content collection and shown at `/projects` and on their detail pages. Later the same day, Roland removed the project cards from the homepage, supplied the repository URLs and screenshots, and removed the architecture section from the detail pages.

### Phase 5 — Internationalization

Completed on 31 October 2026. Every public page exists in English and Spanish. Shared page components read typed copy, dates follow the active locale, and the language control keeps the current page. Canonical URLs, `hreflang`, and Open Graph metadata use `https://rolandschlosser.dev`. The CV pages are shells until the files arrive in Phase 6.

### Phase 6 — Personal assets and CV

Add the supplied photograph, the English and Spanish CV files, the final favicon, and the Open Graph image. Do not generate substitutes.

### Phase 7 — SEO, accessibility, and quality assurance

Complete metadata, sitemap, structured data, WCAG 2.2 AA checks, performance work, and cross-browser verification.

### Phase 8 — Production deployment and launch

Connect the GitHub repository to Vercel, attach `rolandschlosser.dev` through Cloudflare without changing the MediaShelf or Relovia DNS records, and verify the live site.

## Open items

These do not reopen Phase 1. They need a decision before the related phase is published.

- Roland approved a one-time force-push of local `f086e69` to `origin/main`. It has not been run. GitHub still has `9400b78`, whose message includes the `Co-authored-by` trailer.
- The professional photograph is not yet supplied.
- Both CV files are not on the site yet. Roland supplied the English CV on 31 October 2026 as the source for teaching and education.
