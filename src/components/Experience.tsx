import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import { FiBriefcase } from 'react-icons/fi';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-28 relative overflow-hidden bg-background">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-text dark:text-text light:text-text-light">
            Work <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10 ml-2 md:ml-6 border-l-2 border-white/10 dark:border-white/10 border-black/10">
          
          {/* Animated drawing line overlay */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-gradient-to-b from-accent via-secondary to-transparent origin-top"
          />

          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-14 last:mb-0">
              
              {/* Pulsing timeline dot */}
              <div className="absolute left-[-31px] md:left-[-45px] top-1.5 z-10 flex items-center justify-center">
                {/* Ping shadow */}
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-accent/20 opacity-75" />
                {/* Center dot icon */}
                <div className="relative flex items-center justify-center h-7 w-7 rounded-full bg-[#111827] border-2 border-accent text-accent">
                  <FiBriefcase className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Experience Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass p-6 md:p-8 rounded-2xl glow-card shadow-lg"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="font-display font-bold text-xl text-text dark:text-text-light group-hover:text-accent transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-accent mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <span className="inline-block px-3 py-1 text-xs font-mono font-medium rounded-full bg-white/5 border border-white/10 text-muted">
                      {exp.period}
                    </span>
                    <span className="text-xs text-muted/80 mt-1 font-medium">{exp.location}</span>
                  </div>
                </div>

                {/* Details List */}
                <ul className="space-y-3">
                  {exp.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex gap-3 text-sm text-muted leading-relaxed">
                      <span className="text-secondary select-none font-bold mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Experience;
