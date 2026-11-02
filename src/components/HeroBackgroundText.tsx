import React from 'react';

interface HeroBackgroundTextProps {
  raceMode?: boolean;
}

export const HeroBackgroundText: React.FC<HeroBackgroundTextProps> = ({ raceMode = false }) => {
  // Top ticker content repeated for seamless loop
  const topText = 'I USUALLY JUST SIMPLY COOK';
  const topRepeats = [topText, topText, topText, topText];

  // Bottom ticker tags repeated
  const bottomTags = [
    'REAL-WORLD PROJECTS',
    'PROBLEM SOLVING',
    'WEB DESIGN',
    'AI & AUTOMATION',
    'SYSTEMS ARCHITECTURE',
    'FULL-STACK DEV'
  ];
  const bottomRepeats = [...bottomTags, ...bottomTags];

  const primaryColor = raceMode ? 'rgba(255, 255, 255, 0.09)' : 'rgba(10, 10, 14, 0.065)';
  const secondaryColor = raceMode ? 'rgba(212, 255, 0, 0.16)' : 'rgba(20, 20, 25, 0.085)';
  const dottedColor = raceMode ? 'rgba(212, 255, 0, 0.22)' : 'rgba(0, 0, 0, 0.12)';

  return (
    <div
      className="hero-background-content"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.8rem',
        userSelect: 'none'
      }}
      aria-hidden="true"
    >
      {/* Top Ticker: Large Headline Watermark Marquee */}
      <div
        className="hero-ticker-track-wrapper"
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          whiteSpace: 'nowrap'
        }}
      >
        <div
          className="hero-ticker-track hero-ticker-left"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3rem',
            willChange: 'transform'
          }}
        >
          {topRepeats.map((text, idx) => (
            <span
              key={`top-${idx}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(3.8rem, 10.5vw, 9.5rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: primaryColor,
                display: 'inline-block',
                flexShrink: 0
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Middle Dotted Technical Separator Line */}
      <div
        style={{
          width: '100%',
          height: '2px',
          borderBottom: `2px dotted ${dottedColor}`,
          opacity: 0.75,
          margin: '0.2rem 0'
        }}
      />

      {/* Bottom Ticker: Secondary Skills & Focus Areas Marquee */}
      <div
        className="hero-ticker-track-wrapper"
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          whiteSpace: 'nowrap'
        }}
      >
        <div
          className="hero-ticker-track hero-ticker-right"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2.5rem',
            willChange: 'transform'
          }}
        >
          {bottomRepeats.map((text, idx) => (
            <span
              key={`bot-${idx}`}
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 3.8vw, 3.2rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.015em',
                textTransform: 'uppercase',
                color: secondaryColor,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2.5rem',
                flexShrink: 0
              }}
            >
              <span>{text}</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: raceMode ? 'var(--accent-racing)' : 'rgba(0, 0, 0, 0.25)',
                  transform: 'translateY(-2px)'
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBackgroundText;
