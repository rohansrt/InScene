import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getSimulation } from '../../data/simulations'
import { SimulationModal } from './SimulationModal'

interface Ctx {
  openSimulation: (slug: string, trigger?: HTMLElement | null) => void
}

const SimulationModalCtx = createContext<Ctx | null>(null)

/**
 * The open simulation is mirrored to `?sim=<slug>` so links are shareable, refresh
 * restores the preview and the browser Back button closes it.
 */
export function SimulationModalProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const triggerRef = useRef<HTMLElement | null>(null)
  // Guards against double-fired closes (each would otherwise navigate back once more).
  const closingRef = useRef(false)
  // Page scroll at close time; restored afterwards so browser history restoration
  // (e.g. to a #fragment) cannot move the page behind the modal.
  const restoreScroll = useRef<number | null>(null)
  // Navigations commit in a transition; this blocks a second open before the first renders.
  const openingRef = useRef<string | null>(null)
  const simParam = params.get('sim')
  const simulation = getSimulation(simParam)

  useEffect(() => {
    closingRef.current = false
    if (!simParam) openingRef.current = null
    if (!simParam && restoreScroll.current !== null) {
      window.scrollTo({ top: restoreScroll.current, behavior: 'instant' as ScrollBehavior })
      restoreScroll.current = null
      // Re-enable native restoration once this navigation has settled.
      requestAnimationFrame(() => {
        window.history.scrollRestoration = 'auto'
      })
    }
    // Drop unknown slugs from the URL rather than leaving a dead parameter behind.
    if (simParam && !simulation) {
      const next = new URLSearchParams(params)
      next.delete('sim')
      setParams(next, { replace: true, preventScrollReset: true })
    }
  }, [simParam, simulation, params, setParams])

  const openSimulation = useCallback(
    (slug: string, trigger?: HTMLElement | null) => {
      if (params.get('sim') === slug || openingRef.current === slug) return
      openingRef.current = slug
      triggerRef.current = trigger ?? null
      // An in-page #fragment would make the browser jump back to it when the modal
      // closes via history; drop it from the current entry first (scroll is unaffected).
      if (location.hash) navigate({ search: params.toString() }, { replace: true, preventScrollReset: true })
      const next = new URLSearchParams(params)
      next.set('sim', slug)
      navigate(
        { search: next.toString() },
        { state: { simModal: true }, preventScrollReset: true, replace: params.has('sim') },
      )
    },
    [navigate, params, location.hash],
  )

  const close = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    restoreScroll.current = window.scrollY
    if ((location.state as { simModal?: boolean } | null)?.simModal) {
      // Stop the browser re-applying a #fragment scroll when stepping back.
      window.history.scrollRestoration = 'manual'
      navigate(-1)
    } else {
      const next = new URLSearchParams(params)
      next.delete('sim')
      setParams(next, { replace: true, preventScrollReset: true })
    }
  }, [location.state, navigate, params, setParams])

  const value = useMemo(() => ({ openSimulation }), [openSimulation])

  return (
    <SimulationModalCtx.Provider value={value}>
      {children}
      <SimulationModal simulation={simulation} onClose={close} returnFocusRef={triggerRef} />
    </SimulationModalCtx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSimulationModal() {
  const ctx = useContext(SimulationModalCtx)
  if (!ctx) throw new Error('useSimulationModal must be used inside SimulationModalProvider')
  return ctx
}
