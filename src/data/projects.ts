export interface Project {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'In Progress' | 'Completed';
  year: string;
  imageUrl: string;
}

export const projects: Project[] = [
  {
    title: 'Sustainable Transport Hub(Green Path)',
    description: 'A real-time sustainable mobility platform enabling users to track electric vehicles (EVs) and public transit options. Features live geolocation tracking, intelligent route suggestions based on environmental impact, and real-time station availability indicators.',
    features: [
      'Real-time EV and transit station tracking',
      'Live geolocation and interactive mapping',
      'Eco-friendly route optimization suggestions',
      'Station charger/seat availability indicators'
    ],
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Leaflet Map', 'Node.js', 'Express.js', 'MongoDB'],
    githubUrl: 'https://github.com/harshad4558/GreenPath',
    liveUrl: 'https://greenpath-frontend.onrender.com/',
    status: 'Completed',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'AI-Powered Resume Builder',
    description: 'An ATS-friendly resume creation platform leveraging the OpenAI API to analyze job descriptions and optimize resumes. Provides users with real-time scoring, structural feedback, professional suggestions, and multiple sleek export formats.',
    features: [
      'ATS optimization scoring using OpenAI API',
      'Real-time interactive resume previewing',
      'Dynamic PDF, Word, and HTML export formats',
      'Tailored section suggestions based on industry standard template rules'
    ],
    technologies: ['React.js', 'Next.js', 'Nest.js', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'OpenAI API'],
    githubUrl: 'https://github.com/harshad4558/Ai-resume-builder',
    liveUrl: 'https://ai-resume-builder-frontend-fc7x.onrender.com',
    status: 'Completed',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Online Bus Booking System',
    description: 'A comprehensive, high-performance web booking system with real-time seat reservation, trip scheduling, and customer management capabilities. Built with responsive interfaces to support both desktop and mobile users.',
    features: [
      'Interactive seat map with real-time status updates',
      'Admin dashboard for schedule and fleet management',
      'Automated ticketing and email confirmation system',
      'Comprehensive customer history and booking cancellation options'
    ],
    technologies: ['PHP', 'MySQL', 'Bootstrap 5', 'JavaScript', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/harshad4558/bus-booking-system',
    status: 'Completed',
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
  }
];
