export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  details: string[];
}

export const experiences: Experience[] = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Ishwarya BI Technologies Pvt. Ltd.',
    location: 'Kolhapur, India',
    period: 'Jan 2025 - Present', // Assuming present for current MCA student
    details: [
      'Developed full-stack web applications using Next.js for client-side rendering and Nest.js for building scalable backend APIs.',
      'Designed and optimized database schemas, writing efficient queries and integrations using Prisma and TypeORM.',
      'Created complex interactive dashboards and real-time data visualization charts using Chart.js to enhance BI reporting.',
      'Collaborated with a cross-functional development team using Git, GitHub, and GitLab for feature branch management and code reviews.',
      'Implemented clean responsive layouts and resolved styling inconsistencies, boosting mobile usability scores by 20%.'
    ]
  }
];
