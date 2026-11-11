import { useState, type ReactNode } from 'react'
import { ArrowDown, ArrowUp, Sparkles } from 'lucide-react'
import { cn } from '../../lib/cn'
import { worlds } from '../data/themes'
import type { ScoredCareer } from '../engine/profile'
import { ThemeTag } from './ui'

export function Movement({ from, to }: { from: number; to: number }) {
  if (from < 0 || from > 5) return <span className="inline-flex items-center gap-0.5 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-bold text-teal-700"><Sparkles className="size-3" aria-hidden="true" />New</span>
  if (to < from) return <span className="inline-flex items-center gap-0.5 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-bold text-teal-700"><ArrowUp className="size-3" aria-hidden="true" />Up {from - to}</span>
  if (to > from) return <span className="inline-flex items-center gap-0.5 rounded-full bg-surface px-2 py-0.5 text-[11px] font-bold text-ink-500"><ArrowDown className="size-3" aria-hidden="true" />Down {to - from}</span>
  return <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-bold text-ink-500">Same</span>
}

export function CareerCard({ sc, badge, footer, className, compact }: { sc: ScoredCareer; badge?: ReactNode; footer?: ReactNode; className?: string; compact?: boolean }) {
  const c = sc.career
  const W = worlds[c.world]
  return (
    <article className={cn('flex h-full flex-col rounded-[20px] bg-white p-5 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift', className)} data-testid="career-card" data-career={c.id}>
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-50 to-blue-50 text-2xl" aria-hidden="true">{c.emoji}</span>
        {badge}
      </div>
      <h3 className="mt-3 text-lg font-[650] tracking-[-0.015em]">{c.title}</h3>
      <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-ink-500"><W.icon className="size-3.5" aria-hidden="true" />{W.name}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.oneLiner}</p>
      {!compact && sc.reasons.length > 0 && (
        <div className="mt-3 rounded-xl bg-surface p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-700">Why we suggested it</p>
          <ul className="mt-1 space-y-1 text-[0.8125rem] leading-relaxed text-navy">
            {sc.reasons.map((r) => <li key={r}>• {r}</li>)}
          </ul>
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {c.themes.slice(0, 3).map((t) => <ThemeTag key={t} id={t} quiet={!sc.matched.includes(t)} />)}
      </div>
      {footer && <div className="mt-auto pt-4">{footer}</div>}
    </article>
  )
}

/** The unfamiliar suggestion. Hidden until tapped, so it feels like a reveal. */
export function WildcardCard({ sc, reason }: { sc: ScoredCareer; reason: string }) {
  const [open, setOpen] = useState(false)
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-testid="wildcard"
        className="career-night group relative flex h-full min-h-72 w-full flex-col items-center justify-center overflow-hidden rounded-[20px] p-6 text-center text-white shadow-lift transition-transform hover:-translate-y-1"
      >
        <span className="absolute -right-8 -top-8 size-32 rounded-full bg-white/10 blur-xl" aria-hidden="true" />
        <span className="text-5xl transition-transform duration-500 group-hover:rotate-12" aria-hidden="true">🃏</span>
        <span className="mt-4 text-lg font-bold">Wildcard</span>
        <span className="mt-1 text-sm text-white/80">A career you might never have thought of.</span>
        <span className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy">Tap to reveal</span>
      </button>
    )
  }
  return (
    <div className="h-full animate-pop-in">
      <CareerCard
        sc={{ ...sc, reasons: [reason] }}
        className="ring-2 ring-violet/40"
        badge={<span className="rounded-full bg-violet px-2.5 py-1 text-[11px] font-bold text-white">🃏 Wildcard</span>}
      />
    </div>
  )
}
