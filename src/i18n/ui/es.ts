import type { Ui } from './type';

export const ui = {
  skip: 'Saltar al contenido',
  unpublished: 'Aún no publicado',
  newTab: '(se abre en una pestaña nueva)',
  nav: {
    label: 'Principal',
    home: 'Inicio',
    projects: 'Proyectos',
    experience: 'Experiencia',
  },
  language: {
    label: 'Idioma',
    names: {
      en: 'English',
      es: 'Español',
    },
  },
  theme: {
    toLight: 'Cambiar a tema claro',
    toDark: 'Cambiar a tema oscuro',
  },
  hero: {
    title: 'Ingeniero de software',
    introduction: 'Hola, soy Roland Schlösser.',
    paragraphs: [
      'Soy ingeniero de software y trabajo en desarrollo full stack. Me interesan la arquitectura de software, las tecnologías en la nube y la creación de productos de software útiles.',
      'Enseñé programación en la Universidad de los Andes, donde orienté a los estudiantes y apoyé la coordinación de los cursos.',
    ],
    photograph: 'Fotografía aún no publicada',
    photographAlt: 'Retrato de Roland Schlösser',
  },
  experience: {
    title: 'Experiencia',
    description:
      'Ayudante en la Universidad de los Andes e ingeniero de software en ShareMaq Tech.',
    present: 'Actualidad',
    partTime: 'Jornada parcial',
    fullTime: 'Jornada completa',
    teaching: {
      title: 'Ayudante',
      subjectsTitle: 'Asignaturas',
      subjects: [
        'Programación (Python)',
        'Programación orientada a objetos (Python y programación funcional con JavaScript)',
        'Tecnologías web (Ruby on Rails)',
        'Pensamiento algorítmico aplicado (Python)',
        'Diseño de software (patrones de diseño)',
        'Python y bases de datos (Python, SQL, web scraping y APIs)',
      ],
      responsibilitiesTitle: 'Responsabilidades',
      responsibilities: [
        'Ayudar a los estudiantes con las tareas',
        'Corregir y orientar los proyectos del curso',
        'Coordinar la clase, las notas y a los demás ayudantes',
        'Preparar a los estudiantes para los laboratorios y los exámenes',
      ],
    },
    sharemaq: {
      title: 'Ingeniero de software',
      responsibilitiesTitle: 'Responsabilidades',
      responsibilities: [
        'Desarrollo full stack',
        'Arquitectura de software',
        'Revisión de código',
        'Despliegues en producción',
        'Infraestructura en la nube',
      ],
    },
  },
  education: {
    title: 'Educación',
    computerScience: 'Ingeniero Civil en Ciencias de la Computación',
  },
  skills: {
    title: 'Habilidades',
    groups: {
      languages: 'Lenguajes',
      backend: 'Backend',
      frontend: 'Frontend',
      databases: 'Bases de datos',
      cloud: 'Nube y DevOps',
      other: 'Otros',
    },
    items: {
      softwareArchitecture: 'Arquitectura de software',
      testing: 'Pruebas',
      objectOrientedProgramming: 'Programación orientada a objetos',
    },
  },
  projects: {
    title: 'Proyectos',
    overview: 'Descripción',
    features: 'Funcionalidades',
    stack: 'Tecnologías',
    screenshotUnpublished: 'Captura de pantalla aún no publicada',
    live: 'Aplicación en línea',
    repository: 'GitHub',
  },
  contact: {
    title: 'Contacto',
  },
  cv: {
    title: 'Currículum',
    unpublished: 'El currículum aún no está publicado.',
    published: 'Descarga el currículum en PDF.',
    download: 'Descargar currículum (PDF)',
  },
  sharing: {
    imageAlt: 'Roland Schlösser, ingeniero de software',
  },
  meta: {
    home: 'Ingeniero de software que trabaja en desarrollo full stack, arquitectura de software y tecnologías en la nube. Enseñó programación en la Universidad de los Andes.',
    projects:
      'MediaShelf organiza películas y series. Relovia organiza mudanzas, documentos, tareas, gastos y la logística del traslado.',
  },
} satisfies Ui;
