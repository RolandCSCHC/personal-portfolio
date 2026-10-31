# Personal Portfolio

Personal portfolio website for Roland Schlösser, a software engineer. The site will present professional experience, technical skills, education, and personal projects, and give recruiters a direct way to get in touch.

This repository currently contains the project foundation: the static site toolchain, language routing, and quality checks. The portfolio content and visual design come in later phases.

**Website:** [rolandschlosser.dev](https://rolandschlosser.dev)

## Project objectives

- Present a clear professional identity.
- Showcase experience, skills, education, and selected projects.
- Publish project links, including [MediaShelf](https://mediashelf.rolandschlosser.dev) and [Relovia](https://relovia.rolandschlosser.dev).
- Offer the site in English and Spanish, with English as the default.
- Provide a downloadable CV.
- Stay fast, readable, and maintainable as a static website.

## Technology stack

- [Astro](https://astro.build/) for static site generation
- TypeScript in strict mode
- [Tailwind CSS 4](https://tailwindcss.com/) through `@tailwindcss/vite`
- [Lucide](https://lucide.dev/) icons through `@lucide/astro` when an icon is added
- ESLint, Prettier, and Astro Check
- Node.js 24 and pnpm
- GitHub, Vercel, and Cloudflare DNS

The site does not use React, Vue, Angular, or Svelte. Pages are Astro components, and client-side JavaScript is added only when a feature needs it.

## Prerequisites

- Node.js 24.16.0 or newer. This project pins Node.js 24.21.0 in `.node-version`.
- pnpm 9.15.0. The `packageManager` field in `package.json` records this version.
- Git

## Installation

```bash
pnpm install
```

## Local development

```bash
pnpm dev
```

The development server starts at [http://localhost:4321](http://localhost:4321).

## Available package scripts

| Script         | Command             | Purpose                                         |
| -------------- | ------------------- | ----------------------------------------------- |
| `dev`          | `pnpm dev`          | Start the local development server              |
| `build`        | `pnpm build`        | Generate the static production build in `dist/` |
| `preview`      | `pnpm preview`      | Serve the production build locally              |
| `check`        | `pnpm check`        | Run Astro and TypeScript checks                 |
| `lint`         | `pnpm lint`         | Run ESLint                                      |
| `format`       | `pnpm format`       | Format supported files with Prettier            |
| `format:check` | `pnpm format:check` | Check formatting without modifying files        |

## Production build

```bash
pnpm build
pnpm preview
```

`pnpm build` writes a static site to `dist/`. `pnpm preview` serves that output so it can be checked before deployment.

## Deployment

The site is a static Astro project (`output: 'static'`) and does not use a server adapter. Vercel detects Astro from the repository.

Planned deployment:

1. Import `RolandCSCHC/personal-portfolio` into a Vercel project.
2. Leave the framework preset as Astro. The install command is `pnpm install`, the build command is `pnpm build`, and the output directory is `dist`.
3. Use the Node.js version from `.node-version` (24.21.0).
4. Deploy to the Vercel-generated URL first.

No environment variables are required. The production domain and Cloudflare DNS records are not configured in this phase.

`vercel.json` sets `trailingSlash` to `false`, matching the Astro `trailingSlash: 'never'` policy.

## Repository

- GitHub: [https://github.com/RolandCSCHC/personal-portfolio](https://github.com/RolandCSCHC/personal-portfolio)
- Owner: `RolandCSCHC`
- Visibility: public
- Default branch: `main`

## Project structure

```text
personal-portfolio/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── i18n/
│   │   └── locales.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── .editorconfig
├── .gitignore
├── .node-version
├── .npmrc
├── .prettierignore
├── .prettierrc
├── astro.config.mjs
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
└── vercel.json
```

Directories below are part of the intended layout and are created when they first receive files:

- `public/images/profile/` for the professional photograph
- `public/images/projects/` for project images
- `public/cv/` for the downloadable CV
- `src/components/layout/`, `src/components/sections/`, and `src/components/projects/` for interface components
- `src/content/projects/` for project content
- `src/data/` for structured site data
- `src/pages/es/` for Spanish pages

### Languages and routes

English is the default language and has no URL prefix. Spanish uses the `/es` prefix. Routes do not use a trailing slash, except the site root `/`.

| Page       | English                | Spanish                   |
| ---------- | ---------------------- | ------------------------- |
| Home       | `/`                    | `/es`                     |
| Projects   | `/projects`            | `/es/projects`            |
| MediaShelf | `/projects/mediashelf` | `/es/projects/mediashelf` |
| Relovia    | `/projects/relovia`    | `/es/projects/relovia`    |
| CV         | `/cv`                  | `/es/cv`                  |

English pages live in `src/pages/`. Spanish pages will live in `src/pages/es/`. Shared markup belongs in layouts and components so each locale file stays thin. Locale codes are defined in `astro.config.mjs` and `src/i18n/locales.ts` and must stay aligned. Translations and the language switcher are not implemented yet.

The current homepage is a placeholder used to verify the foundation.
