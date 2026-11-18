import { useState, useRef } from 'react'
import { Link } from '../router'
import { useGsap } from '../motion/useGsap'
import { gsap } from '../motion/gsap'
import ProjectsShowcase from '../components/ProjectsShowcase'
import VerticalBars from '../components/VerticalBars'

type ProjectCategory = 'all' | 'ai' | 'backend' | 'distributed'

interface ProjectDetail {
  id: string
  index: string
  title: string
  subtitle: string
  category: ProjectCategory
  categoryLabel: string
  timeline: string
  origin: string
  overview: string
  stack: string[]
  githubUrl: string
}

const PROJECTS: ProjectDetail[] = [
  {
    id: 'sugar-guard',
    index: '01',
    title: 'Sugar Guard',
    subtitle: 'AI-Powered Hypoglycaemia Prediction System',
    category: 'ai',
    categoryLabel: 'AI / ML & Healthcare Tech',
    timeline: '2025',
    origin: 'inCSEption Hackathon · SDG-3 (Good Health & Well-Being)',
    overview:
      'AI that predicts hypoglycaemic episodes hours ahead from glucose, medication, and lifestyle patterns.',
    stack: ['Python', 'AI/ML', 'Healthcare Tech', 'Predictive Pipelines', 'REST API', 'SDG-3'],
    githubUrl: 'https://github.com/Arnav876',
  },
  {
    id: 'inventory-system',
    index: '02',
    title: 'Inventory Management System',
    subtitle: 'Retail Stock & Sales Tracker',
    category: 'backend',
    categoryLabel: 'Backend & Database Architecture',
    timeline: '2025',
    origin: 'Independent Systems Project',
    overview:
      'Backend tracking live retail stock, low-stock alerts, and sales analytics.',
    stack: ['Python', 'SQL', 'Relational Schemas', 'Query Optimization', 'REST API', 'Backend Architecture'],
    githubUrl: 'https://github.com/Arnav876',
  },
  {
    id: 'grocai',
    index: '03',
    title: 'GrocAI Data Platform',
    subtitle: 'High-Concurrency Quick-Commerce Ingestion Engine',
    category: 'distributed',
    categoryLabel: 'Distributed Systems & Ingestion',
    timeline: '2026',
    origin: 'Full-Stack Monorepo Project',
    overview:
      'High-throughput ingestion engine tracking live catalog prices and stock across quick-commerce platforms.',
    stack: ['TypeScript', 'Node.js', 'Monorepo Workspaces', 'REST API', 'Vitest', 'Fastify / Express'],
    githubUrl: 'https://github.com/Arnav876/GrocAI',
  },
  {
    id: 'nyayasetu',
    index: '04',
    title: 'NyayaSetu',
    subtitle: 'Undertrial Prisoner Legal Aid & Case Tracker',
    category: 'backend',
    categoryLabel: 'Full-Stack Legal Technology',
    timeline: '2024 – 2025',
    origin: 'Legal Aid Tech Initiative',
    overview:
      'Platform tracking undertrial case hearings and Section 436A bail eligibility for legal aid.',
    stack: ['Express.js', 'React 19', 'JWT Authentication', 'Recharts', 'Tailwind CSS', 'REST API'],
    githubUrl: 'https://github.com/Arnav876/NayaSetu',
  },
]

const TABS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects (4)' },
  { id: 'ai', label: 'AI & Healthcare' },
  { id: 'backend', label: 'Backend & Databases' },
  { id: 'distributed', label: 'Distributed & Monorepos' },
]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('all')
  const pageRef = useRef<HTMLElement | null>(null)

  const filteredProjects = activeTab === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeTab)

  useGsap(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-proj-reveal]', { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        '[data-proj-reveal]',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
        },
      )
    },
    pageRef,
    [activeTab],
  )

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-paper font-body text-ink selection:bg-accent selection:text-ink"
    >
      {/* Top Fixed Navigation */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Projects Navigation"
          className="flex items-center gap-2 rounded-full border border-ink/15 bg-paper/90 px-4 py-2 shadow-[0_8px_30px_rgb(10_10_10/0.12)] backdrop-blur-md"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 font-display text-sm font-semibold tracking-tight text-ink transition-colors hover:text-accent-deep"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Home</span>
          </Link>

          <span className="h-4 w-px bg-ink/20" />

          <a
            href="/Arnav_Yadav_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink/20 px-3 py-1 text-xs font-medium text-ink transition-colors hover:border-accent-deep hover:text-accent-deep sm:text-sm"
          >
            Resume ↗
          </a>

          <Link
            href="/#contact"
            className="rounded-full bg-ink px-3.5 py-1 text-xs font-medium text-paper transition-colors hover:bg-accent-deep sm:text-sm"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero / Header Section */}
      <section className="relative px-5 pt-32 pb-16 md:px-10 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div data-proj-reveal className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.35em] text-accent-deep uppercase">
              03 &bull; Case Studies &amp; Architectures
            </span>
            <span className="h-px flex-1 bg-ink/15" />
          </div>

          <h1
            data-proj-reveal
            className="mt-6 font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.02em]"
          >
            Selected{' '}
            <span className="font-serif font-normal italic text-accent-deep">
              Projects
            </span>
            .
          </h1>

          <p
            data-proj-reveal
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-xl"
          >
            Built on first principles, from the problem to the proof — predictive AI,
            retail backends, and high-throughput data platforms.
          </p>

          {/* Category Tabs */}
          <div data-proj-reveal className="mt-12 flex flex-wrap items-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-ink text-paper shadow-md'
                    : 'border border-ink/15 bg-paper text-ink-soft hover:border-ink/40 hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal showcase — the four projects, sliding sideways */}
      <ProjectsShowcase />

      {/* Vertical bars — left content in, right bars in opposite directions */}
      <VerticalBars />

      {/* Projects List — one short card per project */}
      <section className="px-5 pb-32 md:px-10">
        <div className="mx-auto max-w-6xl space-y-6 md:space-y-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              data-proj-reveal
              id={project.id}
              className="relative overflow-hidden rounded-3xl border border-ink/15 bg-paper-2/20 p-6 md:p-10 shadow-sm transition-all duration-300 hover:border-accent-deep/40 hover:shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold tracking-[0.25em] text-accent-deep">
                    PROJECT {project.index}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-deep" />
                  <span className="font-mono text-xs tracking-wider text-ink-soft uppercase">
                    {project.timeline}
                  </span>
                  <span className="rounded-full border border-ink/15 bg-paper px-3 py-1 font-mono text-[11px] tracking-wider text-ink-soft uppercase">
                    {project.categoryLabel}
                  </span>
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-paper transition-all hover:bg-accent-deep hover:shadow-lg"
                >
                  <span>View GitHub</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

              <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-5xl">
                {project.title}
              </h2>
              <p className="mt-2 font-serif text-lg italic text-accent-deep md:text-xl">
                {project.subtitle}
              </p>
              <p className="mt-1 font-mono text-xs text-ink-soft">
                {project.origin}
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft md:text-lg">
                {project.overview}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-ink/15 bg-paper px-3 py-1 font-mono text-xs text-ink shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA / Return Home */}
      <section className="border-t border-ink/15 bg-dark px-5 py-20 text-paper md:px-10">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-mono text-[11px] tracking-[0.35em] text-accent uppercase">
            Let&apos;s Build Together
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            Interested in backend collaboration or opportunities?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-paper/70 md:text-base">
            Feel free to reach out for backend internships, software engineering roles, or hackathons.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:arnavyadav782006@gmail.com"
              className="rounded-full bg-accent-deep px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-paper transition-all hover:bg-accent hover:text-ink"
            >
              Email Arnav &rarr;
            </a>
            <Link
              href="/"
              className="rounded-full border border-paper/30 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-paper transition-all hover:bg-paper hover:text-ink"
            >
              &larr; Return to Home
            </Link>
          </div>

          <div className="mt-16 border-t border-paper/10 pt-8 font-mono text-[11px] text-paper/50">
            &copy; 2026 Arnav Yadav &bull; BMS Institute of Technology &amp; Management, Bangalore
          </div>
        </div>
      </section>
    </main>
  )
}
