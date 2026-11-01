import React, { useState } from 'react';
import { Github, Linkedin, ArrowUpRight, Send, Copy, Check, Radio, MessageSquare, Terminal } from 'lucide-react';
import { sound } from '../utils/audio';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = 'arnavyadav782006@gmail.com';

  const handleCopyEmail = () => {
    sound.playRadioBeep();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playRadioBeep();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sound.playF1EngineRev();

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
      className="portfolio-section"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-surface)'
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '0.85rem' }}>
          <div className="section-label">
            <span className="section-label-line" />
            <span>04 // COMMUNICATIONS & PIT WALL</span>
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', margin: '0.2rem 0' }}>
            ESTABLISH COMMS WITH ARNAV
          </h2>
          <p className="section-desc" style={{ fontSize: '0.82rem', margin: 0, lineHeight: 1.35, maxWidth: '850px' }}>
            Open for software engineering opportunities, systems architecture discussions,
            or collaboration on high-impact projects.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.25rem'
          }}
        >
          {/* Left Column: Direct Channels & Telemetry Info */}
          <div className="contact-info-col">
            <div className="tech-card corner-markers" style={{ padding: '1.25rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <Radio size={14} color="var(--accent-racing)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-racing)' }}>
                    DIRECT TRANSMISSION CHANNELS
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 900,
                    color: 'var(--text-white)',
                    marginBottom: '0.4rem',
                    lineHeight: 1.2
                  }}
                >
                  LET'S BUILD SOMETHING <br />
                  <span style={{ color: 'var(--accent-racing)' }}>FAST & RELIABLE</span>
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.4, marginBottom: '0.85rem' }}>
                  Whether you have an inquiry regarding NyayaSetu, CampusBites, or want to discuss
                  software engineering roles and collaborations, feel free to drop a direct message.
                </p>

                {/* Primary Email Box with 1-Click Copy */}
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-accent)',
                    borderRadius: '4px',
                    marginBottom: '0.65rem'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    PRIMARY EMAIL CHANNEL
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <a
                      href={`mailto:${emailAddress}`}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
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
                        gap: '0.35rem',
                        padding: '0.35rem 0.65rem',
                        backgroundColor: copied ? 'var(--telemetry-green)' : 'rgba(212, 255, 0, 0.1)',
                        color: copied ? '#000' : 'var(--accent-racing)',
                        border: '1px solid var(--border-accent)',
                        borderRadius: '2px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copied ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                {/* LinkedIn Box */}
                <a
                  href="https://www.linkedin.com/in/arnav-yadav-956156334/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(56, 189, 248, 0.04)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: 'inherit',
                    marginBottom: '0.65rem',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Linkedin size={18} color="#38bdf8" />
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        PROFESSIONAL NETWORK // LINKEDIN
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>
                        linkedin.com/in/arnav-yadav-956156334
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={14} color="#38bdf8" />
                </a>

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
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Github size={18} color="var(--accent-racing)" />
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        OPEN SOURCE CODEBASE
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-white)' }}>
                        github.com/Arnav876
                      </div>
                    </div>
                  </div>
                  <Terminal size={14} color="var(--accent-racing)" />
                </a>
              </div>

              {/* Status Badge */}
              <div
                style={{
                  marginTop: '0.85rem',
                  paddingTop: '0.65rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--telemetry-green)',
                    boxShadow: '0 0 10px var(--telemetry-green)'
                  }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  CURRENT STATUS: OPEN FOR FULL-STACK & SYSTEMS ROLES
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form */}
          <div className="contact-form-col">
            <div className="tech-card corner-markers" style={{ padding: '1.25rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <MessageSquare size={14} color="var(--accent-racing)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-racing)' }}>
                    DISPATCH PACKET // TELEMETRY FORM
                  </span>
                </div>

                {submitted ? (
                  <div
                    style={{
                      padding: '2rem',
                      textAlign: 'center',
                      backgroundColor: 'rgba(212, 255, 0, 0.05)',
                      border: '1px solid var(--accent-racing)',
                      borderRadius: '4px'
                    }}
                  >
                    <Check size={32} color="var(--accent-racing)" style={{ margin: '0 auto 0.75rem' }} />
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '0.35rem' }}>
                      PACKET TRANSMITTED
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                      Your message packet has been prepared and transferred to the mail client. Arnav will respond shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="btn-secondary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                    >
                      SEND ANOTHER PACKET
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                      <div>
                        <label
                          htmlFor="contact-name"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: 'var(--text-secondary)',
                            marginBottom: '0.25rem',
                            textTransform: 'uppercase'
                          }}
                        >
                          Your Name / Org *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Rivera"
                          style={{
                            width: '100%',
                            padding: '0.55rem 0.75rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '3px',
                            color: 'var(--text-white)',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.85rem',
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
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: 'var(--text-secondary)',
                            marginBottom: '0.25rem',
                            textTransform: 'uppercase'
                          }}
                        >
                          Return Email *
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
                            padding: '0.55rem 0.75rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '3px',
                            color: 'var(--text-white)',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.85rem',
                            outline: 'none',
                            transition: 'border-color var(--transition-fast)'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: 'var(--text-secondary)',
                          marginBottom: '0.25rem',
                          textTransform: 'uppercase'
                        }}
                      >
                        Telemetry Subject *
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Full-Stack Engineering Role / Systems Architecture"
                        style={{
                          width: '100%',
                          padding: '0.55rem 0.75rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '3px',
                          color: 'var(--text-white)',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          outline: 'none',
                          transition: 'border-color var(--transition-fast)'
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: 'var(--text-secondary)',
                          marginBottom: '0.25rem',
                          textTransform: 'uppercase'
                        }}
                      >
                        Telemetry Packet / Message *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail the technical specifications, requirements, or opportunity..."
                        style={{
                          width: '100%',
                          padding: '0.55rem 0.75rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '3px',
                          color: 'var(--text-white)',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          outline: 'none',
                          resize: 'none',
                          transition: 'border-color var(--transition-fast)'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => sound.playHover()}
                      className="btn-primary"
                      style={{
                        padding: '0.65rem 1.25rem',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        gap: '0.5rem',
                        marginTop: '0.25rem'
                      }}
                    >
                      <Send size={13} />
                      <span>{isSubmitting ? 'TRANSMITTING PACKET...' : 'DISPATCH TELEMETRY PACKET'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
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
