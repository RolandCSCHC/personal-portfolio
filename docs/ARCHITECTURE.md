# Architecture

This document separates what is already implemented from the architecture planned for later phases.

## Implemented

The site is an Astro 7 static site. `astro.config.mjs` sets `output: 'static'`, so pages are generated as HTML at build time. There is no server adapter, no backend, and no environment variables.

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
├── components/layout/   Header, footer, language control, theme control
├── i18n/locales.ts
├── layouts/BaseLayout.astro
├── pages/index.astro
├── scripts/theme.ts
└── styles/              global.css and fonts.css
public/
├── favicon.svg
└── robots.txt
```

`src/i18n/locales.ts` exports `en` and `es`, with `en` as the default. The same codes are set in `astro.config.mjs`. English routes have no prefix. Spanish files, when added, belong in `src/pages/es/`.

`BaseLayout.astro` renders the document shell, header, main content, and footer. It sets `lang` from `Astro.currentLocale` and applies the saved theme before paint. The homepage is still a placeholder inside that shell.

`src/styles/global.css` defines the approved light and dark palettes as semantic variables. Tailwind utilities reference those variables. Inter and JetBrains Mono are self-hosted from their Latin variable files. The content column is 70rem (1120px). Prose is limited to 45rem (720px). Below 64rem the header stacks; from 64rem upward it is a horizontal row.

`trailingSlash` is `never`. Public URLs are `/`, `/projects`, `/projects/mediashelf`, `/projects/relovia`, `/cv`, and the Spanish paths under `/es` without a trailing slash.

`robots.txt` allows all crawlers. It is not yet a launch configuration. The favicon is a temporary monogram, not the final identity mark.

Vercel can build the repository as a static Astro project. The production domain is not configured, and Cloudflare DNS has not been changed.

## Planned

### Directory organization

Add directories when they receive real files.

```text
src/
├── components/
│   ├── layout/          Header, footer, navigation
│   ├── sections/        Homepage sections
│   └── projects/        Card and detail presentation
├── content/projects/    One typed record per project
├── data/                Profile links once they are supplied
├── i18n/                Locale list and translation modules
├── layouts/             Document and page layouts
├── pages/               English routes
│   └── es/              Spanish routes
└── styles/global.css    Tailwind import, theme variables, base type
public/
├── cv/                  Supplied PDF files
├── images/profile/
└── images/projects/
```

Page files stay thin. A locale page selects the language and renders a shared component. Project fields are read from the content source rather than copied into each template.

### Content

Use an Astro content collection, defined in `src/content.config.ts`, for MediaShelf and Relovia. The collection is the only source for:

- name and summary
- confirmed features and technical decisions
- stack
- live URL
- repository URL, when supplied
- screenshot paths and alternative text

The homepage cards, `/projects`, and the two detail pages read that collection. Do not create a second copy of the same fields in a page component.

If a content collection proves unnecessary for two records, a single typed module in `src/content/projects/` is acceptable, provided both the cards and the detail pages import it. That substitution should be recorded in [DECISIONS.md](DECISIONS.md) before it is used.

### Internationalization

Astro’s built-in i18n routing stays in place:

- `defaultLocale`: `en`
- `locales`: `en`, `es`
- `prefixDefaultLocale`: `false`

English pages live in `src/pages/`. Spanish pages live in `src/pages/es/`. Shared UI reads copy from locale modules, for example `src/i18n/ui/en.ts` and `src/i18n/ui/es.ts`, with a typed key set. Dates use the active locale.

The language switcher computes the equivalent URL for the other locale and falls back to that locale’s homepage. `BaseLayout` continues to set `lang` from the active locale.

Canonical URLs and `hreflang` are added in Phase 5 and completed in Phase 7. Astro’s `site` option is not set yet. Set it to `https://rolandschlosser.dev` when canonical URLs are implemented, not before the domain is ready to publish.

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

The header links to Home, Projects, About, and Experience. The language control shows English as current and leaves Español inactive until Phase 5. GitHub, LinkedIn, and email are visible in the footer and are not links until their URLs are supplied.

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
