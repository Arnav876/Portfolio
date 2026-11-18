import { useCallback, useEffect, useState } from 'react'
import { initLenis, destroyLenis } from './motion/lenis'
import { RouterProvider, useRouter } from './router'
import ProjectsPage from './pages/ProjectsPage'
import Hero from './components/Hero'
import Features from './components/Features'
import HorizontalScroll from './components/HorizontalScroll'
import EnterProjects from './components/EnterProjects'
import CodeActivity from './components/CodeActivity'
import Story from './components/Story'
import Contact from './components/Contact'
import Nav from './components/Nav'
import KeyboardNav from './components/KeyboardNav'

function PortfolioContent() {
  const { path } = useRouter()
  // Bumping the hero key remounts Hero, so the opening slide
  // replays from the beginning (used by the Backspace shortcut).
  const [heroKey, setHeroKey] = useState(0)
  const replayHome = useCallback(() => setHeroKey((k) => k + 1), [])

  if (path === '/projects' || path.startsWith('/projects/')) {
    return (
      <>
        <KeyboardNav onReplayHome={replayHome} />
        <ProjectsPage />
      </>
    )
  }

  return (
    <>
      <KeyboardNav onReplayHome={replayHome} />
      <main id="top" className="min-h-screen bg-paper font-body text-ink">
        {/* Fixed top nav — Skills / Journey / Projects / Contact + Back to top */}
        <Nav />

        {/* Scene 1 — Hero transition opening */}
        <Hero key={heroKey} />

        {/* ENTER key + projects teaser — right after the intro.
            The horizontal Works gallery no longer lives on the home
            page; it is only on the /projects page. */}
        <EnterProjects />

        {/* Features bento grid — skills */}
        <Features />

        {/* Horizontal scrolling section — after Features */}
        <HorizontalScroll />

        {/* GitHub contributions graph — between Sideways and Story */}
        <CodeActivity />

        {/* Story pinned scroll — between Sideways and Contact */}
        <Story />

        {/* Scene 4 — Contact */}
        <Contact />
      </main>
    </>
  )
}

export default function App() {
  // Lenis smooth scroll, driven by the GSAP ticker (see src/motion/lenis.ts)
  useEffect(() => {
    initLenis()
    return () => {
      destroyLenis()
    }
  }, [])

  return (
    <RouterProvider>
      <PortfolioContent />
    </RouterProvider>
  )
}
