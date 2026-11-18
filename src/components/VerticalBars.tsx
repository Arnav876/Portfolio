import { useRef } from 'react'
import { gsap } from '../motion/gsap'
import { useGsap } from '../motion/useGsap'

/**
 * Vertical Bars — scroll-driven section on the /projects page.
 * Content on the LEFT reveals as you scroll; on the RIGHT exactly
 * TWO tall vertical bars move in opposite directions — one travels
 * UP while the other travels DOWN (opposing scrub-driven yPercent
 * motion). The bars are taller than their container so the movement
 * reads clearly without gaps.
 *
 * VIDEO SLOT — the animation video (the scrolling capture of the
 * project website Arnav will share later) goes in the first bar:
 *   1. Save the file at public/projects/showcase.mp4
 *      (poster frame: public/projects/showcase.png)
 *   2. Change VIDEO_MEDIA below to:
 *        { kind: 'video', src: '/projects/showcase.mp4', poster: '/projects/showcase.png' }
 *   Until then the bar shows a labelled placeholder — no video is
 *   invented and no stock footage is used.
 *
 * IMAGE SLOT — the second bar holds a project screenshot:
 *   1. Save it at public/projects/sugar-guard.png (16:10 or wider)
 *   2. Change IMAGE_MEDIA below to:
 *        { kind: 'image', src: '/projects/sugar-guard.png', alt: 'Sugar Guard app window' }
 *
 * DIRECTION FORK — the project strip below the bars: one panel
 * per project, swiped sideways to explore. Input is classified
 * by direction: a predominantly HORIZONTAL gesture (trackpad
 * swipe sideways, horizontal wheel, shift+wheel, or a horizontal
 * touch/mouse drag) slides the strip; a predominantly VERTICAL
 * gesture never touches the strip — the page scrolls down
 * normally (Lenis) and the two bars keep moving opposite.
 * The strip carries `data-lenis-prevent-horizontal`, so Lenis
 * itself skips horizontal gestures over it, and a non-passive
 * wheel listener scrolls the strip 1:1 for horizontal deltas
 * (preventDefault only there, never for vertical). Touch uses
 * `touch-action: pan-y` — vertical drags scroll the page
 * natively, horizontal drags move the strip via pointer events.
 * Left/right arrows move the strip one panel when it is in view.
 * At the strip ends, horizontal input clamps (does nothing);
 * vertical still works. Under reduced motion the strip stacks
 * vertically and no fork handlers are attached.
 */
type BarMedia =
  | { kind: 'placeholder' }
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; poster?: string }

const VIDEO_MEDIA: BarMedia = { kind: 'placeholder' }
const IMAGE_MEDIA: BarMedia = { kind: 'placeholder' }

const LEFT_ROWS = [
  {
    index: '01',
    title: 'Watch it work',
    detail:
      'A scrolling capture of the live site, frame by frame — the animation video lives in the right-hand bar.',
  },
  {
    index: '02',
    title: 'Four systems',
    detail:
      'Sugar Guard, Inventory Tracker, GrocAI Engine and NyayaSetu — each with its own case study below.',
  },
  {
    index: '03',
    title: '299 tests',
    detail:
      'Automated test cases across the four systems, built on normalized architectures.',
  },
]

function VideoWindow({ media }: { media: BarMedia }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-ink">
      {media.kind === 'video' && (
        <video
          src={media.src}
          poster={media.poster}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {media.kind === 'image' && (
        <img
          src={media.src}
          alt={media.alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      )}
      {media.kind === 'placeholder' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(120%_120%_at_20%_10%,rgba(230,195,165,0.30),transparent_55%),radial-gradient(100%_100%_at_85%_90%,rgba(166,124,82,0.35),transparent_52%),#101010]"
        >
          <span className="hs-spin-slow h-16 w-16 rounded-full border border-dashed border-paper/25" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-paper/50 uppercase">
            Animation video · slot
          </span>
        </div>
      )}
    </div>
  )
}

function ImageWindow({ media }: { media: BarMedia }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-paper-2">
      {media.kind === 'video' && (
        <video
          src={media.src}
          poster={media.poster}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {media.kind === 'image' && (
        <img
          src={media.src}
          alt={media.alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      )}
      {media.kind === 'placeholder' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(120%_120%_at_80%_10%,rgba(230,195,165,0.55),transparent_55%),radial-gradient(100%_100%_at_15%_90%,rgba(166,124,82,0.30),transparent_52%),#F5E9DC]"
        >
          <span className="hs-spin-slow h-16 w-16 rounded-full border border-dashed border-ink/25" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-ink-soft uppercase">
            Project window · screenshot slot
          </span>
        </div>
      )}
    </div>
  )
}

type StripProject = {
  index: string
  title: string
  tagline: string
  detail: string
  meta: string
  stack: string[]
  githubUrl: string
  slug: string
  cardId: string
  media: BarMedia
}

/**
 * The four projects, for the sideways strip — same projects, same
 * one-line descriptions, same media-slot convention as the
 * showcase (placeholder until screenshots/video are shared):
 * save under public/projects/ and flip the `media` field to
 * { kind: 'image', src: '/projects/<slug>.png', ... } or
 * { kind: 'video', src: '/projects/<slug>.mp4', poster: '...' }.
 */
const STRIP_PROJECTS: StripProject[] = [
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

/** Wide browser-window media frame (~16:10) for a strip panel —
 * same frame language as the showcase: renders a real image or
 * video when the project's `media` slot is filled, otherwise the
 * procedural placeholder. */
function StripMediaFrame({ project }: { project: StripProject }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-paper/15 bg-ink text-paper">
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
            <span className="absolute top-[12%] left-[14%] h-28 w-28 animate-pulse rounded-full bg-accent/40 blur-3xl md:h-40 md:w-40" />
            <span
              className="absolute right-[10%] bottom-[14%] h-24 w-24 animate-pulse rounded-full bg-accent-deep/50 blur-3xl md:h-36 md:w-36"
              style={{ animationDelay: '1.2s' }}
            />
            <span className="hs-spin-slow absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-paper/20 md:h-56 md:w-56" />
            <span className="absolute -right-2 -bottom-8 font-display text-[8rem] leading-none font-semibold text-paper/[0.07] select-none md:text-[11rem]">
              {project.index}
            </span>
            <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.25em] text-paper/50 uppercase">
              Project preview · screenshot / video slot
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function VerticalBars() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const barUpRef = useRef<HTMLDivElement | null>(null)
  const barDownRef = useRef<HTMLDivElement | null>(null)
  const stripRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const countRef = useRef<HTMLSpanElement | null>(null)

  useGsap(
    () => {
      const section = sectionRef.current
      if (!section) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Bars stay put, content fully visible — no scrub, no pin.
        gsap.set('[data-bars-line]', { opacity: 1, y: 0 })
        gsap.set([barUpRef.current, barDownRef.current], { yPercent: 0 })
        // The strip stacks vertically instead of scrolling sideways,
        // and the fork hint/progress are hidden — nothing to swipe.
        if (stripRef.current) {
          gsap.set(stripRef.current, { overflow: 'visible', flexDirection: 'column' })
        }
        gsap.set('[data-strip-panel]', { width: '100%' })
        gsap.set('[data-strip-hint]', { display: 'none' })
        gsap.set('[data-strip-progress]', { display: 'none' })
        return
      }

      // Left-side content comes in on scroll.
      gsap.fromTo(
        '[data-bars-line]',
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

      // The opposing pair: one bar travels up, the other down,
      // scrubbed across the whole section pass.
      const scrubTrigger = {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      }

      gsap.fromTo(
        barUpRef.current,
        { yPercent: 10 },
        { yPercent: -10, ease: 'none', scrollTrigger: scrubTrigger },
      )

      gsap.fromTo(
        barDownRef.current,
        { yPercent: -10 },
        { yPercent: 10, ease: 'none', scrollTrigger: scrubTrigger },
      )

      // --- Direction fork: the project strip ---
      // Horizontal gestures slide the strip; vertical gestures are
      // never touched, so the page keeps scrolling down (Lenis)
      // and the bars keep moving opposite. The strip carries
      // `data-lenis-prevent-horizontal`, so Lenis itself skips
      // horizontal gestures over it (its own classification is
      // |deltaX| >= |deltaY|); the wheel listener below then owns
      // the horizontal delta 1:1 and stops the vertical drift a
      // diagonal trackpad swipe would otherwise cause.
      const strip = stripRef.current
      if (strip) {
        const panels = Array.from(
          strip.querySelectorAll<HTMLElement>('[data-strip-panel]'),
        )
        const panelStep = () =>
          panels.length > 1
            ? panels[1].offsetLeft - panels[0].offsetLeft
            : strip.clientWidth

        const updateMeter = () => {
          const max = Math.max(0, strip.scrollWidth - strip.clientWidth)
          const p = max > 0 ? strip.scrollLeft / max : 0
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: p })
          }
          if (countRef.current) {
            const idx = Math.min(
              STRIP_PROJECTS.length - 1,
              Math.max(0, Math.round(strip.scrollLeft / panelStep())),
            )
            countRef.current.textContent = `0${idx + 1} / 0${STRIP_PROJECTS.length}`
          }
        }

        // Scroll-snap is suspended while the strip is actively
        // being driven (wheel/drag/keyboard) and restored a beat
        // after the input stops, so the strip settles on a panel
        // instead of fighting the gesture mid-flight.
        let snapTimer: number | null = null
        const suspendSnap = () => {
          strip.style.scrollSnapType = 'none'
          if (snapTimer !== null) window.clearTimeout(snapTimer)
        }
        const restoreSnap = () => {
          if (snapTimer !== null) window.clearTimeout(snapTimer)
          snapTimer = window.setTimeout(() => {
            strip.style.scrollSnapType = ''
          }, 140)
        }

        const onWheel = (e: WheelEvent) => {
          const dx = e.deltaMode === 1 ? e.deltaX * 16 : e.deltaX
          const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
          // Vertical (or vertical-dominant) — do nothing at all:
          // Lenis smooth-scrolls the page down as usual.
          if (dx === 0 || Math.abs(dx) <= Math.abs(dy)) return
          // Horizontal-dominant — own it: stop the page from
          // moving and slide the strip 1:1. At the ends scrollLeft
          // clamps naturally, so further input does nothing.
          e.preventDefault()
          suspendSnap()
          strip.scrollLeft += dx
          restoreSnap()
        }
        strip.addEventListener('wheel', onWheel, { passive: false })

        const onScroll = () => updateMeter()
        strip.addEventListener('scroll', onScroll, { passive: true })

        // Pointer drag — mouse, touch and pen. With
        // `touch-action: pan-y` the browser owns vertical drags
        // (page scroll, fires pointercancel here) while horizontal
        // drags arrive as pointer events for the strip to own.
        let dragging = false
        let moved = false
        let startX = 0
        let startScroll = 0
        let suppressClick = false

        const onPointerDown = (e: PointerEvent) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return
          dragging = true
          moved = false
          startX = e.clientX
          startScroll = strip.scrollLeft
          strip.setPointerCapture(e.pointerId)
          suspendSnap()
        }
        const onPointerMove = (e: PointerEvent) => {
          if (!dragging) return
          const d = e.clientX - startX
          if (Math.abs(d) > 6) moved = true
          strip.scrollLeft = startScroll - d
        }
        const endDrag = () => {
          if (!dragging) return
          dragging = false
          restoreSnap()
          // A drag that ends on a link must not also click it.
          if (moved) {
            suppressClick = true
            window.setTimeout(() => {
              suppressClick = false
            }, 0)
          }
        }
        const onClickCapture = (e: MouseEvent) => {
          if (suppressClick) {
            e.preventDefault()
            e.stopPropagation()
            suppressClick = false
          }
        }
        strip.addEventListener('pointerdown', onPointerDown)
        strip.addEventListener('pointermove', onPointerMove)
        strip.addEventListener('pointerup', endDrag)
        strip.addEventListener('pointercancel', endDrag)
        strip.addEventListener('click', onClickCapture, true)

        // Arrow keys — one panel at a time, only while the strip
        // is in view. Enter/Backspace stay global (KeyboardNav).
        const onKey = (e: KeyboardEvent) => {
          if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
          const active = document.activeElement
          if (
            active &&
            (active.tagName === 'INPUT' ||
              active.tagName === 'TEXTAREA' ||
              active.tagName === 'SELECT' ||
              (active as HTMLElement).isContentEditable)
          ) {
            return
          }
          const rect = strip.getBoundingClientRect()
          if (rect.bottom < 0 || rect.top > window.innerHeight) return
          e.preventDefault()
          suspendSnap()
          strip.scrollBy({
            left: (e.key === 'ArrowRight' ? 1 : -1) * panelStep(),
            behavior: 'smooth',
          })
          restoreSnap()
        }
        window.addEventListener('keydown', onKey)

        updateMeter()

        return () => {
          strip.removeEventListener('wheel', onWheel)
          strip.removeEventListener('scroll', onScroll)
          strip.removeEventListener('pointerdown', onPointerDown)
          strip.removeEventListener('pointermove', onPointerMove)
          strip.removeEventListener('pointerup', endDrag)
          strip.removeEventListener('pointercancel', endDrag)
          strip.removeEventListener('click', onClickCapture, true)
          window.removeEventListener('keydown', onKey)
          if (snapTimer !== null) window.clearTimeout(snapTimer)
        }
      }
    },
    sectionRef,
    [],
  )

  return (
    <section
      ref={sectionRef}
      aria-label="Motion — two bars moving in opposite directions"
      className="relative overflow-hidden bg-dark px-5 py-24 text-paper md:px-10 md:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left — content that comes in on scroll */}
        <div>
          <p
            data-bars-line
            className="font-mono text-[11px] tracking-[0.35em] text-paper/50 uppercase"
          >
            02 — In motion
          </p>
          <h2
            data-bars-line
            className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.02em]"
          >
            Motion, in{' '}
            <span className="font-serif font-normal italic text-accent">
              both directions
            </span>
            .
          </h2>
          <p
            data-bars-line
            className="mt-6 max-w-md text-base leading-relaxed text-paper/70 md:text-lg"
          >
            Built on first principles, from the problem to the proof —
            scroll on, and the two bars carry the animation with you.
          </p>

          <div className="mt-12 space-y-8">
            {LEFT_ROWS.map((row) => (
              <div
                key={row.index}
                data-bars-line
                className="flex gap-5 border-t border-paper/15 pt-6"
              >
                <span className="font-mono text-sm font-semibold text-accent">
                  {row.index}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    {row.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/70">
                    {row.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — exactly two vertical bars, moving opposite */}
        <div
          aria-hidden="true"
          className="relative h-[70vh] overflow-hidden md:h-[78vh]"
        >
          {/* Bar 1 — travels UP, holds the animation video slot */}
          <div
            ref={barUpRef}
            className="absolute left-0 flex w-[47%] flex-col justify-center gap-4 rounded-3xl border border-paper/15 bg-ink p-4 will-change-transform"
            style={{ top: '-17.5%', height: '135%' }}
          >
            <div className="flex items-center gap-2">
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-paper/25" />
                <span className="h-2 w-2 rounded-full bg-accent/70" />
                <span className="h-2 w-2 rounded-full bg-accent-deep/80" />
              </span>
              <span className="truncate rounded-full bg-paper/10 px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-paper/50">
                showcase.mp4
              </span>
            </div>
            <VideoWindow media={VIDEO_MEDIA} />
            <p className="font-mono text-[10px] leading-relaxed tracking-[0.2em] text-paper/50 uppercase">
              Animation video · public/projects/showcase.mp4
            </p>
          </div>

          {/* Bar 2 — travels DOWN, holds the screenshot slot */}
          <div
            ref={barDownRef}
            className="absolute right-0 flex w-[47%] flex-col justify-center gap-4 rounded-3xl bg-paper p-4 text-ink will-change-transform"
            style={{ top: '-17.5%', height: '135%' }}
          >
            <div className="flex items-center gap-2">
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-ink/20" />
                <span className="h-2 w-2 rounded-full bg-accent/80" />
                <span className="h-2 w-2 rounded-full bg-accent-deep/80" />
              </span>
              <span className="truncate rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-ink-soft">
                sugar-guard.png
              </span>
            </div>
            <ImageWindow media={IMAGE_MEDIA} />
            <p className="font-mono text-[10px] leading-relaxed tracking-[0.2em] text-ink-soft uppercase">
              Project window · public/projects/sugar-guard.png
            </p>
          </div>
        </div>
      </div>

      {/* Direction fork — swipe sideways to explore, scroll down
          to move on. Horizontal gestures slide this strip;
          vertical gestures pass straight through to the page. */}
      <div className="mt-20 border-t border-paper/15 pt-10 md:mt-28">
        <div
          data-strip-hint
          className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4"
        >
          <p className="font-mono text-[11px] tracking-[0.35em] text-paper/50 uppercase">
            &larr; &rarr; Swipe sideways to explore &middot; &darr; Scroll down to continue
          </p>
          <span
            ref={countRef}
            className="font-mono text-[11px] tracking-[0.25em] text-paper/50"
          >
            01 / 04
          </span>
        </div>

        <div
          ref={stripRef}
          data-lenis-prevent-horizontal
          aria-label="Projects — swipe sideways to explore, scroll down to continue"
          className="mt-8 flex touch-pan-y snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden px-5 pb-2 select-none md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {STRIP_PROJECTS.map((project) => (
            <article
              key={project.index}
              data-strip-panel
              className="w-[86vw] shrink-0 snap-start sm:w-[68vw] lg:w-[56vw] lg:max-w-[680px]"
            >
              <div className="rounded-3xl border border-paper/15 bg-ink p-5 md:p-6">
                <StripMediaFrame project={project} />

                <p className="mt-5 font-mono text-[11px] tracking-[0.35em] text-accent uppercase">
                  Project {project.index}
                </p>
                <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-paper/50 uppercase">
                  {project.tagline}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/70 md:text-base">
                  {project.detail}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-paper/15 px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-paper/70 uppercase"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <a
                    href={`#${project.cardId}`}
                    className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 font-mono text-xs font-semibold tracking-wider text-ink uppercase transition-colors hover:bg-accent"
                  >
                    Case Study <span aria-hidden="true">&darr;</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold tracking-wider text-paper/70 uppercase transition-colors hover:text-accent"
                  >
                    View GitHub <span aria-hidden="true">&nearr;</span>
                  </a>
                </div>

                <p className="mt-5 font-mono text-[11px] tracking-[0.2em] text-paper/50 uppercase">
                  {project.meta}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          data-strip-progress
          aria-hidden="true"
          className="mx-auto mt-6 h-px w-full max-w-6xl bg-paper/15"
        >
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-accent"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </section>
  )
}
