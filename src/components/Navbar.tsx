import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Zap, Github, Menu, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  raceMode: boolean;
  setRaceMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({ raceMode, setRaceMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'projects', 'skills', 'milestones', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const next = sound.toggle();
    setAudioEnabled(next);
  };

  const handleRaceModeToggle = () => {
    sound.playClick();
    setRaceMode(prev => !prev);
  };

  const navLinks = [
    { id: 'hero', label: '01 // TELEMETRY' },
    { id: 'about', label: '02 // BIOGRAPHY' },
    { id: 'projects', label: '03 // PROJECTS' },
    { id: 'skills', label: '04 // PIT-STOP' },
    { id: 'milestones', label: '05 // RACE-LOG' },
    { id: 'contact', label: '06 // CONTACT' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        backgroundColor: scrolled ? 'rgba(7, 7, 9, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
        {/* Brand / Callout */}
        <a
          href="#hero"
          onClick={() => sound.playClick()}
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
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.05em' }}>
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
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                    color: activeSection === link.id ? 'var(--accent-racing)' : 'var(--text-secondary)',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
              backgroundColor: raceMode ? 'var(--accent-racing)' : 'rgba(255, 255, 255, 0.05)',
              color: raceMode ? '#000' : 'var(--text-white)',
              border: raceMode ? '1px solid var(--accent-racing)' : '1px solid var(--border-subtle)',
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
              backgroundColor: audioEnabled ? 'rgba(212, 255, 0, 0.12)' : 'rgba(255, 255, 255, 0.05)',
              color: audioEnabled ? 'var(--accent-racing)' : 'var(--text-muted)',
              border: audioEnabled ? '1px solid var(--accent-racing)' : '1px solid var(--border-subtle)',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

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
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-white)',
              border: '1px solid var(--border-subtle)',
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
              backgroundColor: 'transparent',
              color: 'var(--text-white)',
              border: '1px solid var(--border-subtle)',
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
            backgroundColor: 'rgba(10, 10, 14, 0.98)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1.5rem',
            backdropFilter: 'blur(20px)'
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {navLinks.map(link => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: activeSection === link.id ? 'var(--accent-racing)' : 'var(--text-white)',
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
