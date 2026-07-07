import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Config spring physics for smooth delay follow
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const touchMediaQuery = window.matchMedia('(pointer: coarse)');
    setIsMobile(touchMediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    if (touchMediaQuery.addEventListener) {
      touchMediaQuery.addEventListener('change', handleMediaQueryChange);
    } else {
      touchMediaQuery.addListener(handleMediaQueryChange);
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of cursor size (e.g. cursor is 128px wide/high)
      mouseX.set(e.clientX - 64);
      mouseY.set(e.clientY - 64);
    };

    if (!touchMediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (touchMediaQuery.removeEventListener) {
        touchMediaQuery.removeEventListener('change', handleMediaQueryChange);
      } else {
        touchMediaQuery.removeListener(handleMediaQueryChange);
      }
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-40 bg-radial-gradient mix-blend-screen opacity-55 dark:opacity-40"
    >
      {/* Glow Inner Circle */}
      <div className="w-full h-full rounded-full bg-gradient-to-r from-accent to-secondary blur-2xl" />
    </motion.div>
  );
};

export default CursorGlow;
