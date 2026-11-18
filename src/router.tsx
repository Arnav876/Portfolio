import React, { createContext, useContext, useEffect, useState } from 'react'
import { getLenis } from './motion/lenis'
import { ScrollTrigger } from './motion/gsap'

interface RouterContextType {
  path: string
  navigate: (to: string) => void
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
})

function normalizePath(pathname: string, hash: string): string {
  if (hash.startsWith('#/')) {
    return hash.slice(1)
  }
  return pathname || '/'
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(() => {
    if (typeof window === 'undefined') return '/'
    return normalizePath(window.location.pathname, window.location.hash)
  })

  useEffect(() => {
    const handlePopState = () => {
      const newPath = normalizePath(window.location.pathname, window.location.hash)
      setPath(newPath)
      window.scrollTo(0, 0)
      getLenis()?.scrollTo(0, { immediate: true })
      ScrollTrigger.refresh()
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (to: string) => {
    // External or special protocols
    if (
      to.startsWith('http://') ||
      to.startsWith('https://') ||
      to.startsWith('mailto:') ||
      to.startsWith('tel:') ||
      to.endsWith('.pdf')
    ) {
      window.open(to, to.startsWith('http') || to.endsWith('.pdf') ? '_blank' : '_self')
      return
    }

    // Anchor on home page when currently on home page
    if (to.startsWith('#') && !to.startsWith('#/')) {
      const currentNormal = normalizePath(window.location.pathname, window.location.hash)
      if (currentNormal === '/' || currentNormal === '') {
        const el = document.querySelector(to)
        if (el) {
          getLenis()?.scrollTo(el as HTMLElement) ?? el.scrollIntoView({ behavior: 'smooth' })
        }
        return
      }
      // If on /projects and clicking an anchor, navigate to / and scroll to it
      window.history.pushState({}, '', '/' + to)
      setPath('/')
      setTimeout(() => {
        const el = document.querySelector(to)
        if (el) {
          getLenis()?.scrollTo(el as HTMLElement) ?? el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      return
    }

    // Link like "/#features"
    if (to.startsWith('/#')) {
      const anchor = to.slice(1)
      window.history.pushState({}, '', to)
      setPath('/')
      setTimeout(() => {
        const el = document.querySelector(anchor)
        if (el) {
          getLenis()?.scrollTo(el as HTMLElement) ?? el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      return
    }

    // Regular page route (e.g. "/projects" or "/")
    window.history.pushState({}, '', to)
    setPath(to)
    window.scrollTo(0, 0)
    getLenis()?.scrollTo(0, { immediate: true })
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)
  }

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  return useContext(RouterContext)
}

export function Link({
  href,
  children,
  className,
  onClick,
  target,
  rel,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return

    // Allow default browser behaviour for open in new tab / external / downloads
    if (
      target === '_blank' ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.altKey ||
      !href ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.endsWith('.pdf')
    ) {
      return
    }

    e.preventDefault()
    navigate(href)
  }

  return (
    <a href={href} onClick={handleClick} target={target} rel={rel} className={className} {...props}>
      {children}
    </a>
  )
}
