import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let lenis: Lenis | null = null
let tick: ((time: number) => void) | null = null

/**
 * Initializes smooth scroll with Lenis and synchronizes it with GSAP's ticker and ScrollTrigger.
 */
export function initLenis(): Lenis | null {
  if (lenis || typeof window === 'undefined') return lenis

  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    anchors: true,
  })

  // Update ScrollTrigger on every Lenis scroll event
  lenis.on('scroll', ScrollTrigger.update)

  // Drive Lenis updates directly through GSAP's RAF ticker
  tick = (time: number) => {
    lenis?.raf(time * 1000)
  }
  gsap.ticker.add(tick)

  // Disable lag smoothing to prevent scroll jitter or desync
  gsap.ticker.lagSmoothing(0)

  return lenis
}

/**
 * Cleans up Lenis and removes ticker listener.
 */
export function destroyLenis() {
  if (tick) {
    gsap.ticker.remove(tick)
    tick = null
  }
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}

export function getLenis(): Lenis | null {
  return lenis
}
