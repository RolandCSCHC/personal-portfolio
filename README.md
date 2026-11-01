# Personal Portfolio

Personal portfolio website for Roland Schlösser, a software engineer. The site will present professional experience, technical skills, education, and personal projects, and give recruiters a direct way to get in touch.

The site presents Roland’s professional profile and the MediaShelf and Relovia project pages in English and Spanish. The photograph and the CV files appear when they are placed at the paths below.

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
│   ├── cv/
│   ├── favicon.svg
│   ├── og.png
│   └── robots.txt
├── docs/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── projects/
│   │   ├── sections/
│   │   └── PublicLink.astro
│   ├── assets/
│   │   └── profile/
│   ├── content/
│   │   └── projects/
│   ├── content.config.ts
│   ├── data/
│   │   ├── assets.ts
│   │   ├── profile.ts
│   │   └── projects.ts
│   ├── i18n/
│   │   ├── locales.ts
│   │   ├── dates.ts
│   │   ├── profile.ts
│   │   ├── routes.ts
│   │   └── ui/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── experience.astro
│   │   ├── cv.astro
│   │   ├── projects/
│   │   └── es/
│   ├── scripts/
│   │   └── theme.ts
│   └── styles/
│       ├── fonts.css
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

- `src/assets/profile/roland-schlosser.jpg` for the professional photograph. `.jpeg`, `.png`, and `.webp` are also accepted with the same base name. Keep one file. Astro builds a responsive image from it.
- `public/images/projects/` for project screenshots. The current files are `mediashelf.jpg` and `relovia.jpg`.
- `public/cv/roland-schlosser-cv-en.pdf` for the English CV.
- `public/cv/roland-schlosser-cv-es.pdf` for the Spanish CV.

### Languages and routes

English is the default language and has no URL prefix. Spanish uses the `/es` prefix. Routes do not use a trailing slash, except the site root `/`.

| Page       | English                | Spanish                   |
| ---------- | ---------------------- | ------------------------- |
| Home       | `/`                    | `/es`                     |
| About      | `/about`               | `/es/about`               |
| Experience | `/experience`          | `/es/experience`          |
| Projects   | `/projects`            | `/es/projects`            |
| MediaShelf | `/projects/mediashelf` | `/es/projects/mediashelf` |
| Relovia    | `/projects/relovia`    | `/es/projects/relovia`    |
| CV         | `/cv`                  | `/es/cv`                  |

English pages live in `src/pages/`. Spanish pages live in `src/pages/es/`. Shared markup belongs in layouts and components so each locale file stays thin. Locale codes are defined in `astro.config.mjs` and `src/i18n/locales.ts` and must stay aligned. Interface copy is in `src/i18n/ui/`. A missing or blank translation fails the build. The header language control switches to the same page in the other language.

Home is the introduction and contact. About includes education, and Experience includes skills. `/projects` lists MediaShelf and Relovia, and each project has a detail page. `/cv` and `/es/cv` offer the PDF for that language. The implementation roadmap is in `docs/ROADMAP.md`.
