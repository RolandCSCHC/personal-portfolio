/**
 * Locale-neutral facts. Translated copy lives in `src/i18n/ui`.
 * Leave a field unpublished until Roland supplies it. Do not invent a value.
 */

export const siteName = 'Roland Schlösser';

export const copyrightNotice = '© 2026 Roland Schlösser';

export type PublicLink = {
  label: string;
  href: string | null;
  unpublished: string;
};

export type DatedPeriod = {
  label: string | null;
  start: string;
  startDateTime: string;
  end: string;
  endDateTime: string | null;
};

export type Fact = {
  label: string;
  value: string;
};

export type EducationEntry = {
  institution: string;
  credential: string | null;
  dates: string;
  dateTime: string;
};

export type FactList = {
  title: string;
  items: string[];
};

export type ExperienceRole = {
  title: string;
  organization: string | null;
  periods: DatedPeriod[];
  missing: Fact[];
  lists: FactList[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ProjectCopy = {
  title: string;
  overview: string;
  features: string;
  stack: string;
  screenshotUnpublished: string;
  live: string;
  repository: string;
  unpublished: string;
};

export const contactFacts = {
  github: {
    label: 'GitHub',
    href: 'https://github.com/RolandCSCHC',
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rolandschlosser/',
  },
  email: {
    label: 'rcschlosser@miuandes.cl',
    href: 'mailto:rcschlosser@miuandes.cl',
  },
};

export type PeriodKind = 'part-time' | 'full-time';

export type ExperienceFact = {
  id: 'teaching' | 'sharemaq';
  organization: string;
  periods: {
    kind: PeriodKind | null;
    start: string;
    end: string | null;
  }[];
};

export const experienceFacts: readonly ExperienceFact[] = [
  {
    id: 'teaching',
    organization: 'Universidad de los Andes',
    periods: [{ kind: null, start: '2014-03', end: '2026-07' }],
  },
  {
    id: 'sharemaq',
    organization: 'ShareMaq Tech',
    periods: [
      { kind: 'part-time', start: '2024-12', end: '2026-07' },
      { kind: 'full-time', start: '2026-08', end: null },
    ],
  },
];

export const educationFacts: readonly {
  institution: string;
  credential: 'computerScience' | null;
  dates: string;
  dateTime: string;
}[] = [
  {
    institution: 'Universidad de los Andes',
    credential: 'computerScience',
    dates: '2026',
    dateTime: '2026',
  },
  {
    institution: 'Colegio Alemán de Santiago',
    credential: null,
    dates: '2009',
    dateTime: '2009',
  },
];

export const translatedSkillKeys = [
  'softwareArchitecture',
  'testing',
  'objectOrientedProgramming',
] as const;

export type TranslatedSkill = (typeof translatedSkillKeys)[number];

export function isTranslatedSkill(value: string): value is TranslatedSkill {
  return translatedSkillKeys.some((key) => key === value);
}

export type SkillGroupId =
  'languages' | 'backend' | 'frontend' | 'databases' | 'cloud' | 'other';

export const skillFacts: readonly {
  id: SkillGroupId;
  items: readonly string[];
}[] = [
  {
    id: 'languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'C#', 'C++'],
  },
  {
    id: 'backend',
    items: ['Django', 'NestJS', 'ASP.NET Core'],
  },
  {
    id: 'frontend',
    items: ['Vue.js', 'Angular', 'Next.js'],
  },
  {
    id: 'databases',
    items: ['PostgreSQL', 'MySQL'],
  },
  {
    id: 'cloud',
    items: ['AWS', 'Docker', 'CI/CD'],
  },
  {
    id: 'other',
    items: [
      'Git',
      'REST APIs',
      'softwareArchitecture',
      'testing',
      'objectOrientedProgramming',
    ],
  },
];

export function pageTitle(label: string): string {
  return `${label} — ${siteName}`;
}

export function homeTitle(role: string): string {
  return `${siteName} — ${role}`;
}
