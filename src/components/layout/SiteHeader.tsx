import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Play, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { useDemo } from '../demo/DemoContext'
import { useScrollLock } from '../../hooks/useScrollLock'
import { navItems } from '../../config/nav'


export function SiteHeader() {
  const { openDemo } = useDemo()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  // Menu state is tied to the location it was opened at, so any navigation closes it.
  const [menuOpenAt, setMenuOpenAt] = useState<string | null>(null)
  const menuOpen = menuOpenAt === location.key
  const setMenuOpen = (open: boolean) => setMenuOpenAt(open ? location.key : null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useScrollLock(menuOpen)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpenAt(null)
    // The sheet is hidden at md+, so crossing the breakpoint closes it (and releases the scroll lock).
    const mq = window.matchMedia('(min-width: 768px)')
    const onMq = () => mq.matches && setMenuOpenAt(null)
    // Keep keyboard focus inside the header + sheet while it covers the page.
    const covered = document.querySelectorAll<HTMLElement>('#main, footer')
    covered.forEach((el) => el.setAttribute('inert', ''))
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
      covered.forEach((el) => el.removeAttribute('inert'))
    }
  }, [menuOpen])

  return (
    <>
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-200',
        scrolled || menuOpen
          ? 'bg-white/85 shadow-[0_1px_0_rgb(16_36_58/0.08)] backdrop-blur-xl backdrop-saturate-150'
          : 'bg-white/0',
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link to="/" className="-m-1 rounded-lg p-1" aria-label="InScene home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex h-9 items-center rounded-lg px-3.5 text-sm font-medium transition-colors',
                      isActive ? 'bg-blue-50 font-semibold text-blue-700' : 'text-ink-500 hover:bg-surface hover:text-navy',
                      isActive &&
                        'after:absolute after:inset-x-3.5 after:-bottom-[13px] after:h-[3px] after:rounded-full after:bg-blue',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={(e) => openDemo(e.currentTarget)} data-testid="play-a-demo">
            <Play className="size-3.5 fill-current" aria-hidden="true" />
            Play a Demo
          </Button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-navy hover:bg-surface md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? 'mobile-menu' : undefined}
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="menu-toggle"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

    </header>
      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-30 animate-fade-in bg-white md:hidden">
          <nav aria-label="Mobile" className="container-site pt-4">
            <ul className="divide-y divide-line border-y border-line">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        'flex h-14 items-center justify-between text-lg font-medium',
                        isActive ? 'text-blue' : 'text-navy',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && <span className="size-2 rounded-full bg-blue" aria-hidden="true" />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}
