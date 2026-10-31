import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/locales';
import { localeHref } from '../i18n/routes';

export type ProjectView = {
  id: string;
  name: string;
  summary: string;
  features: string[];
  stack: string[];
  liveUrl: string;
  repositories: { label: string; url: string }[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  href: string;
};

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
    image: data.image
      ? {
          src: data.image.src,
          alt: data.image.alt[locale],
          width: data.image.width,
          height: data.image.height,
        }
      : null,
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
