import { useRouteError } from 'react-router-dom'
import { Button } from '../components/ui/Button'

/**
 * Shown instead of React Router's developer error screen when a route throws, e.g. a code
 * chunk that failed to download after a new deploy. Career progress lives in localStorage,
 * so a reload picks up exactly where the student left off.
 */
export default function RouteError() {
  const error = useRouteError()
  if (import.meta.env.DEV) console.error(error)
  const home = import.meta.env.BASE_URL
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-white px-4 py-24 text-center" role="alert">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="h2 mt-3">This scene didn’t load properly.</h1>
      <p className="lead mt-4 max-w-md text-ink-500">Reloading usually fixes it. Your progress is saved on this device, so you won’t lose your place.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => window.location.reload()}>Reload page</Button>
        <Button variant="secondary" onClick={() => window.location.assign(home)}>
          Go home
        </Button>
      </div>
    </div>
  )
}
