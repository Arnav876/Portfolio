import { useEffect } from 'react'
import { useRouter } from '../router'
import { ScrollTrigger } from '../motion/gsap'

/**
 * Global keyboard navigation + always-visible Backspace hint.
 *
 * - ENTER (on the home page): opens the /projects page.
 * - BACKSPACE (anywhere): goes back to the home page and restarts
 *   the complete opening slide from the top — the hero remounts
 *   (fresh key) so the full intro replays from the beginning.
 *
 * Focus guards: the keys never hijack normal keyboard use — they
 * are ignored while typing in an input/textarea/select, while a
 * modifier key is held, and (for both keys) while focus is on a
 * link or button, so the focused control handles the key instead.
 * Backspace also preventDefaults so the browser never does its
 * own thing with it.
 */
export default function KeyboardNav({ onReplayHome }: { onReplayHome: () => void }) {
  const { path, navigate } = useRouter()

  useEffect(() => {
    const isEditableTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null
      if (!el) return false
      if (el.isContentEditable) return true
      const tag = el.tagName
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
    }

    const isInteractiveTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null
      if (!el || typeof el.closest !== 'function') return false
      return el.closest('a, button, [role="button"]') !== null
    }

    const goHomeAndReplay = () => {
      // Bump the hero key first: the hero remounts fresh, so the
      // opening slide replays from the beginning. navigate() then
      // scrolls to the top.
      onReplayHome()
      navigate('/')
      window.setTimeout(() => ScrollTrigger.refresh(), 200)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (isEditableTarget(e.target)) return

      if (e.key === 'Enter') {
        // Let a focused link/button handle Enter itself.
        if (isInteractiveTarget(e.target)) return
        if (path === '/' || path === '') {
          e.preventDefault()
          navigate('/projects')
        }
        return
      }

      if (e.key === 'Backspace') {
        if (isInteractiveTarget(e.target)) return
        e.preventDefault()
        goHomeAndReplay()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [path, navigate, onReplayHome])

  return (
    <button
      type="button"
      onClick={() => {
        onReplayHome()
        navigate('/')
        window.setTimeout(() => ScrollTrigger.refresh(), 200)
      }}
      aria-label="Back to home — press Backspace"
      title="Backspace — back to home"
      className="fixed top-1/2 left-3 z-40 flex -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-ink/15 bg-paper/85 px-2 py-3 shadow-[0_8px_30px_rgb(10_10_10/0.12)] backdrop-blur-md transition-colors hover:border-accent-deep"
    >
      <kbd className="flex h-7 w-7 items-center justify-center rounded-md border border-ink/20 bg-paper font-mono text-sm text-ink shadow-[0_2px_0_rgb(10_10_10/0.25)]">
        &#9003;
      </kbd>
      <span className="font-mono text-[10px] tracking-[0.2em] text-ink-soft uppercase [writing-mode:vertical-rl]">
        Back to home
      </span>
    </button>
  )
}
