import { BookMarked, CircleQuestionMark } from 'lucide-react'
import { ButtonLink } from '../../components/ui/Button'
import { cn } from '../../lib/cn'
import { CareerCard, WildcardCard } from '../components/CareerCard'
import { Hexagon } from '../components/Hexagon'
import { PassportStamps, SimulationPicker } from '../components/Progress'
import { Stamp, ThemeTag } from '../components/ui'
import { themes, worldOrder, worlds } from '../data/themes'
import { profile, shortlist, unknowns } from '../engine/profile'
import { missionDone, missionWorlds, profileStatus, worldGlow } from '../engine/results'
import { useCareer } from '../store'
import type { WorldId } from '../types'

export function WorldMap({ glow, visited = [] }: { glow: Record<WorldId, number>; visited?: WorldId[] }) {
  // Rank-based tiers keep the map readable: 2 bright, 2 glowing, 3 dim, 3 foggy.
  const order = [...worldOrder].sort((a, b) => glow[b] - glow[a])
  const tier = (id: WorldId) => {
    const r = order.indexOf(id)
    return glow[id] <= 0 ? 0 : r < 2 ? 3 : r < 4 ? 2 : r < 7 ? 1 : 0
  }
  const words = ['Foggy', 'Dim', 'Glowing', 'Bright']
  return (
    <div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5" aria-label="Career worlds, by how much of what you enjoy shows up there">
        {worldOrder.map((id) => {
          const w = worlds[id]
          const t = tier(id)
          return (
            <li
              key={id}
              className={cn(
                'relative flex flex-col gap-2 overflow-hidden rounded-2xl p-3 transition-colors',
                t === 3 ? 'career-night text-white shadow-lift' : t === 2 ? 'bg-violet-100 text-navy' : t === 1 ? 'bg-violet-50 text-navy' : 'bg-surface text-ink-500',
              )}
            >
              {t === 0 && <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(rgb(148_163_184/0.25)_1px,transparent_1px)] [background-size:8px_8px]" />}
              <span className="relative flex items-center justify-between">
                <w.icon className="size-5" aria-hidden="true" />
                {visited.includes(id) && <span className="rounded-full bg-amber px-1.5 py-0.5 text-[9px] font-bold uppercase text-navy">Stamped</span>}
              </span>
              <span className="relative text-[0.8125rem] font-semibold leading-tight">{w.name}</span>
              <span className={cn('relative text-[11px] font-medium', t === 3 ? 'text-white/80' : 'text-ink-500')}>{words[t]}</span>
            </li>
          )
        })}
      </ul>
      <p className="mt-2 text-xs text-ink-500">Brighter worlds have more of what you enjoy. Foggy just means “not explored yet”, not “bad for you”.</p>
    </div>
  )
}

/** Core results: the required first part ends here, with the first Passport stamp. */
export function Reveal() {
  const { state } = useCareer()
  const withMission = missionDone(state)
  const p = profile(state, withMission)
  const before = withMission ? profile(state, false) : undefined
  const list = shortlist(state, withMission)
  const glow = worldGlow(list.ranked)
  const unknown = unknowns(state, withMission)
  const status = profileStatus(state)

  return (
    <div className="space-y-6" data-testid="reveal">
      <header className="flex animate-rise-in flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="eyebrow text-violet">Your Career Profile · core complete</p>
          <h1 className="mt-2 text-[clamp(1.9rem,2.4vw+1rem,2.75rem)] font-[680] leading-tight tracking-[-0.03em]">{state.nickname}, here’s where you could start exploring 🗺️</h1>
          <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-ink-600 shadow-xs">
            <span className={cn('size-2 rounded-full', status.tone === 'teal' ? 'bg-teal' : 'bg-amber')} aria-hidden="true" />
            <strong className="font-semibold text-navy">{status.label}</strong> · {status.detail}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 self-start sm:self-auto">
          <Stamp label="Career Profile" sub="Core" color="#2a78d6" animate={!withMission} />
          <p className="max-w-36 text-xs leading-relaxed text-ink-500 max-sm:hidden">First stamp earned. Saved to your Passport.</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold">Your interest shape</h2>
          <Hexagon now={p.norm} before={before?.norm} counts={p.counts} className="mx-auto mt-2" size={320} nowLabel="Now" beforeLabel="Core profile" />
          {p.top.length > 0 && (
            <div className="mt-3 space-y-2">
              {p.top.slice(0, 2).map((t) => (
                <div key={t} className="flex items-start gap-3 rounded-xl p-3" style={{ background: themes[t].tint }}>
                  <ThemeTag id={t} className="bg-white" />
                  <p className="text-sm leading-relaxed text-navy">{themes[t].line}</p>
                </div>
              ))}
            </div>
          )}
          <p className="mt-3 text-xs leading-relaxed text-ink-500">Most people mix several themes. An architect mixes Create and Make. A doctor mixes Help and Discover.</p>
        </section>

        <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold">Your Career Map</h2>
          <p className="mt-1 text-sm text-ink-500">Ten worlds of work. We start broad, then zoom in.</p>
          <div className="mt-4"><WorldMap glow={glow} visited={withMission ? missionWorlds : []} /></div>
        </section>
      </div>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-[650] tracking-[-0.02em]">4 careers to explore</h2>
            <p className="mt-1 text-sm text-ink-500">Three that fit what you enjoy, plus one wildcard to stretch your map.{withMission ? ' Updated with what you did in Rain Ready.' : ''}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.picks.map((sc, i) => (
            <div key={sc.career.id} className="animate-rise-in" style={{ animationDelay: `${i * 90}ms` }}>
              <CareerCard sc={sc} />
            </div>
          ))}
          {list.wildcard && <WildcardCard sc={list.wildcard} reason={list.wildcardReason} />}
        </div>
      </section>

      <section className="rounded-[22px] border border-dashed border-violet/30 bg-white/70 p-5 sm:p-6">
        <h2 className="flex items-center gap-2 font-semibold text-navy"><CircleQuestionMark className="size-5 text-violet" aria-hidden="true" />What we don’t know yet</h2>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-600">
          {unknown.map((u) => <li key={u}>• {u}</li>)}
        </ul>
      </section>

      <section className="space-y-4" aria-labelledby="next-sim">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-violet">{withMission ? 'Keep exploring' : 'What next? You choose'}</p>
            <h2 id="next-sim" className="mt-1.5 text-[clamp(1.5rem,1.5vw+1rem,2rem)] font-[680] tracking-[-0.03em]">Try the work in a simulation</h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-600">Play them in any order, any time. Each one earns a stamp and sharpens your profile, because doing the work tells us more than answering cards.</p>
          </div>
          <ButtonLink to="/career/passport" variant="secondary" className="shrink-0"><BookMarked className="size-4" aria-hidden="true" />Open my Passport</ButtonLink>
        </div>
        <SimulationPicker state={state} />
        <div className="rounded-[22px] bg-white/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Your Passport stamps</p>
          <PassportStamps state={state} className="mt-3" />
        </div>
      </section>
    </div>
  )
}
