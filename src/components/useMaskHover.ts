import { useEffect, useRef } from 'react'

/**
 * Mask hover — a roughly circular reveal that trails the pointer
 * with smoothing/lag (Framer "Hover Mask Reveal" style).
 *
 * The element gets `--mx` / `--my` (px, relative to itself) updated
 * from a lerped pointer position, and the `mask-active` class while
 * the pointer is over it. A child layer with the `.mask-reveal`
 * class is clipped to a soft circle at that point, so it appears
 * only under the cursor.
 *
 * Scroll-safe: the pointer target is stored in client coordinates
 * and the element's bounding rect is read fresh on every frame,
 * so the mask keeps tracking while the page scrolls. If the
 * pointer ends up outside the element (e.g. scrolled away), the
 * mask switches off.
 *
 * Touch devices (no fine pointer) and prefers-reduced-motion:
 * the masked layer simply stays hidden.
 */
export function useMaskHover<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let hovering = false
    // Pointer target in client coordinates; current mask position
    // relative to the element. -9999 = not placed yet.
    const target = { x: -9999, y: -9999 }
    const current = { x: -9999, y: -9999 }

    const stop = () => {
      hovering = false
      el.classList.remove('mask-active')
      cancelAnimationFrame(raf)
    }

    const loop = () => {
      const rect = el.getBoundingClientRect()
      const tx = target.x - rect.left
      const ty = target.y - rect.top

      // Pointer drifted off the element (e.g. page scrolled it
      // away) — switch the mask off.
      if (tx < -40 || ty < -40 || tx > rect.width + 40 || ty > rect.height + 40) {
        stop()
        return
      }

      if (current.x < -9000) {
        current.x = tx
        current.y = ty
      } else {
        // Lerp — the trailing lag behind the cursor.
        current.x += (tx - current.x) * 0.14
        current.y += (ty - current.y) * 0.14
      }
      el.style.setProperty('--mx', `${current.x.toFixed(1)}px`)
      el.style.setProperty('--my', `${current.y.toFixed(1)}px`)
      if (hovering) raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!hovering) {
        hovering = true
        el.classList.add('mask-active')
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(loop)
      }
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', stop)
    return () => {
      stop()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', stop)
    }
  }, [])

  return ref
}
