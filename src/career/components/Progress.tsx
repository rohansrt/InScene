import { Link } from 'react-router-dom'
import { ArrowRight, Check, Lock } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'
import { roles, roleOrder } from '../data/mission'
import { profile, shortlist } from '../engine/profile'
import { comingSoon, coreDone, missionDone, missionStarted, passportStamps, profileStatus } from '../engine/results'
import type { CareerState } from '../types'
import { CityMap } from './CityMap'
import { Hexagon } from './Hexagon'
import { LockedStamp, Stamp, ThemeTag } from './ui'
import { useOpenRainReady } from './useOpenRainReady'

/** The row of Passport stamps: the core profile first, then one per simulation. */
export function PassportStamps({ state, animate, className }: { state: CareerState; animate?: string; className?: string }) {
  const stamps = passportStamps(state)
  return (
    <ul className={cn('-mx-1 flex items-center gap-4 overflow-x-auto px-1 py-2 max-sm:snap-x sm:flex-wrap sm:gap-5 sm:overflow-visible', className)} aria-label="Passport stamps" data-testid="passport-stamps">
      {stamps.map((st) => (
        <li key={st.id} data-stamp={st.id} data-earned={st.earned} className="shrink-0 snap-start">
          {st.earned ? <Stamp label={st.label} sub={st.sub} color={st.color} animate={animate === st.id} /> : <LockedStamp label={st.label} sub={st.sub === 'Coming soon' ? 'Soon' : 'Not yet'} />}
        </li>
      ))}
    </ul>
  )
}

export function StampCount({ state }: { state: CareerState }) {
  const stamps = passportStamps(state)
  const earned = stamps.filter((s) => s.earned).length
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-28 overflow-hidden rounded-full bg-surface" aria-hidden="true">
        <div className="h-full rounded-full bg-violet transition-[width] duration-700" style={{ width: `${(earned / stamps.length) * 100}%` }} />
      </div>
      <span className="text-sm font-semibold tabular-nums text-navy">{earned} of {stamps.length} stamps</span>
    </div>
  )
}

/** The choice of what to explore after the core profile. Every simulation is optional. */
export function SimulationPicker({ state }: { state: CareerState }) {
  const open = useOpenRainReady()
  const done = missionDone(state)
  const started = missionStarted(state)
  const list = shortlist(state, done)
  const tested = list.ranked.slice(0, 6).find((c) => c.career.role)

  return (
    <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]" data-testid="simulation-picker">
      <article className="career-night relative flex flex-col overflow-hidden rounded-[24px] p-6 text-white shadow-lift sm:p-7">
        <span className="absolute -right-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="relative flex items-start justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">Simulation · 15 min · Earth · Society · Build</p>
          {done && <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber px-2.5 py-1 text-[11px] font-bold uppercase text-navy"><Check className="size-3" strokeWidth={3} aria-hidden="true" />Stamped</span>}
          {!done && started && <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold uppercase">In progress</span>}
        </div>
        <h3 className="relative mt-2 text-[clamp(1.6rem,1.5vw+1rem,2.1rem)] font-[700] tracking-[-0.03em] text-white">Rain Ready 🌧️</h3>
        <p className="relative mt-2 leading-relaxed text-white/85">Ward 12 floods every monsoon. With ₹50 lakh and 12 weeks, find out whether investigating, listening or designing feels most like you.</p>
        <ul className="relative mt-4 flex flex-wrap gap-1.5">
          {roleOrder.map((r) => <li key={r} className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-inset ring-white/15">{roles[r].title}</li>)}
        </ul>
        {tested && !done && (
          <p className="relative mt-4 rounded-xl bg-white/10 p-3 text-sm text-white/90">✦ <strong>{tested.career.title}</strong> is on your list. This simulation lets you try that work for real.</p>
        )}
        <CityMap className="relative mt-5 border-white/20 shadow-lift" />
        <div className="relative mt-auto pt-6">
          <Button size="lg" variant="secondary" onClick={open} data-testid="play-rain-ready">
            {done ? 'See my Rain Ready results' : started ? 'Continue Rain Ready' : 'Play Rain Ready'} <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </article>

      <div className="rounded-[24px] border border-line bg-white/80 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">More simulations, coming soon</p>
        <ul className="mt-3 space-y-2">
          {comingSoon.map((m) => (
            <li key={m.title} className="flex items-start gap-3 rounded-2xl bg-surface/70 p-3">
              <span className="text-2xl leading-none" aria-hidden="true">{m.emoji}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-navy">{m.title}</span>
                <span className="block text-xs leading-relaxed text-ink-500">{m.blurb}</span>
                <span className="mt-0.5 block text-[11px] font-medium text-ink-400">{m.worlds} · {m.time}</span>
              </span>
              <Lock className="mt-0.5 size-4 shrink-0 text-ink-400" aria-label="Coming soon" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** A short view of the current profile: it updates as simulations are finished. */
export function ProfileSnapshot({ state }: { state: CareerState }) {
  if (!coreDone(state)) return null
  const withMission = missionDone(state)
  const p = profile(state, withMission)
  const list = shortlist(state, withMission)
  const status = profileStatus(state)
  return (
    <section className="grid gap-5 rounded-[24px] bg-white p-5 shadow-card sm:grid-cols-[240px_1fr] sm:p-6" data-testid="profile-snapshot">
      <Hexagon now={p.norm} before={withMission ? profile(state, false).norm : undefined} counts={p.counts} size={240} className="mx-auto" nowLabel="Now" beforeLabel="Core profile" />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold">Your career profile</h2>
          <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', status.tone === 'teal' ? 'bg-teal-50 text-teal-700' : 'bg-amber-50 text-amber-700')}>
            <span className={cn('size-1.5 rounded-full', status.tone === 'teal' ? 'bg-teal' : 'bg-amber')} aria-hidden="true" />{status.label}
          </span>
        </div>
        <p className="mt-1 text-sm text-ink-500">{status.detail}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{p.top.slice(0, 3).map((t) => <ThemeTag key={t} id={t} />)}</div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">Careers to explore</p>
        <ul className="mt-1.5 flex flex-wrap gap-1.5">
          {[...list.picks, ...(list.wildcard ? [list.wildcard] : [])].map((c, i) => (
            <li key={c.career.id} className={cn('rounded-full px-3 py-1 text-sm font-medium text-navy', i === 3 ? 'bg-amber-50 ring-1 ring-inset ring-amber/30' : 'bg-surface')}>
              <span aria-hidden="true">{c.career.emoji}</span> {c.career.title}{i === 3 && <span className="text-xs text-amber-700"> · Wildcard</span>}
            </li>
          ))}
        </ul>
        <Link to="/career/play" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:underline">See my full profile <ArrowRight className="size-4" aria-hidden="true" /></Link>
      </div>
    </section>
  )
}
