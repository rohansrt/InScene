import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { ArrowRight, Check, SkipForward } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'
import { Hexagon } from '../components/Hexagon'
import { FactCard, Pill } from '../components/ui'
import {
  activityCards, degreeOptions, goalOptions, levelInfo, mythAfter, myths, routeOptions, streams, studyOptions, subjects, thisOrThat,
} from '../data/quickstart'
import { values, worldOrder, worlds } from '../data/themes'
import { profile, quip, topThemes } from '../engine/profile'
import { useCareer } from '../store'
import type { CareerState, Reaction, ValueId, WorldId } from '../types'

const rounds = ['tot', 'fact1', 'cards', 'fact2', 'values', 'heard', 'ahead'] as const
const segments = [
  { label: 'This or That', rounds: ['tot'] },
  { label: 'Activity cards', rounds: ['fact1', 'cards'] },
  { label: 'What matters', rounds: ['fact2', 'values'] },
  { label: 'Career worlds', rounds: ['heard'] },
  { label: 'Looking ahead', rounds: ['ahead'] },
]

type Commit = (fn: (s: CareerState) => CareerState) => void

export function QuickStart() {
  const { state, update } = useCareer()
  const round = rounds[Math.min(state.qs.round, rounds.length - 1)]
  const p = profile(state, false)
  const [toast, setToast] = useState<{ text: string; key: number } | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  // Compute the quip from the current snapshot (event-time), then apply the pure update.
  const commit: Commit = useCallback(
    (fn) => {
      const before = topThemes(profile(state, false).norm, 1)[0]
      const after = topThemes(profile(fn(state), false).norm, 1)[0]
      if (after && after !== before) {
        window.clearTimeout(toastTimer.current)
        setToast({ text: quip(after), key: Date.now() })
        toastTimer.current = window.setTimeout(() => setToast(null), 2200)
      }
      update(fn)
    },
    [state, update],
  )
  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const next = () => update((s) => ({ ...s, qs: { ...s.qs, round: s.qs.round + 1, index: 0 } }))
  const finish = () => update((s) => ({ ...s, stage: 'reveal', coreDoneAt: s.coreDoneAt ?? Date.now(), qs: { ...s.qs, round: rounds.length } }))
  const segIndex = segments.findIndex((s) => s.rounds.includes(round))

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]" data-testid="quickstart" data-round={round}>
      <div className="min-w-0">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-navy">
            Quick Start <span className="font-normal text-ink-500">· {segments[segIndex]?.label}</span>
          </p>
          <p className="hidden text-xs text-ink-500 sm:block">No wrong answers. Skip anything.</p>
        </div>
        <ol className="mb-5 grid grid-cols-5 gap-1.5" aria-label="Quick Start progress">
          {segments.map((s, i) => (
            <li key={s.label} className="min-w-0">
              <span className={cn('block h-1.5 rounded-full transition-colors duration-500', i < segIndex ? 'bg-violet' : i === segIndex ? 'bg-gradient-to-r from-violet to-blue' : 'bg-line')} />
              <span className={cn('mt-1.5 hidden truncate text-[11px] sm:block', i === segIndex ? 'font-semibold text-navy' : 'text-ink-500')}>{s.label}</span>
            </li>
          ))}
        </ol>

        {round === 'tot' && <ThisOrThatRound state={state} commit={commit} />}
        {round === 'fact1' && <Interlude factId="velcro" title="Nice! You’re 1/5 of the way." line="Next up: swipe through some activities. Be honest. “Never tried” is a great answer." onNext={next} />}
        {round === 'cards' && <CardsRound state={state} commit={commit} />}
        {round === 'fact2' && <Interlude factId="bug" title="Halfway there! 🎉" line="Now pick what matters most to you in work. These are values, not jobs." onNext={next} />}
        {round === 'values' && <ValuesRound state={state} commit={commit} onNext={next} />}
        {round === 'heard' && <HeardRound state={state} update={update} onNext={next} />}
        {round === 'ahead' && <AheadRound state={state} commit={commit} onNext={finish} />}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[22px] bg-white p-5 shadow-card">
          <p className="text-sm font-semibold text-navy">Your shape so far</p>
          <p className="text-xs text-ink-500">It changes with every answer. It’s not a score.</p>
          <Hexagon now={p.norm} counts={p.counts} className="mx-auto mt-2" size={300} title="Your interest shape so far" />
          <p className="mt-1 text-center text-xs text-ink-500">
            {p.top.length ? <>Leading right now: <strong className="font-semibold text-navy">{p.top.slice(0, 2).map((t) => t[0].toUpperCase() + t.slice(1)).join(' + ')}</strong></> : 'Answer a few cards to see your shape.'}
          </p>
        </div>
      </aside>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        {toast && (
          <p key={toast.key} className="animate-pop-in rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-lift">{toast.text}</p>
        )}
      </div>
    </div>
  )
}

function ThisOrThatRound({ state, commit }: { state: CareerState; commit: Commit }) {
  const i = Math.min(state.qs.index, thisOrThat.length - 1)
  const pair = thisOrThat[i]
  const advance = (s: CareerState) =>
    i + 1 >= thisOrThat.length ? { ...s.qs, round: s.qs.round + 1, index: 0 } : { ...s.qs, index: i + 1 }

  return (
    <section className="rounded-[24px] bg-white p-5 shadow-card sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[1.6rem] font-[680] tracking-[-0.03em]">This or That?</h2>
        <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink-600">{i + 1} / {thisOrThat.length}</span>
      </div>
      <p className="mt-1 text-ink-600">Quick! Which would you rather do this Saturday?</p>
      <div key={pair.id} className="mt-6 grid animate-pop-in grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
        {([pair.a, pair.b] as const).map((side, k) => (
          <div key={side.label} className={cn('contents')}>
            {k === 1 && <span className="grid place-items-center text-xs font-bold uppercase tracking-[0.14em] text-ink-400">or</span>}
            <button
              type="button"
              data-testid={`tot-${k}`}
              onClick={() => commit((s) => ({ ...s, qs: { ...advance(s), tot: { ...s.qs.tot, [pair.id]: k as 0 | 1 } } }))}
              className="group flex min-h-40 flex-col items-center justify-center gap-3 rounded-[20px] border border-line bg-gradient-to-b from-white to-surface p-6 text-center transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-violet/40 hover:shadow-lift active:scale-[0.98]"
            >
              <span className="text-5xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{side.emoji}</span>
              <span className="text-lg font-semibold leading-snug text-navy">{side.label}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-center">
        <button type="button" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-500 hover:text-navy" onClick={() => commit((s) => ({ ...s, qs: advance(s) }))}>
          <SkipForward className="size-4" aria-hidden="true" /> Can’t choose. Skip
        </button>
      </div>
    </section>
  )
}

const reactions: Array<{ id: Reaction; emoji: string; label: string; key: string }> = [
  { id: 'nah', emoji: '🙅', label: 'Not for me', key: '←' },
  { id: 'never', emoji: '🌱', label: 'Never tried', key: '↓' },
  { id: 'maybe', emoji: '🙂', label: 'Maybe', key: '↑' },
  { id: 'love', emoji: '😍', label: 'Love it', key: '→' },
]

function CardsRound({ state, commit }: { state: CareerState; commit: Commit }) {
  const index = state.qs.index
  const mythId = mythAfter[index]
  const pendingMyth = mythId && state.qs.myths[mythId] === undefined ? myths.find((m) => m.id === mythId) : undefined
  const card = activityCards[index]
  const [leaving, setLeaving] = useState<Reaction | null>(null)
  const [drag, setDrag] = useState<{ x: number; start: number } | null>(null)

  const react = useCallback(
    (r: Reaction) => {
      if (leaving || !card) return
      setLeaving(r)
      window.setTimeout(() => {
        commit((s) => ({ ...s, qs: { ...s.qs, cards: { ...s.qs.cards, [card.id]: r }, index: s.qs.index + 1 } }))
        setLeaving(null)
        setDrag(null)
      }, 230)
    },
    [card, commit, leaving],
  )

  useEffect(() => {
    if (pendingMyth) return
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return
      const map: Record<string, Reaction> = { ArrowRight: 'love', ArrowLeft: 'nah', ArrowUp: 'maybe', ArrowDown: 'never' }
      if (map[e.key]) {
        e.preventDefault()
        react(map[e.key])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [react, pendingMyth])

  if (pendingMyth) return <MythCard key={pendingMyth.id} myth={pendingMyth} commit={commit} last={index >= activityCards.length} />
  if (!card) return null

  const dx = drag?.x ?? 0
  const exit = leaving === 'love' ? 'translate-x-[120%] rotate-12' : leaving === 'nah' ? '-translate-x-[120%] -rotate-12' : leaving === 'maybe' ? '-translate-y-[60%] scale-95' : leaving === 'never' ? 'translate-y-[60%] scale-95' : ''
  const hint = dx > 40 ? 'love' : dx < -40 ? 'nah' : null

  function onDown(e: ReactPointerEvent) {
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    setDrag({ x: 0, start: e.clientX })
  }
  function onMove(e: ReactPointerEvent) {
    if (drag) setDrag({ ...drag, x: e.clientX - drag.start })
  }
  function onUp() {
    if (!drag) return
    if (drag.x > 90) react('love')
    else if (drag.x < -90) react('nah')
    else setDrag(null)
  }

  return (
    <section className="rounded-[24px] bg-white p-5 shadow-card sm:p-8" data-testid="cards-round">
      <div className="flex items-center justify-between">
        <h2 className="text-[1.6rem] font-[680] tracking-[-0.03em]">How do you feel about…</h2>
        <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink-600">{index + 1} / {activityCards.length}</span>
      </div>
      <p className="mt-1 text-sm text-ink-600">Swipe right if you love it, left if it’s not for you, or tap a button.</p>

      <div className="relative mx-auto mt-6 h-[300px] max-w-sm select-none">
        {activityCards[index + 1] && <div aria-hidden="true" className="absolute inset-x-4 top-3 h-full rotate-2 rounded-[24px] bg-violet-50 shadow-card" />}
        <div
          key={card.id}
          role="group"
          aria-label={`Activity: ${card.label}`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={() => setDrag(null)}
          style={drag && !leaving ? { transform: `translateX(${dx}px) rotate(${dx / 18}deg)` } : undefined}
          className={cn(
            'career-night absolute inset-0 flex touch-pan-y cursor-grab flex-col items-center justify-center gap-5 rounded-[24px] p-8 text-center text-white shadow-lift active:cursor-grabbing',
            !drag && 'animate-pop-in',
            leaving && 'opacity-0 transition-[transform,opacity] duration-200',
            exit,
          )}
        >
          <span className="text-7xl drop-shadow" aria-hidden="true">{card.emoji}</span>
          <p className="text-xl font-semibold leading-snug">{card.label}</p>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/60">{worlds[card.world].name}</p>
          {hint && (
            <span className={cn('absolute top-5 rounded-full px-3 py-1 text-sm font-bold', hint === 'love' ? 'left-5 bg-teal text-white' : 'right-5 bg-white text-navy')}>
              {hint === 'love' ? '😍 Love it' : '🙅 Not for me'}
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto mt-6 grid max-w-lg grid-cols-4 gap-2">
        {reactions.map((r) => (
          <button
            key={r.id}
            type="button"
            data-testid={`react-${r.id}`}
            onClick={() => react(r.id)}
            className="flex flex-col items-center gap-1 rounded-2xl border border-line bg-white px-2 py-3 text-xs font-semibold text-navy transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:border-violet/40 hover:bg-violet-50 active:scale-95"
          >
            <span className="text-2xl" aria-hidden="true">{r.emoji}</span>
            {r.label}
            <span className="hidden text-[10px] font-normal text-ink-400 sm:block" aria-hidden="true">{r.key}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function MythCard({ myth, commit, last }: { myth: (typeof myths)[number]; commit: Commit; last: boolean }) {
  const [guess, setGuess] = useState<boolean | null>(null)
  const right = guess === myth.isFact
  return (
    <section className="animate-pop-in rounded-[24px] bg-white p-5 shadow-card sm:p-8" data-testid="myth">
      <p className="eyebrow text-amber-700">Bonus round · Myth or Fact?</p>
      <p className="mt-3 text-[1.4rem] font-[650] leading-snug tracking-[-0.02em] text-navy">“{myth.statement}”</p>
      {guess === null ? (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button size="lg" variant="secondary" onClick={() => setGuess(false)} data-testid="myth-myth">🙃 Myth</Button>
          <Button size="lg" variant="secondary" onClick={() => setGuess(true)} data-testid="myth-fact">✅ Fact</Button>
        </div>
      ) : (
        <div className="mt-5 animate-pop-in">
          <p className={cn('text-sm font-bold', right ? 'text-teal-700' : 'text-amber-700')}>{right ? 'You got it! 🎯' : 'Surprise! 😮'}</p>
          <p className="mt-1 leading-relaxed text-navy">{myth.explain}</p>
          <div className="mt-5 flex justify-end">
            <Button
              data-testid="myth-next"
              onClick={() =>
                commit((s) => ({
                  ...s,
                  qs: { ...s.qs, myths: { ...s.qs.myths, [myth.id]: guess }, ...(last ? { round: s.qs.round + 1, index: 0 } : {}) },
                }))
              }
            >
              {last ? 'Finish cards' : 'Next card'} <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}

function Interlude({ factId, title, line, onNext }: { factId: string; title: string; line: string; onNext: () => void }) {
  return (
    <section className="animate-pop-in rounded-[24px] bg-white p-6 shadow-card sm:p-9">
      <p className="text-4xl" aria-hidden="true">🚀</p>
      <h2 className="mt-3 text-[1.6rem] font-[680] tracking-[-0.03em]">{title}</h2>
      <p className="mt-2 text-ink-600">{line}</p>
      <FactCard id={factId} className="mt-6" />
      <div className="mt-6 flex justify-end">
        <Button size="lg" onClick={onNext} data-testid="interlude-next">Keep going <ArrowRight className="size-4" aria-hidden="true" /></Button>
      </div>
    </section>
  )
}

function ValuesRound({ state, commit, onNext }: { state: CareerState; commit: Commit; onNext: () => void }) {
  const chosen = state.qs.values
  const toggle = (id: ValueId) =>
    commit((s) => {
      const has = s.qs.values.includes(id)
      if (!has && s.qs.values.length >= 3) return s
      return { ...s, qs: { ...s.qs, values: has ? s.qs.values.filter((v) => v !== id) : [...s.qs.values, id] } }
    })
  return (
    <section className="animate-rise-in rounded-[24px] bg-white p-5 shadow-card sm:p-8" data-testid="values-round">
      <h2 className="text-[1.6rem] font-[680] tracking-[-0.03em]">What matters most to you in work?</h2>
      <p className="mt-1 text-ink-600">Pick your top 3. You can change them later.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {values.map((v) => {
          const on = chosen.includes(v.id)
          const rank = chosen.indexOf(v.id) + 1
          return (
            <button
              key={v.id}
              type="button"
              aria-pressed={on}
              disabled={!on && chosen.length >= 3}
              onClick={() => toggle(v.id)}
              data-testid={`value-${v.id}`}
              className={cn(
                'relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-[transform,border-color,background-color,opacity] active:scale-95 disabled:opacity-40',
                on ? 'border-violet bg-violet-50 shadow-[0_0_0_1px_var(--color-violet)]' : 'border-line hover:border-violet/40',
              )}
            >
              {on && <span className="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-violet text-[11px] font-bold text-white">{rank}</span>}
              <span className="text-3xl" aria-hidden="true">{v.emoji}</span>
              <span className="text-sm font-semibold leading-snug text-navy">{v.name}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-ink-500">{chosen.length}/3 picked</p>
        <Button size="lg" onClick={onNext} data-testid="values-next">{chosen.length ? 'Next' : 'Skip'} <ArrowRight className="size-4" aria-hidden="true" /></Button>
      </div>
    </section>
  )
}

function HeardRound({ state, update, onNext }: { state: CareerState; update: Commit; onNext: () => void }) {
  const heard = state.qs.heard
  const toggle = (id: WorldId) =>
    update((s) => ({ ...s, qs: { ...s.qs, heard: s.qs.heard.includes(id) ? s.qs.heard.filter((w) => w !== id) : [...s.qs.heard, id] } }))
  return (
    <section className="animate-rise-in rounded-[24px] bg-white p-5 shadow-card sm:p-8" data-testid="heard-round">
      <h2 className="text-[1.6rem] font-[680] tracking-[-0.03em]">Which career worlds do you already know a bit about?</h2>
      <p className="mt-1 text-ink-600">Tap the ones you’ve seen up close, from family, friends or school. Knowing only a few is normal. That’s why we’re here!</p>
      <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {worldOrder.map((id) => {
          const w = worlds[id]
          const on = heard.includes(id)
          return (
            <button
              key={id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(id)}
              className={cn('flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-[border-color,background-color] active:scale-[0.99]', on ? 'border-violet bg-violet-50' : 'border-line hover:border-violet/40')}
            >
              <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl', on ? 'bg-violet text-white' : 'bg-surface text-navy')}>
                {on ? <Check className="size-5" aria-hidden="true" /> : <w.icon className="size-5" aria-hidden="true" />}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-navy">{w.name}</span>
                <span className="block truncate text-xs text-ink-500">{w.line}</span>
              </span>
            </button>
          )
        })}
      </div>
      <div className="mt-6 flex justify-end">
        <Button size="lg" onClick={onNext} data-testid="heard-next">{heard.length ? 'Next' : 'None yet. Next'} <ArrowRight className="size-4" aria-hidden="true" /></Button>
      </div>
    </section>
  )
}

function ChipGroup({ label, options, value, onToggle, single }: { label: string; options: string[]; value: string[]; onToggle: (v: string) => void; single?: boolean }) {
  return (
    <fieldset className="mt-6 first:mt-0">
      <legend className="text-sm font-semibold text-navy">{label}{!single && <span className="font-normal text-ink-500"> · pick any</span>}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <Pill key={o} active={value.includes(o)} onClick={() => onToggle(o)}>{o}</Pill>
        ))}
      </div>
    </fieldset>
  )
}

function AheadRound({ state, commit, onNext }: { state: CareerState; commit: Commit; onNext: () => void }) {
  const level = state.level ?? 'investigator'
  const qs = state.qs
  const toggleList = (key: 'subjects' | 'routes') => (v: string) =>
    commit((s) => ({ ...s, qs: { ...s.qs, [key]: s.qs[key].includes(v) ? s.qs[key].filter((x) => x !== v) : [...s.qs[key], v] } }))
  const setOne = (key: 'stream' | 'study' | 'degree' | 'goal') => (v: string) =>
    commit((s) => ({ ...s, qs: { ...s.qs, [key]: s.qs[key] === v ? undefined : v } }))

  return (
    <section className="animate-rise-in rounded-[24px] bg-white p-5 shadow-card sm:p-8" data-testid="ahead-round">
      <p className="eyebrow text-violet">Last one · {levelInfo[level].who}</p>
      <h2 className="mt-1.5 text-[1.6rem] font-[680] tracking-[-0.03em]">Looking ahead</h2>
      <p className="mt-1 text-ink-600">This helps us show the right subjects, courses and routes later. It never rules a career out.</p>
      <div className="mt-6">
        {level === 'pro' ? (
          <>
            <ChipGroup single label="What are you studying?" options={degreeOptions} value={qs.degree ? [qs.degree] : []} onToggle={setOne('degree')} />
            <ChipGroup single label="What’s your next goal?" options={goalOptions} value={qs.goal ? [qs.goal] : []} onToggle={setOne('goal')} />
          </>
        ) : level === 'planner' ? (
          <>
            <ChipGroup single label="Your stream" options={streams} value={qs.stream ? [qs.stream] : []} onToggle={setOne('stream')} />
            <ChipGroup label="Routes you’re open to" options={routeOptions} value={qs.routes} onToggle={toggleList('routes')} />
            <ChipGroup single label="How much more study after Class 12?" options={studyOptions} value={qs.study ? [qs.study] : []} onToggle={setOne('study')} />
          </>
        ) : (
          <>
            <ChipGroup label="Subjects you enjoy" options={subjects} value={qs.subjects} onToggle={toggleList('subjects')} />
            {level === 'investigator' && <ChipGroup label="After Class 10, which routes are you curious about?" options={routeOptions} value={qs.routes} onToggle={toggleList('routes')} />}
          </>
        )}
      </div>
      <div className="mt-8 flex justify-end">
        <Button size="lg" onClick={onNext} data-testid="ahead-next">See my first map ✨</Button>
      </div>
    </section>
  )
}
