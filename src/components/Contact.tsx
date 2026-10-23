import React, { useState } from 'react';
import { Github, Send, Copy, Check, Radio, MessageSquare, Terminal } from 'lucide-react';
import { sound } from '../utils/audio';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = 'arnavyadav782006@gmail.com';

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sound.playTelemetryLap();

      // Also compose mailto link for direct transmission
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 800);
  };

  return (
    <section
      id="contact"
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '6.5rem',
        position: 'relative',
        backgroundColor: 'rgba(10, 10, 14, 0.4)',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-line" />
            <span>06 // COMMUNICATIONS & PIT WALL</span>
          </div>
          <h2 className="section-title">
            ESTABLISH COMMS WITH ARNAV
          </h2>
          <p className="section-desc">
            Open for software engineering opportunities, systems architecture discussions,
            or collaboration on high-impact projects.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem'
          }}
        >
          {/* Left Column: Direct Channels & Telemetry Info */}
          <div style={{ gridColumn: 'span 12' }} className="contact-info-col">
            <div className="tech-card corner-markers" style={{ padding: '2.25rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <Radio size={16} color="var(--accent-racing)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-racing)' }}>
                    DIRECT TRANSMISSION CHANNELS
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: 'var(--text-white)',
                    marginBottom: '1rem',
                    lineHeight: 1.2
                  }}
                >
                  LET'S BUILD SOMETHING <br />
                  <span style={{ color: 'var(--accent-racing)' }}>FAST & RELIABLE</span>
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Whether you have an inquiry regarding GroqAI, CivicSync GIS, or want to discuss
                  software engineering roles, feel free to drop a direct message or connect via GitHub.
                </p>

                {/* Primary Email Box with 1-Click Copy */}
                <div
                  style={{
                    padding: '1.25rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-accent)',
                    borderRadius: '4px',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    PRIMARY EMAIL CHANNEL
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <a
                      href={`mailto:${emailAddress}`}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
                        fontWeight: 700,
                        color: 'var(--text-white)',
                        textDecoration: 'none'
                      }}
                    >
                      {emailAddress}
                    </a>

                    <button
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.45rem 0.75rem',
                        backgroundColor: copied ? 'var(--telemetry-green)' : 'rgba(212, 255, 0, 0.1)',
                        color: copied ? '#000' : 'var(--accent-racing)',
                        border: '1px solid var(--border-accent)',
                        borderRadius: '2px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copied ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                {/* GitHub Box */}
                <a
                  href="https://github.com/Arnav876"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Github size={20} color="var(--accent-racing)" />
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        OPEN SOURCE CODEBASE
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-white)' }}>
                        github.com/Arnav876
                      </div>
                    </div>
                  </div>
                  <Terminal size={16} color="var(--accent-racing)" />
                </a>
              </div>

              {/* Status Badge */}
              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--telemetry-green)',
                    boxShadow: '0 0 10px var(--telemetry-green)'
                  }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  CURRENT STATUS: OPEN FOR FULL-STACK & SYSTEMS ROLES
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form */}
          <div style={{ gridColumn: 'span 12' }} className="contact-form-col">
            <div className="tech-card corner-markers" style={{ padding: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <MessageSquare size={16} color="var(--accent-racing)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-racing)' }}>
                  DISPATCH PACKET // TELEMETRY FORM
                </span>
              </div>

              {submitted ? (
                <div
                  style={{
                    padding: '2.5rem',
                    textAlign: 'center',
                    backgroundColor: 'rgba(212, 255, 0, 0.05)',
                    border: '1px solid var(--accent-racing)',
                    borderRadius: '4px'
                  }}
                >
                  <Check size={36} color="var(--accent-racing)" style={{ margin: '0 auto 1rem' }} />
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '0.5rem' }}>
                    PACKET TRANSMITTED
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Your message packet has been prepared and transferred to the mail client. Arnav will respond shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="btn-secondary"
                  >
                    SEND ANOTHER PACKET
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--text-secondary)',
                        marginBottom: '0.4rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      Your Name / Organization *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe / Tech Team"
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '3px',
                        color: 'var(--text-white)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border-color var(--transition-fast)'
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--text-secondary)',
                        marginBottom: '0.4rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      Return Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '3px',
                        color: 'var(--text-white)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--text-secondary)',
                        marginBottom: '0.4rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      Subject / Project Scope
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Opportunity / Collaboration / GroqAI"
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '3px',
                        color: 'var(--text-white)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--text-secondary)',
                        marginBottom: '0.4rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      Transmission Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your transmission or project inquiry here..."
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '3px',
                        color: 'var(--text-white)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '0.9rem',
                      marginTop: '0.5rem'
                    }}
                    onMouseEnter={() => sound.playHover()}
                  >
                    <Send size={15} />
                    <span>{isSubmitting ? 'DISPATCHING TELEMETRY...' : 'DISPATCH TRANSMISSION'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-info-col {
            grid-column: span 5 !important;
          }
          .contact-form-col {
            grid-column: span 7 !important;
          }
        }
      `}</style>
    </section>
  );
};
