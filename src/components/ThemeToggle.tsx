import React from 'react';
import type { Theme } from '../hooks/useTheme';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 transition-all duration-300 focus-ring cursor-pointer hover:border-accent/40"
      style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(10px)' }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Track */}
      <div className="relative w-10 h-5 rounded-full bg-white/10">
        {/* Sliding knob */}
        <motion.div
          layout
          animate={{ x: isDark ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
          style={{ background: 'var(--accent)' }}
        >
          {isDark
            ? <FiMoon className="w-2.5 h-2.5 text-white" />
            : <FiSun className="w-2.5 h-2.5 text-white" />
          }
        </motion.div>
      </div>
      <span className="text-xs font-semibold text-muted hidden sm:block">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default ThemeToggle;
