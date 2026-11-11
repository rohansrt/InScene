import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import ReachOut from './pages/ReachOut'
import RouteError from './pages/RouteError'

// The Career Simulator is its own experience with its own layout, loaded on demand.
const CareerLayout = lazy(() => import('./career/CareerLayout').then((m) => ({ default: m.CareerLayout })))
const CareerHome = lazy(() => import('./career/pages/CareerHome'))
const Journey = lazy(() => import('./career/pages/Journey'))
const RainReady = lazy(() => import('./career/pages/RainReady'))
const Passport = lazy(() => import('./career/pages/Passport'))
const SchoolView = lazy(() => import('./career/pages/SchoolView'))

function Loading({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="grid min-h-dvh place-items-center text-sm text-ink-500" role="status">Loading…</div>}>
      {children}
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <Products /> },
      { path: '/reach-out', element: <ReachOut /> },
      { path: '/index.html', element: <Navigate to="/" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/career',
    element: <Loading><CareerLayout /></Loading>,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Loading><CareerHome /></Loading> },
      { path: 'play', element: <Loading><Journey /></Loading> },
      { path: 'rain-ready', element: <Loading><RainReady /></Loading> },
      { path: 'passport', element: <Loading><Passport /></Loading> },
      { path: 'school', element: <Loading><SchoolView /></Loading> },
    ],
  },
], { basename: import.meta.env.BASE_URL })

export default function App() {
  return <RouterProvider router={router} />
}
