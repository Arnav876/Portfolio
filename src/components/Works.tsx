import { useRef } from 'react'
import { gsap } from '../motion/gsap'
import { useGsap } from '../motion/useGsap'
import { Link } from '../router'

/**
 * Scene 3 — Selected Work, pinned horizontal gallery.
 * Vertical scrolling drives the four project panels sideways across
 * the viewport (same mechanism as the "Sideways" section: pinned
 * ScrollTrigger scrub + progress bar + panel counter), but with its
 * own design: a giant section title, one wide browser-window media
 * frame per project, and Arnav's palette only. No lime, no coral,
 * nothing borrowed from the reference site — mechanism only.
 *
 * MEDIA SLOTS — a real screenshot or scrolling video drops in later:
 *   1. Save the file under public/projects/, e.g.
 *        public/projects/sugar-guard.png        (screenshot, 16:10 or wider)
 *        public/projects/sugar-guard.mp4        (scrolling video of the site)
 *   2. Change that project's `media` field below to:
 *        { kind: 'image', src: '/projects/sugar-guard.png', alt: 'Sugar Guard app window' }
 *      or { kind: 'video', src: '/projects/sugar-guard.mp4', poster: '/projects/sugar-guard.png' }
 *   The frame is 16:10 and crops with object-cover, so any wide
 *   screenshot of the project window fits. Until then every panel
 *   shows a procedural placeholder (warm gradient + orbs, palette
 *   only) — clearly a media slot, not a fake screenshot.
 */
type ProjectMedia =
  | { kind: 'placeholder' }
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; poster?: string }

type Project = {
  index: string
  title: string
  tagline: string
  detail: string
  meta: string
  stack: string[]
  githubUrl: string
  slug: string
  media: ProjectMedia
}

const PROJECTS: Project[] = [
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
    media: { kind: 'placeholder' },
  },
]

/**
 * Wide browser-window media frame (~16:10). Renders a real image or
 * video when the project's `media` slot is filled, otherwise a
 * procedural placeholder in the palette — never a fake screenshot.
 */
function MediaFrame({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-paper/15 bg-ink shadow-[0_32px_64px_-32px_rgba(0,0,0,0.7)]">
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

export default function Works() {
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

      const panels = Array.from(track.querySelectorAll<HTMLElement>('[data-works-panel]'))
      const inners = Array.from(track.querySelectorAll<HTMLElement>('[data-panel-inner]'))

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // No pin, no scrub — panels stack vertically in normal flow.
        gsap.set(viewport, { height: 'auto' })
        gsap.set(track, { x: 0, width: '100%', flexDirection: 'column' })
        gsap.set(panels, { width: '100%', height: 'auto' })
        gsap.set([fillRef.current, countRef.current], { opacity: 0 })
        gsap.set('[data-works-title]', { yPercent: 0 })
        gsap.set('[data-works-line]', { opacity: 1, y: 0 })
        gsap.set(inners, { opacity: 1, y: 0 })
        return
      }

      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      gsap.set(fillRef.current, { scaleX: 0 })

      // Title reveal — the display line slides up out of its own mask.
      gsap.fromTo(
        '[data-works-title]',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        },
      )

      gsap.fromTo(
        '[data-works-line]',
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

  /**
   * Cursor sheen on project panels — the beige radial glow follows the
   * pointer (CSS vars --mx / --my). No mouse-follow tilt: tilt fights
   * the horizontal motion, so it was intentionally removed here.
   */
  const handlePanelSheen = (event: React.MouseEvent<HTMLElement>) => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return
    }
    const panel = event.currentTarget
    const rect = panel.getBoundingClientRect()
    panel.style.setProperty('--mx', `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`)
    panel.style.setProperty('--my', `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`)
  }

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        aria-label="Selected work by Arnav Yadav"
        className="relative overflow-hidden bg-dark text-paper"
      >
        <div ref={viewportRef} className="flex h-screen flex-col">
          {/* Header — giant title, kicker, first-principles line */}
          <div className="px-5 pt-20 md:px-10 md:pt-24">
            <div className="mx-auto w-full max-w-6xl">
              <p
                data-works-line
                className="font-mono text-[11px] tracking-[0.35em] text-paper/50 uppercase"
              >
                03 — Selected Work
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.02em]">
                <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                  <span data-works-title className="block will-change-transform">
                    Selected{' '}
                    <span className="font-serif font-normal italic text-accent">work</span>
                  </span>
                </span>
              </h2>
              <p
                data-works-line
                className="mt-4 max-w-xl text-base leading-relaxed text-paper/70 md:text-lg"
              >
                Built on first principles, from a blank file to production.
              </p>
            </div>
          </div>

          {/* Horizontal track — becomes a vertical stack under reduced motion */}
          <div className="relative min-h-0 flex-1">
            <div ref={trackRef} className="flex h-full w-max will-change-transform">
              {PROJECTS.map((project) => (
                <article
                  key={project.index}
                  data-works-panel
                  onMouseMove={handlePanelSheen}
                  className="group relative flex h-full w-[92vw] shrink-0 items-center px-5 pb-16 sm:w-[86vw] md:px-10 lg:w-[80vw]"
                >
                  {/* Cursor sheen — beige glow, no tilt */}
                  <div
                    aria-hidden="true"
                    className="works-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div
                    data-panel-inner
                    className="relative mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12"
                  >
                    {/* Text column */}
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.35em] text-accent uppercase">
                        Project {project.index}
                      </p>
                      <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-paper/50 uppercase">
                        {project.tagline}
                      </p>
                      <h3 className="mt-2 font-display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
                        {project.title}
                      </h3>
                      <p className="mt-4 max-w-md text-base leading-relaxed text-paper/70">
                        {project.detail}
                      </p>

                      <ul className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-paper/20 px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-paper/70 uppercase"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 flex flex-wrap items-center gap-6">
                        <Link
                          href="/projects"
                          className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-5 py-2.5 font-mono text-xs font-semibold tracking-wider text-paper uppercase transition-colors hover:bg-accent hover:text-ink"
                        >
                          Case Study <span aria-hidden="true">&rarr;</span>
                        </Link>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs font-semibold tracking-wider text-paper/60 uppercase transition-colors hover:text-accent"
                        >
                          View GitHub <span aria-hidden="true">&nearr;</span>
                        </a>
                      </div>

                      <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-paper/40 uppercase">
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
            <p className="font-mono text-[11px] tracking-[0.35em] text-paper/50 uppercase">
              Scroll &darr; then &rarr;
            </p>
            <span
              ref={countRef}
              className="font-mono text-[11px] tracking-[0.25em] text-paper/50"
            >
              01 / 04
            </span>
          </div>
          <div className="mx-auto mt-3 h-px w-full max-w-6xl bg-paper/15">
            <div
              ref={fillRef}
              className="h-full w-full origin-left bg-accent"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </section>

      {/* Closing strip — stats + link to the dedicated projects page */}
      <div className="border-t border-paper/15 bg-dark px-5 py-10 text-paper md:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-[11px] tracking-[0.2em] text-paper/50 uppercase">
            4 systems built &bull; 299 automated test cases &bull; normalized architectures
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-5 py-2.5 font-mono text-xs font-semibold tracking-wider text-paper uppercase shadow-md transition-colors hover:bg-accent hover:text-ink"
          >
            <span>Open Dedicated Projects Page</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </>
  )
}
