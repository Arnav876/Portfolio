import { useRef } from 'react'
import { gsap } from '../motion/gsap'
import { useGsap } from '../motion/useGsap'
import { Link } from '../router'

/**
 * Top nav — fixed paper pill.
 * Anchor links to Skills / Journey / Projects / Contact, brand + "Top ↑" back to #top.
 * Lenis is configured with anchors: true (see src/motion/lenis.ts),
 * so the anchor jumps are smooth-scrolled. No invented content:
 * the brand is Arnav's own name only.
 */
const LINKS = [
  { label: 'Skills', href: '#features' },
  { label: 'Journey', href: '#sideways' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement | null>(null)

  useGsap(
    () => {
      const nav = navRef.current
      if (!nav) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(nav, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        nav,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.3 },
      )
    },
    navRef,
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        ref={navRef}
        aria-label="Site"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-ink/15 bg-paper/85 py-1.5 pr-1.5 pl-5 shadow-[0_8px_30px_rgb(10_10_10/0.12)] backdrop-blur-md"
      >
        <Link
          href="#top"
          className="mr-2 font-display text-sm font-semibold tracking-tight text-ink"
        >
          Arnav Yadav<span className="text-accent-deep">.</span>
        </Link>

        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full px-3 py-1.5 text-sm text-ink-soft transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
          >
            {link.label}
          </Link>
        ))}

        <a
          href="/Arnav_Yadav_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 hidden rounded-full border border-ink/20 px-3.5 py-1.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent-deep hover:text-accent-deep sm:inline-flex"
        >
          Resume ↗
        </a>

        <a
          href="#top"
          className="ml-1 rounded-full bg-ink px-3.5 py-1.5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-accent-deep"
        >
          Top ↑
        </a>
      </nav>
    </div>
  )
}
