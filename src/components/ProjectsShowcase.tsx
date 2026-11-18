import { useRef } from 'react'
import { gsap } from '../motion/gsap'
import { useGsap } from '../motion/useGsap'

/**
 * Projects showcase — pinned horizontal gallery on the /projects page.
 * Same mechanism as the home Works gallery (pinned ScrollTrigger
 * scrub + progress bar + panel counter), light theme to fit the
 * page. The four panels carry the wide 16:10 browser-window media
 * frames, so a real screenshot or scrolling video drops in later.
 *
 * MEDIA SLOTS — same convention as Works.tsx:
 *   1. Save the file under public/projects/, e.g.
 *        public/projects/sugar-guard.png        (screenshot, 16:10 or wider)
 *        public/projects/sugar-guard.mp4        (scrolling video of the site)
 *   2. Change that project's `media` field below to:
 *        { kind: 'image', src: '/projects/sugar-guard.png', alt: 'Sugar Guard app window' }
 *      or { kind: 'video', src: '/projects/sugar-guard.mp4', poster: '/projects/sugar-guard.png' }
 *   Until then every panel shows the procedural placeholder — clearly
 *   a media slot, not a fake screenshot.
 */
type ProjectMedia =
  | { kind: 'placeholder' }
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; poster?: string }

type ShowcaseProject = {
  index: string
  title: string
  tagline: string
  detail: string
  meta: string
  stack: string[]
  githubUrl: string
  slug: string
  cardId: string
  media: ProjectMedia
}

const PROJECTS: ShowcaseProject[] = [
  {
    index: '01',
    title: 'Sugar Guard',
    tagline: 'AI-Powered Hypoglycaemia Prediction System',
    detail:
      'AI that predicts hypoglycaemic episodes hours ahead from glucose, medication, and lifestyle patterns.',
    meta: '2025 · inCSEption Hackathon · SDG-3',
    stack: ['Python', 'AI/ML', 'Healthcare Tech', 'REST API'],
    githubUrl: 'https://github.com/Arnav876',
    slug: 'sugar-guard',
    cardId: 'sugar-guard',
    media: { kind: 'placeholder' },
  },
  {
    index: '02',
    title: 'Inventory Tracker',
    tagline: 'Retail Stock & Sales Tracker',
    detail:
      'Backend tracking live retail stock, low-stock alerts, and sales analytics.',
    meta: '2025 · Independent Systems Project',
    stack: ['Python', 'SQL', 'REST API', 'Backend Architecture'],
    githubUrl: 'https://github.com/Arnav876',
    slug: 'inventory-tracker',
    cardId: 'inventory-system',
    media: { kind: 'placeholder' },
  },
  {
    index: '03',
    title: 'GrocAI Engine',
    tagline: 'High-Concurrency Ingestion Platform',
    detail:
      'Distributed ingestion platform with live connectors, cached geocoding, and 299 passing tests.',
    meta: '2026 · Full-Stack Monorepo Project',
    stack: ['TypeScript', 'Node.js', 'REST API', 'Vitest'],
    githubUrl: 'https://github.com/Arnav876/GrocAI',
    slug: 'grocai-engine',
    cardId: 'grocai',
    media: { kind: 'placeholder' },
  },
  {
    index: '04',
    title: 'NyayaSetu',
    tagline: 'Undertrial Prisoner Legal Aid & Case Tracker',
    detail:
      'Platform tracking undertrial case hearings and Section 436A bail eligibility for legal aid.',
    meta: '2024 – 2025 · Legal Aid Tech Initiative',
    stack: ['Express.js', 'React 19', 'JWT Authentication', 'REST API'],
    githubUrl: 'https://github.com/Arnav876/NayaSetu',
    slug: 'nyayasetu',
    cardId: 'nyayasetu',
    media: { kind: 'placeholder' },
  },
]

/**
 * Wide browser-window media frame (~16:10). Same frame as the home
 * Works gallery: renders a real image or video when the project's
 * `media` slot is filled, otherwise the procedural placeholder.
 */
function MediaFrame({ project }: { project: ShowcaseProject }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-paper/15 bg-ink text-paper shadow-[0_32px_64px_-32px_rgba(0,0,0,0.7)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-paper/10 bg-paper/[0.04] px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-paper/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-deep/80" />
        </span>
        <span className="truncate rounded-full bg-paper/10 px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-paper/50">
          {project.slug} — preview
        </span>
        <span className="ml-auto hidden font-mono text-[10px] tracking-[0.2em] text-paper/40 uppercase sm:block">
          Preview
        </span>
      </div>

      {/* Media area — 16:10, object-cover so wide screenshots fit */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {project.media.kind === 'image' && (
          <img
            src={project.media.src}
            alt={project.media.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
        {project.media.kind === 'video' && (
          <video
            src={project.media.src}
            poster={project.media.poster}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        {project.media.kind === 'placeholder' && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_10%,rgba(230,195,165,0.38),transparent_55%),radial-gradient(100%_100%_at_85%_90%,rgba(166,124,82,0.42),transparent_52%),#141414]"
          >
            {/* Drifting warm orbs */}
            <span className="absolute top-[12%] left-[14%] h-28 w-28 animate-pulse rounded-full bg-accent/40 blur-3xl md:h-40 md:w-40" />
            <span
              className="absolute right-[10%] bottom-[14%] h-24 w-24 animate-pulse rounded-full bg-accent-deep/50 blur-3xl md:h-36 md:w-36"
              style={{ animationDelay: '1.2s' }}
            />
            <span className="hs-spin-slow absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-paper/20 md:h-56 md:w-56" />
            {/* Ghost index */}
            <span className="absolute -right-2 -bottom-8 font-display text-[8rem] leading-none font-semibold text-paper/[0.07] select-none md:text-[11rem]">
              {project.index}
            </span>
            {/* Media-slot label */}
            <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.25em] text-paper/50 uppercase">
              Project preview · screenshot / video slot
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const fillRef = useRef<HTMLDivElement | null>(null)
  const countRef = useRef<HTMLSpanElement | null>(null)

  useGsap(
    () => {
      const section = sectionRef.current
      const viewport = viewportRef.current
      const track = trackRef.current
      if (!section || !viewport || !track) return

      const panels = Array.from(track.querySelectorAll<HTMLElement>('[data-showcase-panel]'))
      const inners = Array.from(track.querySelectorAll<HTMLElement>('[data-showcase-inner]'))

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // No pin, no scrub — panels stack vertically in normal flow.
        gsap.set(viewport, { height: 'auto' })
        gsap.set(track, { x: 0, width: '100%', flexDirection: 'column' })
        gsap.set(panels, { width: '100%', height: 'auto' })
        gsap.set([fillRef.current, countRef.current], { opacity: 0 })
        gsap.set('[data-showcase-title]', { yPercent: 0 })
        gsap.set('[data-showcase-line]', { opacity: 1, y: 0 })
        gsap.set(inners, { opacity: 1, y: 0 })
        return
      }

      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      gsap.set(fillRef.current, { scaleX: 0 })

      // Title reveal — the display line slides up out of its own mask.
      gsap.fromTo(
        '[data-showcase-title]',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        },
      )

      gsap.fromTo(
        '[data-showcase-line]',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: 'top 80%' },
        },
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(fillRef.current, { scaleX: self.progress })
            if (countRef.current) {
              const current = Math.min(
                PROJECTS.length,
                Math.floor(self.progress * PROJECTS.length) + 1,
              )
              countRef.current.textContent = `0${current} / 0${PROJECTS.length}`
            }
          },
        },
      })

      // The horizontal drive.
      tl.to(track, { x: () => -getDistance(), ease: 'none', duration: 1 }, 0)

      // Panels rise in as they arrive.
      inners.forEach((inner, i) => {
        tl.fromTo(
          inner,
          { y: 48, opacity: 0.4 },
          { y: 0, opacity: 1, ease: 'none', duration: 0.16 },
          0.04 + (i / inners.length) * 0.78,
        )
      })
    },
    sectionRef,
    [],
  )

  return (
    <section
      ref={sectionRef}
      aria-label="Projects showcase — scroll through the work"
      className="relative overflow-hidden bg-paper text-ink"
    >
      <div ref={viewportRef} className="flex h-screen flex-col">
        {/* Header — kicker, giant title, line */}
        <div className="px-5 pt-24 md:px-10 md:pt-28">
          <div className="mx-auto w-full max-w-6xl">
            <p
              data-showcase-line
              className="font-mono text-[11px] tracking-[0.35em] text-ink-soft uppercase"
            >
              Showcase — Scroll to move
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.02em]">
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span data-showcase-title className="block will-change-transform">
                  The work{' '}
                  <span className="font-serif font-normal italic text-accent-deep">
                    in motion
                  </span>
                </span>
              </span>
            </h2>
            <p
              data-showcase-line
              className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
            >
              Four systems — scroll down and the panels slide sideways.
            </p>
          </div>
        </div>

        {/* Horizontal track — becomes a vertical stack under reduced motion */}
        <div className="relative min-h-0 flex-1">
          <div ref={trackRef} className="flex h-full w-max will-change-transform">
            {PROJECTS.map((project) => (
              <article
                key={project.index}
                data-showcase-panel
                className="relative flex h-full w-[92vw] shrink-0 items-center px-5 pb-16 sm:w-[86vw] md:px-10 lg:w-[80vw]"
              >
                <div
                  data-showcase-inner
                  className="relative mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12"
                >
                  {/* Text column */}
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.35em] text-accent-deep uppercase">
                      Project {project.index}
                    </p>
                    <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-ink-soft uppercase">
                      {project.tagline}
                    </p>
                    <h3 className="mt-2 font-display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                      {project.detail}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-ink/15 px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-ink-soft uppercase"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap items-center gap-6">
                      <a
                        href={`#${project.cardId}`}
                        className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-xs font-semibold tracking-wider text-paper uppercase transition-colors hover:bg-accent-deep"
                      >
                        Case Study <span aria-hidden="true">&darr;</span>
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs font-semibold tracking-wider text-ink-soft uppercase transition-colors hover:text-accent-deep"
                      >
                        View GitHub <span aria-hidden="true">&nearr;</span>
                      </a>
                    </div>

                    <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-ink-soft/70 uppercase">
                      {project.meta}
                    </p>
                  </div>

                  {/* Wide media frame */}
                  <MediaFrame project={project} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar + counter — pinned to the bottom of the viewport */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-5 md:px-10 md:pb-6">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6">
          <p className="font-mono text-[11px] tracking-[0.35em] text-ink-soft uppercase">
            Scroll &darr; then &rarr;
          </p>
          <span
            ref={countRef}
            className="font-mono text-[11px] tracking-[0.25em] text-ink-soft"
          >
            01 / 04
          </span>
        </div>
        <div className="mx-auto mt-3 h-px w-full max-w-6xl bg-ink/15">
          <div
            ref={fillRef}
            className="h-full w-full origin-left bg-accent-deep"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </section>
  )
}
