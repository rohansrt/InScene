import { useEffect, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { BookMarked, LogOut } from 'lucide-react'
import { Logo } from '../components/ui/Logo'
import { cn } from '../lib/cn'
import { CareerProvider } from './state'
import { useCareer } from './store'

const coreTrail = [
  { id: 'welcome', label: 'Me' },
  { id: 'quickstart', label: 'Quick Start' },
  { id: 'reveal', label: 'My profile' },
]
const missionTrail = [
  { id: 'team', label: 'Team' },
  { id: 'mission', label: 'Mission' },
  { id: 'reflect', label: 'Reflect' },
  { id: 'results', label: 'Results' },
]

function Trail({ mission }: { mission: boolean }) {
  const { state } = useCareer()
  const steps = mission ? missionTrail : coreTrail
  const at = mission ? (state.missionStage ?? 'team') : state.stage
  const current = steps.findIndex((t) => t.id === at)
  return (
    <ol className="hidden items-center gap-1 lg:flex" aria-label={mission ? 'Rain Ready progress' : 'Core profile progress'}>
      {mission && <li className="mr-1 text-xs font-semibold text-ink-500">Rain Ready</li>}
      {steps.map((t, i) => (
        <li key={t.id} className="flex items-center gap-1">
          <span
            aria-current={i === current ? 'step' : undefined}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-semibold transition-colors',
              i === current ? 'bg-violet text-white' : i < current ? 'text-violet-700' : 'text-ink-400',
            )}
          >
            {i < current ? '✓ ' : ''}{t.label}
          </span>
          {i < steps.length - 1 && <span aria-hidden="true" className={cn('h-px w-4', i < current ? 'bg-violet/50' : 'bg-line')} />}
        </li>
      ))}
    </ol>
  )
}

function Shell() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const inCore = pathname.endsWith('/career/play')
  const inMission = pathname.endsWith('/career/rain-ready')
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col career-sky">
      <a href="#career-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy focus:shadow-lift">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/" aria-label="InScene home" className="shrink-0 rounded-lg">
              <Logo markOnly className="sm:hidden" />
              <Logo className="max-sm:hidden" />
            </Link>
            <Link to="/career" className="truncate rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700 ring-1 ring-inset ring-violet/20">
              Career Simulator
            </Link>
          </div>
          {(inCore || inMission) && <Trail mission={inMission} />}
          <nav className="flex shrink-0 items-center gap-1" aria-label="Career Simulator">
            <NavLink
              to="/career/passport"
              className={({ isActive }) => cn('inline-flex h-9 items-center gap-1.5 rounded-[10px] px-3 text-sm font-semibold transition-colors', isActive ? 'bg-violet text-white' : 'text-navy hover:bg-violet-50')}
            >
              <BookMarked className="size-4" aria-hidden="true" />
              <span className="max-sm:sr-only">Passport</span>
            </NavLink>
            <Link to="/products?category=career" className="inline-flex h-9 items-center gap-1.5 rounded-[10px] px-3 text-sm font-medium text-ink-500 hover:bg-surface hover:text-navy">
              <LogOut className="size-4" aria-hidden="true" />
              <span className="max-sm:sr-only">Exit</span>
            </Link>
          </nav>
        </div>
      </header>
      <main id="career-main" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <footer className="px-4 pb-6 pt-10 text-center text-xs text-ink-500">
        A made-up story for learning. Names, places and numbers are pretend. Your answers stay on this device.
      </footer>
    </div>
  )
}

export function CareerLayout() {
  return (
    <CareerProvider>
      <Shell />
    </CareerProvider>
  )
}
