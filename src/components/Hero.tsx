import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiEye } from 'react-icons/fi';

export const Hero: React.FC = () => {
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Decorative radial glow blobs */}
      <div className="absolute top-[20%] right-[5%] w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-[20%] left-[5%] w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col justify-center min-h-screen pt-24 pb-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* ── Left Column: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="space-y-6 md:space-y-8 order-2 lg:order-1"
          >
            {/* Greeting Badge */}
            <motion.span
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase rounded-full bg-accent/10 text-accent border border-accent/25"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Available for Opportunities
            </motion.span>

            {/* Name */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-muted font-medium text-base mb-1"
              >
                Hi, I'm
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="font-display font-black text-5xl md:text-6xl lg:text-7xl tracking-tight text-text leading-[1.05]"
              >
                Harshad{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-accent via-emerald-400 to-secondary bg-clip-text text-transparent">
                    Patil
                  </span>
                  {/* Underline accent */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.5, ease: 'easeOut' }}
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-accent to-secondary rounded-full origin-left"
                  />
                </span>
              </motion.h1>
            </div>

            {/* Typewriter tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="h-10 md:h-12 flex items-center"
            >
              <span className="text-lg md:text-2xl font-display font-semibold text-muted">
                I'm a{' '}
              </span>
              <span className="text-lg md:text-2xl font-display font-semibold ml-2">
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',  1800,
                    'Software Developer',    1800,
                    'MCA Student',           1800,
                    'React & Next.js Dev',   1800,
                    'API Architect',         1800,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  className="text-accent"
                />
              </span>
            </motion.div>

            {/* Intro paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-muted text-base md:text-lg leading-relaxed max-w-lg"
            >
              Motivated MCA student with internship experience building scalable full-stack applications with
              <span className="text-accent font-semibold"> Next.js</span>,
              <span className="text-secondary font-semibold"> Nest.js</span>,
              <span className="text-accent font-semibold"> Prisma</span> and
              <span className="text-secondary font-semibold"> TypeORM</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={() => handleScrollTo('projects')}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white font-bold tracking-wide rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/35 transition-all duration-300 cursor-pointer focus-ring flex items-center justify-center gap-2"
              >
                <FiEye className="w-4 h-4" />
                View Projects
              </motion.button>

              <motion.a
                href="/assets/resume.pdf"
                download="Harshad_Patil_Resume.pdf"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-cards/50 border border-accent/20 hover:border-accent/50 hover:bg-accent/5 text-text font-bold tracking-wide rounded-xl transition-all duration-300 focus-ring flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <FiDownload className="w-4 h-4 text-accent group-hover:animate-bounce" />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social icons with divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex items-center gap-5 pt-2"
            >
              <span className="text-xs text-muted uppercase tracking-widest font-mono">Follow</span>
              <div className="h-px w-8 bg-muted/30" />
              {[
                { href: 'https://github.com/harshad4558', icon: FiGithub, label: 'GitHub' },
                { href: 'https://linkedin.com/in/harshad-patil45', icon: FiLinkedin, label: 'LinkedIn' },
                { href: 'mailto:hcpatil2324@gmail.com', icon: FiMail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  whileHover={{ y: -3 }}
                  className="p-2.5 rounded-lg bg-cards/40 border border-white/5 hover:border-accent/30 hover:text-accent text-muted transition-all duration-300 cursor-pointer focus-ring"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right Column: Profile Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-accent/20 via-transparent to-secondary/20 blur-2xl animate-pulse-slow pointer-events-none" />

              {/* Spinning dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-full border border-dashed border-accent/20 pointer-events-none"
              />

              {/* Photo Frame */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cards shadow-2xl shadow-accent/10">
                <img
                  src="/assets/images/aboutProfile.jpg"
                  alt="Harshad Patil — Full Stack Developer"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay on bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30 pointer-events-none" />
              </div>

              {/* Floating stat badges */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-6 top-10 glass px-4 py-2.5 rounded-xl border border-accent/20 shadow-xl flex items-center gap-2"
              >
                <span className="text-xl">💻</span>
                <div>
                  <p className="font-display font-bold text-sm text-accent leading-none">3+ Projects</p>
                  <p className="text-[10px] text-muted">Completed</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-6 bottom-12 glass px-4 py-2.5 rounded-xl border border-secondary/20 shadow-xl flex items-center gap-2"
              >
                <span className="text-xl">🚀</span>
                <div>
                  <p className="font-display font-bold text-sm text-secondary leading-none">20+ Tech</p>
                  <p className="text-[10px] text-muted">Mastered</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-4 top-6 glass p-2.5 rounded-xl border border-accent/15 shadow-xl"
              >
                <span className="text-2xl">⭐</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          onClick={() => handleScrollTo('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-widest text-muted font-bold group-hover:text-accent transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-5 h-9 rounded-full border-2 border-muted/40 group-hover:border-accent/60 flex items-start justify-center p-1 transition-colors"
          >
            <div className="w-1 h-2 rounded-full bg-accent" />
          </motion.div>
        </motion.button>

      </div>
    </section>
  );
};

export default Hero;
