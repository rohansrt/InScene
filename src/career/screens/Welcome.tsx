import { useId, useState } from 'react'
import { ArrowRight, Eye, Lock, Scale, Sparkles } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'
import { levelInfo } from '../data/quickstart'
import { useCareer } from '../store'
import type { Level } from '../types'

const levels: Level[] = ['explorer', 'investigator', 'planner', 'pro']
const levelEmoji: Record<Level, string> = { explorer: '🧭', investigator: '🔍', planner: '🗺️', pro: '🎓' }

export function Welcome() {
  const { state, update } = useCareer()
  const [name, setName] = useState(state.nickname)
  const [level, setLevel] = useState<Level | null>(state.level)
  const uid = useId()
  const ready = name.trim().length >= 2 && level

  function start() {
    if (!ready) return
    update((s) => ({ ...s, nickname: name.trim().slice(0, 24), level, stage: 'quickstart', startedAt: Date.now() }))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
      <section className="animate-rise-in rounded-[24px] bg-white p-6 shadow-card sm:p-9">
        <p className="eyebrow text-violet">Step 1 · About you</p>
        <h1 className="mt-2 text-[clamp(1.8rem,2vw+1rem,2.4rem)] font-[680] leading-tight tracking-[-0.03em]">Let’s set up your boarding pass ✈️</h1>
        <p className="mt-2 text-ink-600">Two quick things, and you’re in.</p>

        <form
          className="mt-7 space-y-7"
          onSubmit={(e) => {
            e.preventDefault()
            start()
          }}
        >
          <div>
            <label htmlFor={`${uid}-name`} className="text-sm font-semibold text-navy">What should we call you?</label>
            <input
              id={`${uid}-name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
              autoComplete="nickname"
              placeholder="A nickname is fine"
              className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-navy outline-none transition-shadow placeholder:text-ink-400 focus:border-violet focus:shadow-[0_0_0_3px_rgb(98_80_214/0.15)]"
              data-testid="nickname"
            />
            <p className="mt-1.5 text-xs text-ink-500">No email or phone number needed.</p>
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-navy">Where are you right now?</legend>
            <p className="mt-0.5 text-xs text-ink-500">This changes how deep the questions go, not what careers you can see.</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {levels.map((l) => {
                const on = level === l
                return (
                  <button
                    key={l}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setLevel(l)}
                    data-testid={`level-${l}`}
                    className={cn(
                      'rounded-2xl border p-4 text-left transition-[border-color,box-shadow,background-color,transform] active:scale-[0.98]',
                      on ? 'border-violet bg-violet-50 shadow-[0_0_0_1px_var(--color-violet)]' : 'border-line hover:border-violet/40',
                    )}
                  >
                    <span className="text-2xl" aria-hidden="true">{levelEmoji[l]}</span>
                    <span className="mt-2 block text-sm font-semibold text-navy">{levelInfo[l].who}</span>
                    <span className="block text-xs text-ink-500">{levelInfo[l].name}: {levelInfo[l].blurb}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div>
            <p className="text-sm font-semibold text-navy">Language</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex h-9 items-center rounded-full bg-violet px-4 text-sm font-semibold text-white">English</span>
              <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-dashed border-line px-4 text-sm text-ink-500">
                हिन्दी <span className="text-xs">· coming soon</span>
              </span>
            </div>
          </div>

          <Button type="submit" size="lg" disabled={!ready} className="w-full sm:w-auto" data-testid="welcome-go">
            Let’s go
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </form>
      </section>

      <aside className="space-y-4">
        <div className="career-night relative overflow-hidden rounded-[24px] p-6 text-white shadow-lift">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-white/70">Boarding pass</p>
          <p className="mt-3 text-2xl font-bold tracking-[-0.02em]">{name.trim() || 'Your name'}</p>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-dashed border-white/30 pt-4 text-xs">
            <div><p className="text-white/60">From</p><p className="font-semibold">Curious</p></div>
            <div><p className="text-white/60">To</p><p className="font-semibold">10 career worlds</p></div>
            <div><p className="text-white/60">Class</p><p className="font-semibold">{level ? levelInfo[level].who : '—'}</p></div>
          </div>
          <p className="mt-4 text-xs text-white/70">Flight time: about 30 minutes ✦</p>
        </div>

        <div className="rounded-[24px] bg-white/80 p-6 shadow-card">
          <p className="text-sm font-semibold text-navy">How your suggestions work</p>
          <ul className="mt-3 space-y-3 text-sm leading-relaxed text-ink-600">
            <li className="flex gap-3"><Sparkles className="mt-0.5 size-4 shrink-0 text-violet" aria-hidden="true" /><span>We look at what you <strong className="font-semibold text-navy">enjoy doing</strong>, not your marks.</span></li>
            <li className="flex gap-3"><Eye className="mt-0.5 size-4 shrink-0 text-violet" aria-hidden="true" /><span>Every suggestion comes with a <strong className="font-semibold text-navy">reason</strong> you can see.</span></li>
            <li className="flex gap-3"><Scale className="mt-0.5 size-4 shrink-0 text-violet" aria-hidden="true" /><span>No “92% match” scores. They’re ideas to <strong className="font-semibold text-navy">explore</strong>, and they change as you learn.</span></li>
            <li className="flex gap-3"><Lock className="mt-0.5 size-4 shrink-0 text-violet" aria-hidden="true" /><span>Your answers stay <strong className="font-semibold text-navy">on this device</strong>. We never ask about caste, income or health.</span></li>
          </ul>
        </div>
      </aside>
    </div>
  )
}
