import { useEffect } from 'react'

let locks = 0

/** Locks body scroll while `active`, compensating for the scrollbar to avoid layout shift. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const body = document.body
    if (locks++ === 0) {
      const scrollbar = window.innerWidth - document.documentElement.clientWidth
      body.style.overflow = 'hidden'
      if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    }
    return () => {
      if (--locks === 0) {
        body.style.overflow = ''
        body.style.paddingRight = ''
      }
    }
  }, [active])
}
