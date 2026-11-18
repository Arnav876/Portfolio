import { useLayoutEffect, useEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from './gsap'

// Safe isomorphic layout effect for browser and SSR environments
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export type GsapContextCallback = (context: gsap.Context) => void | (() => void)

/**
 * React hook that wraps GSAP animations in gsap.context().
 * Scopes selector queries to the given scope and guarantees that timelines,
 * ScrollTriggers, pins, and event listeners are cleanly reverted on unmount / React StrictMode.
 */
export function useGsap(
  setup: GsapContextCallback,
  scope?: RefObject<HTMLElement | null> | HTMLElement | null,
  deps: DependencyList = []
) {
  useIsomorphicLayoutEffect(() => {
    const scopeElement = scope && 'current' in scope ? scope.current : scope
    let cleanup: void | (() => void)

    const ctx = gsap.context((self) => {
      cleanup = setup(self)
    }, scopeElement ?? undefined)

    return () => {
      if (typeof cleanup === 'function') {
        cleanup()
      }
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
