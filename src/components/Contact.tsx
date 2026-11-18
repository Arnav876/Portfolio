import { useRef } from 'react'
import { gsap } from '../motion/gsap'
import { useGsap } from '../motion/useGsap'
import HelmetReveal from './HelmetReveal'

/**
 * Scene 4 — Contact (AGENTS.md)
 * The closing scene: back to paper after the dark Works section,
 * with a large email slot and link slots that reveal on scroll.
 * Real contact values — email, LinkedIn, GitHub, resume.
 *
 * Three additions, all procedural and self-contained:
 * - Brand logos slide in from the right when a row is hovered
 *   (or focused; always visible on touch): Gmail's "M", LinkedIn's
 *   "in", GitHub's mark, and a PDF/document mark for the resume.
 *   Inline SVG, drawn in code — no hotlinked assets.
 * - A Framer-style background recreated in our own code: wavy
 *   vertical lines. No face in the background; the HelmetReveal
 *   portrait below the rows is untouched.
 * - The wavy lines are cursor-reactive: points near the cursor
 *   bend away from it (smooth Gaussian falloff, lerped so the
 *   lines trail the cursor) and ease back to their resting
 *   S-curve when the cursor leaves. Off on touch and under
 *   reduced motion.
 * The section carries scroll-mt-28 so the fixed nav pill never
 * clips the heading when jumping to #contact.
 */
type Brand = 'gmail' | 'linkedin' | 'github' | 'resume'

type ContactItem = {
  label: string
  value: string
  href: string
  note: string
  external?: boolean
  brand: Brand
}

const CONTACT_ROWS: ContactItem[] = [
  {
    label: 'Email',
    value: 'arnavyadav782006@gmail.com',
    href: 'mailto:arnavyadav782006@gmail.com',
    note: 'Direct email for internships & roles',
    brand: 'gmail',
  },
  {
    label: 'LinkedIn',
    value: 'arnav-yadav-956156334',
    href: 'https://www.linkedin.com/in/arnav-yadav-956156334/',
    note: 'Connect on LinkedIn ↗',
    external: true,
    brand: 'linkedin',
  },
  {
    label: 'GitHub',
    value: 'github.com/Arnav876',
    href: 'https://github.com/Arnav876',
    note: 'Open source repositories ↗',
    external: true,
    brand: 'github',
  },
  {
    label: 'Resume',
    value: 'Download Resume (PDF)',
    href: '/Arnav_Yadav_Resume.pdf',
    note: 'Official CV ↗',
    external: true,
    brand: 'resume',
  },
]

/** Brand marks — inline SVG in recognizable brand colours, drawn
 * in code. Verified by rendering: the Gmail "M" (four-colour
 * fold), LinkedIn "in" on its blue tile, the GitHub Octocat mark,
 * and a PDF document mark. */
function GmailMark() {
  return (
    <svg viewBox="0 0 24 18" aria-hidden="true" className="h-full w-full">
      <path fill="#EA4335" d="M1 1 H23 V7 L16 12 L12 8.5 L8 12 L1 7 Z" />
      <path fill="#FBBC04" d="M1 7 L8 12 L6 17 H1 Z" />
      <path fill="#34A853" d="M8 12 L12 8.5 L16 12 L18 17 H6 Z" />
      <path fill="#4285F4" d="M16 12 L23 7 V17 H18 Z" />
    </svg>
  )
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <text
        x="12"
        y="18.5"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="#ffffff"
      >
        in
      </text>
    </svg>
  )
}

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
      <path
        fill="#0a0a0a"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  )
}

function PdfMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
      <path
        d="M6 1.5h7.5L18 6v16.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-20a1 1 0 0 1 1-1Z"
        fill="#F5E9DC"
        stroke="#A67C52"
        strokeWidth="1.4"
      />
      <path d="M13.5 1.5 18 6h-4.5Z" fill="#E6C3A5" stroke="#A67C52" strokeWidth="1" />
      <rect x="8" y="10" width="8" height="1.3" rx="0.65" fill="#0a0a0a" opacity="0.45" />
      <rect x="8" y="13" width="8" height="1.3" rx="0.65" fill="#0a0a0a" opacity="0.45" />
      <text
        x="12"
        y="20.5"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="5.5"
        fontWeight="700"
        fill="#D92D20"
      >
        PDF
      </text>
    </svg>
  )
}

function BrandMark({ brand }: { brand: Brand }) {
  switch (brand) {
    case 'gmail':
      return <GmailMark />
    case 'linkedin':
      return <LinkedInMark />
    case 'github':
      return <GitHubMark />
    case 'resume':
      return <PdfMark />
  }
}

/** One wavy vertical line, as an SVG path: gentle S-curves down
 * the full height, built from cubic segments in code. `disp`
 * optionally pushes every x-coordinate of the path sideways — the
 * cursor-reactivity hook below passes a displacement function
 * there; with disp returning 0 the output is the resting S-curve,
 * byte-identical to the undisplaced version. */
function wavyPath(
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

const WAVY_LINES = [
  { x: 120, amp: 26, phase: 0 },
  { x: 320, amp: 38, phase: 1.4 },
  { x: 520, amp: 22, phase: 2.6 },
  { x: 720, amp: 34, phase: 0.8 },
  { x: 920, amp: 28, phase: 2.1 },
  { x: 1120, amp: 36, phase: 1.8 },
]

/** Framer-style background, recreated procedurally: subtle wavy
 * vertical lines across the whole section. */
function ContactBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        data-wavy-svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 900"
        preserveAspectRatio="none"
      >
        {WAVY_LINES.map((line) => (
          <path
            key={line.x}
            data-wavy-line
            d={wavyPath(line.x, line.amp, line.phase)}
            stroke="rgb(10 10 10 / 0.06)"
            strokeWidth="1.5"
            fill="none"
          />
        ))}
      </svg>
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGsap(
    () => {
      const section = sectionRef.current
      if (!section) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-contact-line]', { opacity: 1, y: 0 })
        gsap.set('[data-contact-row]', { opacity: 1, y: 0 })
        gsap.set('[data-contact-rule]', { scaleX: 1 })
        return
      }

      gsap.fromTo(
        '[data-contact-line]',
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

      gsap.fromTo(
        '[data-contact-rule]',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'power3.inOut',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        },
      )

      gsap.fromTo(
        '[data-contact-row]',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: 'top 60%' },
        },
      )

      // Cursor-reactive wavy lines: the lines near the cursor bend
      // away from it and ease back to their resting S-curve when the
      // cursor leaves. Displacement is a smooth Gaussian falloff
      // around the cursor (times a signed linear term, so the bend
      // is local and organic with no kink where the cursor crosses
      // a line), the cursor position is lerped so the lines trail
      // it, and a separate strength value eases to 0 on leave so
      // the lines settle back gently. One gsap.ticker callback —
      // the project's single ticker, no second rAF loop — and the
      // path `d` attributes are only rewritten while the cursor is
      // moving or the lines are still easing back. Off on touch
      // (no fine pointer); reduced motion is handled by the early
      // return above, so the lines stay in their resting shape.
      if (window.matchMedia('(pointer: fine)').matches) {
        const svg = section.querySelector<SVGSVGElement>('[data-wavy-svg]')
        const paths = Array.from(section.querySelectorAll<SVGPathElement>('[data-wavy-line]'))
        if (svg && paths.length === WAVY_LINES.length) {
          const SIGMA = 140 // falloff radius, viewBox units
          const AMPLITUDE = 60 // peak push ≈ 36 viewBox units at the falloff peak
          const target = { x: 0, y: 0, inside: false }
          const smooth = { x: 0, y: 0 }
          let strength = 0
          let atRest = true

          const toViewBox = (clientX: number, clientY: number) => {
            const rect = svg.getBoundingClientRect()
            return {
              x: ((clientX - rect.left) / rect.width) * 1200,
              y: ((clientY - rect.top) / rect.height) * 900,
            }
          }

          const onMove = (e: PointerEvent) => {
            const p = toViewBox(e.clientX, e.clientY)
            target.x = p.x
            target.y = p.y
            if (!target.inside) {
              target.inside = true
              // Start the smoothed cursor at the entry point so the
              // lines don't sweep in from the origin.
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

          const tick = () => {
            const dx = target.x - smooth.x
            const dy = target.y - smooth.y
            smooth.x += dx * 0.14
            smooth.y += dy * 0.14
            strength += ((target.inside ? 1 : 0) - strength) * 0.08
            const moving =
              Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05 || strength > 0.0005
            if (!moving) {
              if (!atRest) {
                // One final write so the lines land exactly on rest.
                paths.forEach((path, i) => {
                  const line = WAVY_LINES[i]
                  path.setAttribute('d', wavyPath(line.x, line.amp, line.phase))
                })
                atRest = true
              }
              return
            }
            atRest = false
            paths.forEach((path, i) => {
              const line = WAVY_LINES[i]
              path.setAttribute('d', wavyPath(line.x, line.amp, line.phase, 900, displace))
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
      id="contact"
      ref={sectionRef}
      aria-label="Contact Arnav Yadav"
      className="relative scroll-mt-28 overflow-hidden bg-paper text-ink"
    >
      <ContactBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-16 pb-24 md:px-10 md:pt-20 md:pb-32">
        <p
          data-contact-line
          className="font-mono text-[11px] tracking-[0.35em] text-ink-soft uppercase"
        >
          04 — Contact
        </p>

        <p
          data-contact-line
          className="mt-4 font-mono text-[11px] tracking-[0.2em] text-accent-deep uppercase"
        >
          Built on first principles, from a first message to a shipped system.
        </p>

        <h2
          data-contact-line
          className="mt-6 max-w-4xl font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]"
        >
          Let&apos;s build something{' '}
          <span className="font-serif font-normal italic text-accent-deep">robust &amp; impactful</span>
        </h2>

        <p data-contact-line className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
          Open for backend and software engineering internships, collaborative hackathons,
          and impactful engineering roles. Feel free to connect directly.
        </p>

        <div
          data-contact-rule
          aria-hidden="true"
          className="mt-10 h-px w-full bg-ink/15"
        />

        <ul className="mt-2">
          {CONTACT_ROWS.map((row) => (
            <li
              key={row.label}
              data-contact-row
              className="flex flex-col gap-2 border-b border-ink/15 py-6 md:flex-row md:items-baseline md:justify-between md:gap-10"
            >
              <span className="font-mono text-[11px] tracking-[0.35em] text-ink-soft uppercase md:w-32">
                {row.label}
              </span>
              <a
                href={row.href}
                target={row.external ? '_blank' : undefined}
                rel={row.external ? 'noopener noreferrer' : undefined}
                className="group flex flex-1 items-center gap-3 font-display text-xl font-semibold transition-colors hover:text-accent-deep md:text-2xl"
              >
                <span className="min-w-0 flex-1 break-words">
                  {row.value}
                  <span className="ml-1.5 inline-block opacity-0 transition-opacity group-hover:opacity-100">
                    &rarr;
                  </span>
                </span>
                {/* Brand logo — slides in from the right on hover /
                    focus, springy ease; always visible on touch and
                    under reduced motion. */}
                <span
                  aria-hidden="true"
                  className="inline-flex h-7 w-7 shrink-0 translate-x-6 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 pointer-coarse:translate-x-0 pointer-coarse:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none"
                >
                  <BrandMark brand={row.brand} />
                </span>
              </a>
              <span className="text-sm text-ink-soft">{row.note}</span>
            </li>
          ))}
        </ul>

        {/* Closing visual — helmet mask reveal */}
        <div data-contact-row className="mt-16">
          <HelmetReveal />
        </div>

        <div className="mt-16 flex flex-col gap-4 font-mono text-[11px] tracking-[0.2em] text-ink-soft uppercase md:flex-row md:items-center md:justify-between">
          <span>&copy; 2026 Arnav Yadav &bull; BMSIT&amp;M Bangalore</span>
          <span>Python &bull; C++ &bull; Java &bull; TypeScript &bull; SQL</span>
          <a href="#top" className="text-accent-deep">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </section>
  )
}
