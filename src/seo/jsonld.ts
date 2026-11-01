import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { portraitImage } from '../data/assets';
import {
  contactFacts,
  educationFacts,
  experienceFacts,
  isTranslatedSkill,
  siteName,
  skillFacts,
} from '../data/profile';
import type { ProjectView } from '../data/projects';
import type { Locale } from '../i18n/locales';
import { getUi, type Ui } from '../i18n/ui';
import { absoluteLocaleUrl, personId, websiteId } from './urls';

/**
 * Schema.org for the public site.
 * Only supplied facts. No ratings, reviews, or project metrics.
 */

export type JsonLdNode = {
  '@type': string;
  '@id': string;
  [key: string]: unknown;
};

type BuiltImage = {
  url: string;
  width: number;
  height: number;
};

function emailAddress(href: string): string {
  return href.startsWith('mailto:') ? href.slice('mailto:'.length) : href;
}

function dimension(
  value: string | number | null | undefined,
  label: string,
): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Optimized image is missing ${label}.`);
  }
  return parsed;
}

async function builtImage(
  site: URL,
  src: ImageMetadata,
  width: number,
): Promise<BuiltImage> {
  const rendered = await getImage({
    src,
    width: Math.min(width, src.width),
    format: 'jpeg',
    quality: 80,
  });

  return {
    url: new URL(rendered.src, site).href,
    width: dimension(rendered.attributes.width, 'width'),
    height: dimension(rendered.attributes.height, 'height'),
  };
}

function personNode(
  site: URL,
  locale: Locale,
  ui: Ui,
  image: string | undefined,
): JsonLdNode {
  const degree = educationFacts.find(
    (entry) => entry.credential === 'computerScience',
  );
  const employer = experienceFacts.find(
    (role) =>
      role.id === 'sharemaq' &&
      role.periods.some((period) => period.end === null),
  );
  const knowsAbout = skillFacts.flatMap((group) =>
    group.items.map((item) =>
      isTranslatedSkill(item) ? ui.skills.items[item] : item,
    ),
  );

  return {
    '@type': 'Person',
    '@id': personId(site),
    name: siteName,
    jobTitle: ui.hero.title,
    description: ui.meta.home,
    url: absoluteLocaleUrl(site, locale, ''),
    email: emailAddress(contactFacts.email.href),
    image,
    sameAs: [contactFacts.github.href, contactFacts.linkedin.href],
    worksFor: employer
      ? { '@type': 'Organization', name: employer.organization }
      : undefined,
    alumniOf: educationFacts.map((entry) => ({
      '@type':
        entry.credential === 'computerScience'
          ? 'CollegeOrUniversity'
          : 'EducationalOrganization',
      name: entry.institution,
    })),
    hasCredential: degree
      ? {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: ui.education.computerScience,
          dateCreated: degree.dateTime,
          recognizedBy: {
            '@type': 'CollegeOrUniversity',
            name: degree.institution,
          },
        }
      : undefined,
    knowsAbout,
  };
}

function websiteNode(site: URL, description: string): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': websiteId(site),
    url: new URL('/', site).href,
    name: siteName,
    description,
    inLanguage: ['en', 'es'],
    publisher: { '@id': personId(site) },
  };
}

export async function softwareApplicationNode(
  site: URL,
  project: ProjectView,
  pageUrl: string,
): Promise<JsonLdNode> {
  const repositories = project.repositories.map((repository) => repository.url);
  const screenshot = project.image
    ? await builtImage(site, project.image.src, 1280)
    : undefined;

  return {
    '@type': 'SoftwareApplication',
    '@id': `${project.liveUrl}#software`,
    name: project.name,
    description: project.summary,
    url: project.liveUrl,
    featureList: project.features,
    codeRepository:
      repositories.length === 1
        ? repositories[0]
        : repositories.length > 1
          ? repositories
          : undefined,
    screenshot: screenshot
      ? {
          '@type': 'ImageObject',
          url: screenshot.url,
          width: screenshot.width,
          height: screenshot.height,
          caption: project.image?.alt,
        }
      : undefined,
    author: { '@id': personId(site) },
    mainEntityOfPage: pageUrl,
  };
}

export async function buildJsonLd(input: {
  site: URL;
  locale: Locale;
  canonical: string;
  title: string;
  description: string;
  graph?: JsonLdNode[];
  mainEntityId?: string;
}): Promise<string> {
  if (input.title.trim() === '' || input.description.trim() === '') {
    throw new Error('Structured data requires a title and a description.');
  }

  const ui = getUi(input.locale);
  const portrait = portraitImage();
  const image = portrait
    ? (await builtImage(input.site, portrait, 768)).url
    : undefined;

  const page: JsonLdNode = {
    '@type': 'WebPage',
    '@id': `${input.canonical}#webpage`,
    url: input.canonical,
    name: input.title,
    description: input.description,
    inLanguage: input.locale,
    isPartOf: { '@id': websiteId(input.site) },
    about: { '@id': personId(input.site) },
    mainEntity: input.mainEntityId ? { '@id': input.mainEntityId } : undefined,
  };

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(input.site, ui.meta.home),
      personNode(input.site, input.locale, ui, image),
      page,
      ...(input.graph ?? []),
    ],
  };

  return JSON.stringify(data).replaceAll('<', '\\u003c');
}
