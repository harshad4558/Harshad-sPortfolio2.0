export interface Skill {
  name: string;
  level: string;
  iconName: string;
  category: 'Programming Languages' | 'Frontend' | 'Backend' | 'Database & ORM' | 'Tools & Platforms' | 'Soft Skills';
}

export const skills: Skill[] = [
  // Programming Languages
  { name: 'Java', level: 'Advanced', iconName: 'SiOpenjdk', category: 'Programming Languages' },
  { name: 'JavaScript', level: 'Advanced', iconName: 'SiJavascript', category: 'Programming Languages' },
  { name: 'Python', level: 'Intermediate', iconName: 'SiPython', category: 'Programming Languages' },
  { name: 'C', level: 'Intermediate', iconName: 'SiC', category: 'Programming Languages' },
  { name: 'C++', level: 'Intermediate', iconName: 'SiCplusplus', category: 'Programming Languages' },

  // Frontend
  { name: 'React.js', level: 'Advanced', iconName: 'SiReact', category: 'Frontend' },
  { name: 'Next.js', level: 'Advanced', iconName: 'SiNextdotjs', category: 'Frontend' },
  { name: 'HTML5', level: 'Advanced', iconName: 'SiHtml5', category: 'Frontend' },
  { name: 'CSS3', level: 'Advanced', iconName: 'SiCss3', category: 'Frontend' },
  { name: 'Bootstrap 5', level: 'Advanced', iconName: 'SiBootstrap', category: 'Frontend' },
  { name: 'Tailwind CSS', level: 'Advanced', iconName: 'SiTailwindcss', category: 'Frontend' },
  { name: 'ShadCN UI', level: 'Advanced', iconName: 'SiShadcnui', category: 'Frontend' },

  // Backend
  { name: 'Node.js', level: 'Advanced', iconName: 'SiNodedotjs', category: 'Backend' },
  { name: 'Express.js', level: 'Advanced', iconName: 'SiExpress', category: 'Backend' },
  { name: 'Nest.js', level: 'Advanced', iconName: 'SiNestjs', category: 'Backend' },
  { name: 'FastAPI', level: 'Intermediate', iconName: 'SiFastapi', category: 'Backend' },
  { name: 'PHP', level: 'Intermediate', iconName: 'SiPhp', category: 'Backend' },

  // Database & ORM
  { name: 'MySQL', level: 'Advanced', iconName: 'SiMysql', category: 'Database & ORM' },
  { name: 'SQL Server', level: 'Advanced', iconName: 'SiMicrosoftsqlserver', category: 'Database & ORM' },
  { name: 'MongoDB Atlas', level: 'Intermediate', iconName: 'SiMongodb', category: 'Database & ORM' },
  { name: 'Prisma', level: 'Advanced', iconName: 'SiPrisma', category: 'Database & ORM' },
  { name: 'TypeORM', level: 'Advanced', iconName: 'SiTypeorm', category: 'Database & ORM' },

  // Tools & Platforms
  { name: 'Git', level: 'Advanced', iconName: 'SiGit', category: 'Tools & Platforms' },
  { name: 'GitHub', level: 'Advanced', iconName: 'SiGithub', category: 'Tools & Platforms' },
  { name: 'GitLab', level: 'Intermediate', iconName: 'SiGitlab', category: 'Tools & Platforms' },
  { name: 'Chart.js', level: 'Advanced', iconName: 'SiChartdotjs', category: 'Tools & Platforms' },
  { name: 'VS Code', level: 'Advanced', iconName: 'SiVisualstudiocode', category: 'Tools & Platforms' },

  // Soft Skills
  { name: 'Problem Solving', level: 'Advanced', iconName: 'SiBraincups', category: 'Soft Skills' },
  { name: 'Communication', level: 'Advanced', iconName: 'SiChatbubble', category: 'Soft Skills' },
  { name: 'Teamwork', level: 'Advanced', iconName: 'SiPeoples', category: 'Soft Skills' },
  { name: 'Analytical Thinking', level: 'Advanced', iconName: 'SiSearch', category: 'Soft Skills' }
];
