# Architecture

This document separates what is already implemented from the architecture planned for later phases.

## Implemented

The site is an Astro 7 static site. `astro.config.mjs` sets `output: 'static'` and `site` to `https://rolandschlosser.dev`, so pages are generated as HTML at build time and canonical URLs use the production origin. There is no server adapter, no backend, and no environment variables. The domain is not connected yet.

### Toolchain

| Concern      | Implementation                                                                    |
| ------------ | --------------------------------------------------------------------------------- |
| UI           | Astro components                                                                  |
| Types        | TypeScript 6.0.3, `astro/tsconfigs/strict`                                        |
| Styles       | Tailwind CSS 4.3.3 through `@tailwindcss/vite`                                    |
| Checks       | `astro check` via `@astrojs/check`                                                |
| Lint         | ESLint 10, `typescript-eslint`, `eslint-plugin-astro`, `eslint-plugin-jsx-a11y-x` |
| Format       | Prettier with the Astro and Tailwind plugins                                      |
| Runtime      | Node.js 24.21.0 in `.node-version`, pnpm 9.15.0                                   |
| Hosting prep | `vercel.json` sets `trailingSlash` to `false`                                     |

TypeScript 7 is not used because `@astrojs/check` accepts TypeScript 5 or 6. `@lucide/astro` was identified as the icon package and is not installed, because no component uses an icon.

### Current source

```text
src/
├── assets/
│   ├── profile/       Professional photograph
│   └── projects/      Supplied project screenshots
├── components/
│   ├── layout/          Header, footer, language control, theme control
│   ├── pages/           Shared page views used by both locales
│   ├── projects/        Card, list, detail, media, technology labels
│   ├── sections/        Profile sections
│   └── PublicLink.astro
├── content/projects/    mediashelf.json and relovia.json
├── content.config.ts    Projects collection schema
├── data/
│   ├── assets.ts        Supplied photograph and CV files
│   ├── profile.ts       Locale-neutral facts and contact links
│   └── projects.ts      Loads the collection and presents one locale
├── i18n/
│   ├── locales.ts
│   ├── dates.ts
│   ├── profile.ts       Assembles translated profile copy
│   ├── routes.ts
│   └── ui/              Typed English and Spanish interface copy
├── layouts/BaseLayout.astro
├── pages/
│   ├── index.astro      Introduction, education, and contact
│   ├── experience.astro
│   ├── cv.astro
│   ├── projects/
│   ├── es/              Spanish routes for the same pages
│   ├── sitemap.xml.ts
│   └── robots.txt.ts
├── scripts/theme.ts
├── seo/                 Canonical URLs and Schema.org JSON-LD
└── styles/              global.css and fonts.css
public/
├── cv/                  Supplied PDF files
├── favicon.svg
└── og.png
```

`src/i18n/locales.ts` exports `en` and `es`, with `en` as the default. The same codes are set in `astro.config.mjs`. English routes have no prefix. Spanish pages live in `src/pages/es/`.

`BaseLayout.astro` renders the document shell, header, main content, and footer. It sets `lang` from the page locale and applies the saved theme before paint. Each route file selects `en` or `es` and renders a shared page component. Interface copy lives in `src/i18n/ui/en.ts` and `src/i18n/ui/es.ts`. Spanish must satisfy the English key shape, and loading the modules fails when a key is missing, extra, or blank. Dates are stored as `YYYY-MM` and formatted with `Intl` for the active locale. GitHub, LinkedIn, and email render through `PublicLink`. A null `href` shows the label and the localized unpublished text instead of a link.

The language control offers English and Español. It links to the same page in the other language, keeps the current fragment, and falls back to that language’s homepage when the page does not exist. The selected option shows the active language. The control is a native select, so it works from the keyboard.

MediaShelf and Relovia live in the `projects` content collection defined in `src/content.config.ts`. Each record holds the name, summary, confirmed features, stack, live URL, repository links, screenshot, and display order. Summary, features, image alternative text, and repository labels are stored once per record in both languages. The collection rejects a record that is missing either language or has feature lists of different lengths. Each screenshot is a supplied JPEG in `src/assets/projects/`. The content record stores the file name, width, and height, and the build rejects a file whose dimensions do not match. The page emits responsive AVIF, WebP, and JPEG variants. Repository links are a list, so Relovia can publish both its backend and frontend repositories. `loadProjects()` is the only read path. `presentProject()` selects one locale. `/projects`, the project detail pages, and their Spanish routes use it. The homepage does not list the projects.

`BaseLayout` emits the localized title and description, a canonical URL, `hreflang` alternates for `en`, `es`, and `x-default`, Open Graph and Twitter card metadata, and Schema.org JSON-LD. English Open Graph locale is `en_US`. Spanish is `es_CL`. The sharing image is `public/og.png`, 1200×630, and each page references it with a localized alternative text. The JSON-LD graph is `WebSite`, `Person`, and `WebPage` on every page. A project page also includes `SoftwareApplication`, using the confirmed name, summary, features, live URL, repositories, and screenshot. It does not include ratings, reviews, offers, or metrics.

`/sitemap.xml` lists the public routes in both languages and repeats the same `hreflang` alternates. `/robots.txt` allows all crawlers and points at that sitemap on the production origin. Redirect pages for `/about` and `/es/about` are `noindex`.

`src/styles/global.css` defines the approved light and dark palettes as semantic variables. Tailwind utilities reference those variables. Inter and JetBrains Mono are self-hosted from their Latin variable files. The content column is 70rem (1120px). Prose is limited to 45rem (720px). Below 64rem the header stacks; from 64rem upward it is a horizontal row.

`trailingSlash` is `never`. Public URLs are `/`, `/experience`, `/projects`, `/projects/mediashelf`, `/projects/relovia`, `/cv`, and the Spanish paths under `/es` without a trailing slash. `/about` redirects to `/`, and `/es/about` redirects to `/es`. The homepage canonical URL keeps the root slash: `https://rolandschlosser.dev/`.

The favicon is an RS monogram in Inter, using the light background and primary text color.

Vercel can build the repository as a static Astro project. The production domain is not configured, and Cloudflare DNS has not been changed.

## Planned

### Directory organization

The photograph is `src/assets/profile/roland-schlosser.jpg` so the build can emit responsive images. `.jpeg`, `.png`, and `.webp` are accepted with that base name, and only one file should be present. The English CV is `public/cv/roland-schlosser-cv-en.pdf`. The Spanish CV is `public/cv/roland-schlosser-cv-es.pdf`. Until a file is there, the page keeps its labeled placeholder.

Page files stay thin. A locale page selects the language and renders a shared component. Project fields are read from the content source rather than copied into each template.

### Content

The project collection is implemented in both languages. English and Spanish prose stay on the same record. Do not create a second English copy of the project fields.

### Internationalization

Implemented in Phase 5. Astro’s built-in i18n routing stays in place:

- `defaultLocale`: `en`
- `locales`: `en`, `es`
- `prefixDefaultLocale`: `false`

### Themes

Implemented in Phase 2. Semantic variables in `src/styles/global.css` cover background, surface, primary text, secondary text, accent, and border. Light values live on the document root. Dark values live under `data-theme="dark"`. Tailwind utilities reference those variables.

Theme selection:

1. A small inline script in the document head reads `localStorage`. A missing choice uses light. A stored system choice is resolved once to light or dark and then stored as that choice.
2. It sets `data-theme` before the page is painted.
3. The header button updates the attribute and stores light or dark. It shows a sun in light mode and a moon in dark mode.

That script is the client-side JavaScript required to prevent a theme flash. Other interaction, including the mobile navigation, should work without animation and without a framework runtime.

### Components

| Piece                           | Responsibility                                            |
| ------------------------------- | --------------------------------------------------------- |
| `BaseLayout`                    | Document, metadata, language, theme attribute, global CSS |
| Header                          | Primary navigation, language control, theme control       |
| Footer                          | Name and copyright                                        |
| Section components              | One homepage region each                                  |
| Project card and project detail | Presentation only; data comes from the content source     |

The header links to Home, Projects, and Experience. Language is a dropdown offering English and Español, and it shows the active language. Theme is one button. It shows a sun in light mode and a moon in dark mode, with an accessible name in the active language. The homepage holds the introduction, photograph, CV download, education, and contact. GitHub, LinkedIn, and email are links in the contact section. `/about` and `/es/about` redirect to the matching homepage. `/projects` lists MediaShelf and Relovia. Each detail page shows the supplied screenshot, the confirmed summary and features, the stack, the live application, and the supplied GitHub links. Architecture stays in each project's repository README.

### Hosting

```text
GitHub main
    └── Vercel production build (pnpm install, pnpm build, dist)
            └── Cloudflare DNS for rolandschlosser.dev
```

Vercel builds static files. Preview deployments can exist for branches other than `main`. No adapter and no environment variables are planned.

Cloudflare already serves:

- `mediashelf.rolandschlosser.dev`
- `relovia.rolandschlosser.dev`

Phase 8 adds records for `rolandschlosser.dev` and redirects `www.rolandschlosser.dev` to that host. Those records must not replace or rewrite the application subdomains.

## Not part of the architecture

- Server-side rendering
- A database or CMS
- Authentication
- A contact form or mail API
- Analytics
- React, Vue, Angular, or Svelte
- Animation libraries
