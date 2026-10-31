import { getCollection, type CollectionEntry } from 'astro:content';

export async function loadProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}
