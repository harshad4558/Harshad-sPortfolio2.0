import React, { Suspense, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { CursorGlow } from './components/CursorGlow';
import { VoiceAgent } from './components/VoiceAgent';

// Performance optimization: Lazy-load heavy components
const ThreeBackground = React.lazy(() => import('./components/ThreeBackground'));
const Contact = React.lazy(() => import('./components/Contact'));

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen relative" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
          
          {/* Custom Glow Cursor Following Mouse */}
          <CursorGlow />

          {/* AI Voice Assistant Agent */}
          <VoiceAgent />

          {/* Lazy loaded high-performance 3D Scene canvas */}
          <Suspense fallback={<div className="absolute inset-0 -z-10" style={{ background: 'var(--bg)' }} />}>
            <ThreeBackground />
          </Suspense>

          {/* Sticky Navigation bar */}
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          {/* Core Sections Container */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Stats />
            <Services />
            
            {/* Lazy-loaded Contact Section under Suspense */}
            <Suspense
              fallback={
                <section className="py-20 flex justify-center items-center text-muted">
                  <div className="w-8 h-8 rounded-full border-4 border-accent border-t-transparent animate-spin" />
                </section>
              }
            >
              <Contact />
            </Suspense>
          </main>

          {/* Footer details */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
