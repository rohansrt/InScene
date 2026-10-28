import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown, LayoutDashboard, TrendingUp, FileChartColumn, Users, PanelsTopLeft, Settings, UserRound, LogIn } from 'lucide-react'
import { Button } from '../ui/Button'

/** Supply the authenticated user when the account service is connected. */
export interface ProfileUser {
  name: string
  imageUrl?: string
}

const items = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Progress', icon: TrendingUp },
  { label: 'Reports', icon: FileChartColumn },
  { label: 'Friends', icon: Users },
  { label: 'Showcase', icon: PanelsTopLeft },
  { label: 'Settings', icon: Settings },
]

export function ProfileMenu({ user, onLogin }: { user?: ProfileUser; onLogin?: () => void }) {
  const location = useLocation()
  const [openAt, setOpenAt] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const open = openAt === location.key
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpenAt(null)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        setOpenAt(null)
        trigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  return (
    <div ref={root} className="relative" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenAt(null)
    }}>
      <button
        ref={trigger}
        type="button"
        aria-label={user ? `${user.name}'s profile` : 'Profile'}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => { setNotice(''); setOpenAt(open ? null : location.key) }}
        className="inline-flex h-9 items-center gap-2 rounded-[10px] border border-line bg-white px-2.5 text-sm font-medium text-navy transition-colors hover:bg-blue-50 sm:px-3.5"
      >
        {user?.imageUrl ? <img src={user.imageUrl} alt="" className="size-6 rounded-full object-cover" /> : <UserRound className="size-4" aria-hidden="true" />}
        <span className="hidden max-w-24 truncate lg:inline">{user?.name ?? 'Profile'}</span>
        <ChevronDown className={`hidden size-3.5 transition-transform sm:block ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div id={id} className="absolute right-0 top-full z-50 mt-3 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-line bg-white p-3 shadow-lift">
          <div className="border-b border-line px-1 pb-3">
            {user ? (
              <div className="flex items-center gap-3 p-2">
                {user.imageUrl ? <img src={user.imageUrl} alt="" className="size-10 rounded-full object-cover" /> : <UserRound className="size-8 text-blue" aria-hidden="true" />}
                <div className="min-w-0"><p className="truncate font-semibold text-navy">{user.name}</p><p className="text-xs text-ink-500">Your learning space</p></div>
              </div>
            ) : (
              <Button variant="dark" className="w-full" onClick={() => onLogin ? onLogin() : setNotice('Login and sign up are coming soon.')}>
                <LogIn className="size-4" aria-hidden="true" /> Login / Sign up
              </Button>
            )}
          </div>
          <nav aria-label="Profile" className="py-2">
            {items.map(({ label, icon: Icon }) => (
              <button key={label} type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-navy transition-colors hover:bg-blue-50" onClick={() => setNotice(`${label} is coming soon.`)}>
                <Icon className="size-[18px] text-ink-500" aria-hidden="true" />{label}
              </button>
            ))}
          </nav>
          <p role="status" className="border-t border-line px-3 pb-1 pt-3 text-xs leading-relaxed text-ink-500">{notice || 'Your learning space is coming soon.'}</p>
        </div>
      )}
    </div>
  )
}
