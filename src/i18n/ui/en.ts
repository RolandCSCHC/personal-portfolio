import type { Ui } from './type';

export const ui = {
  skip: 'Skip to content',
  unpublished: 'Not published yet',
  newTab: '(opens in a new tab)',
  nav: {
    label: 'Primary',
    home: 'Home',
    projects: 'Projects',
    experience: 'Experience',
  },
  language: {
    label: 'Language',
    names: {
      en: 'English',
      es: 'Español',
    },
  },
  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },
  hero: {
    title: 'Software Engineer',
    introduction: "Hi, I'm Roland Schlösser.",
    paragraphs: [
      'I am a software engineer working on full-stack development. I am interested in software architecture, cloud technologies, and building useful software products.',
      'I taught at Universidad de los Andes, where I mentored students and supported course coordination. The courses were Programming, Object-Oriented Programming, Web Technologies, Applied Algorithmic Thinking, Software Design, and Python and Databases.',
    ],
    photograph: 'Photograph not published yet',
    photographAlt: 'Portrait of Roland Schlösser',
  },
  experience: {
    title: 'Experience',
    description:
      'Teacher Assistant at Universidad de los Andes and Software Engineer at ShareMaq Tech.',
    present: 'Present',
    partTime: 'Part-time',
    fullTime: 'Full-time',
    teaching: {
      title: 'Teacher Assistant',
      subjectsTitle: 'Subjects',
      subjects: [
        'Programming (Python)',
        'Object-Oriented Programming (Python and functional programming with JavaScript)',
        'Web Technologies (Ruby on Rails)',
        'Applied Algorithmic Thinking (Python)',
        'Software Design (design patterns)',
        'Python and Databases (Python, SQL, web scraping, and APIs)',
      ],
      responsibilitiesTitle: 'Responsibilities',
      responsibilities: [
        'Helping students with assignments',
        'Grading and guiding course projects',
        'Coordinating the class, grades, and other teaching assistants',
        'Preparing students for laboratory assignments and exams',
      ],
    },
    sharemaq: {
      title: 'Software Engineer',
      responsibilitiesTitle: 'Responsibilities',
      responsibilities: [
        'Full-stack development',
        'Software architecture',
        'Code reviews',
        'Production deployments',
        'Cloud infrastructure',
      ],
    },
  },
  education: {
    title: 'Education',
    computerScience: 'Civil Engineer in Computer Science',
  },
  skills: {
    title: 'Skills',
    groups: {
      languages: 'Languages',
      backend: 'Backend',
      frontend: 'Frontend',
      databases: 'Databases',
      cloud: 'Cloud and DevOps',
      other: 'Other',
    },
    items: {
      softwareArchitecture: 'Software architecture',
      testing: 'Testing',
      objectOrientedProgramming: 'Object-oriented programming',
    },
  },
  projects: {
    title: 'Projects',
    overview: 'Overview',
    features: 'Features',
    stack: 'Stack',
    screenshotUnpublished: 'Screenshot not published yet',
    live: 'Live application',
    repository: 'GitHub',
  },
  contact: {
    title: 'Contact',
  },
  cv: {
    title: 'CV',
    unpublished: 'The CV is not published yet.',
    published: 'Download the CV as a PDF.',
    download: 'Download CV (PDF)',
  },
  sharing: {
    imageAlt: 'Roland Schlösser, Software Engineer',
  },
  meta: {
    home: 'Software engineer working on full-stack development, software architecture, and cloud technologies. Taught programming at Universidad de los Andes.',
    projects:
      'MediaShelf organizes movies and television series. Relovia organizes relocations, documents, tasks, expenses, and moving logistics.',
  },
} satisfies Ui;
