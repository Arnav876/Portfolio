import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../motion/gsap'
import { useGsap } from '../motion/useGsap'
import { Link } from '../router'

const LINES = ['ARNAV', 'YADAV']

/** Deterministic scatter offset for char `i` — where it starts before
 * settling into place. Kept small (a fraction of a character) so
 * scattered letters never overlap each other while they assemble. */
function scatter(i: number) {
  return {
    xPercent: ((i * 37) % 30) - 15,
    yPercent: ((i * 53) % 40) - 20,
    rotation: ((i * 29) % 8) - 4,
    scale: 0.85 + ((i * 11) % 15) / 100,
  }
}

function splitChars(word: string) {
  return word.split('').map((char, i) => (
    <span key={`${word}-${i}`} className="inline-block pb-[0.06em] -mb-[0.06em] align-top">
      <span data-hero-char aria-hidden="true" className="hero-char">
        {char}
      </span>
    </span>
  ))
}

function splitOverlayChars(word: string) {
  return word.split('').map((char, i) => (
    <span key={`${word}-${i}`} className="inline-block pb-[0.06em] -mb-[0.06em] align-top">
      <span aria-hidden="true" className="hero-char hero-overlay-char">
        {char}
      </span>
    </span>
  ))
}

/** One wavy vertical line, as an SVG path — same generator as
 * Contact's lines (gentle S-curves from cubic segments). `disp`
 * optionally pushes every x-coordinate sideways; with disp
 * returning 0 the output is the resting S-curve. */
function heroWavyPath(
  x: number,
  amp: number,
  phase: number,
  height = 900,
  disp: (px: number, py: number) => number = () => 0,
): string {
  const segs = 6
  const step = height / segs
  let d = `M ${x + disp(x, 0)} 0`
  for (let s = 0; s < segs; s++) {
    const y0 = s * step
    const c1x = x + Math.sin(phase + s * 1.3) * amp
    const c2x = x + Math.sin(phase + s * 1.3 + 0.9) * amp
    d += ` C ${c1x + disp(c1x, y0 + step * 0.33)}, ${y0 + step * 0.33}, ${c2x + disp(c2x, y0 + step * 0.66)}, ${y0 + step * 0.66}, ${x + disp(x, y0 + step)} ${y0 + step}`
  }
  return d
}

/** Three faint lines confined to the hero's empty right zone —
 * thinner and fainter than Contact's six (ink ~4.5%), so the
 * void fills without crowding the giant title. */
const HERO_LINES = [
  { x: 100, amp: 20, phase: 0.6 },
  { x: 240, amp: 30, phase: 2.0 },
  { x: 380, amp: 24, phase: 1.2 },
]

/** The signature black line — one line, clearly black (ink at
 * 0.9, strokeWidth 2), living among the three faint ones in the
 * hero's right zone. It drifts vertically by default: its wave
 * pattern travels down the line as its phase advances. When the
 * cursor comes onto it, its motion flips to horizontal — the line
 * slides sideways instead — and eases back to vertical when the
 * cursor leaves. It bends away from the cursor like the faint
 * lines; the direction flip is in addition to the bend. */
const BLACK_LINE = { x: 300, amp: 26, phase: 0.4 }

/**
 * Scene 1 — Hero scroll-transition opening (AGENTS.md)
 * Pinned for ~1x screen height, scrub-driven. The opening is black:
 * a black backdrop covers the light hero, five vertical bands
 * (paper, ink, warm beige, ink, paper) sit on top of it, and the
 * only thing written is a giant white-outlined ENTER — no labels,
 * no hints on the stripe. A small scroll shrinks ENTER away; the
 * bands split apart — the beige stripe thinning to a line and
 * vanishing fast as they go — and the split reveals the black
 * backdrop behind them, never white. The "ARNAV YADAV." title then
 * assembles IN PLACE at its final hero position, on the black, and
 * stays completely still: it never glides, drifts, or jumps. The
 * black backdrop fades away to the paper hero underneath while the
 * name's colours shift with it (paper/beige to ink/accent-deep),
 * and the hand-off to the real hero title is a same-spot,
 * same-colour swap, so there is no visible change at all. The rest
 * of the hero (role line, buttons, meta) fades in around the name
 * afterwards. No bounce or elastic easing anywhere, and no
 * end-of-pin lift or dim — once the name is there, it does not move.
 *
 * Why the name cannot move or jump: the overlay title is never
 * positioned by measurement and never glides. It lives in a
 * container that mirrors the hero content layout exactly — same
 * flex structure, same padding, same copy — so it lands on the
 * real title by construction. The non-title parts are invisible
 * placeholders that only hold the layout.
 * Reduced motion: no pin / scrub, final state shown immediately.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGsap(
    () => {
      const section = sectionRef.current
      if (!section) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-hero-band]', { display: 'none' })
        gsap.set('[data-hero-backdrop]', { display: 'none' })
        gsap.set('[data-hero-intro]', { display: 'none' })
        gsap.set('[data-hero-overlay-title]', { display: 'none' })
        gsap.set('[data-hero-char]', { x: 0, y: 0, rotation: 0, scale: 1 })
        gsap.set('[data-hero-meta]', { opacity: 1, y: 0 })
        return
      }

      // The real title starts hidden — the overlay title takes its
      // place until the same-spot hand-off.
      gsap.set('[data-hero-char]', { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=95%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // ENTER — the only thing written — shrinks a little and
      // disappears first, alone on the bands.
      tl.to(
        '[data-hero-enter]',
        { scale: 0.85, opacity: 0, duration: 0.18, ease: 'power3.in' },
        0,
      )
        // The bands split apart, revealing the black backdrop
        // behind them — never the white hero.
        .to(
          '[data-hero-band]',
          {
            yPercent: (i: number) => (i % 2 === 0 ? -112 : 112),
            rotation: (i: number) => (i % 2 === 0 ? -4 : 4),
            duration: 0.4,
            ease: 'power3.in',
            stagger: 0.05,
          },
          0.25,
        )
        // The beige middle stripe thins to a line and vanishes —
        // a fast, snappy collapse (expo.in, over a short window)
        // while the bands split apart, with a slight vertical
        // stretch as it goes, so it disappears dramatically.
        .to(
          '[data-hero-band-middle]',
          {
            scaleX: 0,
            scaleY: 1.12,
            duration: 0.12,
            ease: 'expo.in',
          },
          0.25,
        )
        // The name assembles IN PLACE at its final position, on
        // the black — small scatter, so letters never pile up —
        // and once assembled it does not move at all.
        .fromTo(
          '[data-hero-overlay-title]',
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: 'power3.out' },
          0.7,
        )
        .fromTo(
          '.hero-overlay-char',
          {
            xPercent: (i: number) => scatter(i).xPercent,
            yPercent: (i: number) => scatter(i).yPercent,
            rotation: (i: number) => scatter(i).rotation,
            scale: (i: number) => scatter(i).scale,
          },
          {
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            scale: 1,
            duration: 0.35,
            ease: 'power4.out',
            stagger: 0.02,
          },
          0.7,
        )
        // The black backdrop fades away to the paper hero, and
        // the name's colours shift with it — paper to ink, beige
        // to accent-deep — so by the hand-off it is already the
        // hero title's colours. The inversion is quick (0.2) so
        // it reads as a snap, not a wash.
        .to(
          '[data-hero-backdrop]',
          { opacity: 0, duration: 0.2, ease: 'power2.inOut' },
          1.25,
        )
        .to(
          '[data-overlay-line="1"]',
          { color: '#0a0a0a', duration: 0.2, ease: 'power2.inOut' },
          1.25,
        )
        .to(
          '[data-overlay-line="2"]',
          { color: '#A67C52', duration: 0.2, ease: 'power2.inOut' },
          1.25,
        )
        // Hand-off: overlay title out, real title in — same spot,
        // same colours, so the swap is invisible.
        .to('[data-hero-overlay-title]', { opacity: 0, duration: 0.08, ease: 'none' }, 1.47)
        .to('[data-hero-char]', { opacity: 1, duration: 0.08, ease: 'none' }, 1.47)
        // The rest of the hero fades in around the name, which
        // has been sitting still in its final place all along.
        .fromTo(
          '[data-hero-meta]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.25, ease: 'power3.out', stagger: 0.06 },
          1.52,
        )

      if (document.fonts?.ready) {
        void document.fonts.ready.then(() => ScrollTrigger.refresh())
      }

      // Cursor-reactive wavy lines — the hero's right-hand void.
      // Same bend physics as Contact (Gaussian falloff, lerped
      // cursor, ease back to rest), with two twists so it does
      // not read as a copy: each line sways on its own slow
      // CSS drift (see .hero-line-sway in tokens.css — a
      // composited transform, no path cost), and each line
      // brightens slightly as the cursor nears it, fading back
      // to its faint resting opacity at rest. One gsap.ticker
      // callback, and the faint lines' path `d` attributes are
      // only rewritten while the cursor is moving or the lines
      // are easing back. Off on touch (no fine pointer);
      // reduced motion is handled by the early return above,
      // so the lines stay still.
      //
      // The signature black line (see BLACK_LINE) lives in the
      // same SVG and the same ticker, but its ambient motion
      // never stops, so its `d` is rewritten every tick: by
      // default its phase falls, so the wave pattern travels
      // down the line (vertical motion). When the cursor comes
      // onto the line, a lerped `mode` blends it over to
      // horizontal motion — the phase travel slows to a stop
      // while a sideways slide grows in — and it eases back to
      // vertical when the cursor leaves. The bend applies on
      // top, exactly like the faint lines.
      if (window.matchMedia('(pointer: fine)').matches) {
        const linesSvg = section.querySelector<SVGSVGElement>('[data-hero-wavy-svg]')
        const linePaths = Array.from(
          section.querySelectorAll<SVGPathElement>('[data-hero-wavy-line]'),
        )
        const blackPath = section.querySelector<SVGPathElement>('[data-hero-black-line]')
        if (linesSvg && linePaths.length === HERO_LINES.length && blackPath) {
          const SIGMA = 140
          const AMPLITUDE = 60
          const BASE_OPACITY = 0.045
          const BOOST_OPACITY = 0.09
          const target = { x: 0, y: 0, inside: false }
          const smooth = { x: 0, y: 0 }
          let strength = 0
          let atRest = true
          // Black line motion mode — 0 = vertical drift (wave
          // travels down the line), 1 = horizontal slide.
          // Lerped every tick, so the flip is a smooth blend,
          // never a snap. `modeTarget` has hysteresis (on at
          // proximity 0.55, off below 0.3) so hovering near the
          // threshold does not flicker the direction.
          let mode = 0
          let modeTarget = 0
          let blackPhase = BLACK_LINE.phase
          let tickCount = 0

          const toViewBox = (clientX: number, clientY: number) => {
            const rect = linesSvg.getBoundingClientRect()
            return {
              x: ((clientX - rect.left) / rect.width) * 480,
              y: ((clientY - rect.top) / rect.height) * 900,
            }
          }

          const onMove = (e: PointerEvent) => {
            const p = toViewBox(e.clientX, e.clientY)
            target.x = p.x
            target.y = p.y
            if (!target.inside) {
              target.inside = true
              smooth.x = p.x
              smooth.y = p.y
            }
            atRest = false
          }
          const onLeave = () => {
            target.inside = false
            atRest = false
          }

          const displace = (px: number, py: number) => {
            if (strength <= 0.0005) return 0
            const dx = px - smooth.x
            const dy = py - smooth.y
            const d2 = dx * dx + dy * dy
            return AMPLITUDE * (dx / SIGMA) * Math.exp(-d2 / (2 * SIGMA * SIGMA)) * strength
          }

          // How close the smoothed cursor is to a (vertical) line —
          // the nearest point on the line is directly beside the
          // cursor, so horizontal distance is the distance.
          const proximity = (lineX: number) => {
            const dx = lineX - smooth.x
            return Math.exp(-(dx * dx) / (2 * SIGMA * SIGMA)) * strength
          }

          const tick = () => {
            const dx = target.x - smooth.x
            const dy = target.y - smooth.y
            smooth.x += dx * 0.14
            smooth.y += dy * 0.14
            strength += ((target.inside ? 1 : 0) - strength) * 0.08

            // The black line — always live, even when the cursor
            // is idle, because its ambient motion never stops.
            // Vertical by default: its phase falls, so the wave
            // pattern travels down the line. The closer the
            // cursor gets to the line, the more `mode` blends
            // toward horizontal: the phase travel slows to a
            // stop while a sideways slide grows in. Both are
            // scaled by the lerped `mode`, so the flip is smooth
            // in both directions. The bend (in `d`) still applies
            // on top, exactly like the faint lines.
            const blackProx = proximity(BLACK_LINE.x)
            if (blackProx > 0.55) modeTarget = 1
            else if (blackProx < 0.3) modeTarget = 0
            mode += (modeTarget - mode) * 0.06
            blackPhase -= 0.015 * (1 - mode)
            tickCount += 1
            const slideX = Math.sin(tickCount * 0.02) * 30 * mode
            blackPath.setAttribute(
              'd',
              heroWavyPath(BLACK_LINE.x, BLACK_LINE.amp, blackPhase, 900, displace),
            )
            blackPath.setAttribute('transform', `translate(${slideX.toFixed(2)} 0)`)
            blackPath.setAttribute('stroke-opacity', (0.9 + 0.1 * blackProx).toFixed(3))

            // The faint lines — only rewritten while the cursor
            // is moving or the lines are easing back to rest.
            const moving =
              Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05 || strength > 0.0005
            if (!moving) {
              if (!atRest) {
                linePaths.forEach((path, i) => {
                  const line = HERO_LINES[i]
                  path.setAttribute('d', heroWavyPath(line.x, line.amp, line.phase))
                  path.setAttribute('stroke-opacity', String(BASE_OPACITY))
                })
                atRest = true
              }
              return
            }
            atRest = false
            linePaths.forEach((path, i) => {
              const line = HERO_LINES[i]
              path.setAttribute('d', heroWavyPath(line.x, line.amp, line.phase, 900, displace))
              path.setAttribute(
                'stroke-opacity',
                (BASE_OPACITY + BOOST_OPACITY * proximity(line.x)).toFixed(3),
              )
            })
          }

          section.addEventListener('pointermove', onMove)
          section.addEventListener('pointerleave', onLeave)
          gsap.ticker.add(tick)

          return () => {
            section.removeEventListener('pointermove', onMove)
            section.removeEventListener('pointerleave', onLeave)
            gsap.ticker.remove(tick)
          }
        }
      }
    },
    sectionRef,
    [],
  )

  return (
    <section
      ref={sectionRef}
      aria-label="Arnav Yadav — introduction"
      className="relative h-svh overflow-hidden bg-paper text-ink"
    >
      {/* Light hero — revealed as the black backdrop fades away */}
      <div className="absolute inset-0 z-10 bg-paper text-ink">
        {/* Cursor-reactive wavy lines — right-hand void only.
            Three faint lines behind the content (md+ only), so they
            fill the empty right ~40% without ever crossing the
            title or the role line. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[42%] md:block"
        >
          <svg
            data-hero-wavy-svg
            className="h-full w-full"
            viewBox="0 0 480 900"
            preserveAspectRatio="none"
          >
            {HERO_LINES.map((line, i) => (
              <path
                key={line.x}
                data-hero-wavy-line
                d={heroWavyPath(line.x, line.amp, line.phase)}
                stroke="#0a0a0a"
                strokeOpacity={0.045}
                strokeWidth="1"
                fill="none"
                className="hero-line-sway"
                style={{
                  animationDuration: `${15 + i * 4}s`,
                  animationDelay: `${-i * 5}s`,
                }}
              />
            ))}
            {/* The signature black line — clearly black, no CSS
                sway: its vertical drift and its horizontal flip
                are both driven by the ticker below. */}
            <path
              data-hero-black-line
              d={heroWavyPath(BLACK_LINE.x, BLACK_LINE.amp, BLACK_LINE.phase)}
              stroke="#0a0a0a"
              strokeOpacity={0.9}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div
          data-hero-content
          className="relative z-10 flex h-full flex-col justify-between px-5 py-6 md:px-10 md:py-8"
        >
          <div data-hero-meta className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] uppercase">
            <span>Arnav Yadav</span>
            <span className="hidden sm:block">Portfolio — 2026</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-deep" />
              Available for work
            </span>
          </div>

          <div>
            <h1 data-hero-title className="font-display text-display font-semibold leading-[0.92] tracking-[-0.02em]">
              <span className="sr-only">Arnav Yadav</span>
              <span aria-hidden="true" className="block">
                {splitChars(LINES[0])}
              </span>
              <span aria-hidden="true" className="block text-accent-deep">
                {splitChars(LINES[1])}
                <span className="inline-block pb-[0.06em] -mb-[0.06em] align-top">
                  <span data-hero-char aria-hidden="true" className="hero-char">
                    .
                  </span>
                </span>
              </span>
            </h1>

            <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <p data-hero-meta className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
                Backend Engineer &amp; Software Developer — building robust
                systems, REST APIs, and AI-driven applications.
              </p>
              <div data-hero-meta className="flex items-center gap-6">
                <Link
                  href="/projects"
                  data-hover="fill-y"
                  style={{ '--hover-fill': '#A67C52', '--hover-text': '#fff' } as React.CSSProperties}
                  className="inline-flex items-center justify-center rounded-lg border border-accent-deep/40 px-5 py-2.5 text-sm font-medium text-accent-deep"
                >
                  See selected work
                </Link>
                <a
                  href="#features"
                  data-hover="underline"
                  style={{ '--hover-underline-color': '#A67C52' } as React.CSSProperties}
                  className="pb-0.5 text-sm font-medium"
                >
                  Skills →
                </a>
              </div>
            </div>
          </div>

          <div data-hero-meta className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-ink-soft uppercase">
            <span>Scroll — 01 / Hero</span>
            <span className="hidden sm:block">Python &middot; C++ &middot; Java &middot; TypeScript &middot; SQL</span>
            <span>↓</span>
          </div>
        </div>
      </div>

      {/* Black backdrop — covers the paper hero. The band split
          reveals black behind the bands, never white. It fades
          away at the end of the opening to reveal the hero. */}
      <div
        data-hero-backdrop
        aria-hidden="true"
        className="absolute inset-0 z-[15] bg-ink"
      />

      {/* Intro bands — five vertical panels that split away on scroll.
          Black (ink) bands flank the beige middle stripe. */}
      <div aria-hidden="true" className="absolute inset-0 z-20 flex">
        {['bg-paper', 'bg-ink', 'bg-accent', 'bg-ink', 'bg-paper'].map((bg, i) => (
          <div
            key={i}
            data-hero-band
            {...(i === 2 ? { 'data-hero-band-middle': true } : {})}
            className={`h-full flex-1 ${bg} will-change-transform`}
          />
        ))}
      </div>

      {/* Intro overlay — only the giant white-outlined ENTER.
          No label, no scroll hint on the stripe. */}
      <div
        data-hero-intro
        className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
      >
        <p
          data-hero-enter
          aria-hidden="true"
          className="font-display text-[22vw] leading-none font-semibold tracking-[-0.02em] select-none md:text-[11rem]"
          style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.75)' }}
        >
          ENTER
        </p>
      </div>

      {/* Overlay title — assembles in place at the hero title's
          exact spot and never moves. This container mirrors the
          hero content layout exactly (same flex structure, same
          padding, same copy), so the title lands on the real title
          by construction — no measurement, no glide, no jump. The
          non-title parts are invisible placeholders that only hold
          the layout; the title itself is visible. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30"
      >
        <div className="invisible flex h-full flex-col justify-between px-5 py-6 md:px-10 md:py-8">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] uppercase">
            <span>Arnav Yadav</span>
            <span className="hidden sm:block">Portfolio — 2026</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-deep" />
              Available for work
            </span>
          </div>

          <div>
            <h1
              data-hero-overlay-title
              className="visible font-display text-display font-semibold leading-[0.92] tracking-[-0.02em]"
            >
              <span data-overlay-line="1" className="block text-paper">
                {splitOverlayChars(LINES[0])}
              </span>
              <span data-overlay-line="2" className="block text-accent">
                {splitOverlayChars(LINES[1])}
                <span className="inline-block pb-[0.06em] -mb-[0.06em] align-top">
                  <span aria-hidden="true" className="hero-char hero-overlay-char">
                    .
                  </span>
                </span>
              </span>
            </h1>

            <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
                Backend Engineer &amp; Software Developer — building robust
                systems, REST APIs, and AI-driven applications.
              </p>
              <div className="flex items-center gap-6">
                <span className="inline-flex items-center justify-center rounded-lg border border-accent-deep/40 px-5 py-2.5 text-sm font-medium text-accent-deep">
                  See selected work
                </span>
                <span className="pb-0.5 text-sm font-medium">Skills →</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-ink-soft uppercase">
            <span>Scroll — 01 / Hero</span>
            <span className="hidden sm:block">Python &middot; C++ &middot; Java &middot; TypeScript &middot; SQL</span>
            <span>↓</span>
          </div>
        </div>
      </div>
    </section>
  )
}
