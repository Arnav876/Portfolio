import React, { useState } from 'react';
import { Github, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { sound } from '../utils/audio';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['ALL', 'Civic & Systems', 'Full-Stack Web', 'AI & Optimization'];

  const filteredProjects = selectedCategory === 'ALL'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  return (
    <section
      id="projects"
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
            <span>01 // FEATURED TELEMETRY & REPOSITORIES</span>
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', margin: '0.2rem 0' }}>
            ENGINEERED SYSTEMS & REPOSITORIES
          </h2>
          <p className="section-desc" style={{ fontSize: '0.82rem', margin: 0, lineHeight: 1.35, maxWidth: '850px' }}>
            Production-grade platforms and open-source systems built with uncompromising performance,
            deterministic mathematical truth, and real-world civic impact.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div
          className="projects-filter-tabs"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '0.85rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '0.6rem'
          }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                sound.playGearShift();
                setSelectedCategory(cat);
              }}
              onMouseEnter={() => sound.playHover()}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '0.35rem 0.75rem',
                borderRadius: '2px',
                border: selectedCategory === cat ? '1px solid var(--accent-racing)' : '1px solid var(--border-subtle)',
                backgroundColor: selectedCategory === cat ? 'var(--accent-racing)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedCategory === cat ? '#000' : 'var(--text-white)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat === 'ALL' ? `ALL SECTORS [0${PROJECTS_DATA.length}]` : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1rem'
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="tech-card corner-markers project-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.15rem',
                position: 'relative'
              }}
            >
              {/* Card Top: Sector & Badge */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.65rem'
                  }}
                >
                  <span className="telemetry-chip">{project.badge}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {project.telemetrySector}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--text-white)',
                    marginBottom: '0.2rem',
                    lineHeight: 1.2
                  }}
                >
                  {project.title}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent-racing)',
                    marginBottom: '0.45rem',
                    fontWeight: 600
                  }}
                >
                  {project.subtitle}
                </div>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    lineHeight: 1.4,
                    marginBottom: '0.65rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {project.tagline}
                </p>

                {/* Invariants snippet */}
                <div
                  style={{
                    marginBottom: '0.65rem',
                    padding: '0.5rem 0.65rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.25rem'
                    }}
                  >
                    Key Architectural Rule:
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-white)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <CheckCircle2 size={12} color="var(--accent-racing)" style={{ flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.keyInvariants[0]}</span>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.35rem',
                    marginBottom: '0.85rem'
                  }}
                >
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        padding: '0.15rem 0.45rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '2px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Metric Strip & Actions */}
              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.4rem',
                    paddingTop: '0.65rem',
                    borderTop: '1px solid var(--border-subtle)',
                    marginBottom: '0.85rem'
                  }}
                >
                  {project.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)' }}>
                        {m.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-white)' }}>
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <button
                    onClick={() => {
                      sound.playTelemetryLap();
                      setActiveModalProject(project);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center', padding: '0.5rem 0.75rem', fontSize: '0.72rem' }}
                  >
                    <Layers size={13} />
                    <span>DEEP DIVE</span>
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playDrsBeep()}
                    onMouseEnter={() => sound.playHover()}
                    className="btn-secondary"
                    title={`View ${project.title} on GitHub`}
                    style={{ padding: '0.5rem 0.75rem' }}
                  >
                    <Github size={14} />
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Dive Inspection Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
