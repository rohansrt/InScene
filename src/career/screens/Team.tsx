import { ArrowRight, Heart } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Avatar } from '../components/ui'
import { careerById } from '../data/careers'
import { people, roleOrder, roles } from '../data/mission'
import { useCareer } from '../store'

const roleCareer = { scientist: 'environmental-scientist', planner: 'urban-planner', engineer: 'civil-engineer' } as const

export function Team() {
  const { update } = useCareer()
  return (
    <div className="space-y-6" data-testid="team">
      <header className="animate-rise-in">
        <p className="eyebrow text-violet">Rain Ready · Career preview · 2 min</p>
        <h1 className="mt-2 text-[clamp(1.9rem,2.4vw+1rem,2.6rem)] font-[680] leading-tight tracking-[-0.03em]">Meet your Rain Ready team</h1>
        <p className="mt-2 max-w-2xl text-ink-600">You’ll work with all three, one part each. Every job is different. Notice which one you’d like to swap places with.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {roleOrder.map((id, i) => {
          const r = roles[id]
          const person = people[r.person]
          const c = careerById[roleCareer[id]]
          return (
            <article key={id} className="flex animate-rise-in flex-col rounded-[22px] bg-white p-5 shadow-card sm:p-6" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-3">
                <Avatar id={r.person} size="lg" />
                <div>
                  <p className="font-semibold text-navy">{person.name}</p>
                  <p className="text-sm text-ink-500">{r.title} {c.emoji}</p>
                </div>
              </div>
              <p className="mt-4 rounded-2xl rounded-tl-md bg-surface p-4 text-[0.9375rem] leading-relaxed text-navy">“{r.intro}”</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-700">A normal day</dt>
                  <dd className="mt-1"><ul className="space-y-1 text-ink-600">{r.dayInLife.map((d) => <li key={d}>• {d}</li>)}</ul></dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-700">Where & with whom</dt>
                  <dd className="mt-1 text-ink-600">{c.place} {c.people}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-700">The hard part</dt>
                  <dd className="mt-1 text-ink-600">{c.challenge}</dd>
                </div>
              </dl>
              <p className="mt-auto pt-4 text-xs leading-relaxed text-amber-700">💡 {r.funFact}</p>
              <p className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">You’ll lead: {r.part}</p>
            </article>
          )
        })}
      </div>

      <section className="flex flex-col items-start justify-between gap-4 rounded-[22px] bg-white/80 p-5 shadow-card sm:flex-row sm:items-center sm:p-6">
        <div className="flex gap-3">
          <Heart className="mt-0.5 size-5 shrink-0 text-violet" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-ink-600">
            <strong className="font-semibold text-navy">The most important answer is how it felt.</strong> After each part we’ll ask one quick question. There are no right decisions in this mission, just trade-offs, like real work.
          </p>
        </div>
        <Button size="lg" onClick={() => update((s) => ({ ...s, missionStage: 'mission' }))} data-testid="team-next" className="shrink-0">
          Start the mission <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </section>
    </div>
  )
}
