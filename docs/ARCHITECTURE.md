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
├── components/
│   ├── layout/          Header, footer, language control, theme control
│   ├── pages/           Shared page views used by both locales
│   ├── projects/        Card, list, detail, media, technology labels
│   ├── sections/        Profile sections
│   └── PublicLink.astro
├── content/projects/    mediashelf.json and relovia.json
├── content.config.ts    Projects collection schema
├── data/
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
│   ├── index.astro      Introduction and contact
│   ├── about.astro
│   ├── experience.astro
│   ├── cv.astro
│   ├── projects/
│   └── es/              Spanish routes for the same pages
├── scripts/theme.ts
└── styles/              global.css and fonts.css
public/
├── favicon.svg
├── images/projects/
└── robots.txt
```

`src/i18n/locales.ts` exports `en` and `es`, with `en` as the default. The same codes are set in `astro.config.mjs`. English routes have no prefix. Spanish pages live in `src/pages/es/`.

`BaseLayout.astro` renders the document shell, header, main content, and footer. It sets `lang` from the page locale and applies the saved theme before paint. Each route file selects `en` or `es` and renders a shared page component. Interface copy lives in `src/i18n/ui/en.ts` and `src/i18n/ui/es.ts`. Spanish must satisfy the English key shape, and loading the modules fails when a key is missing, extra, or blank. Dates are stored as `YYYY-MM` and formatted with `Intl` for the active locale. GitHub, LinkedIn, and email render through `PublicLink`. A null `href` shows the label and the localized unpublished text instead of a link.

The language control offers English and Español. It links to the same page in the other language, keeps the current fragment, and falls back to that language’s homepage when the page does not exist. The selected option shows the active language. The control is a native select, so it works from the keyboard.

MediaShelf and Relovia live in the `projects` content collection defined in `src/content.config.ts`. Each record holds the name, summary, confirmed features, stack, live URL, repository links, screenshot, and display order. Summary, features, image alternative text, and repository labels are stored once per record in both languages. The collection rejects a record that is missing either language or has feature lists of different lengths. Each screenshot is a 1600-pixel-wide JPEG in `public/images/projects/`, with width and height. Repository links are a list, so Relovia can publish both its backend and frontend repositories. `loadProjects()` is the only read path. `presentProject()` selects one locale. `/projects`, the project detail pages, their Spanish routes, and the footer application links all use it. The homepage does not list the projects.

`BaseLayout` emits the localized title and description, a canonical URL, `hreflang` alternates for `en`, `es`, and `x-default`, and Open Graph title, description, URL, type, and locale. English Open Graph locale is `en_US`. Spanish is `es_CL`. There is no social image yet.

`src/styles/global.css` defines the approved light and dark palettes as semantic variables. Tailwind utilities reference those variables. Inter and JetBrains Mono are self-hosted from their Latin variable files. The content column is 70rem (1120px). Prose is limited to 45rem (720px). Below 64rem the header stacks; from 64rem upward it is a horizontal row.

`trailingSlash` is `never`. Public URLs are `/`, `/about`, `/experience`, `/projects`, `/projects/mediashelf`, `/projects/relovia`, `/cv`, and the Spanish paths under `/es` without a trailing slash. The homepage canonical URL keeps the root slash: `https://rolandschlosser.dev/`.

`robots.txt` allows all crawlers. It is not yet a launch configuration. The favicon is a temporary monogram, not the final identity mark.

Vercel can build the repository as a static Astro project. The production domain is not configured, and Cloudflare DNS has not been changed.

## Planned

### Directory organization

Add directories when they receive real files.

```text
public/
├── cv/                  Supplied PDF files
└── images/profile/      Professional photograph
```

Page files stay thin. A locale page selects the language and renders a shared component. Project fields are read from the content source rather than copied into each template.

### Content

The project collection is implemented in both languages. English and Spanish prose stay on the same record. Do not create a second English copy of the project fields.

### Internationalization

Implemented in Phase 5. Astro’s built-in i18n routing stays in place:

- `defaultLocale`: `en`
- `locales`: `en`, `es`
- `prefixDefaultLocale`: `false`

Phase 7 completes the sitemap, `robots.txt`, and structured data around the canonical URLs and `hreflang` links already emitted by `BaseLayout`.

### Themes

Implemented in Phase 2. Semantic variables in `src/styles/global.css` cover background, surface, primary text, secondary text, accent, and border. Light values live on the document root. Dark values live under `data-theme="dark"`. An explicit light choice overrides a dark system preference. Tailwind utilities reference those variables.

Theme selection:

1. A small inline script in the document head reads `localStorage` and, when no choice is stored, `prefers-color-scheme`.
2. It sets the theme attribute before the page is painted.
3. The header control updates the attribute and stores the choice.

That script is the client-side JavaScript required to prevent a theme flash. Other interaction, including the mobile navigation, should work without animation and without a framework runtime.

### Components

| Piece                           | Responsibility                                                |
| ------------------------------- | ------------------------------------------------------------- |
| `BaseLayout`                    | Document, metadata, language, theme attribute, global CSS     |
| Header                          | Wordmark, primary navigation, language control, theme control |
| Footer                          | Name, copyright, contact links, MediaShelf, Relovia           |
| Section components              | One homepage region each                                      |
| Project card and project detail | Presentation only; data comes from the content source         |

The header links to Home, Projects, About, and Experience. Language and theme are dropdowns. The language dropdown offers English and Español and shows the active language. The theme dropdown offers light, dark, and system, with labels in the active language. GitHub, LinkedIn, and email are links in the footer, the hero, and the contact section. The hero links to `/projects` and `#contact`. `/projects` lists MediaShelf and Relovia. Each detail page shows the supplied screenshot, the confirmed summary and features, the stack, the live application, and the supplied GitHub links. Architecture stays in each project's repository README.

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
