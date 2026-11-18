import { useRef } from 'react'
import { gsap } from '../motion/gsap'
import { useGsap } from '../motion/useGsap'

/**
 * Story — pinned scroll section (between Works and Contact).
 * One dark panel stays pinned while the lines reveal word by word
 * as you scroll. Real copy about Arnav's work — engineering from
 * first principles, predictive AI healthcare, retail stock
 * infrastructure, and building systems that scale.
 */
const LINES = [
  'Engineering software from first principles — data structures, algorithms, and modular backends.',
  'From predictive AI healthcare at hackathons to production-ready retail stock infrastructure.',
  'Relational rigor in the schema. Concurrency in the services. Clarity in the code.',
  'Computer Science student at BMSIT&M, open-source builder, and software engineer ready to build systems that scale.',
]

export default function Story() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGsap(
    () => {
      const section = sectionRef.current
      if (!section) return

      const words = section.querySelectorAll<HTMLElement>('[data-story-word]')

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // No pin, no scrub — every word fully visible at once.
        gsap.set(words, { opacity: 1 })
        gsap.set('[data-story-label]', { opacity: 1, y: 0 })
        return
      }

      gsap.set(words, { opacity: 0.14 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      tl.fromTo(
        '[data-story-label]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.15, ease: 'none' },
      ).to(words, { opacity: 1, duration: 0.7, ease: 'none', stagger: 0.06 }, 0.1)
    },
    sectionRef,
    [],
  )

  return (
    <section
      id="story"
      ref={sectionRef}
      aria-label="The story behind this portfolio"
      className="relative overflow-hidden bg-dark text-paper"
    >
      <div className="flex min-h-screen flex-col justify-center px-5 py-24 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <p
            data-story-label
            className="font-mono text-[11px] tracking-[0.35em] text-paper/50 uppercase"
          >
            03.5 — Story
          </p>

          <p
            data-story-label
            className="mt-6 font-mono text-[11px] tracking-[0.2em] text-accent uppercase"
          >
            Built on first principles, from hackathons to production.
          </p>

          <div className="mt-10 space-y-6 md:space-y-8">
            {LINES.map((line, lineIndex) => (
              <p
                key={lineIndex}
                className={`font-display text-[clamp(1.6rem,4.2vw,3.4rem)] leading-[1.15] font-semibold tracking-[-0.02em] ${
                  lineIndex === LINES.length - 1
                    ? 'font-serif font-normal italic text-accent'
                    : ''
                }`}
              >
                {line.split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} data-story-word className="inline-block">
                    {word}
                    {'\u00A0'}
                  </span>
                ))}
              </p>
            ))}
          </div>

          <p
            data-story-label
            className="mt-12 font-mono text-[11px] tracking-[0.2em] text-paper/50 uppercase"
          >
            Keep scrolling — the story ends at Contact ↓
          </p>
        </div>
      </div>
    </section>
  )
}
