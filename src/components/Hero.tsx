import React, { useState, useEffect } from 'react';
import { ArrowDown, Linkedin, ArrowUpRight, Volume2, VolumeX, X, Zap, Github, Layers, Wrench, Trophy, Mail } from 'lucide-react';
import { sound } from '../utils/audio';
import { RaceBadge } from './RaceBadge';
import { LiquidMask } from './LiquidMask';

interface HeroProps {
  raceMode?: boolean;
  setRaceMode?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Hero: React.FC<HeroProps> = ({ raceMode = false, setRaceMode }) => {
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = sound.subscribe((enabled) => {
      setSoundEnabled(enabled);
    });
    return unsub;
  }, []);

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setMenuOpen((prev) => !prev);
  };

  const handleNavClick = (targetId: string) => {
    sound.playGearShift();
    setMenuOpen(false);

    const sectionIndexMap: Record<string, number> = {
      projects: 1,
      skills: 2,
      milestones: 3,
      contact: 4
    };

    const idx = sectionIndexMap[targetId];
    if (idx !== undefined && window.innerWidth >= 769) {
      window.dispatchEvent(new CustomEvent('portfolio-navigate', { detail: { index: idx } }));
      const targetScroll = window.innerHeight * idx;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { id: 'projects', label: '01 // FEATURED SYSTEMS', icon: <Layers size={16} /> },
    { id: 'skills', label: '02 // PIT-STOP SPECIFICATIONS', icon: <Wrench size={16} /> },
    { id: 'milestones', label: '03 // RACE LOG & HONORS', icon: <Trophy size={16} /> },
    { id: 'contact', label: '04 // PIT WALL CONTACT', icon: <Mail size={16} /> }
  ];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Background grid/pattern layer (matching subtle Framer motorsport grain) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/hero/bg-pattern.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Interactive WebGL Helmet Reveal (Liquid Mask) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          backgroundColor: '#ffffff'
        }}
      >
        <LiquidMask
          imageBase={{ src: '/assets/hero/face.png', alt: 'Arnav Yadav' }}
          imageHover={{ src: '/assets/hero/helmet.webp', alt: 'Arnav Yadav Racing Helmet' }}
          curl={75}
          circleBoost={0.4}
          texture={0.4}
          shrinkTimeSeconds={2}
          splatRadius={0.11}
          parallax={true}
          parallaxAmount={5}
          parallaxSmoothing={1}
        />
      </div>

      {/* Hero UI Overlay Container - pointer-events: none allows mouse to interact with canvas */}
      <div className="hero-overlay-container">
        
        {/* 1. TOP-LEFT: ARNAV YADAV (Lando Norris Editorial Stacked Typography) */}
        <div
          className="hero-lando-name"
          onClick={() => {
            sound.playF1EngineRev();
          }}
          onMouseEnter={() => sound.playWhoosh()}
          role="banner"
          title="Arnav Yadav // Click to rev Formula 1 engine"
        >
          <h1>
            <span>ARNAV</span>
            <span>YADAV</span>
          </h1>
          <span className="name-badge">
            SYSTEMS & SOFTWARE // DEV #876
          </span>
        </div>

        {/* 2. TOP-CENTER: AY Motorsport Monogram Logo */}
        <div
          className="hero-lando-center-logo"
          onClick={() => {
            sound.playRadioBeep();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onMouseEnter={() => sound.playHover()}
          title="Arnav Yadav Monogram"
        >
          <svg width="42" height="42" viewBox="0 0 100 100" fill="none" style={{ overflow: 'visible' }}>
            <rect width="100" height="100" rx="12" fill="#000000" />
            {/* Aerodynamic AY racing cut emblem */}
            <path
              d="M 24,76 L 46,24 L 56,24 L 42,76 Z"
              fill="#d4ff00"
            />
            <path
              d="M 52,48 L 76,24 L 64,24 L 46,44 Z"
              fill="#ffffff"
            />
            <path
              d="M 49,49 L 76,76 L 65,76 L 44,53 Z"
              fill="#d4ff00"
            />
            {/* Speed streak divider */}
            <line x1="28" y1="58" x2="68" y2="58" stroke="#000000" strokeWidth="4" />
          </svg>
        </div>

        {/* 3. TOP-RIGHT: Store-style Neon Pill Button + Menu Trigger */}
        <div className="hero-lando-actions">
          {/* Sound FX Pill (matching Lando's neon yellow/lime STORE button) */}
          <button
            type="button"
            className={`hero-pill-btn ${soundEnabled ? 'audio-active' : 'audio-muted'}`}
            onClick={handleSoundToggle}
            onMouseEnter={() => sound.playHover()}
            title={soundEnabled ? 'Telemetry Audio Active (Click to Mute)' : 'Telemetry Audio Muted (Click to Enable)'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{soundEnabled ? 'SOUND FX' : 'SOUND OFF'}</span>
            {soundEnabled && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'flex-end',
                  gap: '2px',
                  height: '12px'
                }}
              >
                <span style={{ width: '2px', height: '6px', backgroundColor: '#000', borderRadius: '1px' }} />
                <span style={{ width: '2px', height: '11px', backgroundColor: '#000', borderRadius: '1px' }} />
                <span style={{ width: '2px', height: '8px', backgroundColor: '#000', borderRadius: '1px' }} />
              </span>
            )}
          </button>

          {/* Menu Button (matching Lando's rounded square with 2 horizontal bars) */}
          <button
            type="button"
            className="hero-menu-btn"
            onClick={handleMenuToggle}
            onMouseEnter={() => sound.playHover()}
            aria-label="Toggle navigation menu"
            title="Navigation Menu"
          >
            <span className="menu-bar" style={{ transform: menuOpen ? 'translateY(3.5px) rotate(45deg)' : 'none' }} />
            <span className="menu-bar" style={{ transform: menuOpen ? 'translateY(-3.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>

        {/* 4. LEFT-BOTTOM: Lando Norris Race Badge Card (Mexico GP / Circuits + Wreath + Helmet) */}
        <RaceBadge />

        {/* 5. BOTTOM-CENTER: Explore Projects & LinkedIn Buttons */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 40,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.85rem',
            pointerEvents: 'auto',
            maxWidth: '90vw',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <a
            href="#projects"
            className="btn-primary"
            onClick={() => {
              sound.playGearShift();
              sound.playTelemetryLap();
            }}
            onMouseEnter={() => sound.playHover()}
            style={{
              padding: '0.75rem 1.6rem',
              fontSize: '0.8rem',
              borderRadius: '999px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px var(--accent-glow)'
            }}
          >
            <span>EXPLORE PROJECTS</span>
            <ArrowDown size={15} />
          </a>

          <a
            href="https://www.linkedin.com/in/arnav-yadav-956156334/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            style={{
              padding: '0.75rem 1.4rem',
              fontSize: '0.8rem',
              borderRadius: '999px',
              backgroundColor: 'rgba(10, 10, 14, 0.88)',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              color: '#38bdf8',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
              textDecoration: 'none'
            }}
          >
            <Linkedin size={15} />
            <span>LINKEDIN</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* 6. Slide-Over Flyout Menu (when Top Right Menu Button is clicked) */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 995,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.25s ease'
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              height: '100%',
              backgroundColor: '#0a0a0e',
              borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
              animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'var(--accent-racing)',
                      borderRadius: '50%',
                      boxShadow: '0 0 10px var(--accent-racing)'
                    }}
                  />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.12em' }}>
                    PIT WALL DIRECTORY
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setMenuOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {navLinks.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        onMouseEnter={() => sound.playHover()}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f0f0f5',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.85rem',
                          cursor: 'pointer',
                          padding: '0.6rem 0',
                          width: '100%',
                          textAlign: 'left',
                          transition: 'color 0.2s ease, transform 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = 'var(--accent-racing)';
                          e.currentTarget.style.transform = 'translateX(6px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = '#f0f0f5';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <span style={{ color: 'var(--accent-racing)' }}>{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Menu Footer Controls */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Race Mode Toggle in Menu */}
              {setRaceMode && (
                <button
                  type="button"
                  onClick={() => {
                    sound.playF1EngineRev();
                    setRaceMode((prev) => !prev);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    backgroundColor: raceMode ? 'rgba(212, 255, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    border: raceMode ? '1px solid var(--accent-racing)' : '1px solid rgba(255, 255, 255, 0.12)',
                    color: raceMode ? 'var(--accent-racing)' : '#ffffff',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Zap size={16} />
                    <span>RACE MODE OVERDRIVE</span>
                  </span>
                  <span style={{ fontSize: '0.7rem', color: raceMode ? 'var(--accent-racing)' : '#888' }}>
                    {raceMode ? '[ENGAGED]' : '[STANDBY]'}
                  </span>
                </button>
              )}

              {/* Sound Test / Telemetry Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => sound.playF1EngineRev()}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    cursor: 'pointer'
                  }}
                >
                  ENGINE REV
                </button>
                <button
                  type="button"
                  onClick={() => sound.playRadioBeep()}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    cursor: 'pointer'
                  }}
                >
                  RADIO BEEP
                </button>
              </div>

              {/* Social Channels */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <a
                  href="https://github.com/Arnav876"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem'
                  }}
                >
                  <Github size={15} />
                  <span>GITHUB</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/arnav-yadav-956156334/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: '#38bdf8',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem'
                  }}
                >
                  <Linkedin size={15} />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
