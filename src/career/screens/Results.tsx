import { useId, useState } from 'react'
import { ArrowLeft, ArrowRight, BookMarked, Check, CircleQuestionMark, Printer, RotateCcw, Sparkles, Target } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { SegmentedTabs } from '../../components/ui/SegmentedTabs'
import { cn } from '../../lib/cn'
import { CareerCard, Movement, WildcardCard } from '../components/CareerCard'
import { Hexagon } from '../components/Hexagon'
import { Confetti, Stamp, ThemeTag } from '../components/ui'
import { WardPlan } from '../components/WardPlan'
import { careerById, roleCareers, type Career } from '../data/careers'
import { article, routeFor, topRole } from '../engine/results'
import { facts, proWords } from '../data/facts'
import {
  causeOptions, evidence, fixes, MISSION, people, places, roleOrder, roles, salimOptions, twistOptions, zones,
} from '../data/mission'
import { nextSteps, routeNote } from '../data/nextSteps'
import { levelInfo } from '../data/quickstart'
import { themeOrder, themes } from '../data/themes'
import { overallRisk, roleFeel, severity, skillLabel, skills, START_RISK, START_TRUST, totalSpend, trust, units, wardPlan, zoneIds, zoneRisk } from '../engine/mission'
import { profile, rankOf, shortlist, themeAgreement, unknowns, type ScoredCareer } from '../engine/profile'
import { useCareer } from '../store'
import type { CareerState } from '../types'

type Tab = 'snapshot' | 'why' | 'deeper'

export function Results() {
  const { state } = useCareer()
  const [tab, setTab] = useState<Tab>('snapshot')
  const uid = useId()
  const go = (t: Tab) => {
    setTab(t)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6" data-testid="results" data-tab={tab}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow text-violet">Your results · Rain Ready</p>
          <p className="mt-1 text-sm text-ink-500">Read it in layers. Start with the snapshot, then dig in when you want.</p>
        </div>
        <SegmentedTabs<Tab>
          label="Results layer"
          value={tab}
          onChange={go}
          controls={`${uid}-panel`}
          options={[
            { value: 'snapshot', label: '1 · Snapshot', id: `${uid}-snapshot` },
            { value: 'why', label: '2 · Why', id: `${uid}-why` },
            { value: 'deeper', label: '3 · Go deeper', id: `${uid}-deeper` },
          ]}
        />
      </div>
      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-${tab}`}>
        {tab === 'snapshot' && <Snapshot state={state} onWhy={() => go('why')} />}
        {tab === 'why' && <Why state={state} onDeeper={() => go('deeper')} />}
        {tab === 'deeper' && <Deeper state={state} />}
      </div>
    </div>
  )
}

// ── Layer 1 ────────────────────────────────────────────────────────────

function FeltBars({ state }: { state: CareerState }) {
  const word = (v: number | null) => (v === null ? 'Not answered' : v >= 0.75 ? 'Felt a lot like you' : v >= 0.45 ? 'Felt somewhat like you' : 'Not so much')
  return (
    <ul className="space-y-3.5" aria-label="Which part of the work felt like you">
      {roleOrder.map((id) => {
        const v = roleFeel(state.mission, state.reflect, id)
        const r = roles[id]
        return (
          <li key={id}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-semibold text-navy">{r.part} <span className="font-normal text-ink-500">· {r.title}</span></span>
              <span className="shrink-0 text-xs text-ink-600">{word(v)}</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-surface" title={`${r.part}: ${word(v)}`}>
              <div className="h-full rounded-[4px] bg-violet transition-[width] duration-1000 ease-out-cubic" style={{ width: `${Math.round((v ?? 0) * 100)}%` }} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function Snapshot({ state, onWhy }: { state: CareerState; onWhy: () => void }) {
  const { update } = useCareer()
  const before = shortlist(state, false)
  const after = shortlist(state, true)
  const top = topRole(state)
  const r = top ? roles[top.role] : null
  const first = after.picks[0]?.career
  const week = first ? nextSteps[first.world].week : ''
  const committed = !!state.checklist['week']

  return (
    <div className="space-y-6">
      <section className="career-night relative overflow-hidden rounded-[28px] p-6 text-white shadow-lift sm:p-10">
        <Confetti />
        <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">Well done, {state.nickname}!</p>
            <h1 className="mt-3 text-[clamp(2rem,3vw+1rem,3.2rem)] font-[720] leading-[1.05] tracking-[-0.035em] text-white">
              {r ? <>Today you worked like {article(r.title)} <span className="text-amber">{r.title.toLowerCase()}</span>.</> : 'You tried three careers in one mission.'}
            </h1>
            <p className="mt-3 max-w-xl text-white/85">
              {r ? <>The <strong>{r.part}</strong> part felt the most like you. That’s a real clue, not a final answer. Try more missions to see if it holds.</> : 'Tell us how each part felt to see which work suits you.'}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 justify-self-start md:items-center md:justify-self-end">
            <Stamp label="Rain Ready" sub="Completed" color="#fde68a" />
            <p className="text-xs text-white/75">New stamp in your Passport</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold">Which part felt like you?</h2>
          <p className="mt-1 text-sm text-ink-500">From your quick mood checks and your answers in Reflect.</p>
          <div className="mt-5"><FeltBars state={state} /></div>
          {top && (
            <p className="mt-5 rounded-xl bg-violet-50 p-3 text-sm text-navy">
              ✦ Careers with the same kind of work: {roleCareers[top.role].map((id) => careerById[id].title).join(', ')}.
            </p>
          )}
          <h3 className="mt-6 text-sm font-semibold text-navy">Your strongest themes now</h3>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {profile(state, true).top.slice(0, 2).map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-xl p-3" style={{ background: themes[t].tint }}>
                <ThemeTag id={t} className="bg-white" />
                <span className="text-sm leading-relaxed text-navy">{themes[t].line}</span>
              </li>
            ))}
          </ul>
        </section>
        <WardPlan state={state} />
      </div>

      <section>
        <h2 className="text-xl font-[650] tracking-[-0.02em]">Careers to explore next</h2>
        <p className="mt-1 text-sm text-ink-500">Your profile is updated with what you did in the mission. Arrows show how each moved since your core profile.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {after.picks.map((sc) => (
            <CareerCard key={sc.career.id} sc={sc} badge={<Movement from={rankOf(before.ranked, sc.career.id)} to={rankOf(after.ranked, sc.career.id)} />} />
          ))}
          {after.wildcard && <WildcardCard sc={after.wildcard} reason={after.wildcardReason} />}
        </div>
      </section>

      {week && (
        <section className="flex flex-col gap-4 rounded-[22px] border border-amber/30 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex gap-3">
            <Target className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-amber-700">Your one small step this week</p>
              <p className="mt-1 font-semibold leading-relaxed text-navy">{week}</p>
            </div>
          </div>
          <Button
            variant={committed ? 'dark' : 'secondary'}
            onClick={() => update((s) => ({ ...s, checklist: { ...s.checklist, week: !s.checklist['week'] } }))}
            className="shrink-0"
            data-testid="commit-week"
          >
            {committed ? <><Check className="size-4" aria-hidden="true" /> I’m in!</> : 'I’ll try it'}
          </Button>
        </section>
      )}

      <div className="flex justify-center">
        <Button size="lg" onClick={onWhy} data-testid="to-why">See why we think so <ArrowRight className="size-4" aria-hidden="true" /></Button>
      </div>
    </div>
  )
}

// ── Layer 2 ────────────────────────────────────────────────────────────

function Why({ state, onDeeper }: { state: CareerState; onDeeper: () => void }) {
  const before = profile(state, false)
  const after = profile(state, true)
  const agree = themeAgreement(state)
  const level = state.level ?? 'investigator'
  const sk = skills(state.mission, level)
  const changes = themeOrder
    .map((t) => ({ t, d: after.norm[t] - before.norm[t] }))
    .filter((x) => Math.abs(x.d) >= 0.15)
    .sort((a, b) => Math.abs(b.d) - Math.abs(a.d))
    .slice(0, 3)
  const evidenceList = [...after.sig].filter((x) => x.w > 0).sort((a, b) => b.w - a.w || (a.source === 'mission' ? -1 : 1))
  const seen = new Set<string>()
  const topEvidence = evidenceList.filter((x) => (seen.has(x.label) ? false : (seen.add(x.label), true))).slice(0, 6)
  const zr = zoneRisk(state.mission, { twist: !!state.mission.twist })
  const unknown = unknowns(state, true)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
        <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold">How your shape changed</h2>
          <p className="mt-1 text-sm text-ink-500">Dashed: your core profile. Filled: after doing real work.</p>
          <Hexagon now={after.norm} before={before.norm} counts={after.counts} className="mx-auto mt-2" size={340} nowLabel="After Rain Ready" beforeLabel="Core profile" title="Interest shape before and after the mission" />
          <p className="mt-4 rounded-xl bg-violet-50 p-3 text-sm text-navy">
            <strong>Getting clearer.</strong> {agree ? 'Your cards and your mission point the same way. That’s a good sign.' : 'The mission surprised us! What you enjoy doing can differ from what you expect. That’s exactly why we try things.'}
          </p>
          {changes.length > 0 && (
            <ul className="mt-3 space-y-1.5 text-sm">
              {changes.map((c) => (
                <li key={c.t} className="flex items-center gap-2"><ThemeTag id={c.t} /> <span className="text-ink-600">{c.d > 0 ? 'grew after the mission' : 'shrank after the mission'}</span></li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold">The evidence we used</h2>
          <p className="mt-1 text-sm text-ink-500">What you did counts more than what you said. How the work felt counts the most.</p>
          <ul className="mt-4 space-y-2.5">
            {topEvidence.map((e) => (
              <li key={e.label} className="flex items-start gap-3 rounded-xl border border-line p-3">
                <ThemeTag id={e.theme} />
                <p className="flex-1 text-sm leading-relaxed text-navy">{e.label}</p>
                <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase', e.source === 'mission' ? 'bg-violet text-white' : 'bg-surface text-ink-500')}>{e.source === 'mission' ? 'Mission' : 'Cards'}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-ink-500">How we weigh it: card answers ×1, choices in the mission ×2, how the work felt ×3. We never give a “% match”. These are clues to explore, not a test.</p>
        </section>
      </div>

      <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
        <h2 className="text-lg font-semibold">Skills you used</h2>
        <p className="mt-1 text-sm text-ink-500">Every pro on the team uses these. Here’s the proof from your choices.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {sk.map((s) => (
            <article key={s.id} className="rounded-2xl border border-line p-4" data-testid="skill">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{s.name}</h3>
                <span className="flex items-center gap-2 text-xs font-semibold text-navy">
                  <span className="flex gap-1" aria-hidden="true">{[0, 1, 2].map((k) => <span key={k} className={cn('size-2.5 rounded-full', k < s.score ? 'bg-violet' : 'bg-line')} />)}</span>
                  {skillLabel(s.score)}
                </span>
              </div>
              <ul className="mt-2 space-y-1 text-sm leading-relaxed text-ink-600">{s.proof.map((p) => <li key={p}>• {p}</li>)}</ul>
              <p className="mt-2 text-xs leading-relaxed text-violet-700">Next time: {s.tip}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
        <h2 className="text-lg font-semibold">What your plan did for Ward 12</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {zoneIds.map((z) => (
            <div key={z} className="rounded-2xl bg-surface p-4">
              <p className="text-sm font-semibold text-navy">{zones[z].name}</p>
              <p className="mt-1 text-xs text-ink-500 line-through">{severity(zones[z].base).label}</p>
              <p className="text-sm font-semibold text-navy">→ {severity(zr[z]).label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-600">
          Flood risk {START_RISK} → {overallRisk(state.mission, { twist: !!state.mission.twist })}. Trust {START_TRUST} → {trust(state.mission)}. You spent ₹{totalSpend(state.mission)} of ₹{MISSION.budget} lakh.
          {trust(state.mission) < START_TRUST ? ' Some residents feel left out. Planners would hold a meeting to rebuild trust.' : ' Residents feel more heard than when you started.'}
        </p>
      </section>

      <section className="rounded-[22px] border border-dashed border-violet/30 bg-white/70 p-5 sm:p-6">
        <h2 className="flex items-center gap-2 font-semibold text-navy"><CircleQuestionMark className="size-5 text-violet" aria-hidden="true" />What we still don’t know</h2>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-600">{unknown.map((u) => <li key={u}>• {u}</li>)}</ul>
      </section>

      <div className="flex justify-center">
        <Button size="lg" onClick={onDeeper} data-testid="to-deeper">Compare careers and plan next steps <ArrowRight className="size-4" aria-hidden="true" /></Button>
      </div>
    </div>
  )
}

// ── Layer 3 ────────────────────────────────────────────────────────────

function triedFor(c: Career, s: CareerState) {
  if (!c.role) return 'Not tried yet. A future mission will let you try it.'
  const r = roles[c.role]
  const feel = roleFeel(s.mission, s.reflect, c.role)
  const word = feel === null ? '' : feel >= 0.75 ? 'and it felt a lot like you' : feel >= 0.45 ? 'and it felt somewhat like you' : 'and it didn’t feel like you this time'
  return `You did the ${r.part} part of Rain Ready with ${people[r.person].name}, ${word}.`
}

function Deeper({ state }: { state: CareerState }) {
  const navigate = useNavigate()
  const { update, reset } = useCareer()
  const level = state.level ?? 'investigator'
  const after = shortlist(state, true)
  const pool: ScoredCareer[] = [...after.picks, ...(after.wildcard ? [after.wildcard] : [])]
  const [compare, setCompare] = useState<string[]>(pool.slice(0, 3).map((p) => p.career.id))
  const toggle = (id: string) => setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id]))
  const cols = compare.map((id) => careerById[id])
  const world = after.picks[0]?.career.world ?? 'build'
  const steps = nextSteps[world]
  const m = state.mission
  const plan = wardPlan(m)
  const rows: Array<{ label: string; get: (c: Career) => string }> = [
    { label: 'What you do', get: (c) => c.task },
    { label: 'Skills you use', get: (c) => c.skills.join(' · ') },
    { label: 'Where & who', get: (c) => `${c.place} ${c.people}` },
    { label: 'The hard part', get: (c) => c.challenge },
    { label: `How to get there (${levelInfo[level].who})`, get: (c) => routeFor(c, level) },
    { label: 'What you’ve tried', get: (c) => triedFor(c, state) },
  ]
  const nextPlan = [
    { id: 'week', label: 'This week', text: steps.week },
    { id: 'term', label: 'This term', text: steps.term },
    { id: 'big', label: 'Bigger step', text: steps.big[level] },
  ]
  const journey = [
    { label: 'Low spots you picked', text: m.hotspots.map((h) => places.find((p) => p.id === h)?.name).join(', ') },
    { label: 'Evidence you checked', text: m.evidence.map((e) => evidence.find((x) => x.id === e)?.title).join(', ') },
    { label: 'Main cause', text: causeOptions.find((c) => c.id === m.cause)?.label ?? '—' },
    { label: 'Who came first', text: m.rank.map((r, i) => `${i + 1}. ${people[r].name}`).join('  ') },
    { label: 'Salim bhai’s request', text: salimOptions.find((o) => o.id === m.salim)?.label ?? '—' },
    { label: 'Your fixes', text: fixes.filter((f) => units(m, f.id) > 0).map((f) => `${f.name}${f.max > 1 ? ` ×${units(m, f.id)}` : ''}`).join(', ') || '—' },
    { label: 'Plot twist', text: twistOptions.find((o) => o.id === m.twist)?.label ?? '—' },
    { label: 'Your headline fix', text: plan.headline ? `${plan.headline.name}. ${plan.why}` : '—' },
  ]

  return (
    <div className="space-y-6">
      <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
        <h2 className="text-lg font-semibold">Compare careers side by side</h2>
        <p className="mt-1 text-sm text-ink-500">By what the work is really like, not by a score. Pick up to 3.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {pool.map((p) => (
            <button key={p.career.id} type="button" aria-pressed={compare.includes(p.career.id)} onClick={() => toggle(p.career.id)} className={cn('rounded-full border px-3 py-1.5 text-sm font-medium', compare.includes(p.career.id) ? 'border-violet bg-violet text-white' : 'border-line bg-white text-navy')}>
              {p.career.emoji} {p.career.title}
            </button>
          ))}
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="w-40 p-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-ink-500" scope="col"><span className="sr-only">Compare</span></th>
                {cols.map((c) => <th key={c.id} scope="col" className="p-3 text-left align-bottom"><span className="text-xl" aria-hidden="true">{c.emoji}</span><span className="block font-semibold text-navy">{c.title}</span></th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="border-t border-line p-3 text-left align-top text-xs font-semibold text-violet-700">{r.label}</th>
                  {cols.map((c) => <td key={c.id} className="border-t border-line p-3 align-top leading-relaxed text-ink-600">{r.get(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-500">{routeNote}</p>
      </section>

      <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
        <h2 className="text-lg font-semibold">Your next-step plan</h2>
        <p className="mt-1 text-sm text-ink-500">Based on {after.picks[0]?.career.title ?? 'your top career'}. Tick them off in your Passport.</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {nextPlan.map((p) => {
            const done = !!state.checklist[p.id]
            return (
              <li key={p.id}>
                <button type="button" aria-pressed={done} onClick={() => update((s) => ({ ...s, checklist: { ...s.checklist, [p.id]: !s.checklist[p.id] } }))} className={cn('flex h-full w-full flex-col rounded-2xl border p-4 text-left transition-colors', done ? 'border-teal/40 bg-teal-50' : 'border-line hover:border-violet/40')}>
                  <span className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-violet-700">{p.label}</span>
                    <span className={cn('grid size-5 place-items-center rounded-md border-2', done ? 'border-teal bg-teal text-white' : 'border-ink-400/50')} aria-hidden="true">{done && <Check className="size-3" strokeWidth={3} />}</span>
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-navy">{p.text}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold">Your mission, step by step</h2>
          <ol className="mt-4 space-y-3 border-l-2 border-violet-100 pl-4">
            {journey.map((j) => (
              <li key={j.label} className="relative">
                <span className="absolute -left-[23px] top-1 size-3 rounded-full border-2 border-white bg-violet" aria-hidden="true" />
                <p className="text-xs font-semibold text-violet-700">{j.label}</p>
                <p className="text-sm text-navy">{j.text}</p>
              </li>
            ))}
          </ol>
          {state.reflect.note.trim() && <p className="mt-4 rounded-xl bg-surface p-3 text-sm italic text-ink-600">Your note: “{state.reflect.note.trim()}”</p>}
        </section>
        <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold">You collected</h2>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">Pro words ({state.proWords.length})</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {state.proWords.length ? state.proWords.map((w) => <li key={w}><strong className="text-navy">{proWords[w]?.word}:</strong> <span className="text-ink-600">{proWords[w]?.meaning}</span></li>) : <li className="text-ink-500">Tap the purple word chips in a mission to collect them.</li>}
          </ul>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">Fun facts ({state.facts.length})</p>
          <ul className="mt-2 space-y-1.5 text-sm text-ink-600">{state.facts.map((f) => <li key={f}>💡 {facts[f]?.text}</li>)}</ul>
        </section>
      </div>

      <section className="flex flex-col gap-3 rounded-[22px] bg-white/80 p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm text-ink-600"><Sparkles className="size-4 text-violet" aria-hidden="true" />Everything is saved in your Career Passport on this device.</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => window.print()}><Printer className="size-4" aria-hidden="true" />Print</Button>
          <Button variant="secondary" onClick={() => { if (window.confirm('Start a new journey? Your current answers on this device will be cleared.')) { reset() } }}><RotateCcw className="size-4" aria-hidden="true" />Start over</Button>
          <Button variant="secondary" onClick={() => navigate('/career')} data-testid="back-to-sims"><ArrowLeft className="size-4" aria-hidden="true" />More simulations</Button>
          <Button onClick={() => navigate('/career/passport')} data-testid="open-passport"><BookMarked className="size-4" aria-hidden="true" />Open my Passport</Button>
        </div>
      </section>
    </div>
  )
}

