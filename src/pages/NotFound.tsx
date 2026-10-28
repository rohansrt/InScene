import { useEffect } from 'react'
import { ButtonLink } from '../components/ui/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Page not found')
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])
  return (
    <div className="container-site flex flex-col items-center py-28 text-center sm:py-36">
      <p className="eyebrow">404</p>
      <h1 className="h2 mt-3">This scene doesn’t exist.</h1>
      <p className="lead mt-4 max-w-md text-ink-500">The page you were looking for may have moved. Try one of these instead.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink to="/">Go home</ButtonLink>
        <ButtonLink to="/products" variant="secondary">
          Explore simulations
        </ButtonLink>
      </div>
    </div>
  )
}
