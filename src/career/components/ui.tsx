import { useEffect, useRef, useState, type ReactNode } from 'react'
import { BookOpen, Check, Lightbulb, Lock } from 'lucide-react'
import { cn } from '../../lib/cn'
import { facts, proWords } from '../data/facts'
import { people, type Person } from '../data/mission'
import { themes } from '../data/themes'
import { addUnique, useCareer } from '../store'
import type { ThemeId } from '../types'

const avatarTones: Record<Person['tone'], string> = {
  blue: 'bg-blue-50 text-blue-700 ring-blue/20',
  teal: 'bg-teal-50 text-teal-700 ring-teal/25',
  violet: 'bg-violet-50 text-violet-700 ring-violet/20',
  amber: 'bg-amber-50 text-amber-700 ring-amber/25',
  rose: 'bg-rose-50 text-rose-700 ring-rose-700/15',
  slate: 'bg-surface text-navy ring-line',
}

export function Avatar({ id, size = 'md' }: { id: string; size?: 'sm' | 'md' | 'lg' }) {
  const p = people[id]
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center rounded-full font-semibold ring-1 ring-inset',
        avatarTones[p.tone],
        size === 'sm' ? 'size-8 text-[11px]' : size === 'lg' ? 'size-14 text-base' : 'size-10 text-xs',
      )}
    >
      {p.initials}
    </span>
  )
}

/** A character speaking. Quotes are the characters' own words in the story. */
export function Speech({ who, children, className }: { who: string; children: ReactNode; className?: string }) {
  const p = people[who]
  return (
    <div className={cn('flex gap-3', className)}>
      <Avatar id={who} />
      <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-line bg-white px-4 py-3 shadow-xs">
        <p className="text-xs text-ink-500">
          <span className="font-semibold text-navy">{p.name}</span> · {p.role}
        </p>
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-navy">{children}</p>
      </div>
    </div>
  )
}

export function StepCard({ eyebrow, title, task, children, className }: { eyebrow?: ReactNode; title: string; task?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn('animate-rise-in rounded-[22px] bg-white p-5 shadow-card sm:p-7', className)}>
      {eyebrow && <p className="eyebrow text-violet">{eyebrow}</p>}
      <h2 className="mt-1.5 text-[1.5rem] font-[650] leading-tight tracking-[-0.025em] sm:text-[1.75rem]">{title}</h2>
      {task && <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{task}</p>}
      <div className="mt-5">{children}</div>
    </section>
  )
}

/** Big, tappable choice. Works as radio (single) or checkbox (multi). */
export function ChoiceCard({
  selected,
  onClick,
  title,
  detail,
  emoji,
  disabled,
  multi,
  className,
  tone = 'blue',
}: {
  selected: boolean
  onClick: () => void
  title: ReactNode
  detail?: ReactNode
  emoji?: string
  disabled?: boolean
  multi?: boolean
  className?: string
  tone?: 'blue' | 'violet'
}) {
  return (
    <button
      type="button"
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'group flex w-full items-start gap-3 rounded-2xl border bg-white p-4 text-left transition-[border-color,box-shadow,background-color,transform] duration-150 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50',
        selected
          ? tone === 'violet'
            ? 'border-violet bg-violet-50/70 shadow-[0_0_0_1px_var(--color-violet)]'
            : 'border-blue bg-blue-50/70 shadow-[0_0_0_1px_var(--color-blue)]'
          : 'border-line hover:border-ink-400/60 hover:shadow-xs',
        className,
      )}
    >
      {emoji && <span className="text-2xl leading-none" aria-hidden="true">{emoji}</span>}
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-semibold leading-snug text-navy">{title}</span>
        {detail && <span className="mt-1 block text-sm leading-relaxed text-ink-500">{detail}</span>}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'mt-0.5 grid size-5 shrink-0 place-items-center border-2 transition-colors',
          multi ? 'rounded-md' : 'rounded-full',
          selected ? (tone === 'violet' ? 'border-violet bg-violet text-white' : 'border-blue bg-blue text-white') : 'border-ink-400/50',
        )}
      >
        {selected && <Check className="size-3" strokeWidth={3} />}
      </span>
    </button>
  )
}

export function Pill({ active, onClick, children, className }: { active: boolean; onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-[border-color,background-color,color,transform] duration-150 active:scale-95',
        active ? 'border-violet bg-violet text-white shadow-[0_6px_16px_-8px_rgb(98_80_214/0.7)]' : 'border-line bg-white text-navy hover:border-violet/40',
        className,
      )}
    >
      {active && <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />}
      {children}
    </button>
  )
}

export function ThemeTag({ id, className, quiet }: { id: ThemeId; className?: string; quiet?: boolean }) {
  const t = themes[id]
  const Icon = t.icon
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-navy', quiet ? 'bg-surface' : '', className)}
      style={quiet ? undefined : { background: t.tint }}
    >
      <Icon className="size-3.5" style={{ color: t.color }} aria-hidden="true" strokeWidth={2.2} />
      {t.name}
    </span>
  )
}

/** Feedback panel shown after a decision. Never "wrong": it explains what a pro would weigh. */
export function ProView({ who, title = 'Pro view', children, tone = 'violet' }: { who?: string; title?: string; children: ReactNode; tone?: 'violet' | 'teal' | 'amber' }) {
  const ref = useRef<HTMLDivElement>(null)
  // Block body on purpose: newer browsers return a Promise from scrollIntoView, and React
  // would treat any returned value as a cleanup function and crash on unmount.
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [])
  const tones = { violet: 'border-violet/20 bg-violet-50', teal: 'border-teal/25 bg-teal-50', amber: 'border-amber/30 bg-amber-50' }
  return (
    <div ref={ref} role="status" className={cn('mt-5 animate-pop-in rounded-2xl border p-4 sm:p-5', tones[tone])}>
      <div className="flex gap-3">
        {who ? <Avatar id={who} size="sm" /> : <Lightbulb className="mt-0.5 size-5 shrink-0 text-violet" aria-hidden="true" />}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-violet-700">{title}</p>
          <div className="mt-1 text-[0.9375rem] leading-relaxed text-navy">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function FactCard({ id, className }: { id: string; className?: string }) {
  const { update } = useCareer()
  const f = facts[id]
  useEffect(() => {
    update((s) => ({ ...s, facts: addUnique(s.facts, id) }))
  }, [id, update])
  if (!f) return null
  return (
    <aside className={cn('animate-pop-in rounded-2xl border border-amber/30 bg-amber-50 p-4', className)}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-amber-700">
        <span aria-hidden="true">💡</span> Did you know? <span className="font-medium normal-case tracking-normal text-amber-700/80">· {f.tag}</span>
      </p>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-navy">{f.text}</p>
    </aside>
  )
}

/** Inline jargon chip: tap to see the meaning. Seen words are collected in the Passport. */
export function ProWord({ id }: { id: string }) {
  const { update } = useCareer()
  const [open, setOpen] = useState(false)
  const w = proWords[id]
  if (!w) return null
  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          setOpen((o) => !o)
          update((s) => ({ ...s, proWords: addUnique(s.proWords, id) }))
        }}
        className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[0.8125rem] font-semibold text-violet-700 ring-1 ring-inset ring-violet/20 hover:bg-violet-100"
      >
        <BookOpen className="size-3" aria-hidden="true" />
        {w.word}
      </button>
      {open && (
        <span role="note" className="absolute left-0 top-full z-20 mt-1.5 block w-64 animate-pop-in rounded-xl bg-navy p-3 text-left text-sm font-normal leading-relaxed text-white shadow-lift">
          <span className="font-semibold">{w.word}:</span> {w.meaning}
          <span className="mt-1 block text-xs text-white/70">Saved to your Pro words ✓</span>
        </span>
      )}
    </span>
  )
}

export function Stamp({ label, sub, color = '#6250d6', className, animate = true }: { label: string; sub?: string; color?: string; className?: string; animate?: boolean }) {
  return (
    <div
      className={cn('inline-grid size-28 place-items-center rounded-full border-[3px] border-dashed p-2 text-center', animate && 'animate-stamp', className)}
      style={{ borderColor: color, color, transform: 'rotate(-8deg)' }}
    >
      <div>
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] opacity-80">InScene</p>
        <p className="text-[0.8125rem] font-extrabold uppercase leading-tight tracking-[0.02em]">{label}</p>
        {sub && <p className="mt-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] opacity-80">{sub}</p>}
      </div>
    </div>
  )
}

export function LockedStamp({ label, sub, className }: { label: string; sub?: string; className?: string }) {
  return (
    <div className={cn('inline-grid size-28 place-items-center rounded-full border-[3px] border-dashed border-line p-2 text-center text-ink-400', className)} style={{ transform: 'rotate(-8deg)' }}>
      <div>
        <Lock className="mx-auto size-4" aria-hidden="true" />
        <p className="mt-1 text-[0.6875rem] font-bold uppercase leading-tight">{label}</p>
        {sub && <p className="mt-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.1em] opacity-80">{sub}</p>}
      </div>
    </div>
  )
}

const confettiColors = ['#6250d6', '#2a78d6', '#eda100', '#1baf7a', '#e87ba4', '#eb6834']

export function Confetti({ count = 26 }: { count?: number }) {
  const [pieces] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1.6 + Math.random() * 1.2,
      color: confettiColors[i % confettiColors.length],
      rotate: Math.random() * 360,
    })),
  )
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute -top-3 block h-2.5 w-1.5 rounded-[2px] motion-reduce:hidden"
          style={{
            left: `${p.left}%`,
            background: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confetti-fall ${p.duration}s ${p.delay}s cubic-bezier(.2,.6,.4,1) forwards`,
          }}
        />
      ))}
      <style>{'@keyframes confetti-fall{to{transform:translateY(420px) rotate(540deg);opacity:0}}'}</style>
    </div>
  )
}

export function NextBar({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end', className)}>{children}</div>
}
