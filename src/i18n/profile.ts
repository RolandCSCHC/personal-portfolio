import {
  contactFacts,
  educationFacts,
  experienceFacts,
  isTranslatedSkill,
  skillFacts,
  type ExperienceFact,
  type ExperienceRole,
  type FactList,
  type PeriodKind,
  type ProjectCopy,
  type PublicLink,
  type SkillGroup,
} from '../data/profile';
import { formatMonth } from './dates';
import type { Locale } from './locales';
import { getUi, type Ui } from './ui';

function periodLabel(kind: PeriodKind | null, ui: Ui): string | null {
  if (kind === 'part-time') {
    return ui.experience.partTime;
  }
  if (kind === 'full-time') {
    return ui.experience.fullTime;
  }
  return null;
}

function roleTitle(id: ExperienceFact['id'], ui: Ui): string {
  switch (id) {
    case 'teaching':
      return ui.experience.teaching.title;
    case 'sharemaq':
      return ui.experience.sharemaq.title;
  }
}

function roleLists(id: ExperienceFact['id'], ui: Ui): FactList[] {
  switch (id) {
    case 'teaching':
      return [
        {
          title: ui.experience.teaching.subjectsTitle,
          items: [...ui.experience.teaching.subjects],
        },
        {
          title: ui.experience.teaching.responsibilitiesTitle,
          items: [...ui.experience.teaching.responsibilities],
        },
      ];
    case 'sharemaq':
      return [
        {
          title: ui.experience.sharemaq.responsibilitiesTitle,
          items: [...ui.experience.sharemaq.responsibilities],
        },
      ];
  }
}

function experienceRoles(locale: Locale, ui: Ui): ExperienceRole[] {
  return experienceFacts.map((role) => ({
    title: roleTitle(role.id, ui),
    organization: role.organization,
    periods: role.periods.map((period) => ({
      label: periodLabel(period.kind, ui),
      start: formatMonth(period.start, locale),
      startDateTime: period.start,
      end:
        period.end === null
          ? ui.experience.present
          : formatMonth(period.end, locale),
      endDateTime: period.end,
    })),
    missing: [],
    lists: roleLists(role.id, ui),
  }));
}

function link(label: string, href: string, unpublished: string): PublicLink {
  return { label, href, unpublished };
}

export function getProfile(locale: Locale) {
  const ui = getUi(locale);
  const projects = {
    title: ui.projects.title,
    overview: ui.projects.overview,
    features: ui.projects.features,
    stack: ui.projects.stack,
    screenshotUnpublished: ui.projects.screenshotUnpublished,
    live: ui.projects.live,
    repository: ui.projects.repository,
    unpublished: ui.unpublished,
  } satisfies ProjectCopy;

  const github = link(
    contactFacts.github.label,
    contactFacts.github.href,
    ui.unpublished,
  );
  const linkedin = link(
    contactFacts.linkedin.label,
    contactFacts.linkedin.href,
    ui.unpublished,
  );
  const email = link(
    contactFacts.email.label,
    contactFacts.email.href,
    ui.unpublished,
  );

  return {
    hero: {
      title: ui.hero.title,
      introduction: ui.hero.introduction,
      paragraphs: [...ui.hero.paragraphs],
      photograph: ui.hero.photograph,
      photographAlt: ui.hero.photographAlt,
    },
    experience: {
      title: ui.experience.title,
      description: ui.experience.description,
      roles: experienceRoles(locale, ui),
    },
    education: {
      title: ui.education.title,
      entries: educationFacts.map((entry) => ({
        institution: entry.institution,
        credential:
          entry.credential === 'computerScience'
            ? ui.education.computerScience
            : null,
        dates: entry.dates,
        dateTime: entry.dateTime,
      })),
    },
    skills: {
      title: ui.skills.title,
      groups: skillFacts.map((group): SkillGroup => ({
        title: ui.skills.groups[group.id],
        items: group.items.map((item) =>
          isTranslatedSkill(item) ? ui.skills.items[item] : item,
        ),
      })),
    },
    projects,
    contact: {
      title: ui.contact.title,
      links: [github, linkedin, email],
    },
    cv: ui.cv,
    meta: ui.meta,
    github,
    linkedin,
  };
}
