import React from 'react';
import { ArrowUp, Shield, Github, Linkedin } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-black)',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  backgroundColor: 'var(--accent-racing)',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.8rem',
                  borderRadius: '2px'
                }}
              >
                AY
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-white)' }}>
                ARNAV YADAV
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Deterministic Systems • Machine Learning • High-Concurrency Architectures
            </p>
          </div>

          {/* Quick Nav & Back to Top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a
              href="https://www.linkedin.com/in/arnav-yadav-956156334/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'color var(--transition-fast)'
              }}
            >
              <Linkedin size={14} color="#38bdf8" />
              <span>LINKEDIN</span>
            </a>

            <a
              href="https://github.com/Arnav876"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'color var(--transition-fast)'
              }}
            >
              <Github size={14} color="var(--accent-racing)" />
              <span>GITHUB</span>
            </a>

            <button
              onClick={scrollToTop}
              className="btn-secondary"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.75rem' }}
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Telemetry Signature */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} ARNAV YADAV. ALL RIGHTS RESERVED. // MOTORSPORT EDITION
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Shield size={12} color="var(--accent-racing)" />
              <span>ZERO-DRIFT INVARIANTS</span>
            </span>
            <span>CHASSIS: REACT 19 + VITE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
