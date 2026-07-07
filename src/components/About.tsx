import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import { FiHeart, FiCpu, FiCode, FiCompass } from 'react-icons/fi';

export const About: React.FC = () => {
  // Extract soft skills
  const softSkills = skills.filter((s) => s.category === 'Soft Skills');

  // Interest data mapping
  const interests = [
    { text: 'Exploring AI Tools', icon: FiCpu, color: 'text-accent' },
    { text: 'Modern Frameworks', icon: FiCode, color: 'text-secondary' },
    { text: 'Emerging Tech', icon: FiHeart, color: 'text-rose-500' },
    { text: 'Driving & Travel', icon: FiCompass, color: 'text-emerald-500' },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-text dark:text-text light:text-text-light">
            About <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Row 1: Profile Image and Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Profile Photo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex justify-center"
          >
            <div className="relative group w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glass p-3 border border-accent/20 shadow-2xl">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img
                  src="/assets/images/profile.jpeg"
                  alt="Harshad Patil Profile Portrait"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
              </div>
              {/* Outer corner glowing accent borders */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-accent rounded-tl" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-accent rounded-tr" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-accent rounded-bl" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-accent rounded-br" />
            </div>
          </motion.div>

          {/* Summary Text and Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 space-y-6"
          >
            <h3 className="font-display font-semibold text-2xl text-text dark:text-text light:text-text-light">
              Who is Harshad?
            </h3>
            
            <p className="text-muted leading-relaxed text-base md:text-lg">
              I am a motivated MCA student with hands-on internship experience in full-stack web development.
              I specialize in developing scalable, efficient, and responsive web applications using modern technologies
              like <span className="text-accent font-medium font-display">Next.js</span>, <span className="text-secondary font-medium font-display">Nest.js</span>,
              <span className="text-accent font-medium font-display">Prisma</span>, and <span className="text-secondary font-medium font-display">TypeORM</span>.
            </p>

            <p className="text-muted leading-relaxed text-base md:text-lg">
              Experienced in designing robust API layers, handling complex relational databases, creating interactive
              data visualization dashboards, and managing projects collaboratively using Git-based workflows.
              I am always eager to learn modern methodologies and tackle challenging coding puzzles.
            </p>

            {/* Quick Profile Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <span className="text-sm text-muted">Email: </span>
                <a href="mailto:hcpatil2324@gmail.com" className="text-accent hover:underline block font-mono text-sm">
                  hcpatil2324@gmail.com
                </a>
              </div>
              <div>
                <span className="text-sm text-muted">Phone: </span>
                <a href="" className="text-accent hover:underline block font-mono text-sm">
                  +91 93XX XXXX05
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Soft Skills & Interests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Soft Skills Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="glass p-6 md:p-8 rounded-2xl border border-white/5"
          >
            <h4 className="font-display font-medium text-lg mb-4 text-text dark:text-text-light">
              Soft Skills
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm bg-white/5 border border-white/10 text-accent rounded-full font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Interests Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass p-6 md:p-8 rounded-2xl border border-white/5"
          >
            <h4 className="font-display font-medium text-lg mb-4 text-text dark:text-text-light">
              Interests & Hobbies
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {interests.map((interest, index) => {
                const Icon = interest.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-accent/20 transition-all duration-300"
                  >
                    <Icon className={`w-5 h-5 ${interest.color}`} />
                    <span className="text-sm font-medium text-muted dark:text-muted-light">
                      {interest.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;
