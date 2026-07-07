import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { projects } from '../data/projects';
import { FiGithub, FiExternalLink, FiClock, FiCheckCircle } from 'react-icons/fi';

export const Projects: React.FC = () => {
  // Stagger container config
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Card entrance variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 12 } },
  };

  // react-parallax-tilt uses props directly instead of an options object
  // so we removed the tiltOptions object and will pass them inline
  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden bg-background">
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
            My <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <Tilt 
                tiltMaxAngleX={12} 
                tiltMaxAngleY={12} 
                perspective={1000} 
                scale={1.02} 
                transitionSpeed={400} 
                tiltReverse={false} 
                reset={true} 
                className="h-full"
              >
                <div className="glass glow-card rounded-2xl overflow-hidden h-full flex flex-col group border border-white/5 hover:border-accent/25 transition-all duration-300 shadow-xl hover:shadow-accent/5">
                  
                  {/* Project Image and Status Overlay */}
                  <div className="relative h-48 md:h-52 overflow-hidden bg-white/5">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4" />

                    {/* Status and Year Badge */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded bg-[#0b1120]/70 backdrop-blur-sm text-accent border border-accent/20">
                        {project.year}
                      </span>
                      <span
                        className={`px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded backdrop-blur-sm flex items-center gap-1 border ${
                          project.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                        }`}
                      >
                        {project.status === 'Completed' ? (
                          <FiCheckCircle className="w-3 h-3" />
                        ) : (
                          <FiClock className="w-3 h-3 animate-pulse" />
                        )}
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="font-display font-bold text-xl text-text dark:text-text-light mb-3 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted dark:text-muted-light text-sm leading-relaxed mb-4 flex-grow">
                      {project.description}
                    </p>

                    {/* Key Features Bullet List */}
                    <ul className="mb-6 space-y-1.5 border-t border-white/5 pt-4">
                      {project.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex gap-2 text-xs text-muted/90">
                          <span className="text-accent">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 text-[10px] font-semibold rounded bg-white/5 border border-white/10 text-muted/90"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links Footer */}
                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent transition-colors duration-300 cursor-pointer focus-ring px-1 rounded"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <FiGithub className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent transition-colors duration-300 cursor-pointer focus-ring px-1 rounded"
                          aria-label={`Visit ${project.title} live deployment`}
                        >
                          <FiExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>

                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
