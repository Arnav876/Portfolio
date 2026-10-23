import React, { useState } from 'react';
import { Github, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { sound } from '../utils/audio';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['ALL', 'AI & Optimization', 'Civic & Systems', 'Full-Stack Web'];

  const filteredProjects = selectedCategory === 'ALL'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  return (
    <section
      id="projects"
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
            <span>03 // FEATURED TELEMETRY & REPOSITORIES</span>
          </div>
          <h2 className="section-title">
            ENGINEERED SYSTEMS & REPOSITORIES
          </h2>
          <p className="section-desc">
            Production-grade platforms and open-source systems built with uncompromising performance,
            deterministic mathematical truth, and real-world civic impact.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1.25rem'
          }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={() => sound.playHover()}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.5rem 1rem',
                borderRadius: '2px',
                border: selectedCategory === cat ? '1px solid var(--accent-racing)' : '1px solid var(--border-subtle)',
                backgroundColor: selectedCategory === cat ? 'var(--accent-racing)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedCategory === cat ? '#000' : 'var(--text-white)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat === 'ALL' ? 'ALL SECTORS [06]' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="tech-card corner-markers"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem',
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
                    marginBottom: '1.25rem'
                  }}
                >
                  <span className="telemetry-chip">{project.badge}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
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
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: 'var(--text-white)',
                    marginBottom: '0.35rem',
                    lineHeight: 1.2
                  }}
                >
                  {project.title}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--accent-racing)',
                    marginBottom: '1rem',
                    fontWeight: 600
                  }}
                >
                  {project.subtitle}
                </div>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}
                >
                  {project.tagline}
                </p>

                {/* Invariants snippet */}
                <div
                  style={{
                    marginBottom: '1.5rem',
                    padding: '0.85rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Key Architectural Rule:
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-white)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <CheckCircle2 size={13} color="var(--accent-racing)" style={{ flexShrink: 0 }} />
                    <span>{project.keyInvariants[0]}</span>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '1.75rem'
                  }}
                >
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.55rem',
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
                    gap: '0.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-subtle)',
                    marginBottom: '1.25rem'
                  }}
                >
                  {project.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                        {m.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-white)' }}>
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveModalProject(project);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center', padding: '0.7rem 1rem', fontSize: '0.75rem' }}
                  >
                    <Layers size={14} />
                    <span>DEEP DIVE</span>
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="btn-secondary"
                    title={`View ${project.title} on GitHub`}
                    style={{ padding: '0.7rem 0.9rem' }}
                  >
                    <Github size={15} />
                    <ArrowUpRight size={13} />
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
