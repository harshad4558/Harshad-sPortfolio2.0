import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiVolume2, FiVolumeX, FiCpu } from 'react-icons/fi';

const introScript = [
  { text: "Hello there! I am Harshad's AI voice assistant. Let me introduce him to you.", duration: 5500 },
  { text: "Harshad Patil is an enthusiastic full-stack developer currently pursuing his Master of Computer Applications.", duration: 6500 },
  { text: "He is highly skilled in modern web tools like Next.js, Nest.js, Prisma ORM, and database design.", duration: 6500 },
  { text: "During his internship at Ishwarya BI Technologies, he designed relational schemas, optimized APIs, and built interactive dashboards.", duration: 7500 },
  { text: "Some of his key projects include a Sustainable Transport Hub and an ATS-friendly AI Resume Builder.", duration: 7000 },
  { text: "Feel free to check out his project timeline below, download his resume, or send him a message through the contact form!", duration: 7500 }
];

export const VoiceAgent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCaption, setCurrentCaption] = useState('');
  const [captionIndex, setCaptionIndex] = useState(0);
  const [supported, setSupported] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSupported(true);
      setSynth(window.speechSynthesis);
    }
  }, []);

  const stopSpeaking = () => {
    if (synth) {
      synth.cancel();
    }
    setIsPlaying(false);
    setCurrentCaption('');
  };

  const speak = () => {
    if (!supported || !synth) return;

    stopSpeaking();
    setIsPlaying(true);
    setCaptionIndex(0);

    const fullText = introScript.map((s) => s.text).join(' ');
    const newUtterance = new SpeechSynthesisUtterance(fullText);
    
    // Prefer a male English voice
    const voices = synth.getVoices();
    // Common male voice name keywords across browsers/OS
    const maleKeywords = ['male', 'david', 'daniel', 'mark', 'james', 'alex', 'fred', 'tom', 'george', 'ryan', 'eric', 'guy', 'aaron', 'richard', 'bruce'];
    const maleVoice =
      voices.find((v) =>
        v.lang.startsWith('en') &&
        maleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
      ) ||
      // Fallback: any English voice that is NOT labelled female
      voices.find((v) =>
        v.lang.startsWith('en') && !v.name.toLowerCase().includes('female')
      ) ||
      // Last resort: first English voice available
      voices.find((v) => v.lang.startsWith('en'));

    if (maleVoice) {
      newUtterance.voice = maleVoice;
    }
    
    newUtterance.rate  = 0.95;   /* slightly slower — sounds more natural */
    newUtterance.pitch = 0.88;   /* lower pitch for a deeper male tone */

    newUtterance.onend = () => {
      setIsPlaying(false);
      setCurrentCaption('');
    };

    newUtterance.onerror = () => {
      setIsPlaying(false);
      setCurrentCaption('');
    };

    synth.speak(newUtterance);
  };

  // Sync captions with timing approximations
  useEffect(() => {
    if (!isPlaying) return;

    setCurrentCaption(introScript[captionIndex].text);

    const timer = setTimeout(() => {
      if (captionIndex < introScript.length - 1) {
        setCaptionIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
        setCurrentCaption('');
      }
    }, introScript[captionIndex].duration);

    return () => clearTimeout(timer);
  }, [isPlaying, captionIndex]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (synth) {
        synth.cancel();
      }
    };
  }, [synth]);

  if (!supported) return null;

  return (
    <>
      {/* Floating speaking indicator/subtitles */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl p-4 md:p-6 rounded-2xl glass border border-accent/20 shadow-2xl flex items-center gap-4 text-left"
          >
            {/* Visual audio wave representation */}
            <div className="flex gap-1 items-center h-8 flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [8, 24, 8],
                  }}
                  transition={{
                    duration: 0.6 + i * 0.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-1.5 bg-accent rounded-full"
                />
              ))}
            </div>
            
            {/* Caption Text */}
            <p className="text-sm font-medium text-text leading-relaxed">
              {currentCaption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Voice Agent Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={isPlaying ? stopSpeaking : speak}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border cursor-pointer focus-ring relative group ${
            isPlaying
              ? 'bg-rose-500 border-rose-500 text-white shadow-rose-500/25'
              : 'bg-gradient-to-tr from-accent to-secondary border-accent/20 text-white shadow-accent/20'
          }`}
          aria-label={isPlaying ? 'Stop Voice Assistant' : 'Start Voice Assistant'}
          title={isPlaying ? 'Stop Voice Assistant' : 'Start Voice Assistant'}
        >
          {isPlaying ? (
            <FiVolumeX className="w-6 h-6 animate-pulse" />
          ) : (
            <FiVolume2 className="w-6 h-6" />
          )}

          {/* Decorative halo ring */}
          {!isPlaying && (
            <span className="absolute -inset-0.5 rounded-full border border-accent/40 animate-ping opacity-60 pointer-events-none" />
          )}

          {/* Float label tooltip */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none px-3 py-1.5 rounded-lg bg-cards text-xs font-semibold whitespace-nowrap border border-white/5 shadow-md flex items-center gap-1.5">
            <FiCpu className="w-3.5 h-3.5 text-accent" />
            <span>{isPlaying ? 'Click to Mute' : 'AI Voice Intro'}</span>
          </div>
        </motion.button>
      </div>
    </>
  );
};

export default VoiceAgent;
