import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { stats } from '../data/stats';
import type { Stat } from '../data/stats';

const Counter: React.FC<{ stat: Stat }> = ({ stat }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = stat.value;
    const duration = 1500; // Total duration in ms
    const increment = end / (duration / 16); // ~60fps target

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, stat.value]);

  return (
    <div
      ref={ref}
      className="glass p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center shadow-lg hover:border-accent/15 transition-all duration-300"
    >
      {/* Count display */}
      <span className="font-display font-black text-4xl md:text-5xl bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-2">
        {count}
        {stat.suffix}
      </span>
      
      {/* Label */}
      <span className="text-sm font-medium tracking-wide text-muted dark:text-muted-light">
        {stat.label}
      </span>
    </div>
  );
};

export const Stats: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <Counter key={index} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
