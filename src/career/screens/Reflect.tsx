import { useId } from 'react'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'
import { Avatar, Pill } from '../components/ui'
import { people, roleOrder, roles, surpriseOptions } from '../data/mission'
import { useCareer } from '../store'
import type { MoreAnswer } from '../types'

const answers: Array<{ id: MoreAnswer; label: string; emoji: string }> = [
  { id: 'yes', label: 'Yes, more!', emoji: '🙌' },
  { id: 'maybe', label: 'Maybe', emoji: '🤷' },
  { id: 'no', label: 'Not really', emoji: '👋' },
]

export function Reflect() {
  const { state, update } = useCareer()
  const r = state.reflect
  const uid = useId()
  const setR = (fn: (x: typeof r) => typeof r) => update((s) => ({ ...s, reflect: fn(s.reflect) }))
  const ready = roleOrder.every((id) => r.more[id])

  return (
    <div className="mx-auto max-w-3xl space-y-6" data-testid="reflect">
      <header className="animate-rise-in text-center">
        <p className="text-5xl" aria-hidden="true">🎤👏</p>
        <p className="eyebrow mt-4 text-violet">Mission complete · Reflect</p>
        <h1 className="mt-2 text-[clamp(1.9rem,2.4vw+1rem,2.6rem)] font-[680] leading-tight tracking-[-0.03em]">Plan presented! Now, about you…</h1>
        <p className="mt-2 text-ink-600">Two quick questions. These count the most in your results.</p>
      </header>

      <section className="rounded-[24px] bg-white p-5 shadow-card sm:p-8">
        <h2 className="text-lg font-semibold">1. Would you do more of this work?</h2>
        <ul className="mt-4 space-y-3">
          {roleOrder.map((id) => {
            const role = roles[id]
            return (
              <li key={id} className="flex flex-col gap-3 rounded-2xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Avatar id={role.person} />
                  <div>
                    <p className="font-semibold text-navy">{role.part} <span className="font-normal text-ink-500">like {people[role.person].name.split(' ').slice(0, 2).join(' ')}</span></p>
                    <p className="text-xs text-ink-500">{role.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label={`More ${role.verb}?`}>
                  {answers.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      role="radio"
                      aria-checked={r.more[id] === a.id}
                      data-testid={`more-${id}-${a.id}`}
                      onClick={() => setR((x) => ({ ...x, more: { ...x.more, [id]: a.id } }))}
                      className={cn('flex flex-col items-center rounded-xl border px-3 py-2 text-xs font-semibold transition-colors', r.more[id] === a.id ? 'border-violet bg-violet text-white' : 'border-line text-navy hover:border-violet/40')}
                    >
                      <span className="text-lg" aria-hidden="true">{a.emoji}</span>
                      {a.label}
                    </button>
                  ))}
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="rounded-[24px] bg-white p-5 shadow-card sm:p-8">
        <h2 className="text-lg font-semibold">2. What surprised you? <span className="text-sm font-normal text-ink-500">· pick any</span></h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {surpriseOptions.map((o) => (
            <Pill key={o} active={r.surprise.includes(o)} onClick={() => setR((x) => ({ ...x, surprise: x.surprise.includes(o) ? x.surprise.filter((y) => y !== o) : [...x.surprise, o] }))}>{o}</Pill>
          ))}
        </div>
        <label htmlFor={`${uid}-note`} className="mt-5 block text-sm text-ink-600">Anything else? What was interesting, or hard? (optional)</label>
        <textarea
          id={`${uid}-note`}
          rows={3}
          maxLength={280}
          value={r.note}
          onChange={(e) => setR((x) => ({ ...x, note: e.target.value }))}
          className="mt-1.5 w-full rounded-xl border border-line p-3 text-[0.9375rem] text-navy outline-none focus:border-violet focus:shadow-[0_0_0_3px_rgb(98_80_214/0.15)]"
        />
      </section>

      <div className="flex justify-center">
        <Button size="lg" disabled={!ready} onClick={() => update((s) => ({ ...s, missionStage: 'results', missionDoneAt: s.missionDoneAt ?? Date.now() }))} data-testid="reflect-next">
          {ready ? 'Reveal my results ✨' : 'Answer question 1 to continue'}
        </Button>
      </div>
    </div>
  )
}
