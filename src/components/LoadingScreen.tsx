import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingTexts = [
  '⚡ Booting portfolio engine...',
  '🌐 Loading 3D canvas...',
  '🛠️ Injecting developer stack...',
  '✨ Calibrating Electric Night UI...',
  '🚀 Almost ready...',
];

/* Stable particle positions — never random on re-render */
const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top:      `${4 + (i * 31) % 92}%`,
  left:     `${4 + (i * 47) % 92}%`,
  size:     `${1.5 + (i % 3)}px`,
  delay:    `${(i * 0.35) % 2.8}s`,
  duration: `${2 + (i % 4)}s`,
}));

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress,   setProgress]   = useState(0);
  const [textIndex,  setTextIndex]  = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(iv); setTimeout(() => onCompleteRef.current(), 550); return 100; }
        return Math.min(p + Math.floor(Math.random() * 12) + 6, 100);
      });
    }, 155);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setTextIndex((i) => (i + 1) % loadingTexts.length), 900);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         100,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        background:     '#030B14',   /* --bg dark */
        overflow:       'hidden',
      }}
    >
      {/* Ambient blobs */}
      <div style={{ position: 'absolute', top: '20%', left: '20%', width: '24rem', height: '24rem', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: '24rem', height: '24rem', borderRadius: '50%', background: 'radial-gradient(circle, rgba(129,140,248,0.10) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position:         'absolute',
              top:              p.top,
              left:             p.left,
              width:            p.size,
              height:           p.size,
              borderRadius:     '50%',
              background:       '#22D3EE',
              opacity:          0.4,
              animation:        `pulse ${p.duration} ${p.delay} infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.84, y: 16 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          zIndex:          1,
          display:         'flex',
          flexDirection:   'column',
          alignItems:      'center',
          gap:             '1.5rem',
          width:           '100%',
          maxWidth:        '320px',
          padding:         '2.5rem 2rem',
          borderRadius:    '1.5rem',
          background:      'rgba(7,21,38,0.70)',
          backdropFilter:  'blur(20px)',
          border:          '1px solid rgba(34,211,238,0.15)',
          boxShadow:       '0 24px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Logo */}
        <div style={{ position: 'relative' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{
              position:     'absolute',
              inset:        '-10px',
              borderRadius: '20px',
              border:       '1.5px dashed rgba(34,211,238,0.30)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              width:          '80px',
              height:         '80px',
              borderRadius:   '18px',
              background:     'linear-gradient(135deg, #22D3EE 0%, #818CF8 100%)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              boxShadow:      '0 12px 32px rgba(34,211,238,0.30)',
            }}
          >
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '2rem', color: '#fff', letterSpacing: '0.05em' }}>HP</span>
          </div>
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#E2EDF5', margin: 0 }}>
            Harshad Patil
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#22D3EE', marginTop: '3px' }}>
            Full Stack Developer
          </p>
        </div>

        {/* Progress */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={textIndex}
                initial={{ opacity: 0, y: 4  }}
                animate={{ opacity: 0.75, y: 0 }}
                exit={{   opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
                style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}
              >
                {loadingTexts[textIndex]}
              </motion.span>
            </AnimatePresence>
            <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 700, color: '#22D3EE', flexShrink: 0, marginLeft: '8px' }}>
              {progress}%
            </span>
          </div>

          {/* Bar */}
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', borderRadius: '9999px', background: 'linear-gradient(90deg, #22D3EE 0%, #818CF8 100%)' }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
