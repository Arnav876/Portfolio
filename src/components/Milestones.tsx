import React from 'react';
import { Calendar } from 'lucide-react';
import { MILESTONES_DATA } from '../data/skills';
import { sound } from '../utils/audio';

export const Milestones: React.FC = () => {
  return (
    <section
      id="milestones"
      className="portfolio-section"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-surface)'
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '0.85rem' }}>
          <div className="section-label">
            <span className="section-label-line" />
            <span>03 // RACE-LOG & TIMELINE</span>
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', margin: '0.2rem 0' }}>
            ENGINEERING MILESTONES & RACE LOG
          </h2>
          <p className="section-desc" style={{ fontSize: '0.82rem', margin: 0, lineHeight: 1.35, maxWidth: '850px' }}>
            Chronological trajectory of systems architecture, hackathons, and high-stakes software initiatives.
          </p>
        </div>

        {/* Milestones 2x2 Grid on Desktop / Vertical on Mobile */}
        <div
          className="milestones-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '0.85rem'
          }}
        >
          {MILESTONES_DATA.map((item, idx) => (
            <div
              key={idx}
              className="tech-card corner-markers milestone-card"
              style={{ padding: '1rem 1.15rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playTelemetryLap()}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBottom: '0.45rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="telemetry-chip">{item.tag}</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
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
                      gap: '0.35rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <Calendar size={12} />
                    <span>{item.year}</span>
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: 'var(--text-white)',
                    marginBottom: '0.35rem',
                    lineHeight: 1.2
                  }}
                >
                  {item.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: 1.35, marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>
                  {item.details}
                </p>
              </div>

              {/* Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border-subtle)' }}>
                {item.highlights.map((h, hIdx) => (
                  <div
                    key={hIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-white)'
                    }}
                  >
                    <span style={{ color: 'var(--accent-racing)', fontSize: '0.65rem' }}>▶</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
