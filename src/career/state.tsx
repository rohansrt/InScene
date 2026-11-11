import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { CareerContext, freshState, load, save } from './store'
import type { CareerState } from './types'

export function CareerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CareerState>(load)
  useEffect(() => {
    save(state)
  }, [state])
  const update = useCallback((fn: (s: CareerState) => CareerState) => setState((s) => fn(s)), [])
  const reset = useCallback(() => setState(freshState()), [])
  const value = useMemo(() => ({ state, update, reset }), [state, update, reset])
  return <CareerContext.Provider value={value}>{children}</CareerContext.Provider>
}
