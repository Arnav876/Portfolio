import React from 'react';
import { Cpu, Layout, Server, Layers } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/skills';
import { sound } from '../utils/audio';

export const Skills: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu size={18} color="var(--accent-racing)" />;
      case 'Layout':
        return <Layout size={18} color="var(--accent-racing)" />;
      case 'Server':
        return <Server size={18} color="var(--accent-racing)" />;
      case 'Layers':
      default:
        return <Layers size={18} color="var(--accent-racing)" />;
    }
  };

  return (
    <section
      id="skills"
      className="portfolio-section"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-surface)'
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '1.15rem' }}>
          <div className="section-label">
            <span className="section-label-line" />
            <span>02 // PIT-STOP & TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.05rem)', margin: '0.25rem 0' }}>
            TECHNICAL POWERTRAIN & TELEMETRY
          </h2>
          <p className="section-desc" style={{ fontSize: '0.88rem', margin: 0, lineHeight: 1.4, maxWidth: '900px' }}>
            Granular breakdown of languages, engineering environments, frameworks, and architecture patterns
            utilized across my production systems.
          </p>
        </div>

        {/* Sectors Grid */}
        <div
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="tech-card corner-markers skill-card"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playTelemetryScan()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem 1.6rem',
                cursor: 'pointer'
              }}
            >
              <div>
                {/* Sector Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.85rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '0.65rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {getIcon(cat.iconName)}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        color: 'var(--accent-racing)'
                      }}
                    >
                      {cat.sector}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--telemetry-green)'
                    }}
                  >
                    CALIBRATED
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.28rem',
                    fontWeight: 800,
                    color: 'var(--text-white)',
                    marginBottom: '1.15rem',
                    lineHeight: 1.25
                  }}
                >
                  {cat.title}
                </h3>

                {/* Skills list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '0.28rem'
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-white)' }}>
                          {skill.name}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-racing)' }}>
                          {skill.level}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div
                        style={{
                          width: '100%',
                          height: '4px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          borderRadius: '2px',
                          overflow: 'hidden',
                          marginBottom: '0.32rem'
                        }}
                      >
                        <div
                          style={{
                            width: `${skill.levelPercent}%`,
                            height: '100%',
                            backgroundColor: 'var(--accent-racing)',
                            boxShadow: '0 0 10px rgba(212, 255, 0, 0.4)',
                            borderRadius: '2px'
                          }}
                        />
                      </div>

                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.35, margin: 0 }}>
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
