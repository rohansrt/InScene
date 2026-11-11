import { useEffect, useRef, useState } from 'react'

/** Shows "before → after" when a value changes, like a scoreboard. */
export function useDelta(value: number) {
  const prev = useRef(value)
  const [delta, setDelta] = useState<{ from: number; to: number; key: number } | null>(null)
  useEffect(() => {
    if (prev.current !== value) {
      setDelta({ from: prev.current, to: value, key: Date.now() })
      prev.current = value
      const t = window.setTimeout(() => setDelta(null), 2600)
      return () => window.clearTimeout(t)
    }
  }, [value])
  return delta
}
