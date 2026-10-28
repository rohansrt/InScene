import { useEffect } from 'react'

const BASE = 'InScene'

export function useDocumentTitle(title: string | undefined, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : `${BASE} · Step Into the Situation`
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}
