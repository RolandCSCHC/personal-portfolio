# Implementation phases

Detailed specification for the personal portfolio. The progress overview is in [ROADMAP.md](ROADMAP.md).

Status values:

- Completed — implemented and verified.
- Not started — specified, not implemented.

Check an acceptance item only after it has been verified. Finish one phase, report the result, and wait for approval before starting the next.

Global restrictions apply to every phase:

- Do not invent employment details, education, achievements, project features, metrics, contact details, or social URLs.
- Use a clearly labeled placeholder when required information is missing, and ask for the real value before publication.
- Do not add a backend, database, authentication, contact form, analytics, or unnecessary dependencies.
- Do not add animations, parallax, animated counters, or entrance transitions.
- Keep TypeScript strict, components small, and dependencies limited to what the phase needs.
- Verify with the relevant checks and a production build before calling a phase complete.

---

## Phase 1 — Repository and project foundation

**Status:** Completed  
**Depends on:** nothing

### Objective

Create a static Astro project that can be developed, checked, built, and deployed to Vercel.

### Tasks

- [x] Initialize Git on `main` and set `origin` to `https://github.com/RolandCSCHC/personal-portfolio.git`.
- [x] Initialize Astro with TypeScript.
- [x] Configure Tailwind CSS 4 through `@tailwindcss/vite`.
- [x] Pin Node.js 24 and pnpm.
- [x] Configure ESLint, Prettier, Astro Check, and TypeScript strict mode.
- [x] Establish the initial source layout.
- [x] Configure English as the default locale and Spanish as the secondary locale, without a prefix on English URLs.
- [x] Prepare static Vercel deployment, with no server adapter.
- [x] Write `README.md`.
- [x] Add a placeholder homepage.
- [x] Verify install, development, checks, lint, formatting, build, and preview.

### Technical requirements

- Astro static output.
- `prefixDefaultLocale: false`.
- `trailingSlash: 'never'`, matched by `vercel.json`.
- No React, Vue, Angular, or Svelte.
- No production domain and no Cloudflare DNS changes.

### Deliverables

- Working toolchain and scripts: `dev`, `build`, `preview`, `check`, `lint`, `format`, `format:check`.
- Placeholder homepage at `/`.
- Locale configuration in `astro.config.mjs` and `src/i18n/locales.ts`.
- Shared document shell in `src/layouts/BaseLayout.astro`.
- README, EditorConfig, gitignore, and Vercel trailing-slash setting.

### Scope restrictions

Phase 1 does not include the design system, real homepage sections, navigation, photograph, projects, theme switching, language switching, translations, or CV download.

### Acceptance criteria

- [x] Dependencies install successfully.
- [x] The development server works.
- [x] The production build succeeds.
- [x] TypeScript checks pass.
- [x] ESLint passes.
- [x] Prettier validation passes.
- [x] The GitHub repository and `main` branch are configured.
- [x] Vercel static deployment preparation is complete.

Verified on 31 October 2026. The placeholder homepage was checked in a desktop viewport and at 390px width.

---

## Phase 2 — Design system and global layout

**Status:** Completed  
**Depends on:** Phase 1

### Objective

Establish the visual foundation before implementing page content.

### Tasks

#### Color

- [x] Add semantic CSS variables for background, surface, primary text, secondary text, accent, and border.
- [x] Define the light and dark values below, unless revised before implementation.
- [x] Use those variables from shared styles and components.
- [x] Check text contrast for both themes.

Proposed light palette:

| Role           | Value     |
| -------------- | --------- |
| Background     | `#FAFAF8` |
| Surface        | `#FFFFFF` |
| Primary text   | `#17191D` |
| Secondary text | `#656B75` |
| Accent         | `#356AE6` |
| Border         | `#E7E8EA` |

Proposed dark palette:

| Role           | Value     |
| -------------- | --------- |
| Background     | `#15171B` |
| Surface        | `#1D2026` |
| Primary text   | `#F0F1F2` |
| Secondary text | `#A4A9B2` |
| Accent         | `#6D91FF` |
| Border         | `#343840` |

#### Typography

- [x] Choose and load a professional sans-serif for headings and body text. Inter is the current suggestion.
- [x] Choose and load a monospace face for occasional technical labels. JetBrains Mono is the current suggestion.
- [x] Host the font files locally and respect their licenses.
- [x] Define a heading scale, body size, weights, line height, and a comfortable measure.
- [x] Make the type scale readable on mobile and desktop.

#### Layout

- [x] Extend the document layout with header, main, and footer.
- [x] Add a content container with a maximum width of about 1120px.
- [x] Add a reading measure of about 720px for prose.
- [x] Define a consistent spacing scale.
- [x] Keep the page structure semantic.

#### Header

- [x] Show the name or wordmark.
- [x] Link to Home, Projects, About, and Experience.
- [x] Include the language switcher and theme switcher.
- [x] Use a horizontal navigation on desktop.
- [x] Use a compact navigation on small screens, with no animated menu transition.
- [x] Keep every control usable from the keyboard.

The header includes both About and Experience, as approved on 31 October 2026.

#### Theme switching

- [x] Support light, dark, and the system preference.
- [x] Let the visitor override the theme.
- [x] Persist the choice in `localStorage`.
- [x] Apply the saved or system theme before first paint so the wrong theme does not flash.
- [x] Keep the client script limited to that behavior.

#### Footer

- [x] Show the name and copyright.
- [x] Link to GitHub, LinkedIn, and email once those URLs are supplied.
- [x] Link to MediaShelf and Relovia.

### Technical requirements

- Semantic color variables, not repeated hardcoded colors, wherever a semantic role exists.
- Tailwind CSS 4 remains the styling layer. Theme values live in the global stylesheet.
- No page-transition or menu animation.
- Header, footer, and theme behavior must work in both themes and at mobile, tablet, and desktop widths.

### Deliverables

- Global theme and type styles.
- Header, footer, and content container.
- Working theme switcher.
- Language-switcher placement. The switcher behavior itself belongs to Phase 5; Phase 2 reserves an accessible control and may leave it inactive until translations exist.

### Scope restrictions

Do not write the real homepage sections, project pages, translations, or CV downloads in this phase. Do not introduce a new visual direction.

### Acceptance criteria

- [x] Light and dark themes both render correctly.
- [x] The selected theme persists across reloads.
- [x] The header and footer work on mobile, tablet, and desktop.
- [x] Keyboard navigation works.
- [x] No animations are present.
- [x] Shared colors, type, and spacing are centralized.

Verified on 31 October 2026. Text contrast for the approved palette meets WCAG 2.2 AA. GitHub, LinkedIn, and email are shown as text until their URLs are supplied. Español is visible and inactive. `/projects` is linked and will exist in Phase 4.

---

## Phase 3 — Homepage and professional profile

**Status:** Not started  
**Depends on:** Phase 2

### Objective

Publish the homepage as one page with separate sections that introduce Roland Schlösser and his professional background.

### Tasks

#### Hero

- [ ] Use this introduction: “Hi, I'm Roland Schlösser.”
- [ ] Use this description: “Software Engineer who builds practical, scalable software, loves teaching programming, and enjoys turning complex problems into simple solutions.”
- [ ] Show the professional title Software Engineer.
- [ ] Reserve the photograph area. Use a labeled placeholder until the real photograph is provided. Do not generate a portrait.
- [ ] Link to the projects section, a contact action, GitHub, and LinkedIn.

#### About

Write a concise account of:

- [ ] Software engineering background.
- [ ] Full-stack development.
- [ ] Interest in software architecture.
- [ ] Interest in cloud technologies.
- [ ] Teaching and mentoring.
- [ ] Interest in building useful software products.

#### Experience

Present the roles in chronological order.

- [ ] ShareMaq Tech, Software Engineer.
  - Part-time: December 2024 – July 2026.
  - Full-time: August 2026 – Present.
  - Full-stack development, software architecture, code reviews, production deployments, and cloud infrastructure.
- [ ] University teaching assistant.
  - Subjects: Programming, Object-Oriented Programming, Data Structures and Algorithms, Web Technologies, Software Design, and Applied Algorithmic Thinking.
  - Responsibilities: teaching, student mentoring, and course coordination support.
  - Do not invent the institution name, dates, or achievements. Ask for them, or mark those fields as missing.

#### Education

- [ ] Add an education section.
- [ ] Use labeled placeholders for any missing institution, degree, or dates.
- [ ] Do not invent academic history.

#### Skills

Group only skills that match the supplied experience:

- [ ] Languages: Python, TypeScript, JavaScript, C#.
- [ ] Backend: Django, NestJS, ASP.NET Core.
- [ ] Frontend: Vue.js, Angular, Next.js.
- [ ] Databases: PostgreSQL, MySQL.
- [ ] Cloud and DevOps: AWS, Docker, CI/CD.
- [ ] Other: Git, REST APIs, software architecture, testing, object-oriented programming.

MySQL and testing are included by Roland’s decision on 31 October 2026.

#### Contact

- [ ] Link to email, LinkedIn, and GitHub.
- [ ] Ask for the email address and profile URLs before publication.
- [ ] Do not build a contact form.

### Technical requirements

- One homepage composed of section components.
- Internal links point at real section or page targets.
- External links use the supplied URLs only.
- The page remains readable at the 720px measure and inside the 1120px container.

### Deliverables

- English homepage sections: hero, about, experience, education, skills, and contact.
- Reusable section components for later Spanish pages.

### Scope restrictions

Do not add project detail pages, translations, generated portraits, or a backend. Do not add metrics or achievements that were not supplied.

### Acceptance criteria

- [ ] Every section renders correctly.
- [ ] The layout works on mobile and desktop.
- [ ] Navigation links work.
- [ ] Contact links work, or missing URLs are visibly marked as unpublished.
- [ ] The professional facts match the supplied background.
- [ ] No fabricated content is presented as fact.
- [ ] The visual hierarchy matches the design system.

---

## Phase 4 — Personal projects showcase

**Status:** Not started  
**Depends on:** Phases 2 and 3

### Objective

Present MediaShelf and Relovia as real software projects, on the homepage and on their own pages.

### Tasks

#### Shared project model

- [ ] Store each project once, in an Astro content collection or another typed content source.
- [ ] Use that source for both the homepage cards and the detail pages.
- [ ] Build reusable project card and project detail components.

#### Projects index

- [ ] Add `/projects`, because the public route list requires it.
- [ ] Show both projects with the same facts used on the homepage.

#### Project cards

Each card includes:

- [ ] Name.
- [ ] Short description.
- [ ] Screenshot or preview, when a real image has been supplied.
- [ ] Technology labels.
- [ ] Link to the detail page.
- [ ] Link to the live application.
- [ ] GitHub link when the repository URL has been supplied.

#### MediaShelf

Route: `/projects/mediashelf`  
Live application: [https://mediashelf.rolandschlosser.dev](https://mediashelf.rolandschlosser.dev)

A personal media-tracking application for organizing movies and television series, managing watchlists, and tracking viewing progress.

- [ ] Overview, the problem being solved, and the main features that have actually been confirmed.
- [ ] Stack: Next.js, TypeScript, NestJS, Prisma, PostgreSQL.
- [ ] Architecture overview and technical decisions, using only confirmed information.
- [ ] Real screenshots, or a labeled placeholder until screenshots are provided.
- [ ] Live application link and GitHub link when the repository URL is provided.

#### Relovia

Route: `/projects/relovia`  
Live application: [https://relovia.rolandschlosser.dev](https://relovia.rolandschlosser.dev)

A relocation planning application for organizing domestic and international relocations, documents, tasks, expenses, and moving logistics.

- [ ] Overview, the problem being solved, and the main features that have actually been confirmed.
- [ ] Stack: Angular, TypeScript, C#, ASP.NET Core, PostgreSQL.
- [ ] Architecture overview and technical decisions, using only confirmed information.
- [ ] Real screenshots, or a labeled placeholder until screenshots are provided.
- [ ] Live application link and GitHub link when the repository URL is provided.

### Technical requirements

- Do not copy project fields separately into the homepage and the detail pages.
- Images need alternative text.
- Technology names stay consistent with the skill labels.
- Do not generate fake application screenshots.
- Do not add unconfirmed features, user counts, or performance claims.

### Deliverables

- Typed project content.
- Homepage project section.
- `/projects`.
- `/projects/mediashelf` and `/projects/relovia`.

### Scope restrictions

Feature descriptions that go beyond the summaries above require confirmation. Repository URLs and screenshots are blocked on supplied assets.

### Acceptance criteria

- [ ] Both projects appear on the homepage.
- [ ] Both detail pages and the projects index work.
- [ ] Live application links work.
- [ ] Descriptions match the confirmed product summaries.
- [ ] Technology labels are consistent.
- [ ] Images have appropriate alternative text.
- [ ] Cards and detail pages share one content source.

---

## Phase 5 — Internationalization

**Status:** Not started  
**Depends on:** Phases 3 and 4. The CV page shell is created here and receives its files in Phase 6.

### Objective

Publish a complete English site and a complete Spanish site. English stays the default. Spanish uses the `/es` prefix.

### Routes

| Page       | English                | Spanish                   |
| ---------- | ---------------------- | ------------------------- |
| Home       | `/`                    | `/es`                     |
| Projects   | `/projects`            | `/es/projects`            |
| MediaShelf | `/projects/mediashelf` | `/es/projects/mediashelf` |
| Relovia    | `/projects/relovia`    | `/es/projects/relovia`    |
| CV         | `/cv`                  | `/es/cv`                  |

The current site uses `trailingSlash: 'never'`, so these URLs do not have a trailing slash. The root path remains `/`.

### Tasks

#### Translation system

- [ ] Keep English and Spanish copy in separate modules.
- [ ] Share page components between locales instead of duplicating page implementations.
- [ ] Use typed translation keys.
- [ ] Keep navigation labels consistent.
- [ ] Format dates for the active locale.

#### Language switcher

- [ ] Offer English and Spanish.
- [ ] Move the visitor to the equivalent page in the other language.
- [ ] Fall back to that language’s homepage when an equivalent page does not exist.
- [ ] Show which language is active.
- [ ] Operate from the keyboard.

#### Content

Translate:

- [ ] Navigation.
- [ ] Hero, about, experience, education, skills, and contact.
- [ ] Project cards and both project detail pages.
- [ ] Footer.
- [ ] CV page.
- [ ] Titles, descriptions, and other metadata.

Spanish must read as natural Spanish, not as a word-for-word rendering of the English text.

#### Localized metadata

- [ ] Set the document language.
- [ ] Localize titles and descriptions.
- [ ] Add `hreflang` links.
- [ ] Add canonical URLs.
- [ ] Localize Open Graph metadata.

### Technical requirements

- English files stay in `src/pages/`. Spanish files stay in `src/pages/es/`.
- Locale codes stay aligned with `astro.config.mjs` and `src/i18n/locales.ts`.
- Missing keys should fail a check rather than render blank UI.

### Deliverables

- Spanish route for every public page.
- Shared translation utilities.
- Working language switcher.
- Localized metadata.

### Scope restrictions

Do not machine-publish unreviewed Spanish. Do not change the default language. Do not add a third language.

### Acceptance criteria

- [ ] Every public page exists in English and Spanish.
- [ ] Language switching preserves the current page.
- [ ] Routes match the table above.
- [ ] No translation keys are missing.
- [ ] Metadata is localized.
- [ ] Language alternatives are exposed for search engines.

---

## Phase 6 — Personal assets and CV

**Status:** Not started  
**Depends on:** the pages from Phases 3 and 5 that display these assets

### Objective

Add the real personal assets. Do not generate a photograph, a CV, or application screenshots.

### Tasks

#### Photograph

Wait for the supplied portrait.

- [ ] Display it in the hero at an appropriate crop.
- [ ] Provide responsive, optimized image output.
- [ ] Write descriptive alternative text in English and Spanish.

#### CV files

Wait for the supplied PDFs.

- [ ] Publish `/cv/roland-schlosser-cv-en.pdf`.
- [ ] Publish `/cv/roland-schlosser-cv-es.pdf`.
- [ ] Link each file from the matching language with a clear download label.
- [ ] Serve the files as PDFs.
- [ ] Keep the download usable on a phone.
- [ ] Reject any document that contains information Roland has not supplied.

#### Favicon

- [ ] Replace the Phase 1 placeholder with a simple mark consistent with the site.
- [ ] An “RS” monogram or a restrained typographic mark is acceptable.

#### Social image

- [ ] Create an Open Graph image with the name and professional title.
- [ ] Use the approved visual identity and sufficient contrast.
- [ ] Use the current recommended share-image dimensions.

### Technical requirements

- Optimize image dimensions and formats.
- Do not commit a generated stand-in portrait or a fabricated PDF.
- Alternative text is translated with the rest of the interface.

### Deliverables

- Photograph in the hero.
- Two CV downloads.
- Final favicon.
- Configured social sharing image.

### Scope restrictions

If an asset has not been provided, leave the labeled placeholder in place and stop that part of the phase.

### Acceptance criteria

- [ ] The supplied photograph displays correctly.
- [ ] Both CV downloads open the correct files.
- [ ] The favicon appears in the browser.
- [ ] The social sharing image is referenced by the pages.
- [ ] Images and PDFs are optimized.

---

## Phase 7 — SEO, accessibility, and quality assurance

**Status:** Not started  
**Depends on:** Phases 2–6

### Objective

Make the finished site technically sound, accessible, and ready to publish.

### Tasks

#### SEO

- [ ] Give every page a unique title and meta description.
- [ ] Add canonical URLs.
- [ ] Add Open Graph and Twitter/X card metadata.
- [ ] Generate an XML sitemap.
- [ ] Update `robots.txt` for the public site.
- [ ] Complete `hreflang`.
- [ ] Add Schema.org `Person` and `WebSite` data.
- [ ] Add `CreativeWork` or `SoftwareApplication` on project pages only where the fields are true.
- [ ] Do not add ratings, reviews, or invented project metrics.

#### Accessibility

Review against WCAG 2.2 AA:

- [ ] Semantic HTML and a single logical heading order.
- [ ] Keyboard access and visible focus.
- [ ] Contrast in both themes.
- [ ] Alternative text.
- [ ] Theme and language controls.
- [ ] Mobile navigation.
- [ ] Spot-check with a screen reader.

#### Performance

- [ ] Review image sizes, font loading, CSS, and JavaScript.
- [ ] Keep pages static.
- [ ] Avoid new third-party runtime dependencies.
- [ ] Aim for strong Lighthouse results in Performance, Accessibility, Best Practices, and SEO.
- [ ] Do not weaken accessibility or correctness for a score.

#### Verification

- [ ] `pnpm check`
- [ ] `pnpm lint`
- [ ] `pnpm format:check`
- [ ] `pnpm build`
- [ ] Internal and intended external links.
- [ ] Responsive layouts.
- [ ] Every English and Spanish route.
- [ ] Light and dark themes.
- [ ] Both PDF downloads.

#### Browsers

Test current versions of:

- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge
- [ ] A current iOS browser
- [ ] A current Android browser

### Deliverables

- Complete metadata, sitemap, robots rules, and structured data.
- A recorded verification pass for both languages, both themes, and the listed browsers.

### Scope restrictions

Do not add analytics in this phase. Do not treat a Lighthouse score as permission to remove accessible markup.

### Acceptance criteria

- [ ] No broken internal links.
- [ ] Intended external links work.
- [ ] No missing assets.
- [ ] No TypeScript or build errors.
- [ ] No critical accessibility issues.
- [ ] SEO metadata is complete.
- [ ] Both languages and both themes work.

---

## Phase 8 — Production deployment and launch

**Status:** Not started  
**Depends on:** Phase 7

### Objective

Publish the site at [https://rolandschlosser.dev](https://rolandschlosser.dev) without disrupting MediaShelf or Relovia.

### Tasks

#### GitHub

- [ ] Confirm the repository is public and `main` is the production branch.
- [ ] Confirm the README and history are suitable for a public project.
- [ ] Confirm no secrets or environment files are committed.

#### Vercel

- [ ] Import the GitHub repository.
- [ ] Use `main` as the production branch.
- [ ] Use `pnpm install`, `pnpm build`, and `dist`.
- [ ] Use Node.js 24.
- [ ] Enable production deployments from `main` and preview deployments for other branches or pull requests.
- [ ] Confirm a production build on the Vercel URL before attaching the domain.

#### Cloudflare DNS

- [ ] Follow Vercel’s current instructions for `rolandschlosser.dev`.
- [ ] Add only the records that domain requires.
- [ ] Leave the MediaShelf and Relovia records unchanged.
- [ ] Confirm DNS propagation and HTTPS.
- [ ] Do not edit unrelated records.

#### Domain checks

- [ ] `https://rolandschlosser.dev` loads the portfolio.
- [ ] Verify that `www.rolandschlosser.dev` redirects to `https://rolandschlosser.dev`.
- [ ] Confirm the certificate, the absence of mixed content, and the main routes.

#### Launch checks

- [ ] Homepage, project pages, and CV pages.
- [ ] English and Spanish.
- [ ] Language switcher and theme switcher.
- [ ] CV downloads and photograph.
- [ ] GitHub, LinkedIn, and email links.
- [ ] Mobile navigation.
- [ ] Metadata, sitemap, and `robots.txt`.
- [ ] `mediashelf.rolandschlosser.dev` and `relovia.rolandschlosser.dev` still respond.

#### After launch

- [ ] Update the README with the live URL.
- [ ] Record the deployment in [DECISIONS.md](DECISIONS.md).

### Technical requirements

- Static Astro output, with no server adapter.
- No environment variables unless a verified production need appears.
- DNS changes are limited to the portfolio domain.

### Deliverables

- Public HTTPS site on the production domain.
- Vercel project connected to `main`.
- Cloudflare records for that domain only.
- README pointing at the live site.

### Scope restrictions

Do not republish or reconfigure MediaShelf or Relovia. Do not force-push. Do not commit secrets.

### Acceptance criteria

- [ ] The website is publicly accessible.
- [ ] HTTPS is valid.
- [ ] The Vercel production deployment succeeds.
- [ ] Cloudflare DNS serves the portfolio domain.
- [ ] MediaShelf and Relovia remain available.
- [ ] The launch checks above pass.
