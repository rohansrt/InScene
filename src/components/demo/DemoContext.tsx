import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { DemoDialog } from './DemoDialog'

interface Ctx {
  openDemo: (trigger?: HTMLElement | null) => void
}

const DemoCtx = createContext<Ctx | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const triggerRef = useRef<HTMLElement | null>(null)
  const { key } = useLocation()
  // Tied to the location it was opened at: navigating (e.g. via the dialog's catalog link) closes it.
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === key

  const openDemo = useCallback(
    (trigger?: HTMLElement | null) => {
      triggerRef.current = trigger ?? null
      setOpenAt(key)
    },
    [key],
  )
  const value = useMemo(() => ({ openDemo }), [openDemo])

  return (
    <DemoCtx.Provider value={value}>
      {children}
      {open && <DemoDialog onClose={() => setOpenAt(null)} returnFocusRef={triggerRef} />}
    </DemoCtx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDemo() {
  const ctx = useContext(DemoCtx)
  if (!ctx) throw new Error('useDemo must be used inside DemoProvider')
  return ctx
}
