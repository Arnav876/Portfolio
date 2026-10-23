import React from 'react';
import { Calendar } from 'lucide-react';
import { MILESTONES_DATA } from '../data/skills';

export const Milestones: React.FC = () => {
  return (
    <section
      id="milestones"
      style={{
        paddingTop: '6.5rem',
        paddingBottom: '6.5rem',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-line" />
            <span>05 // RACE-LOG & TIMELINE</span>
          </div>
          <h2 className="section-title">
            ENGINEERING MILESTONES & RACE LOG
          </h2>
          <p className="section-desc">
            Chronological trajectory of systems architecture, hackathons, and high-stakes software initiatives.
          </p>
        </div>

        {/* Timeline Container */}
        <div
          style={{
            position: 'relative',
            paddingLeft: '1.5rem',
            borderLeft: '2px dashed var(--border-accent)',
            marginLeft: '0.5rem'
          }}
        >
          {MILESTONES_DATA.map((item, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                marginBottom: '3rem'
              }}
            >
              {/* Timeline Reticle Dot */}
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '-2.15rem',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-black)',
                  border: '2px solid var(--accent-racing)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px var(--accent-racing)'
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-racing)'
                  }}
                />
              </div>

              {/* Milestone Card */}
              <div className="tech-card corner-markers" style={{ padding: '1.75rem' }}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span className="telemetry-chip">{item.tag}</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--accent-racing)',
                        fontWeight: 700
                      }}
                    >
                      {item.role}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <Calendar size={13} />
                    <span>{item.year}</span>
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: 'var(--text-white)',
                    marginBottom: '0.75rem'
                  }}
                >
                  {item.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {item.details}
                </p>

                {/* Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {item.highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-white)'
                      }}
                    >
                      <span style={{ color: 'var(--accent-racing)' }}>▶</span>
                      <span>{h}</span>
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
