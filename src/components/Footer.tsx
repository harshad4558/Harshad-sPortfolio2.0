import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp, FiGithub, FiLinkedin, FiMail, FiHeart, FiCode } from 'react-icons/fi';

const quickLinks = [
  { label: 'Home',       id: 'home' },
  { label: 'About',      id: 'about' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Contact',    id: 'contact' },
];

const techStack = ['React 19', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind CSS v4', 'Vite 8'];

const socials = [
  { href: 'https://github.com/harshad4558',          icon: FiGithub,   label: 'GitHub'   },
  { href: 'https://linkedin.com/in/harshad-patil45', icon: FiLinkedin, label: 'LinkedIn' },
  { href: 'mailto:hcpatil2324@gmail.com',             icon: FiMail,     label: 'Email'    },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export const Footer: React.FC = () => {
  const handleScrollToTop  = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleNavClick = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background:   'var(--cards)',
        borderTop:    '1px solid var(--glass-border)',
        position:     'relative',
        overflow:     'hidden',
      }}
    >
      {/* ── Top gradient shimmer line ── */}
      <div
        style={{
          position:   'absolute',
          top:        0,
          left:       '10%',
          right:      '10%',
          height:     '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent), var(--secondary), transparent)',
          opacity:    0.6,
        }}
      />

      {/* ── Ambient bottom glow ── */}
      <div
        style={{
          position:   'absolute',
          bottom:     0,
          left:       '50%',
          transform:  'translateX(-50%)',
          width:      '32rem',
          height:     '10rem',
          background: 'radial-gradient(ellipse, rgba(var(--accent-rgb),0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter:     'blur(24px)',
        }}
      />

      {/* ── Back-to-top floating button ── */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%) translateY(-50%)', zIndex: 10 }}>
        <motion.button
          onClick={handleScrollToTop}
          whileHover={{ y: -4, scale: 1.12 }}
          whileTap={{ scale: 0.94 }}
          style={{
            width:        '42px',
            height:       '42px',
            borderRadius: '50%',
            background:   'linear-gradient(135deg, var(--accent), var(--secondary))',
            border:       '2px solid rgba(255,255,255,0.12)',
            color:        '#fff',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            cursor:       'pointer',
            boxShadow:    '0 8px 24px rgba(var(--accent-rgb),0.30)',
          }}
          aria-label="Scroll back to top"
        >
          <FiArrowUp size={18} />
        </motion.button>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 2rem', position: 'relative', zIndex: 1 }}>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}
        >

          {/* ── Column 1: Brand ── */}
          <motion.div variants={cardVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '1.5rem', color: 'var(--text)', lineHeight: 1.1 }}>
                Harshad<span style={{ color: 'var(--accent)' }}>.Patil</span>
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'monospace', marginTop: '0.2rem' }}>
                Full Stack Developer
              </p>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: '1.65', maxWidth: '260px' }}>
              MCA student passionate about building scalable, animated, and beautiful web applications with modern tech stacks.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.25rem' }}>
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={label}
                  style={{
                    width:       '36px',
                    height:      '36px',
                    borderRadius: '10px',
                    background:  'rgba(var(--accent-rgb),0.08)',
                    border:      '1px solid rgba(var(--accent-rgb),0.18)',
                    color:       'var(--muted)',
                    display:     'flex',
                    alignItems:  'center',
                    justifyContent: 'center',
                    transition:  'all 0.25s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color      = 'var(--accent)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(var(--accent-rgb),0.16)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color      = 'var(--muted)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(var(--accent-rgb),0.18)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(var(--accent-rgb),0.08)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Column 2: Quick Links ── */}
          <motion.div variants={cardVariants}>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '1rem' }}>
              Quick Links
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    style={{
                      background:  'none',
                      border:      'none',
                      padding:     '0',
                      cursor:      'pointer',
                      fontSize:    '0.875rem',
                      color:       'var(--muted)',
                      display:     'flex',
                      alignItems:  'center',
                      gap:         '0.5rem',
                      transition:  'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, opacity: 0.6 }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Column 3: Tech Stack ── */}
          <motion.div variants={cardVariants}>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '1rem' }}>
              Built With
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding:      '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontSize:     '0.72rem',
                    fontWeight:   600,
                    fontFamily:   'monospace',
                    background:   'rgba(var(--accent-rgb),0.10)',
                    color:        'var(--accent)',
                    border:       '1px solid rgba(var(--accent-rgb),0.20)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Extra: open to work badge */}
            <div
              style={{
                marginTop:    '1.5rem',
                padding:      '0.75rem 1rem',
                borderRadius: '12px',
                background:   'rgba(var(--secondary-rgb),0.08)',
                border:       '1px solid rgba(var(--secondary-rgb),0.20)',
                display:      'flex',
                alignItems:   'center',
                gap:          '0.6rem',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>Open to Work</p>
                <p style={{ fontSize: '0.68rem', color: 'var(--muted)', margin: 0 }}>Internships & Projects</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop:      '1px solid var(--glass-border)',
            paddingTop:     '1.5rem',
            display:        'flex',
            flexWrap:       'wrap',
            alignItems:     'center',
            justifyContent: 'space-between',
            gap:            '0.75rem',
          }}
        >
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: 0 }}>
            © {currentYear} <span style={{ color: 'var(--text)', fontWeight: 600 }}>Harshad Patil</span>. All rights reserved.
          </p>

          <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <FiCode size={13} style={{ color: 'var(--accent)' }} />
            Crafted with
            <FiHeart size={13} style={{ color: '#FB7185' }} />
            in Kolhapur, India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
