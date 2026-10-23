import React from 'react';
import { Cpu, Layout, Server, Layers } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/skills';

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
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '6.5rem',
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
            <span>04 // PIT-STOP & TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="section-title">
            TECHNICAL POWERTRAIN & TELEMETRY
          </h2>
          <p className="section-desc">
            Granular breakdown of languages, engineering environments, frameworks, and architecture patterns
            utilized across my production systems.
          </p>
        </div>

        {/* Sectors Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}
        >
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="tech-card corner-markers"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem'
              }}
            >
              <div>
                {/* Sector Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {getIcon(cat.iconName)}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--accent-racing)'
                      }}
                    >
                      {cat.sector}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--telemetry-green)'
                    }}
                  >
                    CALIBRATED
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--text-white)',
                    marginBottom: '1.5rem'
                  }}
                >
                  {cat.title}
                </h3>

                {/* Skills list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '0.35rem'
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-white)' }}>
                          {skill.name}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-racing)' }}>
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
                          marginBottom: '0.4rem'
                        }}
                      >
                        <div
                          style={{
                            width: `${skill.levelPercent}%`,
                            height: '100%',
                            backgroundColor: 'var(--accent-racing)',
                            boxShadow: '0 0 8px var(--accent-racing)',
                            borderRadius: '2px'
                          }}
                        />
                      </div>

                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
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
