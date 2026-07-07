import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiSend, FiLoader, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import type { IconType } from 'react-icons';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/* ── Reusable floating-label field ─────────────────────────── */
interface FieldProps {
  id: keyof FormState;
  label: string;
  type?: string;
  rows?: number;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Field: React.FC<FieldProps> = ({ id, label, type = 'text', rows, value, error, onChange }) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  const baseInput: React.CSSProperties = {
    width:           '100%',
    padding:         '1rem 1rem 0.5rem',
    paddingTop:      '1.5rem',
    background:      'var(--glass-bg)',
    border:          `1.5px solid ${error ? '#F87171' : focused ? 'var(--accent)' : 'var(--glass-border)'}`,
    borderRadius:    '12px',
    color:           'var(--text)',
    fontSize:        '0.9rem',
    fontWeight:      500,
    outline:         'none',
    transition:      'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow:       focused ? `0 0 0 3px rgba(var(--accent-rgb), 0.12)` : 'none',
    resize:          rows ? 'none' : undefined,
    backdropFilter:  'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  } as React.CSSProperties;

  const labelStyle: React.CSSProperties = {
    position:       'absolute',
    left:           '1rem',
    top:            lifted ? '0.42rem' : '0.9rem',
    fontSize:       lifted ? '0.68rem' : '0.875rem',
    fontWeight:     600,
    color:          focused ? 'var(--accent)' : 'var(--muted)',
    letterSpacing:  lifted ? '0.06em' : 'normal',
    textTransform:  lifted ? 'uppercase' : 'none',
    transition:     'top 0.18s ease, font-size 0.18s ease, color 0.18s ease',
    pointerEvents:  'none',
    zIndex:         2,
  };

  return (
    <div style={{ position: 'relative' }}>
      <label htmlFor={id} style={labelStyle}>{label}</label>

      {rows ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={onChange}
          required
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseInput}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseInput}
        />
      )}

      {error && (
        <p style={{ color: '#F87171', fontSize: '0.73rem', marginTop: '4px', fontWeight: 500 }}>
          {error}
        </p>
      )}
    </div>
  );
};

/* ── Sidebar contact card ─────────────────────────────────── */
interface ContactCardProps {
  href: string;
  icon: IconType;
  label: string;
  value: string;
  external?: boolean;
}
const ContactCard: React.FC<ContactCardProps> = ({ href, icon: Icon, label, value, external }) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noreferrer' : undefined}
    style={{
      display:        'flex',
      alignItems:     'center',
      gap:            '1rem',
      padding:        '0.875rem 1rem',
      borderRadius:   '12px',
      background:     'var(--glass-bg)',
      border:         '1.5px solid var(--glass-border)',
      textDecoration: 'none',
      transition:     'border-color 0.25s ease, box-shadow 0.25s ease',
      backdropFilter: 'blur(10px)',
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)';
      (e.currentTarget as HTMLAnchorElement).style.boxShadow  = '0 4px 24px rgba(var(--accent-rgb),0.14)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--glass-border)';
      (e.currentTarget as HTMLAnchorElement).style.boxShadow  = 'none';
    }}
  >
    <div
      style={{
        width:          '40px',
        height:         '40px',
        borderRadius:   '10px',
        background:     'rgba(var(--accent-rgb),0.12)',
        color:          'var(--accent)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
      }}
    >
      <Icon size={18} />
    </div>
    <div>
      <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </span>
      <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', fontFamily: 'monospace', marginTop: '1px' }}>
        {value}
      </span>
    </div>
  </a>
);

/* ── Main component ──────────────────────────────────────── */
export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors,       setErrors]       = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; success: boolean; message: string } | null>(null);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formValues.name.trim())    tempErrors.name    = 'Name is required';
    if (!formValues.email.trim())   tempErrors.email   = 'Email is required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email))
                                    tempErrors.email   = 'Invalid email address';
    if (!formValues.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formValues.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const triggerToast = (success: boolean, message: string) => {
    setToast({ show: true, success, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const body = `Name: ${formValues.name}\nEmail: ${formValues.email}\n\nMessage:\n${formValues.message}`;
    const mailtoLink = `mailto:hcpatil2324@gmail.com?subject=${encodeURIComponent(formValues.subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      triggerToast(true, 'Opening your email client...');
      setFormValues({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section
      id="contact"
      style={{ padding: '5rem 0 6rem', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}
    >
      {/* Background blob */}
      <div style={{
        position:   'absolute',
        top:        '30%',
        left:       '-8%',
        width:      '26rem',
        height:     '26rem',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(var(--accent-rgb),0.06) 0%, transparent 70%)',
        filter:     'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--text)', marginBottom: '0.75rem' }}>
            Get In{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--accent), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Touch
            </span>
          </h2>
          <div style={{ width: '52px', height: '3px', background: 'linear-gradient(90deg, var(--accent), var(--secondary))', margin: '0 auto', borderRadius: '9999px' }} />
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          {/* ── Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.35rem', color: 'var(--text)', marginBottom: '0.6rem' }}>
                Let's build something great!
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: '1.7' }}>
                I'm open to internships, full-stack opportunities, freelance projects, or just a good tech chat. Let's connect!
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <ContactCard href="mailto:hcpatil2324@gmail.com" icon={FiMail}  label="Email Me" value="hcpatil2324@gmail.com" />
              <ContactCard href="tel:+919322043305"            icon={FiPhone} label="Call Me"  value="+91 93XX XXXX05"      />
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                { href: 'https://linkedin.com/in/harshad-patil45', icon: FiLinkedin, label: 'LinkedIn' },
                { href: 'https://github.com/harshad4558',          icon: FiGithub,   label: 'GitHub'   },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width:          '44px',
                    height:         '44px',
                    borderRadius:   '12px',
                    background:     'var(--glass-bg)',
                    border:         '1.5px solid var(--glass-border)',
                    color:          'var(--muted)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition:     'all 0.2s ease',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color       = 'var(--accent)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLAnchorElement).style.background  = 'rgba(var(--accent-rgb),0.10)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color       = 'var(--muted)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--glass-border)';
                    (e.currentTarget as HTMLAnchorElement).style.background  = 'var(--glass-bg)';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                background:     'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border:         '1.5px solid var(--glass-border)',
                borderRadius:   '20px',
                padding:        'clamp(1.5rem, 4vw, 2.5rem)',
                boxShadow:      '0 20px 60px rgba(0,0,0,0.12)',
              }}
            >
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} noValidate>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <Field id="name"  label="Your Name"  value={formValues.name}  error={errors.name}  onChange={handleInputChange} />
                  <Field id="email" label="Your Email" type="email" value={formValues.email} error={errors.email} onChange={handleInputChange} />
                </div>

                <Field id="subject" label="Subject"      value={formValues.subject} error={errors.subject} onChange={handleInputChange} />
                <Field id="message" label="Your Message" rows={5} value={formValues.message} error={errors.message} onChange={handleInputChange} />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width:         '100%',
                    padding:       '0.9rem 1.5rem',
                    background:    'linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%)',
                    border:        'none',
                    borderRadius:  '12px',
                    color:         '#fff',
                    fontFamily:    'Space Grotesk, sans-serif',
                    fontWeight:    700,
                    fontSize:      '0.95rem',
                    letterSpacing: '0.04em',
                    display:       'flex',
                    alignItems:    'center',
                    justifyContent:'center',
                    gap:           '0.6rem',
                    cursor:        isSubmitting ? 'not-allowed' : 'pointer',
                    opacity:       isSubmitting ? 0.6 : 1,
                    transition:    'transform 0.2s ease, box-shadow 0.2s ease',
                    boxShadow:     '0 4px 20px rgba(var(--accent-rgb),0.25)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      (e.currentTarget as HTMLButtonElement).style.transform  = 'translateY(-2px)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow  = '0 8px 28px rgba(var(--accent-rgb),0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform  = 'none';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow  = '0 4px 20px rgba(var(--accent-rgb),0.25)';
                  }}
                >
                  {isSubmitting ? (
                    <><FiLoader size={17} style={{ animation: 'spin 1s linear infinite' }} /><span>Sending...</span></>
                  ) : (
                    <><FiSend size={16} /><span>Send Message</span></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0,  x: 0  }}
            exit={{   opacity: 0, y: 20,  x: 20 }}
            style={{
              position:     'fixed',
              bottom:       '1.5rem',
              right:        '1.5rem',
              zIndex:       50,
              padding:      '0.875rem 1.25rem',
              borderRadius: '14px',
              display:      'flex',
              alignItems:   'center',
              gap:          '0.65rem',
              background:   'var(--cards)',
              border:       `1.5px solid ${toast.success ? 'rgba(34,197,94,0.35)' : 'rgba(248,113,113,0.35)'}`,
              boxShadow:    '0 12px 40px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(12px)',
              maxWidth:     '340px',
            }}
          >
            {toast.success
              ? <FiCheckCircle size={18} style={{ color: '#22C55E', flexShrink: 0 }} />
              : <FiXCircle     size={18} style={{ color: '#F87171', flexShrink: 0 }} />
            }
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
};

export default Contact;
