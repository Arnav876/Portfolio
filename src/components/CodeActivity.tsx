import { useRef } from 'react'
import { gsap } from '../motion/gsap'
import { useGsap } from '../motion/useGsap'
import {
  CONTRIBUTIONS_DAYS,
  CONTRIBUTIONS_FETCHED,
  CONTRIBUTIONS_START,
  CONTRIBUTIONS_TOTAL,
} from '../data/contributions'

/**
 * Code Activity — GitHub contributions graph (Arnav876).
 * Real data, fetched live from github.com/users/Arnav876/contributions
 * on 2026-11-19 and baked into src/data/contributions.ts (444 total,
 * verified against GitHub's own heading). The page itself is not
 * fetched at runtime: github.com sends no CORS headers for it, so a
 * client-side refresh would fail — the baked snapshot is the source.
 *
 * Layout follows the light reference Arnav sent (mono "CODE ACTIVITY"
 * label, "View GitHub ↗" link, big "<N> contributions in the last
 * year" heading, Less/More legend, month + weekday labels) — but in
 * his palette only: a beige scale from tint to accent-deep, no green.
 * Cells are 15px with 4px gaps (slightly larger than GitHub's
 * 10px default) inside a soft tinted panel, with generous
 * breathing room around the grid so the block feels calm rather
 * than dense.
 *
 * Beige scale (empty → most active):
 *   level 0  #F5E9DC  (paper-2 / tint)
 *   level 1  #E6C3A5  (accent)
 *   level 2  #D1AC8A  (mid, interpolated)
 *   level 3  #BC946E  (mid-deep, interpolated)
 *   level 4  #A67C52  (accent-deep)
 */
const BEIGE: readonly string[] = ['#F5E9DC', '#E6C3A5', '#D1AC8A', '#BC946E', '#A67C52']

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const CELL = 15
const GAP = 4
const PITCH = CELL + GAP // 19
const GUTTER = 36 // space for the weekday labels on the left

function addDays(base: Date, days: number): Date {
  const d = new Date(base)
  d.setDate(d.getDate() + days)
  return d
}

function dayLabel(date: Date, count: number): string {
  const when = `${MONTHS_FULL[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  return count === 0
    ? `No contributions on ${when}`
    : `${count} contribution${count === 1 ? '' : 's'} on ${when}`
}

export default function CodeActivity() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGsap(
    () => {
      const section = sectionRef.current
      if (!section) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-activity-line]', { opacity: 1, y: 0 })
        gsap.set('[data-activity-grid]', { opacity: 1 })
        return
      }

      gsap.fromTo(
        '[data-activity-line]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: 'top 75%' },
        },
      )

      gsap.fromTo(
        '[data-activity-grid]',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        },
      )
    },
    sectionRef,
    [],
  )

  const start = new Date(`${CONTRIBUTIONS_START}T00:00:00`)
  const columns = Math.ceil(CONTRIBUTIONS_DAYS.length / 7)

  // Month label above the first column that contains the 1st of a month.
  const monthLabels: { label: string; col: number }[] = []
  for (let col = 0; col < columns; col += 1) {
    for (let row = 0; row < 7; row += 1) {
      const idx = col * 7 + row
      if (idx >= CONTRIBUTIONS_DAYS.length) break
      const date = addDays(start, idx)
      if (date.getDate() === 1) {
        monthLabels.push({ label: MONTHS[date.getMonth()], col })
        break
      }
    }
  }

  const weekdayRows: { label: string; row: number }[] = [
    { label: 'Mon', row: 1 },
    { label: 'Wed', row: 3 },
    { label: 'Fri', row: 5 },
  ]

  return (
    <section
      id="activity"
      ref={sectionRef}
      aria-label="GitHub code activity"
      className="relative bg-paper px-5 py-28 text-ink md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div
          data-activity-line
          className="flex items-center justify-between gap-6"
        >
          <p className="font-mono text-[11px] tracking-[0.35em] text-ink-soft uppercase">
            Code Activity
          </p>
          <a
            href="https://github.com/Arnav876"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.2em] text-ink uppercase underline decoration-ink/30 underline-offset-4 transition-colors hover:text-accent-deep hover:decoration-accent-deep"
          >
            View GitHub ↗
          </a>
        </div>

        <div
          data-activity-line
          className="mt-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-6"
        >
          <h2 className="max-w-3xl font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
            {CONTRIBUTIONS_TOTAL} contributions in the last year
          </h2>

          <div
            aria-label="Contribution level legend, less to more"
            className="flex items-center gap-1.5 font-mono text-[11px] text-ink-soft"
          >
            <span>Less</span>
            {BEIGE.map((color) => (
              <span
                key={color}
                aria-hidden="true"
                className="inline-block h-[15px] w-[15px] rounded-[3px]"
                style={{ backgroundColor: color }}
              />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Hairline rule — separates the heading from the grid */}
        <div
          data-activity-line
          aria-hidden="true"
          className="mt-12 h-px w-full bg-ink/10"
        />

        <div
          data-activity-grid
          className="mt-10 overflow-x-auto rounded-3xl border border-ink/10 bg-paper-2/40 p-5 md:p-8"
        >
          <div className="min-w-[1040px]" style={{ paddingLeft: GUTTER }}>
            {/* Month labels */}
            <div aria-hidden="true" className="relative h-6">
              {monthLabels.map(({ label, col }) => (
                <span
                  key={`${label}-${col}`}
                  className="absolute top-0 font-mono text-[10px] text-ink-soft"
                  style={{ left: col * PITCH }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Weekday labels + contribution grid */}
            <div className="relative">
              {weekdayRows.map(({ label, row }) => (
                <span
                  key={label}
                  aria-hidden="true"
                  className="absolute font-mono text-[10px] leading-[19px] text-ink-soft"
                  style={{ left: -GUTTER, top: row * PITCH - 1 }}
                >
                  {label}
                </span>
              ))}

              <div
                role="img"
                aria-label={`${CONTRIBUTIONS_TOTAL} GitHub contributions in the last year`}
                className="grid"
                style={{
                  gridTemplateRows: `repeat(7, ${CELL}px)`,
                  gridAutoFlow: 'column',
                  gridAutoColumns: `${CELL}px`,
                  gap: `${GAP}px`,
                }}
              >
                {CONTRIBUTIONS_DAYS.map(([count, level], idx) => {
                  const date = addDays(start, idx)
                  return (
                    <span
                      key={date.toISOString()}
                      title={dayLabel(date, count)}
                      aria-hidden="true"
                      className="block rounded-[3px]"
                      style={{ backgroundColor: BEIGE[level] ?? BEIGE[0] }}
                    />
                  )
                })}
              </div>
            </div>

            <p className="mt-8 font-mono text-[11px] tracking-[0.15em] text-ink-soft uppercase">
              Data snapshot · {CONTRIBUTIONS_FETCHED} · github.com/Arnav876
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
