import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { educationList } from '../data/education';
import { FiBookOpen, FiAward, FiCalendar } from 'react-icons/fi';

export const Education: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 90, damping: 14 } },
  };

  return (
    <section id="education" className="py-20 md:py-28 relative overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-text dark:text-text light:text-text-light">
            My <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Education</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Education Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {educationList.map((edu, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              className="glass p-6 md:p-8 rounded-2xl glow-card shadow-lg relative flex flex-col group border border-white/5 hover:border-accent/20"
            >
              {/* Top Accent Icon bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <FiBookOpen className="w-5 h-5" />
                </div>
                
                {/* Year Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono font-medium text-muted">
                  <FiCalendar className="w-3.5 h-3.5" />
                  <span>{edu.period}</span>
                </div>
              </div>

              {/* Header */}
              <h3 className="font-display font-bold text-xl text-text dark:text-text-light mb-2 group-hover:text-accent transition-colors duration-300">
                {edu.degree}
              </h3>
              
              <p className="text-muted dark:text-muted-light text-sm mb-4 font-medium">
                {edu.institution}
              </p>

              {/* Location and Grade bar */}
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-muted/70 font-medium">
                  {edu.location}
                </span>
                
                {/* Percentage/Score */}
                <div className="flex items-center gap-1.5">
                  <FiAward className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-semibold font-mono text-secondary">
                    {edu.score}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Education;
