import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Zap, Github, Linkedin, Menu, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  raceMode: boolean;
  setRaceMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({ raceMode, setRaceMode }) => {
  const [visible, setVisible] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(sound.enabled);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');

  useEffect(() => {
    const unsub = sound.subscribe((enabled) => {
      setAudioEnabled(enabled);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Exiting the front page: slide in smoothly once user scrolls down
      const isPastFrontPage = window.scrollY > 40;
      setVisible(isPastFrontPage);

      const step = window.innerHeight;
      const scrollY = window.scrollY;

      if (scrollY < step * 0.5) {
        setActiveSection('');
      } else if (scrollY < step * 1.5) {
        setActiveSection('projects');
      } else if (scrollY < step * 2.5) {
        setActiveSection('skills');
      } else if (scrollY < step * 3.5) {
        setActiveSection('milestones');
      } else {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const next = sound.toggle();
    setAudioEnabled(next);
  };

  const handleRaceModeToggle = () => {
    sound.playF1EngineRev();
    setRaceMode(prev => !prev);
  };

  const navLinks = [
    { id: 'projects', label: '01 // PROJECTS' },
    { id: 'skills', label: '02 // PIT-STOP' },
    { id: 'milestones', label: '03 // RACE-LOG' },
    { id: 'contact', label: '04 // CONTACT' }
  ];

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    sound.playGearShift();
    setMobileMenuOpen(false);

    const sectionIndexMap: Record<string, number> = {
      projects: 1,
      skills: 2,
      milestones: 3,
      contact: 4
    };

    const idx = sectionIndexMap[sectionId];
    if (idx !== undefined && window.innerWidth >= 769) {
      window.dispatchEvent(new CustomEvent('portfolio-navigate', { detail: { index: idx } }));
      const targetScroll = window.innerHeight * idx;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(7, 7, 10, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
        {/* Brand / Callout */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            sound.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              backgroundColor: 'var(--accent-racing)',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              borderRadius: '2px',
              boxShadow: '0 0 15px var(--accent-glow-strong)'
            }}
          >
            AY
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.05em', color: '#ffffff' }}>
              ARNAV YADAV
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-racing)', letterSpacing: '0.12em' }}>
              DEV_ID: 876 // MOTORSPORT ED.
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'none' }} className="desktop-nav">
          <ul style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', listStyle: 'none' }}>
            {navLinks.map(link => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                    color: activeSection === link.id ? 'var(--accent-racing)' : '#d0d4dc',
                    position: 'relative',
                    padding: '0.4rem 0',
                    transition: 'color var(--transition-fast)'
                  }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--accent-racing)',
                        boxShadow: '0 0 8px var(--accent-racing)'
                      }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Race Mode Toggle */}
          <button
            onClick={handleRaceModeToggle}
            title={raceMode ? 'Disable Overdrive Race Mode' : 'Enable Overdrive Race Mode'}
            aria-label="Toggle Race Mode"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.75rem',
              backgroundColor: raceMode ? 'var(--accent-racing)' : 'rgba(255, 255, 255, 0.08)',
              color: raceMode ? '#000' : '#ffffff',
              border: raceMode ? '1px solid var(--accent-racing)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Zap size={13} fill={raceMode ? '#000' : 'none'} />
            <span className="hide-on-mobile">{raceMode ? 'OVERDRIVE ON' : 'RACE MODE'}</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            title={audioEnabled ? 'Mute Telemetry Audio FX' : 'Enable Telemetry Audio FX'}
            aria-label="Toggle Telemetry Audio"
            style={{
              width: '34px',
              height: '34px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: audioEnabled ? 'rgba(212, 255, 0, 0.15)' : 'rgba(255, 255, 255, 0.08)',
              color: audioEnabled ? 'var(--accent-racing)' : '#d0d4dc',
              border: audioEnabled ? '1px solid var(--accent-racing)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* LinkedIn Icon Link */}
          <a
            href="https://www.linkedin.com/in/arnav-yadav-956156334/"
            target="_blank"
            rel="noopener noreferrer"
            title="Arnav Yadav on LinkedIn"
            aria-label="LinkedIn Profile"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            style={{
              width: '34px',
              height: '34px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '2px',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Linkedin size={16} />
          </a>

          {/* GitHub Icon Link */}
          <a
            href="https://github.com/Arnav876"
            target="_blank"
            rel="noopener noreferrer"
            title="Arnav Yadav on GitHub"
            aria-label="GitHub Profile"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            style={{
              width: '34px',
              height: '34px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Github size={16} />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle Navigation Menu"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
            className="mobile-hamburger"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'rgba(9, 9, 13, 0.98)',
            borderBottom: '1px solid var(--border-accent)',
            padding: '1.5rem',
            backdropFilter: 'blur(20px)'
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {navLinks.map(link => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: activeSection === link.id ? 'var(--accent-racing)' : '#ffffff',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '0.5rem 0'
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Socials */}
          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <a
              href="https://www.linkedin.com/in/arnav-yadav-956156334/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.6rem',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                borderRadius: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <Linkedin size={16} />
              <span>LINKEDIN</span>
            </a>
            <a
              href="https://github.com/Arnav876"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.6rem',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <Github size={16} />
              <span>GITHUB</span>
            </a>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .hide-on-mobile {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
