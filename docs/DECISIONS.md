# Decisions

Record confirmed choices here. Proposed values stay in the “Awaiting approval” section until they are accepted. When a later phase changes a decision, add a new entry instead of rewriting history.

## Confirmed

### Stack

- **Astro and TypeScript.** Pages are Astro components. TypeScript strict mode is required. React, Vue, Angular, and Svelte are not part of the site.
- **Tailwind CSS 4.** Styling uses the official `@tailwindcss/vite` integration.
- **pnpm and Node.js 24.** The repository pins Node.js 24.21.0 and pnpm 9.15.0.
- **Static generation.** The site is pre-rendered HTML. There is no backend, database, authentication, contact form, or server adapter.

### Languages and URLs

- **English is the default language.** English URLs have no locale prefix.
- **Spanish is the secondary language.** Spanish pages use the `/es` prefix.
- **No trailing slash.** `trailingSlash` is `never` in Astro and `false` in `vercel.json`. The Spanish homepage is `/es`.

### Design

- **Minimal and professional.** The visual direction is timeless, with generous whitespace, neutral colors, subtle borders, and one restrained accent.
- **Light and dark themes.** Both themes are required.
- **No animations.** The site does not use transitions, parallax, animated counters, or entrance effects.
- **Responsive layout.** Content width is about 1120px. Prose width is about 720px.
- **Accessible interface.** Semantic HTML, keyboard access, and readable contrast are requirements.
- **Color palettes.** Approved on 31 October 2026. Light: background `#FAFAF8`, surface `#FFFFFF`, primary text `#17191D`, secondary text `#656B75`, accent `#356AE6`, border `#E7E8EA`. Dark: background `#15171B`, surface `#1D2026`, primary text `#F0F1F2`, secondary text `#A4A9B2`, accent `#6D91FF`, border `#343840`.
- **Typefaces.** Approved on 31 October 2026. Inter for headings and body text. JetBrains Mono for occasional technical labels. Both are hosted locally.
- **Header navigation.** Approved on 31 October 2026. The header links to both About and Experience.
- **Hero description.** Approved on 31 October 2026. “Software Engineer who builds practical, scalable software, loves teaching programming, and enjoys turning complex problems into simple solutions.”
- **Skills.** Approved on 31 October 2026. Publish MySQL and testing along with the rest of the Phase 3 skill list.
- **Projects index.** Approved on 31 October 2026, revised the same day. `/projects` lists MediaShelf and Relovia. The homepage does not. The hero still links to `/projects`.
- **Theme loading.** Approved on 31 October 2026. A small inline script in the document head applies the saved or system theme before paint.
- **Project content.** Approved on 31 October 2026. MediaShelf and Relovia are stored in an Astro content collection.
- **www host.** Approved on 31 October 2026. `www.rolandschlosser.dev` redirects to `https://rolandschlosser.dev`.

### Content

- **Supplied facts only.** Employment, education, project features, metrics, contact details, and social URLs are not invented. Missing values stay labeled until Roland supplies them.
- **Real personal assets.** The photograph, CV files, and project screenshots are supplied. They are not generated.
- **Two public projects.** MediaShelf and Relovia are the projects to be showcased, with their confirmed stacks, live URLs, and repository URLs.

### Hosting

- **GitHub.** The public repository is `RolandCSCHC/personal-portfolio`. The production branch is `main`.
- **Vercel.** Vercel builds the static site from that repository.
- **Cloudflare DNS.** Cloudflare serves `rolandschlosser.dev`. Existing MediaShelf and Relovia records stay in place.
- **Domain.** The public site is `https://rolandschlosser.dev`. The domain is not connected yet.

### Delivery

- **One phase at a time.** Implementation stops at the end of the approved phase.
- **Small commits.** Commits describe one meaningful change. Secrets and environment files are not committed.
- **No force-push.** Published history is not rewritten from this project’s workflow. On 31 October 2026 Roland approved one exception: publish local `f086e69` over `origin/main` so the commit message has no `Co-authored-by` trailer. That push has not been run.

## Implemented in Phase 1

These choices are already in the repository.

| Decision                                                               | Reason                                                                                 |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Astro 7.4.4                                                            | Current stable Astro compatible with the rest of the toolchain                         |
| TypeScript 6.0.3                                                       | `@astrojs/check` accepts TypeScript 5 and 6, not TypeScript 7                          |
| ESLint 10 with `eslint-plugin-jsx-a11y-x`                              | `eslint-plugin-astro` requires ESLint 10; `eslint-plugin-jsx-a11y` does not support it |
| `auto-install-peers=false`                                             | Prevents pnpm from installing the incompatible accessibility plugin                    |
| Locale list duplicated in `astro.config.mjs` and `src/i18n/locales.ts` | The Astro config and application code each need the codes; they must be kept aligned   |
| Placeholder homepage and temporary favicon                             | Required to verify the foundation without presenting the real identity                 |
| `@lucide/astro` not installed                                          | No component imports an icon                                                           |

## Awaiting approval

No proposals are waiting. New proposals go here until they are accepted.

## Open information

Do not publish these until Roland provides them.

- Professional photograph.
- Downloadable English and Spanish CV files. Roland supplied the English CV on 31 October 2026 as the source for teaching and education. The file is not on the site yet.

## Open Git state

Local `main` is `f086e69`. `origin/main` is `9400b78`. The trees match. The local message has no `Co-authored-by` trailer; the GitHub commit still has it. Roland approved a one-time force-push of `f086e69` to `origin/main`. That push has not been run.

## Decision log

### 2026-10-31 — Color palettes

Decision: Use the proposed light and dark palettes.
Reason: Approved by Roland before Phase 2.
Phase: 2

### 2026-10-31 — Typefaces

Decision: Use Inter for headings and body text, and JetBrains Mono for occasional technical labels. Host both locally.
Reason: Approved by Roland before Phase 2.
Phase: 2

### 2026-10-31 — Header navigation

Decision: The header includes separate links to About and Experience.
Reason: Approved by Roland. The homepage has both sections.
Phase: 2

### 2026-10-31 — Hero description

Decision: “Software Engineer who builds practical, scalable software, loves teaching programming, and enjoys turning complex problems into simple solutions.”
Reason: Approved by Roland. The original sentence remains, with teaching included.
Phase: 3

### 2026-10-31 — Skills

Decision: Include MySQL and testing in the published skill list, with the rest of the Phase 3 categories.
Reason: Approved by Roland.
Phase: 3

### 2026-10-31 — Projects index

Decision: Add `/projects`, listing MediaShelf and Relovia, in addition to the homepage project section.
Reason: Approved by Roland. Phase 5 requires this route.
Phase: 4

### 2026-10-31 — Theme loading

Decision: Use a small inline script in the document head to apply the saved theme, or the system preference, before the page is painted.
Reason: Approved by Roland. This is the only client script required to prevent a theme flash.
Phase: 2

### 2026-10-31 — Project content

Decision: Store MediaShelf and Relovia in an Astro content collection, shared by the homepage cards and the detail pages.
Reason: Approved by Roland.
Phase: 4

### 2026-10-31 — www host

Decision: Redirect `www.rolandschlosser.dev` to `https://rolandschlosser.dev`.
Reason: Approved by Roland.
Phase: 8

### 2026-10-31 — Contact, teaching, and education

Decision: Publish `rcschlosser@miuandes.cl`, `https://www.linkedin.com/in/rolandschlosser/`, and `https://github.com/RolandCSCHC`. Teaching and education use the English CV Roland supplied on this date.
Reason: Roland provided the addresses and the CV.
Phase: 3

### 2026-10-31 — Project screenshots

Decision: Publish the MediaShelf and Relovia screenshots Roland placed in `public/images/projects/`. Serve them as 1600-pixel-wide JPEGs.
Reason: Roland supplied the images. The original MediaShelf PNG was 4.8MB, larger than the page needs.
Phase: 4

### 2026-10-31 — Project architecture section

Decision: Do not publish an architecture section on the project pages. Readers follow the GitHub links and read each repository README.
Reason: Roland asked to remove it.
Phase: 4

### 2026-10-31 — Project placement and repositories

Decision: Remove the project cards from the homepage. Keep them on `/projects` and the detail pages. Publish MediaShelf at `https://github.com/RolandCSCHC/mediashelf`, Relovia backend at `https://github.com/RolandCSCHC/relovia-api`, and Relovia frontend at `https://github.com/RolandCSCHC/relovia-web`.
Reason: Roland asked for projects only on the Projects page and supplied the repository URLs.
Phase: 4

### 2026-10-31 — Separate menu pages

Decision: Home, Projects, About, and Experience are separate pages. Home is the introduction and contact. About includes education. Experience includes skills.
Reason: Roland asked for each menu item to open its own page.
Phase: 3

### 2026-10-31 — Git history

Decision: Force-push local `f086e69` to `origin/main` once, replacing `9400b78`, so the published message has no `Co-authored-by` trailer.
Reason: Approved by Roland as a single exception to the no-force-push rule.
Phase: 1

### 2026-10-31 — Spanish site

Decision: Publish the Spanish pages in Phase 5 from typed translations of the supplied English copy. Format month-year dates with `Intl` for the active locale. Use `https://rolandschlosser.dev` as the canonical origin. Use Open Graph locales `en_US` and `es_CL`. Call the teaching role “Ayudante” in Spanish and the degree “Ingeniero Civil en Computación”. Leave both CV pages as unpublished shells.
Reason: Phase 5. The production origin was already approved. The Spanish CV file is not on the site yet.
Phase: 5

### 2026-10-31 — Spanish degree name

Decision: The Spanish degree is “Ingeniero Civil en Ciencias de la Computación”.
Reason: Roland corrected the Phase 5 translation.
Phase: 5

## Future entries

Add the next decision in this format:

```text
### YYYY-MM-DD — Title

Decision:
Reason:
Phase:
```
