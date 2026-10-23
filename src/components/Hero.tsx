import React, { useState } from 'react';
import { ArrowDownRight, Terminal, ShieldCheck, Gauge, ExternalLink } from 'lucide-react';
import { sound } from '../utils/audio';

export const Hero: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '7rem',
        paddingBottom: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Motorsport Watermark & Track Lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '12%',
          right: '-4%',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(8rem, 20vw, 22rem)',
          fontWeight: 900,
          color: 'rgba(255, 255, 255, 0.02)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          lineHeight: 0.8
        }}
      >
        AY876
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Top Telemetry Header Strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '2.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="telemetry-chip">
              LIVE SYSTEM // SECTOR-1
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)'
              }}
            >
              LOC: 28°36'N 77°12'E // DRIVER: ARNAV YADAV
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>ENGINE:</span>
              <span style={{ color: 'var(--accent-racing)', fontWeight: 700 }}>REACT 19 + TS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>CHASSIS:</span>
              <span style={{ color: 'var(--telemetry-green)', fontWeight: 700 }}>OPTIMIZED</span>
            </div>
          </div>
        </div>

        {/* Main Hero Grid: Oversized Typography + Helmet Signature Element */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Oversized Typography & Intro */}
          <div style={{ gridColumn: 'span 12' }} className="hero-content-col">
            <div style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--accent-racing)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <Terminal size={15} />
                FULL-STACK & SYSTEMS DEVELOPER
              </span>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: 'var(--text-white)',
                marginBottom: '1.5rem',
                position: 'relative'
              }}
            >
              ARNAV <br />
              <span
                style={{
                  WebkitTextStroke: '2px var(--accent-racing)',
                  color: 'transparent',
                  display: 'inline-block',
                  position: 'relative',
                  filter: 'drop-shadow(0 0 18px var(--accent-glow-strong))'
                }}
              >
                YADAV
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '600px',
                marginBottom: '2.5rem'
              }}
            >
              Engineering high-concurrency platforms, deterministic combinatorial optimizers,
              and civic GIS infrastructure. Built with zero-drift financial invariants,
              deep machine learning models, and uncompromising client privacy.
            </p>

            {/* Call To Actions */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '3rem'
              }}
            >
              <a
                href="#projects"
                className="btn-primary"
                onClick={() => {
                  sound.playClick();
                  sound.playTelemetryLap();
                }}
                onMouseEnter={() => sound.playHover()}
              >
                <span>INSPECT PROJECTS</span>
                <ArrowDownRight size={18} />
              </a>

              <a
                href="#about"
                className="btn-secondary"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
              >
                <span>ENGINEER DOSSIER</span>
              </a>

              <a
                href="https://github.com/Arnav876"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                style={{ padding: '0.85rem 1.1rem' }}
                title="Arnav's GitHub Profile"
              >
                <span>GITHUB</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Signature Yellow-and-Black Helmet Visual Element */}
          <div
            style={{
              gridColumn: 'span 12',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            className="hero-image-col"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Aerodynamic Circular Telemetry Rings */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: '100%',
                maxWidth: '480px',
                aspectRatio: '1',
                borderRadius: '50%',
                border: '1px dashed rgba(212, 255, 0, 0.2)',
                animation: 'spin-slow 60s linear infinite',
                pointerEvents: 'none'
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: '85%',
                maxWidth: '400px',
                aspectRatio: '1',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                pointerEvents: 'none'
              }}
            />

            {/* Signature Helmet Card Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'radial-gradient(circle at 50% 40%, rgba(212, 255, 0, 0.12) 0%, rgba(10, 10, 14, 0.95) 75%)',
                border: '1px solid var(--border-accent)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 35px var(--accent-glow)',
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.15s ease-out, box-shadow 0.3s ease'
              }}
              className="corner-markers"
            >
              {/* Telemetry HUD Badge over Helmet */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  zIndex: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.65rem',
                  backgroundColor: 'rgba(7, 7, 9, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border-accent)',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'var(--accent-racing)'
                }}
              >
                <ShieldCheck size={12} />
                <span>SPEC // CLOSED HELMET AERO</span>
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.65rem',
                  backgroundColor: 'rgba(7, 7, 9, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-white)'
                }}
              >
                <Gauge size={12} color="var(--accent-racing)" />
                <span>POWERTRAIN: 100%</span>
              </div>

              {/* Exact Photograph: C1D045F7-1047-40C4-B553-016A317D4A2D.png */}
              <img
                src="/C1D045F7-1047-40C4-B553-016A317D4A2D.png"
                alt="Arnav Yadav - Signature Racing Helmet Edition"
                loading="eager"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  filter: 'contrast(1.04) brightness(1.02)',
                  transform: 'scale(1.01)',
                  transition: 'transform 0.4s ease'
                }}
              />

              {/* Lower HUD Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem',
                  background: 'linear-gradient(to top, rgba(7, 7, 9, 0.95) 0%, rgba(7, 7, 9, 0.6) 70%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(212, 255, 0, 0.15)'
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-racing)', letterSpacing: '0.1em' }}>
                    SIGNATURE VISUAL // 01
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-white)' }}>
                    RACING TELEMETRY EDITION
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-secondary)',
                    textAlign: 'right'
                  }}
                >
                  <span style={{ color: 'var(--telemetry-green)' }}>● CALIBRATED</span>
                  <br />
                  AERO DYNAMICS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Stats Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginTop: '4rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--border-subtle)'
          }}
        >
          <div className="tech-card corner-markers">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-racing)', marginBottom: '0.5rem' }}>
              // INVARIANT DRIFT
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--text-white)' }}>
              0.00%
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Integer-paise currency precision in GroqAI
            </p>
          </div>

          <div className="tech-card corner-markers">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-racing)', marginBottom: '0.5rem' }}>
              // COMBINATORIAL ENGINE
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--text-white)' }}>
              15 SUBSETS
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Deterministic 4-platform basket optimization
            </p>
          </div>

          <div className="tech-card corner-markers">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-racing)', marginBottom: '0.5rem' }}>
              // HACKATHON INNOVATION
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--text-white)' }}>
              SIH PLATFORM
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              NyayaSetu AI legal aid & voice coordination
            </p>
          </div>

          <div className="tech-card corner-markers">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-racing)', marginBottom: '0.5rem' }}>
              // REPOSITORY ECOSYSTEM
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--text-white)' }}>
              6+ SHIPPED
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Full-stack, ML, GIS & low-footprint systems
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (min-width: 992px) {
          .hero-content-col {
            grid-column: span 7 !important;
          }
          .hero-image-col {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </section>
  );
};
