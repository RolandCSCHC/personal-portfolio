/**
 * English homepage facts.
 * Leave a field unpublished until Roland supplies it. Do not invent a value.
 */

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

export const contactLinks: {
  github: PublicLink;
  linkedin: PublicLink;
  email: PublicLink;
} = {
  github: {
    label: 'GitHub',
    href: 'https://github.com/RolandCSCHC',
    unpublished: 'Not published yet',
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rolandschlosser/',
    unpublished: 'Not published yet',
  },
  email: {
    label: 'rcschlosser@miuandes.cl',
    href: 'mailto:rcschlosser@miuandes.cl',
    unpublished: 'Not published yet',
  },
};

export const contactLinkList: PublicLink[] = [
  contactLinks.github,
  contactLinks.linkedin,
  contactLinks.email,
];

export const profile = {
  meta: {
    title: 'Roland Schlösser — Software Engineer',
    description:
      'Software Engineer who builds practical, scalable software, loves teaching programming, and enjoys turning complex problems into simple solutions.',
  },
  hero: {
    title: 'Software Engineer',
    introduction: "Hi, I'm Roland Schlösser.",
    description:
      'Software Engineer who builds practical, scalable software, loves teaching programming, and enjoys turning complex problems into simple solutions.',
    photograph: 'Photograph not published yet',
    projectsHref: '/projects',
    projectsLabel: 'Projects',
    contactHref: '#contact',
    contactLabel: 'Contact',
  },
  about: {
    title: 'About',
    paragraphs: [
      'I am a software engineer working on full-stack development. I am interested in software architecture, cloud technologies, and building useful software products.',
      'I taught programming at Universidad de los Andes, where I mentored students and supported course coordination.',
    ],
  },
  experience: {
    title: 'Experience',
    // Ordered by start date. Teaching begins in 2014 and overlaps ShareMaq.
    roles: [
      {
        title: 'Teacher Assistant',
        organization: 'Universidad de los Andes',
        periods: [
          {
            label: null,
            start: 'March 2014',
            startDateTime: '2014-03',
            end: 'July 2026',
            endDateTime: '2026-07',
          },
        ],
        missing: [],
        lists: [
          {
            title: 'Subjects',
            items: [
              'Programming (Python)',
              'Object-Oriented Programming (Python and functional programming with JavaScript)',
              'Web Technologies (Ruby on Rails)',
              'Applied Algorithmic Thinking (Python)',
              'Software Design (design patterns)',
              'Python and Databases (Python, SQL, web scraping, and APIs)',
            ],
          },
          {
            title: 'Responsibilities',
            items: [
              'Helping students with assignments',
              'Grading and guiding course projects',
              'Coordinating the class, grades, and other teaching assistants',
              'Preparing students for laboratory assignments and exams',
            ],
          },
        ],
      },
      {
        title: 'Software Engineer',
        organization: 'ShareMaq Tech',
        periods: [
          {
            label: 'Part-time',
            start: 'December 2024',
            startDateTime: '2024-12',
            end: 'July 2026',
            endDateTime: '2026-07',
          },
          {
            label: 'Full-time',
            start: 'August 2026',
            startDateTime: '2026-08',
            end: 'Present',
            endDateTime: null,
          },
        ],
        missing: [],
        lists: [
          {
            title: 'Responsibilities',
            items: [
              'Full-stack development',
              'Software architecture',
              'Code reviews',
              'Production deployments',
              'Cloud infrastructure',
            ],
          },
        ],
      },
    ] satisfies ExperienceRole[],
  },
  education: {
    title: 'Education',
    entries: [
      {
        institution: 'Universidad de los Andes',
        credential: 'Civil Engineer in Computer Science',
        dates: '2026',
        dateTime: '2026',
      },
      {
        institution: 'Colegio Alemán de Santiago',
        credential: null,
        dates: '2009',
        dateTime: '2009',
      },
    ] satisfies EducationEntry[],
  },
  skills: {
    title: 'Skills',
    groups: [
      {
        title: 'Languages',
        items: ['Python', 'TypeScript', 'JavaScript', 'C#'],
      },
      {
        title: 'Backend',
        items: ['Django', 'NestJS', 'ASP.NET Core'],
      },
      {
        title: 'Frontend',
        items: ['Vue.js', 'Angular', 'Next.js'],
      },
      {
        title: 'Databases',
        items: ['PostgreSQL', 'MySQL'],
      },
      {
        title: 'Cloud and DevOps',
        items: ['AWS', 'Docker', 'CI/CD'],
      },
      {
        title: 'Other',
        items: [
          'Git',
          'REST APIs',
          'Software architecture',
          'Testing',
          'Object-oriented programming',
        ],
      },
    ] satisfies SkillGroup[],
  },
  projects: {
    title: 'Projects',
    note: 'Selected projects are not published yet.',
  },
  contact: {
    title: 'Contact',
  },
};
