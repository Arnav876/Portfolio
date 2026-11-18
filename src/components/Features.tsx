import { useEffect, useRef } from 'react'
import { gsap } from '../motion/gsap'
import { useGsap } from '../motion/useGsap'
import { useMaskHover } from './useMaskHover'

/**
 * Features — bento grid (after the Works section, before the horizontal section).
 * Tiles about Arnav's own skills and stack: backend systems,
 * languages, databases, CS fundamentals, tools & DevOps — plus a
 * dark "Currently Building" tile filling the bottom-right cell.
 * The large tile's visual is a procedural canvas (flowing
 * gradient orbs, drawn in code — no images or video). The
 * bottom-right tile reuses the same canvas with the same orb
 * parameters; both canvases are driven by the shared rAF clock,
 * so their orbs drift in lockstep and the two dark areas rhyme.
 * Tiles reveal with a scroll-triggered clip-path wipe; hovering a
 * tile tilts it slightly (pointer devices only, never under
 * prefers-reduced-motion). Each tile also has a mask hover: a
 * warmer, brighter second layer revealed only inside a circular
 * mask that trails the cursor with lag (see useMaskHover).
 */

type Tile = {
  index: string
  title: string
  detail: string
  visual: 'canvas' | 'type' | 'cube' | 'scroll' | 'access'
  span: string
  dark?: boolean
  /** Small pill shown top-right on dark tiles (e.g. "Now"). */
  chip?: string
}

const TILES: Tile[] = [
  {
    index: '01',
    title: 'Backend & Systems',
    detail:
      'REST API design, modular service layers, and real-time backend systems built with Express.js, Node.js, and Python. Clean separation across ingestion, business logic, and reporting.',
    visual: 'canvas',
    span: 'sm:col-span-2 sm:row-span-2',
    dark: true,
    chip: 'Backend Architecture',
  },
  {
    index: '02',
    title: 'Languages',
    detail: 'Python, C, C++, Java, and TypeScript/HTML — from low-level memory & OOP rigor to rapid modern web delivery.',
    visual: 'type',
    span: '',
  },
  {
    index: '03',
    title: 'Databases & Schemas',
    detail: 'Relational schema design, normalization, query optimization in SQL, with active hands-on learning in MongoDB and Redis.',
    visual: 'cube',
    span: '',
  },
  {
    index: '04',
    title: 'CS Fundamentals',
    detail: 'Firm foundations in Data Structures & Algorithms, OOP principles, DBMS, System Design, and Concurrency basics.',
    visual: 'scroll',
    span: '',
  },
  {
    index: '05',
    title: 'Tools & DevOps',
    detail: 'Git, GitHub, Postman, Linux CLI, Docker (learning), VS Code, API testing suites, and methodical debugging.',
    visual: 'access',
    span: '',
  },
  {
    index: '06',
    title: 'Currently Building',
    detail: 'The Echo Balancer — a self-balancing bike for cave navigation — and the next iteration of this very portfolio.',
    visual: 'canvas',
    span: '',
    dark: true,
    chip: 'Now',
  },
]

/** Procedural canvas: three gradient orbs drifting on sine paths. */
function MotionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
    }
    resize()
    window.addEventListener('resize', resize)

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !reduced) {
          cancelAnimationFrame(raf)
          raf = requestAnimationFrame(draw)
        }
      },
      { threshold: 0.05 },
    )
    observer.observe(canvas)

    const orbs = [
      { r: 0.34, speed: 0.00021, phase: 0, color: '230, 195, 165' },
      { r: 0.26, speed: 0.00016, phase: 2.1, color: '245, 233, 220' },
      { r: 0.2, speed: 0.00027, phase: 4.2, color: '166, 124, 82' },
    ]

    const drawFrame = (time: number) => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)
      for (const orb of orbs) {
        const x =
          width * 0.5 +
          Math.sin(time * orb.speed + orb.phase) * width * 0.28
        const y =
          height * 0.5 +
          Math.cos(time * orb.speed * 1.3 + orb.phase) * height * 0.26
        const radius = Math.max(width, height) * orb.r
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `rgba(${orb.color}, 0.85)`)
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      }
    }

    const draw = (time: number) => {
      drawFrame(time)
      if (visible && !reduced) raf = requestAnimationFrame(draw)
    }

    if (reduced) {
      // One static frame — no animation under reduced motion.
      drawFrame(1200)
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  )
}

function TileVisual({ visual }: { visual: Tile['visual'] }) {
  switch (visual) {
    case 'canvas':
      return <MotionCanvas />
    case 'type':
      return (
        <div aria-hidden="true" className="flex items-end gap-2">
          <span className="font-display text-5xl leading-none font-semibold">
            Py/C++
          </span>
          <span className="font-serif text-xl italic text-accent-deep">Java·TS</span>
        </div>
      )
    case 'cube':
      return (
        <div aria-hidden="true" className="flex items-center justify-center py-4">
          <div className="[transform-style:preserve-3d] [animation:spin-cube_9s_linear_infinite] motion-reduce:[animation:none]">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <path
                d="M36 4 68 20v32L36 68 4 52V20L36 4Z"
                stroke="#A67C52"
                strokeWidth="1.5"
              />
              <path d="M36 4v32m0 0L4 20m32 16 32-16M36 36v32" stroke="#0a0a0a" strokeOpacity="0.35" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      )
    case 'scroll':
      return (
        <div aria-hidden="true" className="relative h-10 overflow-hidden">
          <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-ink/20" />
          <div className="absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full bg-accent-deep [animation:scroll-dot_2.4s_ease-in-out_infinite_alternate] motion-reduce:[animation:none]" />
        </div>
      )
    case 'access':
      return (
        <div aria-hidden="true" className="flex items-center gap-2 py-2">
          <span className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[11px] tracking-[0.2em] uppercase">
            Git &bull; Postman
          </span>
          <span className="rounded-full bg-ink px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-paper uppercase">
            Docker &bull; Linux
          </span>
        </div>
      )
  }
}

export default function Features() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGsap(
    () => {
      const section = sectionRef.current
      if (!section) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-features-line]', { opacity: 1, y: 0 })
        gsap.set('[data-features-title]', { yPercent: 0 })
        gsap.set('[data-features-tile]', {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0% round 24px)',
        })
        return
      }

      // Title reveal — the display line slides up out of its own mask.
      gsap.fromTo(
        '[data-features-title]',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        },
      )

      gsap.fromTo(
        '[data-features-line]',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: 'top 75%' },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-features-tile]').forEach((tile, i) => {
        gsap.fromTo(
          tile,
          {
            opacity: 0,
            y: 48,
            clipPath: 'inset(12% 10% 12% 10% round 24px)',
          },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            duration: 0.9,
            ease: 'power3.out',
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: tile, start: 'top 88%' },
          },
        )
      })
    },
    sectionRef,
    [],
  )

/** One tile — pointer tilt + mask hover (desktop pointers only). */
function FeatureTile({ tile }: { tile: Tile }) {
  const maskRef = useMaskHover<HTMLElement>()

  /** Pointer tilt — desktop pointers only, never reduced motion. */
  const handleTilt = (event: React.MouseEvent<HTMLElement>) => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return
    }
    const tileEl = event.currentTarget
    const rect = tileEl.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    gsap.to(tileEl, {
      rotateY: px * 6,
      rotateX: -py * 6,
      scale: 1.02,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const resetTilt = (event: React.MouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
    })
  }

  return (
    <article
      ref={maskRef}
      data-features-tile
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
      className={`relative flex min-h-56 flex-col justify-between overflow-hidden rounded-3xl border p-6 will-change-transform md:p-8 ${
        tile.dark
          ? 'border-ink bg-dark text-paper sm:min-h-80'
          : 'border-ink/15 bg-paper-2/60'
      } ${tile.span}`}
    >
      {tile.visual === 'canvas' && (
        <div aria-hidden="true" className="absolute inset-0">
          <MotionCanvas />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
        </div>
      )}

      {/* Mask hover — warmer, brighter second layer, visible only
          inside the circular mask trailing the cursor. */}
      <div
        aria-hidden="true"
        className={`mask-reveal pointer-events-none absolute inset-0 ${
          tile.dark ? 'mask-warm-blobs' : 'mask-warm-wash'
        }`}
      />

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[11px] tracking-[0.35em] text-accent-deep">
          {tile.index}
        </span>
        {tile.chip && (
          <span className="rounded-full border border-paper/25 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-paper/70 uppercase">
            {tile.chip}
          </span>
        )}
      </div>

      {tile.visual !== 'canvas' && (
        <div className="relative mt-8">
          <TileVisual visual={tile.visual} />
        </div>
      )}

      <div className="relative mt-8">
        <h3 className="font-display text-2xl font-semibold">{tile.title}</h3>
        <p
          className={`mt-3 text-sm leading-relaxed ${
            tile.dark ? 'text-paper/70' : 'text-ink-soft'
          }`}
        >
          {tile.detail}
        </p>
      </div>
    </article>
  )
}

  return (
    <section
      id="features"
      ref={sectionRef}
      aria-label="Skills and expertise"
      className="relative bg-paper px-5 py-24 text-ink md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <p
          data-features-line
          className="font-mono text-[11px] tracking-[0.35em] text-ink-soft uppercase"
        >
          02.5 — Technical Arsenal
        </p>

        <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
          <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <span data-features-title className="block will-change-transform">
              Built on{' '}
              <span className="font-serif font-normal italic text-accent-deep">first principles</span>,
              from algorithms to systems.
            </span>
          </span>
        </h2>

        <p
          data-features-line
          className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
        >
          Core competencies across backend engineering, systems languages, database
          architecture, CS theory, and modern tooling.
        </p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((tile) => (
            <FeatureTile key={tile.index} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  )
}
