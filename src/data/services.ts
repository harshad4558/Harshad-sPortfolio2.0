export interface Service {
  title: string;
  description: string;
  iconName: string;
}

export const services: Service[] = [
  {
    title: 'Frontend Development',
    description: 'Building modern, fast, and responsive user interfaces using React, Next.js, and Tailwind CSS. Focused on component reuse, state optimization, and design fidelity.',
    iconName: 'SiReact'
  },
  {
    title: 'Backend Development',
    description: 'Constructing robust backend architectures, logic, and servers with Node.js, Express, and Nest.js. Expert at design patterns, middleware, and performance scalability.',
    iconName: 'SiNodedotjs'
  },
  {
    title: 'API Development',
    description: 'Designing and building secure, clean, and well-documented RESTful and GraphQL APIs. Ensuring smooth data transit, integration, and request-response validation.',
    iconName: 'SiPostman'
  },
  {
    title: 'Database Design',
    description: 'Modeling schemas and managing SQL/NoSQL databases with PostgreSQL, MySQL, and MongoDB. Utilizing Prisma and TypeORM for efficient and safe ORM integrations.',
    iconName: 'SiMysql'
  },
  {
    title: 'Responsive UI Design',
    description: 'Translating designs into responsive, interactive layouts that look perfect on all viewports, following custom grid strategies and mobile-first principles.',
    iconName: 'SiBootstrap'
  },
  {
    title: 'Full-Stack Applications',
    description: 'Developing end-to-end applications from concept to deployment. Architecting frontend UI layers and integrating them seamlessly with scalable server systems.',
    iconName: 'SiNextdotjs'
  }
];
