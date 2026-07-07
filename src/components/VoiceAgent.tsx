/// <reference types="dom-speech-recognition" />
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiVolumeX, FiCpu } from 'react-icons/fi';

/* ───────────────────────────────────────────────────────────────
   Portfolio Knowledge Base — fed to Gemini as system context
   ─────────────────────────────────────────────────────────────── */
const PORTFOLIO_CONTEXT = `
You are Harshad Patil's AI portfolio assistant. You answer questions about Harshad ONLY using the information below. Keep answers concise (2-4 sentences max), conversational, and friendly. If someone asks something outside this data, politely say you only know about Harshad's portfolio. Always speak in third person about Harshad.

=== ABOUT ===
Name: Harshad Patil
Title: Full Stack Developer
Location: Kolhapur, India
Email: hcpatil2324@gmail.com
Currently pursuing Master of Computer Applications (MCA) at Shivaji University (2024-2026).
Completed Bachelor of Computer Applications (BCA) from Shivaji University (2021-2024) with 68.53%.

=== EXPERIENCE ===
Role: Full Stack Developer Intern at Ishwarya BI Technologies Pvt. Ltd., Kolhapur (Jan 2025 - Present)
- Developed full-stack web applications using Next.js and Nest.js
- Designed and optimized database schemas using Prisma and TypeORM
- Created interactive dashboards and real-time data visualizations with Chart.js
- Collaborated using Git, GitHub, and GitLab for feature branch management
- Implemented responsive layouts, boosting mobile usability scores by 20%

=== PROJECTS ===

1. Sustainable Transport Hub (GreenPath) — 2026, Completed
   Description: A real-time sustainable mobility platform enabling users to track electric vehicles (EVs) and public transit options. Features live geolocation tracking, intelligent route suggestions based on environmental impact, and real-time station availability indicators.
   Features: Real-time EV and transit station tracking, Live geolocation and interactive mapping, Eco-friendly route optimization, Station charger/seat availability indicators
   Tech Stack: React.js, TypeScript, Tailwind CSS, Leaflet Map, Node.js, Express.js, MongoDB
   GitHub: https://github.com/harshad4558/GreenPath
   Live: https://greenpath-frontend.onrender.com/

2. AI-Powered Resume Builder — 2025, Completed
   Description: An ATS-friendly resume creation platform leveraging the OpenAI API to analyze job descriptions and optimize resumes. Provides real-time scoring, structural feedback, and multiple export formats.
   Features: ATS optimization scoring using OpenAI API, Real-time interactive resume previewing, Dynamic PDF/Word/HTML export, Tailored section suggestions
   Tech Stack: React.js, Next.js, Nest.js, TypeScript, Prisma ORM, PostgreSQL, OpenAI API
   GitHub: https://github.com/harshad4558/Ai-resume-builder
   Live: https://ai-resume-builder-frontend-fc7x.onrender.com

3. Online Bus Booking System — 2023, Completed
   Description: A comprehensive web booking system with real-time seat reservation, trip scheduling, and customer management.
   Features: Interactive seat map, Admin dashboard, Automated ticketing, Customer history
   Tech Stack: PHP, MySQL, Bootstrap 5, JavaScript, HTML5, CSS3
   GitHub: https://github.com/harshad4558/bus-booking-system

=== SKILLS ===
Programming Languages: Java (Advanced), JavaScript (Advanced), Python (Intermediate), C (Intermediate), C++ (Intermediate)
Frontend: React.js (Advanced), Next.js (Advanced), HTML5, CSS3, Bootstrap 5, Tailwind CSS, ShadCN UI (all Advanced)
Backend: Node.js (Advanced), Express.js (Advanced), Nest.js (Advanced), FastAPI (Intermediate), PHP (Intermediate)
Database & ORM: MySQL (Advanced), SQL Server (Advanced), MongoDB Atlas (Intermediate), Prisma (Advanced), TypeORM (Advanced)
Tools: Git, GitHub (Advanced), GitLab (Intermediate), Chart.js (Advanced), VS Code (Advanced)
Soft Skills: Problem Solving, Communication, Teamwork, Analytical Thinking (all Advanced)

=== SERVICES OFFERED ===
Frontend Development, Backend Development, API Development, Database Design, Responsive UI Design, Full-Stack Applications

=== EDUCATION ===
1. MCA — Shivaji University, Kolhapur (2024-2026, Pursuing)
2. BCA — Shivaji University, Kolhapur (2021-2024, 68.53%)
3. HSC — Yashwant Jr. College, Kodoli (2020-2021, 74.00%)
4. SSC — Kodoli Highschool, Kodoli (2018-2019, 63.00%)

=== CONTACT ===
Email: hcpatil2324@gmail.com
Phone: +91 93XX XXXX05
LinkedIn: https://linkedin.com/in/harshad-patil45
GitHub: https://github.com/harshad4558
`;

/* ─── Types ─────────────────────────────────────────────────── */
type AgentState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

/* ─── Gemini API call ────────────────────────────────────────── */
async function askGemini(userMessage: string, history: ChatMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  if (!apiKey) {
    return "I'm sorry, my AI brain isn't connected yet. Please ask Harshad to add the Gemini API key to make me fully functional!";
  }

  // Build the conversation history for Gemini
  const contents = [
    {
      role: 'user',
      parts: [{ text: PORTFOLIO_CONTEXT }],
    },
    {
      role: 'model',
      parts: [{ text: "Understood! I am Harshad Patil's AI portfolio assistant. I will answer questions about his skills, projects, experience, and education using only the information provided. How can I help you?" }],
    },
    // Add conversation history
    ...history.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    })),
    // Add the current question
    {
      role: 'user',
      parts: [{ text: userMessage }],
    },
  ];

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 250,
            topP: 0.9,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('Gemini API error:', response.status);
      return "I'm having trouble connecting to my AI service right now. Please try again in a moment!";
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "I couldn't generate a response. Could you please rephrase your question?";
  } catch (err) {
    console.error('Gemini fetch error:', err);
    return "I'm having trouble reaching my AI service. Please check your internet connection and try again!";
  }
}

/* ─── Male Voice Selector ────────────────────────────────────── */
function getMaleVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices();
  const maleKeywords = ['male', 'david', 'daniel', 'mark', 'james', 'alex', 'fred', 'tom', 'george', 'ryan', 'eric', 'guy', 'aaron', 'richard', 'bruce'];
  return (
    voices.find(
      (v) => v.lang.startsWith('en') && maleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
    ) ||
    voices.find((v) => v.lang.startsWith('en') && !v.name.toLowerCase().includes('female')) ||
    voices.find((v) => v.lang.startsWith('en')) ||
    null
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export const VoiceAgent: React.FC = () => {
  const [state, setState] = useState<AgentState>('idle');
  const [caption, setCaption] = useState('');
  const [userTranscript, setUserTranscript] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [supported, setSupported] = useState(false);
  const [synthReady, setSynthReady] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  /* ── Init speech APIs ── */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasSynth = !!window.speechSynthesis;
    const SpeechRecognitionAPI =
      (window as unknown as { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;

    if (hasSynth && SpeechRecognitionAPI) {
      setSupported(true);
      synthRef.current = window.speechSynthesis;

      const recognition = new SpeechRecognitionAPI();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;
      recognitionRef.current = recognition;
    }

    // Voices load asynchronously in some browsers
    const loadVoices = () => {
      if (window.speechSynthesis.getVoices().length > 0) {
        setSynthReady(true);
      }
    };
    loadVoices();
    window.speechSynthesis?.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis?.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  /* ── Stop everything ── */
  const stopAll = useCallback(() => {
    if (synthRef.current) synthRef.current.cancel();
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* ignore */ }
    }
    setState('idle');
    setCaption('');
    setUserTranscript('');
  }, []);

  /* ── Speak text aloud ── */
  const speakText = useCallback(
    (text: string): Promise<void> => {
      return new Promise((resolve) => {
        if (!synthRef.current) { resolve(); return; }

        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;

        if (synthReady) {
          const voice = getMaleVoice(synthRef.current);
          if (voice) utterance.voice = voice;
        }
        utterance.rate = 0.95;
        utterance.pitch = 0.88;

        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();

        synthRef.current.speak(utterance);
      });
    },
    [synthReady]
  );

  /* ── Start listening ── */
  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;

    stopAll();
    setState('listening');
    setUserTranscript('');
    setCaption('Listening... speak now');

    const recognition = recognitionRef.current;

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      // Show live words as user speaks
      if (interimTranscript) {
        setUserTranscript(interimTranscript);
        setCaption(`Listening: "${interimTranscript}..."`);
      }

      // Process only when sentence is finished
      if (finalTranscript) {
        setUserTranscript(finalTranscript);
        setCaption(`You said: "${finalTranscript}"`);

        // Move to thinking state
        setState('thinking');
        setCaption('Thinking...');

        // Add user message to history
        const newHistory = [...history, { role: 'user' as const, text: finalTranscript }];

        // Query Gemini
        const response = await askGemini(finalTranscript, history);

        // Add assistant response to history (keep last 10 messages)
        const updatedHistory = [
          ...newHistory,
          { role: 'assistant' as const, text: response },
        ].slice(-10);
        setHistory(updatedHistory);

        // Speak the response
        setState('speaking');
        setCaption(response);
        await speakText(response);
        setState('idle');
        setCaption('');
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        setCaption("I didn't hear anything. Tap the mic to try again!");
      } else if (event.error === 'not-allowed') {
        setCaption('Microphone access denied. Please enable it in browser settings.');
      } else {
        setCaption(`Error: ${event.error}. Tap the mic to try again.`);
      }
      setState('idle');
      setTimeout(() => setCaption(''), 3000);
    };

    recognition.onend = () => {
      // Only reset if still in listening state (not already processing)
      if (state === 'listening') {
        // Check handled by the current closure
      }
    };

    try {
      recognition.start();
    } catch (err) {
      console.error('Recognition start error:', err);
      setState('idle');
    }
  }, [history, speakText, stopAll, state]);

  /* ── Toggle handler ── */
  const handleToggle = useCallback(() => {
    if (state === 'idle') {
      startListening();
    } else {
      stopAll();
    }
  }, [state, startListening, stopAll]);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      if (synthRef.current) synthRef.current.cancel();
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch { /* ignore */ }
      }
    };
  }, []);

  if (!supported) return null;

  /* ── Button color/icon per state ── */
  const buttonConfig = {
    idle: {
      icon: <FiMic className="w-6 h-6" />,
      className: 'bg-gradient-to-tr from-accent to-secondary border-accent/20 text-white shadow-accent/20',
      label: 'Ask me anything about Harshad',
    },
    listening: {
      icon: <FiMic className="w-6 h-6 animate-pulse" />,
      className: 'bg-gradient-to-tr from-cyan-400 to-blue-500 border-cyan-400/30 text-white shadow-cyan-400/30 animate-pulse',
      label: 'Listening... speak now',
    },
    thinking: {
      icon: <FiCpu className="w-6 h-6 animate-spin" />,
      className: 'bg-gradient-to-tr from-indigo-500 to-purple-600 border-indigo-400/30 text-white shadow-indigo-400/30',
      label: 'Thinking...',
    },
    speaking: {
      icon: <FiVolumeX className="w-6 h-6" />,
      className: 'bg-rose-500 border-rose-500 text-white shadow-rose-500/25',
      label: 'Click to stop',
    },
  };

  const config = buttonConfig[state];

  return (
    <>
      {/* ── Floating Caption Panel ── */}
      <AnimatePresence>
        {caption && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '5.5rem',
              right: '1.5rem',
              zIndex: 50,
              width: '90%',
              maxWidth: '380px',
              padding: 'clamp(0.75rem, 2vw, 1.25rem)',
              borderRadius: '16px',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: `1.5px solid ${state === 'listening' ? 'rgba(34,211,238,0.3)' : state === 'thinking' ? 'rgba(129,140,248,0.3)' : state === 'speaking' ? 'rgba(34,211,238,0.25)' : 'var(--glass-border)'}`,
              boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              textAlign: 'left',
            }}
          >
            {/* State indicator */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '2px' }}>
              {state === 'speaking' ? (
                // Audio wave bars
                <div style={{ display: 'flex', gap: '2px', alignItems: 'center', height: '24px' }}>
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [6, 20, 6] }}
                      transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ width: '3px', borderRadius: '9999px', background: 'var(--accent)' }}
                    />
                  ))}
                </div>
              ) : state === 'listening' ? (
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22D3EE' }}
                />
              ) : state === 'thinking' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--secondary)', borderTopColor: 'transparent' }}
                />
              ) : null}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Show user transcript if available */}
              {userTranscript && state !== 'listening' && (
                <p style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--muted)',
                  marginBottom: '6px',
                  fontStyle: 'italic',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  You: "{userTranscript}"
                </p>
              )}

              {/* Caption */}
              <p style={{
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--text)',
                lineHeight: '1.5',
                margin: 0,
              }}>
                {caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Button ── */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border cursor-pointer focus-ring relative group ${config.className}`}
          aria-label={config.label}
          title={config.label}
        >
          {config.icon}

          {/* Decorative halo ring — idle only */}
          {state === 'idle' && (
            <span className="absolute -inset-0.5 rounded-full border border-accent/40 animate-ping opacity-60 pointer-events-none" />
          )}

          {/* Tooltip */}
          <div
            style={{
              position:       'absolute',
              right:          '4rem',
              top:            '50%',
              transform:      'translateY(-50%)',
              opacity:        0,
              transition:     'opacity 0.3s ease',
              pointerEvents:  'none',
              padding:        '6px 12px',
              borderRadius:   '10px',
              background:     'var(--cards)',
              fontSize:       '0.72rem',
              fontWeight:     600,
              whiteSpace:     'nowrap',
              border:         '1px solid var(--glass-border)',
              boxShadow:      '0 4px 16px rgba(0,0,0,0.15)',
              display:        'flex',
              alignItems:     'center',
              gap:            '6px',
              color:          'var(--text)',
            }}
            className="group-hover:!opacity-100"
          >
            <FiCpu style={{ width: '12px', height: '12px', color: 'var(--accent)' }} />
            <span>{state === 'idle' ? 'AI Voice Assistant' : config.label}</span>
          </div>
        </motion.button>
      </div>
    </>
  );
};

export default VoiceAgent;
