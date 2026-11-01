import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/locales';
import { localeHref } from '../i18n/routes';
import { projectImage } from './project-images';

export type ProjectView = {
  id: string;
  name: string;
  summary: string;
  features: string[];
  stack: string[];
  liveUrl: string;
  repositories: { label: string; url: string }[];
  image: {
    src: ImageMetadata;
    alt: string;
    width: number;
    height: number;
  } | null;
  href: string;
};

function presentImage(
  image: NonNullable<CollectionEntry<'projects'>['data']['image']>,
  locale: Locale,
): NonNullable<ProjectView['image']> {
  const file = projectImage(image.src);

  if (file.width !== image.width || file.height !== image.height) {
    throw new Error(
      `${image.src} is ${file.width}×${file.height}, but the content record says ${image.width}×${image.height}.`,
    );
  }

  return {
    src: file,
    alt: image.alt[locale],
    width: file.width,
    height: file.height,
  };
}

export async function loadProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export function presentProject(
  project: CollectionEntry<'projects'>,
  locale: Locale,
): ProjectView {
  const { data } = project;
  return {
    id: project.id,
    name: data.name,
    summary: data.summary[locale],
    features: [...data.features[locale]],
    stack: data.stack,
    liveUrl: data.liveUrl,
    repositories: data.repositories.map((repository) => ({
      label: repository.label[locale],
      url: repository.url,
    })),
    image: data.image ? presentImage(data.image, locale) : null,
    href: localeHref(locale, `projects/${project.id}`),
  };
}

export async function loadProjectViews(locale: Locale): Promise<ProjectView[]> {
  const projects = await loadProjects();
  return projects.map((project) => presentProject(project, locale));
}

export async function projectStaticPaths() {
  const projects = await loadProjects();
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}
