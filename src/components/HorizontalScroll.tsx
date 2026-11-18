import { useRef } from 'react'
import { gsap } from '../motion/gsap'
import { useGsap } from '../motion/useGsap'

/**
 * HorizontalScroll — pinned sideways section (between Features and Works).
 * Vertical scrolling drives the panels horizontally across the viewport,
 * with a thin progress bar, panels that tilt/scale in as they arrive,
 * and giant background words drifting at different speeds (parallax).
 *
 * CONTENT NOTE — placeholder, not user-confirmed:
 * Every line of text here is random filler Arnav asked for. None of it
 * is about him, his work, or his projects — it is clearly marked
 * "[Placeholder]" so it can be swapped for real copy later.
 */

type Panel = {
  word: string
  number: string
  tone: 'paper' | 'dark' | 'tan' | 'tint'
  visual: 'arrow' | 'rings' | 'loop' | 'orbit' | 'echo'
  text: string
}

const PANELS: Panel[] = [
  {
    word: 'ACADEMIA',
    number: '01',
    tone: 'paper',
    visual: 'arrow',
    text: 'BMSIT&M Computer Science Engineering (2024–2028). Bridging deep algorithmic theory with scalable software systems.',
  },
  {
    word: 'PREDICTION',
    number: '02',
    tone: 'dark',
    visual: 'rings',
    text: 'Sugar Guard: AI-driven hypoglycaemia prediction built for the inCSEption hackathon (SDG-3). Multi-modal risk scoring correlating glucose levels, meals, and lifestyle patterns.',
  },
  {
    word: 'ARCHITECT',
    number: '03',
    tone: 'tan',
    visual: 'loop',
    text: 'Retail Stock & Sales Tracker: Normalized SQL schema design, automated low-stock alerting, and clean service layers separating data ingestion, transactions, and reporting.',
  },
  {
    word: 'COMMUNITY',
    number: '04',
    tone: 'tint',
    visual: 'orbit',
    text: 'Open Source Club & CIS IEEE Society: Driving marketing and outreach for open-source collaboration, and executing technical hackathons and workshops for the IEEE student branch.',
  },
  {
    word: 'ANCHOR',
    number: '05',
    tone: 'dark',
    visual: 'echo',
    text: 'Event Host & Stage Anchor: Anchoring college and hostel cultural festivals with recognized crowd engagement, stage presence, and articulate communication across major campus fests.',
  },
]

const TONE_CLASSES: Record<Panel['tone'], string> = {
  paper: 'bg-paper text-ink',
  dark: 'bg-dark text-paper',
  tan: 'bg-accent text-ink',
  tint: 'bg-paper-2 text-ink',
}

const TONE_SUBTLE: Record<Panel['tone'], string> = {
  paper: 'text-ink/55',
  dark: 'text-paper/55',
  tan: 'text-ink/60',
  tint: 'text-ink/55',
}

/** Drift speeds for the giant background words — varied per panel. */
const BG_DRIFT = [14, -18, 20, -14, 16]

function PanelVisual({ visual, tone }: { visual: Panel['visual']; tone: Panel['tone'] }) {
  const line = tone === 'dark' ? 'stroke-paper/70' : 'stroke-ink/70'
  const fill = tone === 'dark' ? 'bg-paper' : 'bg-ink'
  const ring = tone === 'dark' ? 'border-paper/40' : 'border-ink/40'

  if (visual === 'arrow') {
    return (
      <div aria-hidden="true" className="relative h-32 w-32 md:h-40 md:w-40">
        <span className="hs-drift-arrow absolute inset-0 flex items-center justify-center font-display text-[7rem] leading-none font-semibold md:text-[9rem]">
          →
        </span>
      </div>
    )
  }

  if (visual === 'rings') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="h-36 w-36 md:h-44 md:w-44"
      >
        <circle cx="100" cy="100" r="88" fill="none" className={line} strokeWidth="1" />
        <circle
          cx="100"
          cy="100"
          r="62"
          fill="none"
          className={line}
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <circle cx="100" cy="100" r="36" fill="none" className={line} strokeWidth="1" />
        <g className="hs-spin-slow" style={{ transformOrigin: '100px 100px' }}>
          <circle cx="100" cy="12" r="6" className={fill} />
        </g>
      </svg>
    )
  }

  if (visual === 'loop') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="hs-spin-slow h-36 w-36 md:h-44 md:w-44"
        style={{ transformOrigin: '100px 100px' }}
      >
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          className={line}
          strokeWidth="2"
          strokeDasharray="30 18"
        />
        <circle cx="100" cy="14" r="8" className={fill} />
      </svg>
    )
  }

  if (visual === 'orbit') {
    return (
      <div aria-hidden="true" className="relative h-36 w-36 md:h-44 md:w-44">
        <span className={`absolute inset-0 rounded-full border ${ring}`} />
        <span
          className={`absolute inset-6 rounded-full border border-dashed ${ring}`}
        />
        <span className={`absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full ${fill}`} />
        <span className="hs-orbit absolute inset-0">
          <span className={`absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full ${fill}`} />
        </span>
      </div>
    )
  }

  // echo — equaliser bars
  return (
    <div aria-hidden="true" className="flex h-28 items-end gap-2 md:h-36">
      {[0.9, 0.5, 1.3, 0.7, 1.1, 0.6, 1.4, 0.8].map((delay, i) => (
        <span
          key={i}
          className={`hs-eq-bar w-3 rounded-full md:w-4 ${fill}`}
          style={{ animationDelay: `${delay}s`, height: `${28 + ((i * 13) % 48)}%` }}
        />
      ))}
    </div>
  )
}

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const fillRef = useRef<HTMLDivElement | null>(null)
  const countRef = useRef<HTMLSpanElement | null>(null)

  useGsap(
    () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      const panels = Array.from(track.querySelectorAll<HTMLElement>('[data-hs-panel]'))
      const bgWords = Array.from(section.querySelectorAll<HTMLElement>('[data-bg-word]'))
      const inners = Array.from(track.querySelectorAll<HTMLElement>('[data-panel-inner]'))

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // No pin, no scrub — panels stack vertically in normal flow.
        gsap.set(track, { x: 0, width: '100%', flexDirection: 'column' })
        gsap.set(panels, { width: '100%', height: 'auto' })
        gsap.set([fillRef.current, countRef.current], { opacity: 0 })
        gsap.set(inners, { opacity: 1, y: 0, rotation: 0, scale: 1 })
        gsap.set(bgWords, { xPercent: 0, opacity: 1 })
        return
      }

      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      gsap.set(fillRef.current, { scaleX: 0 })

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
              const current = Math.min(PANELS.length, Math.floor(self.progress * PANELS.length) + 1)
              countRef.current.textContent = `0${current} / 0${PANELS.length}`
            }
          },
        },
      })

      // The horizontal drive.
      tl.to(track, { x: () => -getDistance(), ease: 'none', duration: 1 }, 0)

      // Panels tilt/scale in as they arrive.
      inners.forEach((inner, i) => {
        tl.fromTo(
          inner,
          { y: 56, rotation: 2, scale: 0.97, opacity: 0.35 },
          { y: 0, rotation: 0, scale: 1, opacity: 1, ease: 'none', duration: 0.16 },
          0.04 + (i / inners.length) * 0.78,
        )
      })

      // Giant background words drift at different speeds (parallax).
      bgWords.forEach((word, i) => {
        const speed = BG_DRIFT[i % BG_DRIFT.length]
        tl.fromTo(
          word,
          { xPercent: speed },
          { xPercent: -speed, ease: 'none', duration: 1 },
          0,
        )
      })
    },
    sectionRef,
    [],
  )

  return (
    <section
      id="sideways"
      ref={sectionRef}
      aria-label="Sideways — a horizontal scrolling gallery of journey highlights"
      className="relative overflow-hidden bg-paper text-ink"
    >
      {/* Progress bar + counter — pinned to the top of the viewport while scrolling */}
      <div className="absolute inset-x-0 top-0 z-20 px-5 pt-20 md:px-10 md:pt-24">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6">
          <p className="font-mono text-[11px] tracking-[0.35em] text-ink/55 uppercase">
            02.8 — Journey &amp; Milestones · scroll &darr; then &rarr;
          </p>
          <span
            ref={countRef}
            className="font-mono text-[11px] tracking-[0.25em] text-ink/55"
          >
            01 / 05
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

      {/* Horizontal track — becomes a vertical stack under reduced motion */}
      <div ref={trackRef} className="flex w-max will-change-transform">
        {PANELS.map((panel) => (
          <article
            key={panel.number}
            data-hs-panel
            className={`relative flex h-screen w-[88vw] shrink-0 items-center overflow-hidden px-5 sm:w-[75vw] md:px-10 lg:w-[62vw] ${TONE_CLASSES[panel.tone]}`}
          >
            {/* Giant drifting background word (parallax) */}
            <span
              aria-hidden="true"
              data-bg-word
              className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 font-display text-[26vw] leading-none font-semibold whitespace-nowrap opacity-[0.07] select-none md:text-[18vw]"
            >
              {panel.word}
            </span>

            <div
              data-panel-inner
              className="relative mx-auto flex w-full max-w-xl flex-col items-start gap-6 py-24"
            >
              <p className={`font-mono text-[11px] tracking-[0.35em] uppercase ${TONE_SUBTLE[panel.tone]}`}>
                Panel {panel.number} — {panel.word}
              </p>

              <h2 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.92] font-semibold tracking-[-0.02em]">
                {panel.word}
                <span className={panel.tone === 'dark' ? 'text-accent' : 'text-accent-deep'}>.</span>
              </h2>

              <PanelVisual visual={panel.visual} tone={panel.tone} />

              <p className="max-w-md text-base leading-relaxed md:text-lg">
                {panel.text}
              </p>

              <p className={`font-mono text-[11px] tracking-[0.2em] uppercase ${TONE_SUBTLE[panel.tone]}`}>
                {panel.number === '05' ? 'End of milestones — Selected projects ↓' : 'Keep scrolling →'}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
