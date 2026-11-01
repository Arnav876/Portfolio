import React from 'react';
import { UserCheck, Binary, CheckCircle2, ArrowRight, Linkedin, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';

export const About: React.FC = () => {
  const principles = [
    {
      title: 'Deterministic Correctness',
      desc: 'Financial and logistical systems must rely on pure mathematical algorithms rather than probabilistic LLMs for calculating prices, splits, and fees.'
    },
    {
      title: 'Zero-Drift Financial Precision',
      desc: 'Handling currency in integer paise (1 INR = 100 paise) across all data models to eradicate floating-point arithmetic errors.'
    },
    {
      title: 'Privacy & Capability Honesty',
      desc: 'Zero-credential operations: never capturing passwords or simulating checkout flows. User retains complete authority over checkout execution.'
    },
    {
      title: 'Minimal Dependency Footprint',
      desc: 'Leveraging native platform modules (like Node.js `node:sqlite`, PBKDF2 cryptography, Web Speech APIs) over heavy external daemons.'
    }
  ];

  return (
    <section
      id="about"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        backgroundColor: 'rgba(10, 10, 14, 0.4)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-line" />
            <span>02 // BIOGRAPHY & DOSSIER</span>
          </div>
          <h2 className="section-title">
            ENGINEERING PHILOSOPHY & BACKGROUND
          </h2>
          <p className="section-desc">
            A developer passionate about building resilient systems, mathematical optimization,
            and software that addresses tangible societal problems.
          </p>
        </div>

        {/* 2-Column Dossier Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Authentic Normal Portrait Photograph */}
          <div style={{ gridColumn: 'span 12' }} className="about-portrait-col">
            <div
              className="corner-markers"
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-accent)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px var(--accent-glow)'
              }}
            >
              {/* Technical Header Strip */}
              <div
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(7, 7, 9, 0.9)',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-racing)' }}>
                  <UserCheck size={14} />
                  <span>DOSSIER // ARNAV YADAV</span>
                </div>
                <div style={{ color: 'var(--text-muted)' }}>
                  VERIFIED IDENTIFIER: AY876
                </div>
              </div>

              {/* Verified Studio Portrait */}
              <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                <img
                  src="/arnav-portrait.png"
                  alt="Arnav Yadav - Systems & Full-Stack Engineer"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '520px',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'center top'
                  }}
                />
              </div>

              {/* Bio Details Footer */}
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-white)' }}>
                    Arnav Yadav
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--telemetry-green)',
                      backgroundColor: 'rgba(0, 229, 117, 0.1)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '2px',
                      border: '1px solid rgba(0, 229, 117, 0.3)'
                    }}
                  >
                    STATUS: READY FOR PRODUCTION
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Full-Stack Architecture • Deterministic Algorithms • GIS & ML Systems
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Capabilities & Core Invariants */}
          <div style={{ gridColumn: 'span 12' }} className="about-narrative-col">
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                fontWeight: 800,
                color: 'var(--text-white)',
                marginBottom: '1.25rem',
                lineHeight: 1.2
              }}
            >
              Building high-integrity software where{' '}
              <span style={{ color: 'var(--accent-racing)' }}>accuracy and speed</span> are non-negotiable.
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              I am a software engineer dedicated to crafting deterministic platforms, full-stack applications,
              and AI architectures. Rather than chasing superficial trends, I focus on systems that solve real
              inefficiencies—whether that is optimizing Indian quick-commerce grocery carts to eradicate unnecessary
              fees, orchestrating urban GIS excavations to eliminate repeated road digging, or facilitating
              due-process access for undertrial prisoners via AI-driven judicial timelines.
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              My engineering toolbox spans the modern web ecosystem (React 19, TypeScript, Node.js),
              machine learning and data science pipelines (PyTorch, Scikit-learn, NumPy), and systems-level
              portability using embedded persistent engines and native Web APIs.
            </p>

            {/* Core Architectural Invariants */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--accent-racing)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Binary size={15} />
                <span>CORE ENGINEERING INVARIANTS</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem' }}>
                {principles.map((p, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px'
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--accent-racing)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-white)' }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                        {p.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action link */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="#projects"
                className="btn-primary"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
              >
                <span>EXPLORE TECHNICAL WORK</span>
                <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="btn-secondary"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
              >
                <span>GET IN TOUCH</span>
              </a>
              <a
                href="https://www.linkedin.com/in/arnav-yadav-956156334/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#38bdf8',
                  borderColor: 'rgba(56, 189, 248, 0.45)'
                }}
              >
                <Linkedin size={15} />
                <span>LINKEDIN</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-portrait-col {
            grid-column: span 5 !important;
          }
          .about-narrative-col {
            grid-column: span 7 !important;
          }
        }
      `}</style>
    </section>
  );
};
