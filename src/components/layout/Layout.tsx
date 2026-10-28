import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DemoProvider } from '../demo/DemoContext'
import { SimulationModalProvider } from '../simulation/SimulationModalContext'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

function RouteEffects({ mainRef }: { mainRef: React.RefObject<HTMLElement | null> }) {
  const { pathname, hash } = useLocation()
  const prevPath = useRef(pathname)
  useEffect(() => {
    // Only real page changes reset scroll/focus; query-string changes (filters, ?sim=) do not.
    if (prevPath.current === pathname) return
    prevPath.current = pathname
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname, hash, mainRef])
  useEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash, pathname])
  return null
}

export function Layout() {
  const mainRef = useRef<HTMLElement>(null)
  return (
    <DemoProvider>
      <SimulationModalProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy focus:shadow-lift"
        >
          Skip to content
        </a>
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <RouteEffects mainRef={mainRef} />
      </SimulationModalProvider>
    </DemoProvider>
  )
}
