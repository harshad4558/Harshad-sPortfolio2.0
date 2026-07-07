import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { services } from '../data/services';
import * as SiIcons from 'react-icons/si';
import { FiCode } from 'react-icons/fi';

export const Services: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
  };

  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden bg-background">
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
            My <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Services</span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = (SiIcons as any)[service.iconName] || FiCode;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                className="glass p-8 rounded-2xl glow-card shadow-lg flex flex-col group border border-white/5 hover:border-accent/20 transition-all duration-300"
              >
                {/* Service Icon */}
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Service Title */}
                <h3 className="font-display font-bold text-xl text-text dark:text-text-light mb-3">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-sm text-muted dark:text-muted-light leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
