import { useEffect, useState, type ReactNode } from 'react'
import { AlertTriangle, ArrowRight, Check, CloudLightning, Coins, FastForward, Minus, Plus, ShieldAlert, Users, X } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'
import { CityMap } from '../components/CityMap'
import { ChoiceCard, FactCard, NextBar, ProView, ProWord, Speech, Stamp, StepCard, Avatar } from '../components/ui'
import { useDelta } from '../components/useDelta'
import { WardPlan } from '../components/WardPlan'
import { causeOptions, evidence, fixById, fixes, MISSION, people, places, residents, roles, salimOptions, twistOptions, zones } from '../data/mission'
import {
  budgetLeft, calcCorrect, calcQuestion, causeBacked, cutsForTwist, fixBudget, fixSpend, hotspotScore, overallRisk, severity,
  START_RISK, townHall, trust, units, verdict, zoneIds, zoneRisk, type Reaction,
} from '../engine/mission'
import { useCareer } from '../store'
import type { FixId, Level, MissionAnswers, Mood, RoleId } from '../types'

const steps = [
  'brief', 'intro:scientist', 'hotspots', 'evidence', 'cause', 'mood:scientist',
  'intro:planner', 'residents', 'rank', 'salim', 'mood:planner',
  'intro:engineer', 'fixes', 'calc', 'mood:engineer',
  'replay', 'twist', 'present',
] as const
type StepId = (typeof steps)[number]

const parts: Array<{ label: string; from: number; to: number }> = [
  { label: 'Briefing', from: 0, to: 0 },
  { label: 'Investigate', from: 1, to: 5 },
  { label: 'Listen', from: 6, to: 10 },
  { label: 'Design', from: 11, to: 14 },
  { label: 'Test', from: 15, to: 16 },
  { label: 'Present', from: 17, to: 17 },
]

interface StepProps {
  m: MissionAnswers
  set: (fn: (m: MissionAnswers) => MissionAnswers) => void
  next: () => void
}

export function Mission() {
  const { state, update } = useCareer()
  const m = state.mission
  const i = Math.min(m.step, steps.length - 1)
  const step: StepId = steps[i]
  const set = (fn: (m: MissionAnswers) => MissionAnswers) => update((s) => ({ ...s, mission: fn(s.mission) }))
  const next = () => {
    if (i >= steps.length - 1) update((s) => ({ ...s, missionStage: 'reflect' }))
    else set((x) => ({ ...x, step: x.step + 1 }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const props: StepProps = { m, set, next }
  const partIndex = parts.findIndex((p) => i >= p.from && i <= p.to)

  return (
    <div data-testid="mission" data-step={step}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-navy">Rain Ready <span className="font-normal text-ink-500">· {MISSION.place}</span></p>
        <ol className="flex flex-wrap gap-1" aria-label="Mission parts">
          {parts.map((p, k) => (
            <li key={p.label} aria-current={k === partIndex ? 'step' : undefined} className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', k === partIndex ? 'bg-navy text-white' : k < partIndex ? 'bg-violet-50 text-violet-700' : 'bg-white text-ink-400 ring-1 ring-inset ring-line')}>
              {p.label}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0" key={step}>
          {step === 'brief' && <Brief {...props} />}
          {step.startsWith('intro:') && <PartIntro role={step.split(':')[1] as RoleId} {...props} />}
          {step === 'hotspots' && <Hotspots {...props} />}
          {step === 'evidence' && <Evidence {...props} />}
          {step === 'cause' && <Cause {...props} />}
          {step.startsWith('mood:') && <MoodCheck role={step.split(':')[1] as RoleId} {...props} />}
          {step === 'residents' && <Residents {...props} />}
          {step === 'rank' && <Rank {...props} />}
          {step === 'salim' && <Salim {...props} />}
          {step === 'fixes' && <Fixes {...props} />}
          {step === 'calc' && <Calc {...props} level={state.level ?? 'investigator'} />}
          {step === 'replay' && <Replay {...props} />}
          {step === 'twist' && <Twist {...props} />}
          {step === 'present' && <Present {...props} />}
        </div>
        <aside className="order-first lg:order-none lg:sticky lg:top-24 lg:self-start">
          <Meters m={m} />
        </aside>
      </div>
    </div>
  )
}

// ── Meters ─────────────────────────────────────────────────────────────

function Meter({ icon, label, value, display, max, lowGood, sub }: { icon: ReactNode; label: string; value: number; display: string; max: number; lowGood?: boolean; sub?: string }) {
  const delta = useDelta(value)
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  const good = lowGood ? value <= max * 0.4 : value >= max * 0.6
  const bad = lowGood ? value >= max * 0.7 : value <= max * 0.3
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 font-semibold text-navy">{icon}{label}</span>
        <span className="font-semibold tabular-nums text-navy">
          {delta && (
            <span key={delta.key} className={cn('mr-1.5 inline-block animate-pop-in rounded-full px-1.5 py-0.5 text-[10px] font-bold', (lowGood ? delta.to < delta.from : delta.to > delta.from) ? 'bg-teal-50 text-teal-700' : 'bg-rose-50 text-rose-700')}>
              {delta.from} → {delta.to}
            </span>
          )}
          {display}
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface">
        <div className={cn('h-full rounded-full transition-[width] duration-700 ease-out-cubic', good ? 'bg-teal' : bad ? 'bg-[#e34948]' : 'bg-amber')} style={{ width: `${pct}%` }} />
      </div>
      {sub && <p className="mt-1 text-[11px] text-ink-500">{sub}</p>}
    </div>
  )
}

function Meters({ m }: { m: MissionAnswers }) {
  const risk = overallRisk(m, { twist: !!m.twist })
  const left = budgetLeft(m)
  const t = trust(m)
  return (
    <div className="rounded-[20px] bg-white p-4 shadow-card sm:p-5" aria-label="Mission meters">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">Keep an eye on</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        <Meter icon={<ShieldAlert className="size-3.5 text-[#e34948]" aria-hidden="true" />} label="Flood risk" value={risk} display={`${risk}/100`} max={100} lowGood sub={`${severity(risk).label} · lower is better`} />
        <Meter icon={<Coins className="size-3.5 text-amber-700" aria-hidden="true" />} label="Budget left" value={left} display={`₹${left} lakh`} max={MISSION.budget} sub={`of ₹${MISSION.budget} lakh`} />
        <Meter icon={<Users className="size-3.5 text-violet" aria-hidden="true" />} label="Resident trust" value={t} display={`${t}/100`} max={100} sub="Do people feel heard?" />
      </div>
    </div>
  )
}

// ── Steps ──────────────────────────────────────────────────────────────

function Brief({ next }: StepProps) {
  return (
    <StepCard eyebrow="Mission briefing" title="Ward 12 floods. Every. Single. Monsoon.">
      <div className="space-y-4">
        <CityMap />
        <Speech who="officer">
          Namaste! Every year the rain turns our streets into rivers. Shops lose stock, children miss school, and older people get stuck at home. I’ve hired your team to fix it, before the next monsoon.
        </Speech>
        <ul className="grid gap-2 sm:grid-cols-3">
          <li className="rounded-2xl bg-surface p-4"><p className="text-xs text-ink-500">Budget</p><p className="text-lg font-bold text-navy">₹50 lakh</p></li>
          <li className="rounded-2xl bg-surface p-4"><p className="text-xs text-ink-500">Time</p><p className="text-lg font-bold text-navy">12 weeks</p></li>
          <li className="rounded-2xl bg-surface p-4"><p className="text-xs text-ink-500">Your role</p><p className="text-lg font-bold text-navy">Junior consultant</p></li>
        </ul>
        <p className="text-sm leading-relaxed text-ink-600">Watch the three meters. Your choices move them. There’s no perfect plan, only trade-offs.</p>
      </div>
      <NextBar><Button size="lg" onClick={next} data-testid="mission-next">Let’s start <ArrowRight className="size-4" aria-hidden="true" /></Button></NextBar>
    </StepCard>
  )
}

const partTasks: Record<RoleId, string> = {
  scientist: 'Find out where the water collects, and why.',
  planner: 'Listen to residents and decide whose needs come first.',
  engineer: 'Choose the fixes and make the budget work.',
}

function PartIntro({ role, next }: StepProps & { role: RoleId }) {
  const r = roles[role]
  const n = { scientist: 1, planner: 2, engineer: 3 }[role]
  return (
    <section className="career-night relative animate-pop-in overflow-hidden rounded-[24px] p-6 text-white shadow-lift sm:p-9">
      <span className="absolute -right-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">Part {n} · {r.part}</p>
      <div className="mt-4 flex items-center gap-4">
        <span className="rounded-full bg-white p-1"><Avatar id={r.person} size="lg" /></span>
        <div>
          <p className="text-2xl font-bold tracking-[-0.02em] text-white">{people[r.person].name}</p>
          <p className="text-white/80">{r.title}</p>
        </div>
      </div>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/95">“{r.intro}”</p>
      <p className="mt-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">Your job: {partTasks[role]}</p>
      <div className="mt-8"><Button size="lg" variant="secondary" onClick={next} data-testid="mission-next">I’m ready <ArrowRight className="size-4" aria-hidden="true" /></Button></div>
    </section>
  )
}

function Hotspots({ m, set, next }: StepProps) {
  const [done, setDone] = useState(m.hotspots.length === 3 && m.step > 2)
  const toggle = (id: string) =>
    !done && set((x) => ({ ...x, hotspots: x.hotspots.includes(id) ? x.hotspots.filter((h) => h !== id) : x.hotspots.length >= 3 ? x.hotspots : [...x.hotspots, id] }))
  const score = hotspotScore(m)
  return (
    <StepCard eyebrow="Investigate · 1 of 3" title="Where does the water collect?" task={<>Tap <strong>3 places</strong> on the map. Clue: look at the <ProWord id="contour" />s. Water always flows downhill.</>}>
      <CityMap selectable={!done} selected={m.hotspots} onToggle={toggle} revealed={done} />
      <p className="mt-3 text-sm text-ink-500">{m.hotspots.length}/3 picked</p>
      {done && (
        <ProView who="meera" title={`You found ${score} of the 3 low spots`}>
          <ul className="space-y-1.5">
            {places.filter((p) => m.hotspots.includes(p.id) || p.pools).map((p) => (
              <li key={p.id}><strong>{p.pools ? '💧' : '✗'} {p.name}:</strong> {p.reveal}</li>
            ))}
          </ul>
          <p className="mt-2">{score === 3 ? 'Brilliant map reading! That’s exactly how I start every flood study.' : 'Low ground, dips and bowls collect water. Maps tell you a lot before you even get wet!'}</p>
        </ProView>
      )}
      <NextBar>
        {done ? <Button size="lg" onClick={next} data-testid="mission-next">Next <ArrowRight className="size-4" aria-hidden="true" /></Button> : <Button size="lg" disabled={m.hotspots.length < 3} onClick={() => setDone(true)} data-testid="mission-submit">Check my guesses</Button>}
      </NextBar>
    </StepCard>
  )
}

function Evidence({ m, set, next }: StepProps) {
  const [done, setDone] = useState(m.evidence.length === 2 && m.step > 3)
  const toggle = (id: string) =>
    !done && set((x) => ({ ...x, evidence: x.evidence.includes(id) ? x.evidence.filter((e) => e !== id) : x.evidence.length >= 2 ? x.evidence : [...x.evidence, id] }))
  return (
    <StepCard eyebrow="Investigate · 2 of 3" title="Choose your evidence" task="You only have time to check 2 of these 4. Real scientists can’t test everything, so they choose what will tell them the most.">
      <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Evidence to check">
        {evidence.map((e) => {
          const on = m.evidence.includes(e.id)
          return done ? (
            <div key={e.id} className={cn('rounded-2xl border p-4', on ? 'animate-pop-in border-blue/30 bg-blue-50' : 'border-dashed border-line bg-surface/60 opacity-70')}>
              <p className="font-semibold text-navy"><span aria-hidden="true">{e.emoji}</span> {e.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-navy">{on ? e.finding : 'Not checked. No time!'}</p>
            </div>
          ) : (
            <ChoiceCard key={e.id} multi selected={on} onClick={() => toggle(e.id)} title={e.title} detail={e.teaser} emoji={e.emoji} disabled={!on && m.evidence.length >= 2} />
          )
        })}
      </div>
      {done && <ProView who="meera">Good. You have two clues. Hold on to them, because the next question is the big one.</ProView>}
      <NextBar>
        {done ? <Button size="lg" onClick={next} data-testid="mission-next">Next <ArrowRight className="size-4" aria-hidden="true" /></Button> : <Button size="lg" disabled={m.evidence.length < 2} onClick={() => setDone(true)} data-testid="mission-submit">Check these two</Button>}
      </NextBar>
    </StepCard>
  )
}

function Cause({ m, set, next }: StepProps) {
  const [done, setDone] = useState(!!m.cause && m.step > 4)
  const seen = evidence.filter((e) => m.evidence.includes(e.id))
  const backed = causeBacked(m)
  return (
    <StepCard eyebrow="Investigate · 3 of 3" title="So, what’s the main cause?" task="Use your evidence. If you’re not sure, that’s an answer too.">
      <div className="mb-4 rounded-2xl bg-surface p-4 text-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-500">Your evidence</p>
        <ul className="mt-1.5 space-y-1 text-navy">{seen.map((e) => <li key={e.id}><span aria-hidden="true">{e.emoji}</span> {e.finding}</li>)}</ul>
      </div>
      <div className="grid gap-2.5" role="radiogroup" aria-label="Main cause">
        {causeOptions.map((o) => <ChoiceCard key={o.id} selected={m.cause === o.id} onClick={() => !done && set((x) => ({ ...x, cause: o.id }))} title={o.label} detail={o.detail} disabled={done && m.cause !== o.id} />)}
      </div>
      {done && (
        <>
          <ProView who="meera" title={backed ? 'Backed by your evidence' : 'More of a guess'}>
            {backed ? 'Nice. Your answer matches the clues you checked. That’s what makes it science, not a guess.' : 'Your clues don’t really point to that yet. It might still be true, but you’d need to check.'}
            <p className="mt-2">Here’s the full picture, with all 4 clues: <strong>it’s a mix.</strong> More heavy rain, blocked drains, and a lost lake that can’t soak up water any more. Most real floods have several causes.</p>
          </ProView>
          <FactCard id="concrete" className="mt-4" />
        </>
      )}
      <NextBar>
        {done ? <Button size="lg" onClick={next} data-testid="mission-next">Next <ArrowRight className="size-4" aria-hidden="true" /></Button> : <Button size="lg" disabled={!m.cause} onClick={() => setDone(true)} data-testid="mission-submit">Lock in</Button>}
      </NextBar>
    </StepCard>
  )
}

const moods: Array<{ id: Mood; emoji: string; label: string }> = [
  { id: 'love', emoji: '😍', label: 'Loved it' },
  { id: 'ok', emoji: '🙂', label: 'It was okay' },
  { id: 'hard', emoji: '🤔', label: 'Hard but interesting' },
  { id: 'meh', emoji: '😴', label: 'Not my thing' },
]
const moodFacts: Record<RoleId, string> = { scientist: 'monsoon', planner: 'chennai', engineer: 'stepwell' }

function MoodCheck({ role, m, set, next }: StepProps & { role: RoleId }) {
  const r = roles[role]
  const picked = m.moods[role]
  return (
    <section className="animate-pop-in rounded-[24px] bg-white p-6 shadow-card sm:p-9" data-testid="mood">
      <p className="eyebrow text-violet">Quick check · the most important answer</p>
      <h2 className="mt-2 text-[1.6rem] font-[680] leading-tight tracking-[-0.03em]">How did the <span className="text-violet">{r.part}</span> part feel?</h2>
      <p className="mt-1 text-ink-600">That was a taste of being {r.title.startsWith('E') || r.title.startsWith('U') ? 'an' : 'a'} {r.title.toLowerCase()}. Be honest!</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {moods.map((x) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={picked === x.id}
            data-testid={`mood-${x.id}`}
            onClick={() => set((s) => ({ ...s, moods: { ...s.moods, [role]: x.id } }))}
            className={cn('flex flex-col items-center gap-2 rounded-2xl border p-4 text-sm font-semibold text-navy transition-[transform,border-color,background-color] hover:-translate-y-0.5 active:scale-95', picked === x.id ? 'border-violet bg-violet-50 shadow-[0_0_0_1px_var(--color-violet)]' : 'border-line hover:border-violet/40')}
          >
            <span className={cn('text-4xl', picked === x.id && 'animate-wiggle')} aria-hidden="true">{x.emoji}</span>
            {x.label}
          </button>
        ))}
      </div>
      {picked && <FactCard id={moodFacts[role]} className="mt-6" />}
      <NextBar><Button size="lg" disabled={!picked} onClick={next} data-testid="mission-next">Next part <ArrowRight className="size-4" aria-hidden="true" /></Button></NextBar>
    </section>
  )
}

function Residents({ m, set, next }: StepProps) {
  const heard = m.heardResidents
  return (
    <StepCard eyebrow="Listen · 1 of 3" title="Hear from the people" task={<>Tap each person to hear them. Planners call them <ProWord id="stakeholder" />s: everyone affected by the plan.</>}>
      <div className="grid gap-3 sm:grid-cols-2">
        {residents.map((r) => {
          const open = heard.includes(r.id)
          const p = people[r.id]
          return (
            <button
              key={r.id}
              type="button"
              aria-expanded={open}
              data-testid={`resident-${r.id}`}
              onClick={() => set((x) => ({ ...x, heardResidents: x.heardResidents.includes(r.id) ? x.heardResidents : [...x.heardResidents, r.id] }))}
              className={cn('flex flex-col rounded-2xl border p-4 text-left transition-[border-color,background-color,box-shadow]', open ? 'border-violet/30 bg-violet-50/60' : 'border-line bg-white hover:border-violet/40 hover:shadow-xs')}
            >
              <span className="flex items-center gap-3">
                <Avatar id={r.id} />
                <span>
                  <span className="block font-semibold text-navy">{p.name}</span>
                  <span className="block text-xs text-ink-500">{p.role}</span>
                </span>
              </span>
              {open ? <span className="mt-3 block animate-pop-in text-[0.9375rem] leading-relaxed text-navy">“{r.quote}”</span> : <span className="mt-3 text-sm font-semibold text-violet-700">Tap to listen 👂</span>}
            </button>
          )
        })}
      </div>
      <NextBar>
        <Button size="lg" disabled={heard.length < 3} onClick={next} data-testid="mission-next">{heard.length < 3 ? `Listen to ${3 - heard.length} more` : 'Next'} <ArrowRight className="size-4" aria-hidden="true" /></Button>
      </NextBar>
    </StepCard>
  )
}

function Rank({ m, set, next }: StepProps) {
  const [done, setDone] = useState(m.rank.length === 4 && m.step > 8)
  const tap = (id: string) => !done && set((x) => ({ ...x, rank: x.rank.includes(id) ? x.rank.filter((r) => r !== id) : [...x.rank, id] }))
  const safetyFirst = m.rank[0] === 'kamla' || m.rank[0] === 'lakshmi'
  return (
    <StepCard eyebrow="Listen · 2 of 3" title="Whose problem should the plan solve first?" task="Tap them in order, from 1 (first) to 4. Tap again to undo.">
      <ul className="grid gap-2.5" role="list">
        {residents.map((r) => {
          const pos = m.rank.indexOf(r.id)
          return (
            <li key={r.id}>
              <button type="button" onClick={() => tap(r.id)} data-testid={`rank-${r.id}`} className={cn('flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors', pos >= 0 ? 'border-violet bg-violet-50' : 'border-line bg-white hover:border-violet/40')}>
                <span className={cn('grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold', pos >= 0 ? 'bg-violet text-white' : 'border-2 border-dashed border-line text-ink-400')}>{pos >= 0 ? pos + 1 : '?'}</span>
                <Avatar id={r.id} size="sm" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-navy">{people[r.id].name}</span>
                  <span className="block text-xs text-ink-500">{r.need}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      {done && (
        <ProView who="arjun" title="There’s no single right order">
          {safetyFirst
            ? 'Many planners would agree with you: safety first, especially for people who can’t easily get away when water rises.'
            : 'Livelihoods really matter. Ravi and Salim bhai lose money every flood. But a planner would also ask: who can’t escape when the water rises?'}
          <p className="mt-2">What matters most is that you can explain your order to everyone, including the people who came last.</p>
        </ProView>
      )}
      <NextBar>
        {done ? <Button size="lg" onClick={next} data-testid="mission-next">Next <ArrowRight className="size-4" aria-hidden="true" /></Button> : <Button size="lg" disabled={m.rank.length < 4} onClick={() => setDone(true)} data-testid="mission-submit">Lock in my order</Button>}
      </NextBar>
    </StepCard>
  )
}

function Salim({ m, set, next }: StepProps) {
  const [done, setDone] = useState(!!m.salim && m.step > 9)
  const chosen = salimOptions.find((o) => o.id === m.salim)
  return (
    <StepCard eyebrow="Listen · 3 of 3" title="Salim bhai has a request" task="Diwali is 3 weeks away. Digging up Market Road now would hurt shops in their busiest season.">
      <Speech who="salim" className="mb-5">Beta, I know floods are bad. But if you dig up the road before Diwali, half the market loses its best weeks. Please think of us too.</Speech>
      <div className="grid gap-2.5" role="radiogroup" aria-label="Your response">
        {salimOptions.map((o) => <ChoiceCard key={o.id} selected={m.salim === o.id} onClick={() => !done && set((x) => ({ ...x, salim: o.id }))} title={o.label} detail={o.detail} disabled={done && m.salim !== o.id} />)}
      </div>
      {done && chosen && (
        <ProView who="arjun" title="Every choice is a trade-off">
          {chosen.feedback} That’s a <ProWord id="tradeoff" />: you give up some of one thing to get more of another.
        </ProView>
      )}
      <NextBar>
        {done ? <Button size="lg" onClick={next} data-testid="mission-next">Next <ArrowRight className="size-4" aria-hidden="true" /></Button> : <Button size="lg" disabled={!m.salim} onClick={() => setDone(true)} data-testid="mission-submit">Decide</Button>}
      </NextBar>
    </StepCard>
  )
}

const fixWords: Partial<Record<FixId, string>> = { desilt: 'silt', rainGardens: 'permeable', pits: 'recharge' }

function Fixes({ m, set, next }: StepProps) {
  const [done, setDone] = useState(m.step > 12)
  const budget = fixBudget(m)
  const spent = fixSpend(m)
  const left = budget - spent
  const zr = zoneRisk(m)
  const risk = overallRisk(m)
  const change = (id: FixId, d: number) =>
    !done &&
    set((x) => {
      const f = fixById[id]
      const cur = x.fixes[id] ?? 0
      const nextUnits = Math.max(0, Math.min(f.max, cur + d))
      if (d > 0 && fixSpend(x) + f.cost > fixBudget(x)) return x
      return { ...x, fixes: { ...x.fixes, [id]: nextUnits } }
    })
  const worst = [...zoneIds].sort((a, b) => zr[b] - zr[a])[0]
  const tight = m.salim === 'wait' && units(m, 'bigDrain') > 0

  return (
    <StepCard eyebrow="Design · 1 of 2" title={`Spend your ₹${budget} lakh`} task="Add fixes to your plan. Watch the water shrink on the map. Not everything fits, and that’s the job!">
      <div className="sticky top-16 z-20 -mx-2 mb-3 flex items-center justify-between gap-3 rounded-xl bg-navy px-4 py-2.5 text-sm text-white shadow-lift xl:hidden" aria-live="polite">
        <span>Spent <strong className="tabular-nums">₹{spent}/{budget} L</strong></span>
        <span>Flood risk <strong className="tabular-nums">{risk}</strong> · {severity(risk).short}</span>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
        <ul className="grid gap-2.5">
          {fixes.map((f) => {
            const n = units(m, f.id)
            const canAdd = n < f.max && f.cost <= left
            return (
              <li key={f.id} className={cn('rounded-2xl border p-3.5 transition-colors', n > 0 ? 'border-violet bg-violet-50/60' : 'border-line bg-white')}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none" aria-hidden="true">{f.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.9375rem] font-semibold leading-snug text-navy">{f.name} {fixWords[f.id] && <ProWord id={fixWords[f.id]!} />}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-500">{f.what}</p>
                    <p className="mt-1.5 flex flex-wrap gap-x-3 text-xs font-medium text-ink-600">
                      <span>₹{f.cost} lakh{f.note ? ` ${f.note}` : ''}</span><span>{f.weeks} weeks</span>
                      <span>Helps most: {zoneIds.filter((z) => f.effect[z] === Math.max(...zoneIds.map((q) => f.effect[q]))).map((z) => zones[z].name).join(', ')}</span>
                    </p>
                  </div>
                  {f.max > 1 ? (
                    <div className="flex shrink-0 items-center gap-1.5" aria-label={`${f.name}: ${n}`}>
                      <button type="button" aria-label={`Remove one ${f.name}`} disabled={done || n === 0} onClick={() => change(f.id, -1)} className="grid size-8 place-items-center rounded-full border border-line bg-white text-navy disabled:opacity-40"><Minus className="size-4" aria-hidden="true" /></button>
                      <span className="w-6 text-center font-bold tabular-nums text-navy">{n}</span>
                      <button type="button" aria-label={`Add one ${f.name}`} disabled={done || !canAdd} onClick={() => change(f.id, 1)} className="grid size-8 place-items-center rounded-full bg-violet text-white disabled:opacity-40" data-testid={`fix-${f.id}-add`}><Plus className="size-4" aria-hidden="true" /></button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      aria-pressed={n > 0}
                      disabled={done || (n === 0 && !canAdd)}
                      onClick={() => change(f.id, n > 0 ? -1 : 1)}
                      data-testid={`fix-${f.id}`}
                      className={cn('shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors disabled:opacity-40', n > 0 ? 'bg-violet text-white' : 'border border-line bg-white text-navy hover:border-violet/40')}
                    >
                      {n > 0 ? 'Added ✓' : 'Add'}
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
        <div className="space-y-3 xl:sticky xl:top-24 xl:self-start">
          <CityMap water={zr} />
          <div className="rounded-2xl bg-surface p-3 text-sm">
            <p className="flex justify-between"><span className="text-ink-600">Spent</span><strong className="text-navy">₹{spent} / {budget} lakh</strong></p>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-violet transition-[width] duration-500" style={{ width: `${(spent / budget) * 100}%` }} /></div>
            <ul className="mt-3 space-y-1 text-xs">
              {zoneIds.map((z) => <li key={z} className="flex justify-between"><span className="text-ink-600">{zones[z].name}</span><span className="font-semibold text-navy">{severity(zr[z]).label}</span></li>)}
            </ul>
          </div>
          {tight && <p className="flex gap-2 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-700"><AlertTriangle className="size-4 shrink-0" aria-hidden="true" />You promised Salim bhai to wait until after Diwali. The big drain will only just finish before the rains.</p>}
        </div>
      </div>
      {done && (
        <ProView who="priya" title={`Flood risk: ${START_RISK} → ${risk}`}>
          {risk <= 40 ? 'That’s a strong plan for the money.' : risk <= 55 ? 'Solid. You’ve made a real difference.' : 'It helps, but a lot of water is still left.'} {zones[worst].name} is still the most at risk ({severity(zr[worst]).label.toLowerCase()}), and that’s where {zones[worst].who} are.
          <p className="mt-2">Engineers often compare <strong>impact per rupee</strong>. Cheap fixes like cleaning drains give a lot of protection for little money. Big projects protect more, but cost more and take longer.</p>
        </ProView>
      )}
      <NextBar>
        {done ? <Button size="lg" onClick={next} data-testid="mission-next">Next <ArrowRight className="size-4" aria-hidden="true" /></Button> : <Button size="lg" disabled={spent === 0} onClick={() => setDone(true)} data-testid="mission-submit">Lock in my plan</Button>}
      </NextBar>
    </StepCard>
  )
}

function Calc({ m, set, next, level }: StepProps & { level: Level }) {
  const q = calcQuestion(level)
  const [wrong, setWrong] = useState<number[]>(() => (m.calc !== undefined && m.calc !== q.answer ? [m.calc] : []))
  const correct = calcCorrect(m, level)
  const last = wrong.length ? q.choices.find((c) => c.value === wrong[wrong.length - 1]) : undefined

  function pick(value: number) {
    if (correct || wrong.includes(value)) return
    set((x) => ({ ...x, calc: value, calcTries: x.calcTries + 1 }))
    if (value !== q.answer) setWrong((w) => [...w, value])
  }

  return (
    <StepCard eyebrow="Design · 2 of 2" title="Do the engineer’s maths" task={q.prompt}>
      <div className="rounded-2xl bg-violet-50 p-4 text-sm text-navy">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-700">The rule engineers use</p>
        <ol className="mt-1.5 space-y-1">{q.steps.map((t, k) => <li key={t}><strong>{k + 1}.</strong> {t}</li>)}</ol>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Your answer">
        {q.choices.map((c) => {
          const isWrong = wrong.includes(c.value)
          const isRight = correct && c.value === q.answer
          return (
            <button
              key={c.value}
              type="button"
              role="radio"
              aria-checked={isRight}
              disabled={isWrong || (correct && !isRight)}
              onClick={() => pick(c.value)}
              data-testid={`calc-${c.value}`}
              className={cn(
                'flex items-center justify-between gap-2 rounded-2xl border p-4 text-left transition-[border-color,background-color,transform] active:scale-[0.98]',
                isRight ? 'animate-pop-in border-teal bg-teal-50' : isWrong ? 'cursor-not-allowed border-rose-700/20 bg-rose-50 opacity-70' : correct ? 'border-line opacity-50' : 'border-line bg-white hover:border-violet/40',
              )}
            >
              <span>
                <span className={cn('block text-xl font-bold tabular-nums', isWrong ? 'text-rose-700 line-through' : 'text-navy')}>{c.value.toLocaleString('en-IN')}</span>
                <span className="text-xs text-ink-500">{q.unit}</span>
              </span>
              {isRight && <Check className="size-5 text-teal-700" aria-label="Correct" />}
              {isWrong && <X className="size-5 text-rose-700" aria-label="Not this one" />}
            </button>
          )
        })}
      </div>
      {!correct && last?.nudge && (
        <p role="status" className="mt-4 animate-pop-in rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
          <strong>Not quite, try again!</strong> {last.nudge}
        </p>
      )}
      {correct && (
        <ProView who="priya" title={wrong.length === 0 ? 'Spot on, first time! 🎯' : 'You got there! 🎯'}>
          {q.explain} <ProWord id={q.word} />
        </ProView>
      )}
      <NextBar>{correct && <Button size="lg" onClick={next} data-testid="mission-next">Next <ArrowRight className="size-4" aria-hidden="true" /></Button>}</NextBar>
    </StepCard>
  )
}

function Replay({ m, next }: StepProps) {
  const [phase, setPhase] = useState<'ready' | 'raining' | 'done'>(m.step > 15 ? 'done' : 'ready')
  const zr = zoneRisk(m)
  useEffect(() => {
    if (phase !== 'raining') return
    const t = window.setTimeout(() => setPhase('done'), 3200)
    return () => window.clearTimeout(t)
  }, [phase])
  const zero = { market: 0, school: 0, lake: 0 }
  const base = { market: zones.market.base, school: zones.school.base, lake: zones.lake.base }

  return (
    <StepCard eyebrow="Test" title="Monsoon test ⛈️" task="Let’s throw a big storm at your plan and see what happens.">
      <CityMap water={phase === 'ready' ? zero : zr} raining={phase === 'raining'} showOldLake={units(m, 'lakePond') > 0} />
      {phase === 'ready' && (
        <div className="mt-4 flex justify-center">
          <Button size="lg" onClick={() => setPhase('raining')} data-testid="storm">
            <CloudLightning className="size-5" aria-hidden="true" /> Start the storm
          </Button>
        </div>
      )}
      {phase === 'raining' && <p role="status" className="mt-4 text-center font-semibold text-navy">It’s pouring… 🌧️🌧️🌧️</p>}
      {phase === 'done' && (
        <div className="mt-5 animate-rise-in">
          <h3 className="font-semibold">How each area did</h3>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {zoneIds.map((z) => {
              const before = severity(base[z])
              const after = severity(zr[z])
              return (
                <li key={z} className="rounded-2xl bg-surface p-4">
                  <p className="text-sm font-semibold text-navy">{zones[z].name}</p>
                  <p className="mt-2 text-xs text-ink-500 line-through">{before.label}</p>
                  <p className="text-sm font-semibold text-navy">→ {after.label}</p>
                  <p className="mt-1 text-xs text-ink-500">For {zones[z].who}</p>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      <NextBar>{phase === 'done' && <Button size="lg" onClick={next} data-testid="mission-next">Next <ArrowRight className="size-4" aria-hidden="true" /></Button>}</NextBar>
    </StepCard>
  )
}

const twistFeedback: Record<string, string> = {
  clear: 'Fast and safe. You protected the plan, but paid for someone else’s mess.',
  both: 'Smart! You fixed it now and held the builder responsible. If they pay, the money comes back to the ward.',
  builder: 'Fair, because the builder should pay. But it may take weeks, and the rains won’t wait. Some risk remains.',
  keep: 'Bold, but risky. Without a bigger drain, a blocked drain upstream pushes more water onto Market Road and the school.',
}

function Twist({ m, set, next }: StepProps) {
  const [choice, setChoice] = useState<string | undefined>(m.twist)
  const done = !!m.twist
  const before = overallRisk(m)
  const preview = choice && (choice === 'clear' || choice === 'both') ? cutsForTwist(m, 5) : null
  const after = overallRisk(m, { twist: true })

  function decide() {
    if (!choice) return
    set((x) => {
      if (choice === 'clear' || choice === 'both') {
        const { fixes: f, cuts } = cutsForTwist(x, 5)
        return { ...x, twist: choice, fixes: f, twistCuts: cuts }
      }
      return { ...x, twist: choice }
    })
  }

  return (
    <StepCard eyebrow="Test · Plot twist!" title="Uh-oh. New evidence just arrived.">
      <Speech who="priya">Bad news! The drain camera found builders’ debris dumped in the main drain near Hilltop Colony. It’s about 70% blocked. If we do nothing, Market Road and the school will flood more.</Speech>
      <CityMap className="mt-4" showBlockage water={zoneRisk(m, { twist: done })} />
      <div className="mt-5 grid gap-2.5" role="radiogroup" aria-label="What do you do?">
        {twistOptions.map((o) => <ChoiceCard key={o.id} selected={choice === o.id} onClick={() => !done && setChoice(o.id)} title={o.label} detail={o.detail} disabled={done && m.twist !== o.id} />)}
      </div>
      {!done && preview && preview.cuts.length > 0 && (
        <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
          Your budget is used up, so to find ₹5 lakh you’ll drop: {preview.cuts.map((c) => fixById[c].name).filter((v, k, a) => a.indexOf(v) === k).join(', ')}.
        </p>
      )}
      {done && (
        <ProView who="priya" title={`Flood risk: ${before} → ${after}`}>
          {m.twist === 'keep' ? (units(m, 'bigDrain') ? 'Your bigger drain soaks up some of the shock. Risky, but defensible.' : twistFeedback.keep) : twistFeedback[m.twist!]}
          {m.twistCuts.length > 0 && <p className="mt-2">To pay for it, you dropped: {m.twistCuts.map((c) => fixById[c].name).filter((v, k, a) => a.indexOf(v) === k).join(', ')}. Changing a plan when the facts change is what pros do.</p>}
        </ProView>
      )}
      <NextBar>
        {done ? <Button size="lg" onClick={next} data-testid="mission-next">Present my plan <ArrowRight className="size-4" aria-hidden="true" /></Button> : <Button size="lg" disabled={!choice} onClick={decide} data-testid="mission-submit">Decide</Button>}
      </NextBar>
    </StepCard>
  )
}

const reactionStyle: Record<Reaction, { emoji: string; label: string; cls: string }> = {
  cheer: { emoji: '👏', label: 'Happy', cls: 'bg-teal-50 text-teal-700' },
  ok: { emoji: '🙂', label: 'Okay with it', cls: 'bg-amber-50 text-amber-700' },
  worried: { emoji: '😟', label: 'Worried', cls: 'bg-rose-50 text-rose-700' },
}

/** The plan is presented at a ward meeting and plays out on its own. Nothing to type. */
function Present({ m, next }: StepProps) {
  const { state } = useCareer()
  const lines = townHall(m)
  const v = verdict(m)
  const total = lines.length + 1 // one beat per resident, then the verdict
  const [beat, setBeat] = useState(m.step > steps.indexOf('present') ? total : 0)
  const finished = beat >= total
  useEffect(() => {
    if (finished) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const t = window.setTimeout(() => setBeat((b) => b + 1), reduce ? 400 : beat === 0 ? 1400 : 2200)
    return () => window.clearTimeout(t)
  }, [beat, finished])

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]" data-testid="present" data-beat={beat}>
      <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-7">
        <p className="eyebrow text-violet">Present</p>
        <h2 className="mt-1.5 text-[1.5rem] font-[650] leading-tight tracking-[-0.025em] sm:text-[1.75rem]">Town hall, Ward 12 🎤</h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">Your Ward Plan is built from every choice you made. Sit back and see how the ward reacts.</p>

        <div className="mt-5 space-y-3" aria-live="polite">
          <Speech who="officer">Everyone, our junior consultant {state.nickname || 'here'} has a plan. Let’s listen.</Speech>
          {lines.map((l, k) => {
            if (beat < k + 1) return null
            const st = reactionStyle[l.reaction]
            return (
              <div key={l.who} className="animate-rise-in">
                <div className="flex gap-3">
                  <Avatar id={l.who} />
                  <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-line bg-white px-4 py-3 shadow-xs">
                    <p className="text-xs text-ink-500">
                      <span className="font-semibold text-navy">{people[l.who].name}</span> · {people[l.who].role}
                    </p>
                    <span className={cn('mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold', st.cls)}><span aria-hidden="true">{st.emoji}</span>&nbsp;{st.label}</span>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-navy">{l.text}</p>
                  </div>
                </div>
              </div>
            )
          })}
          {finished && (
            <div className="animate-pop-in rounded-2xl career-night p-5 text-white shadow-lift">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">Mr Joseph · Ward officer</p>
                  <p className="mt-1.5 text-lg font-semibold leading-snug text-white">“{v.text}”</p>
                </div>
                <Stamp label="Approved" sub="Ward 12" color="#fde68a" className="shrink-0" />
              </div>
            </div>
          )}
        </div>

        <NextBar>
          {finished ? (
            <Button size="lg" onClick={next} data-testid="mission-next">Finish the mission <ArrowRight className="size-4" aria-hidden="true" /></Button>
          ) : (
            <Button variant="ghost" onClick={() => setBeat(total)} data-testid="present-skip"><FastForward className="size-4" aria-hidden="true" />Skip to the end</Button>
          )}
        </NextBar>
      </section>
      <div className="xl:sticky xl:top-24 xl:self-start">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">Your Ward Plan</p>
        <WardPlan state={state} className="animate-pop-in" />
      </div>
    </div>
  )
}
