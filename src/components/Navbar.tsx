import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import type { Theme } from '../hooks/useTheme';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll to update header appearance and active link highlights
  useEffect(() => {
    const handleScroll = () => {
      // Toggle scroll background
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current visible section
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass dark:bg-background/80 bg-background-light/80 shadow-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 cursor-pointer focus-ring rounded group"
          aria-label="Harshad Patil Portfolio Home"
        >
          {/* Graphical Logo Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-secondary flex items-center justify-center shadow-lg shadow-accent/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-accent/40">
            <span className="font-display font-black text-lg text-white tracking-wider">HP</span>
          </div>
          
          {/* Logo Text */}
          <div className="hidden sm:flex flex-col items-start">
            <span className="font-display font-bold text-lg leading-none text-text">Harshad<span className="text-accent">.Patil</span></span>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase mt-1 group-hover:text-accent transition-colors">Developer</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <ul className="flex items-center space-x-1 font-medium">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-4 py-2 text-sm tracking-wide transition-colors duration-300 rounded-md cursor-pointer focus-ring ${
                    activeSection === link.id
                      ? 'text-accent font-semibold'
                      : 'text-muted dark:text-muted hover:text-text dark:hover:text-text-light'
                  }`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="h-6 w-[1px] bg-white/10 dark:bg-white/10 bg-black/10" />

          {/* Theme Toggle */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile Hamburger Menu button & Toggle */}
        <div className="flex lg:hidden items-center space-x-4">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-text dark:text-text-light hover:text-accent transition-colors duration-300 cursor-pointer focus-ring rounded"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full border-t border-white/5 dark:border-white/5 border-black/5 bg-[#0B1120] dark:bg-[#0B1120] bg-background-light px-6 py-4 flex flex-col space-y-4"
          >
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full text-left px-4 py-2.5 text-base tracking-wide rounded-lg transition-colors cursor-pointer focus-ring ${
                      activeSection === link.id
                        ? 'bg-accent/15 text-accent font-semibold'
                        : 'text-muted dark:text-muted hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
