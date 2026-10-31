export type Ui = {
  skip: string;
  unpublished: string;
  newTab: string;
  nav: {
    label: string;
    home: string;
    projects: string;
    about: string;
    experience: string;
  };
  language: {
    label: string;
    names: {
      en: string;
      es: string;
    };
  };
  theme: {
    label: string;
    light: string;
    dark: string;
    system: string;
  };
  footer: {
    contact: string;
    applications: string;
  };
  hero: {
    title: string;
    introduction: string;
    description: string;
    photograph: string;
  };
  about: {
    title: string;
    paragraphs: readonly [string, string];
  };
  experience: {
    title: string;
    description: string;
    present: string;
    partTime: string;
    fullTime: string;
    teaching: {
      title: string;
      subjectsTitle: string;
      subjects: readonly [string, string, string, string, string, string];
      responsibilitiesTitle: string;
      responsibilities: readonly [string, string, string, string];
    };
    sharemaq: {
      title: string;
      responsibilitiesTitle: string;
      responsibilities: readonly [string, string, string, string, string];
    };
  };
  education: {
    title: string;
    computerScience: string;
  };
  skills: {
    title: string;
    groups: {
      languages: string;
      backend: string;
      frontend: string;
      databases: string;
      cloud: string;
      other: string;
    };
    items: {
      softwareArchitecture: string;
      testing: string;
      objectOrientedProgramming: string;
    };
  };
  projects: {
    title: string;
    overview: string;
    features: string;
    stack: string;
    screenshotUnpublished: string;
    live: string;
    repository: string;
  };
  contact: {
    title: string;
  };
  cv: {
    title: string;
    unpublished: string;
  };
};
