import { useState, useEffect } from 'react'

/**
 * Returns true when the given CSS media query matches, updating reactively on
 * viewport changes. Safe to call during SSR — returns `false` until the client
 * hydrates.
 *
 * @example
 * const isWide = useMediaQuery('(min-width: 768px)')
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * Returns true when the viewport is at least `breakpoint` pixels wide.
 * Defaults to 768px — the same breakpoint `Sidebar` uses for its mobile overlay.
 *
 * Use this to toggle between `Sidebar`'s permanent and mobile-overlay modes:
 *
 * @example
 * const isDesktop = useIsDesktop()
 * const [mobileOpen, setMobileOpen] = useState(false)
 *
 * <AppBar onMenuClick={isDesktop ? undefined : () => setMobileOpen(o => !o)} />
 * <Sidebar
 *   {...(isDesktop ? {} : { mobileOpen, onMobileOpenChange: setMobileOpen })}
 * />
 */
export const useIsDesktop = (breakpoint = 768): boolean =>
  useMediaQuery(`(min-width: ${breakpoint}px)`)
