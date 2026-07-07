import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { skills } from '../data/skills';
import * as SiIcons from 'react-icons/si';
import { FiCode } from 'react-icons/fi';

const categories = [
  'Programming Languages',
  'Frontend',
  'Backend',
  'Database & ORM',
  'Tools & Platforms',
] as const;

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Programming Languages');

  // Filter skills excluding soft skills (which are shown in About section)
  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );

  // Stagger container config
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // Card entrance variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-text dark:text-text light:text-text-light">
            My <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 cursor-pointer focus-ring ${
                activeCategory === category
                  ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                  : 'bg-cards/45 border-white/5 text-muted hover:border-accent/35 hover:text-text'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={activeCategory} // Rerender grid animations when category changes
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {filteredSkills.map((skill) => {
            // Dynamically load Simple Icon component from string name
            const IconComponent = (SiIcons as any)[skill.iconName] || FiCode;
            
            return (
              <motion.div
                key={skill.name}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 4 + Math.random() * 2, // Desynchronize floating paths
                    ease: 'easeInOut',
                  },
                  type: 'spring',
                  stiffness: 150,
                  damping: 15,
                }}
                className="glass glow-card p-6 rounded-2xl flex flex-col items-center justify-center text-center group cursor-default transition-shadow duration-300"
              >
                {/* Icon Wrapper */}
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-white/5 text-muted group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300">
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Skill Name */}
                <h3 className="font-display font-medium text-base text-text dark:text-text-light mb-1">
                  {skill.name}
                </h3>

                {/* Skill Level */}
                <span className="text-xs text-muted dark:text-muted-light font-mono font-medium">
                  {skill.level}
                </span>

                {/* Category Badge */}
                <span className="mt-3 px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded bg-accent/10 text-accent group-hover:bg-secondary/15 group-hover:text-secondary transition-all duration-300">
                  {skill.category.split(' ')[0]}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
