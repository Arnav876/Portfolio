import { useRouter } from '../router'

const PROJECT_NAMES = ['Sugar Guard', 'Inventory Tracker', 'GrocAI Engine', 'NyayaSetu']

/**
 * ENTER key + projects teaser — a slim strip, the gateway to the
 * /projects page. A keyboard-key styled ENTER button (clicking it
 * opens the /projects page) paired with the four project names as
 * chips. Pressing the physical Enter key anywhere on the home page
 * does the same (see KeyboardNav).
 */
export default function EnterProjects() {
  const { navigate } = useRouter()

  return (
    <section
      aria-label="Open the projects page"
      className="relative bg-paper px-5 py-10 text-ink md:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/15 bg-paper-2/40 px-5 py-4 md:px-6">
        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="group flex items-center gap-3 text-left"
          aria-label="Open the projects page"
        >
          <kbd className="inline-flex h-9 items-center rounded-lg border border-ink/25 bg-paper px-3 font-mono text-xs font-semibold tracking-wider text-ink shadow-[0_3px_0_rgb(10_10_10/0.25)] transition-all duration-150 group-hover:border-accent-deep group-hover:text-accent-deep group-active:translate-y-[2px] group-active:shadow-none">
            ENTER
          </kbd>
          <span className="font-mono text-[11px] tracking-[0.2em] text-ink-soft uppercase transition-colors group-hover:text-ink">
            Open the projects page
          </span>
        </button>

        <ul className="flex flex-wrap items-center gap-2">
          {PROJECT_NAMES.map((name) => (
            <li
              key={name}
              className="rounded-full border border-ink/15 bg-paper px-3 py-1 font-mono text-[11px] tracking-wider text-ink-soft"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
