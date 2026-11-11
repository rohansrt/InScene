import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { cn } from '../../lib/cn'
import { CareerCard } from '../components/CareerCard'
import { Hexagon } from '../components/Hexagon'
import { PassportStamps, StampCount } from '../components/Progress'
import { useOpenRainReady } from '../components/useOpenRainReady'
import { WardPlan } from '../components/WardPlan'
import { facts, proWords } from '../data/facts'
import { nextSteps } from '../data/nextSteps'
import { levelInfo } from '../data/quickstart'
import { worldOrder, worlds } from '../data/themes'
import { profile, shortlist } from '../engine/profile'
import { skillLabel, skills } from '../engine/mission'
import { coreDone, missionDone as isMissionDone, missionStarted, missionWorlds, passportStamps, profileStatus } from '../engine/results'
import { useCareer } from '../store'

export default function Passport() {
  const { state, update, reset } = useCareer()
  const navigate = useNavigate()
  useDocumentTitle('Career Passport', 'Your saved career explorations, missions, reflections and next steps.')
  const openRainReady = useOpenRainReady()
  const core = coreDone(state)
  const missionDone = isMissionDone(state)
  const status = profileStatus(state)

  if (!state.nickname) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-5xl" aria-hidden="true">📘</p>
        <h1 className="mt-4 text-3xl font-[680] tracking-[-0.03em]">Your Career Passport is empty</h1>
        <p className="mt-2 text-ink-600">Start your journey to collect stamps, careers to explore and next steps.</p>
        <Button size="lg" className="mt-6" onClick={() => navigate('/career/play')}>Start my journey <ArrowRight className="size-4" aria-hidden="true" /></Button>
      </div>
    )
  }

  const withMission = missionDone
  const p = profile(state, withMission)
  const list = shortlist(state, withMission)
  const level = state.level ?? 'investigator'
  const world = list.picks[0]?.career.world ?? 'build'
  const plan = [
    { id: 'week', label: 'This week', text: nextSteps[world].week },
    { id: 'term', label: 'This term', text: nextSteps[world].term },
    { id: 'big', label: 'Bigger step', text: nextSteps[world].big[level] },
  ]
  const passNo = `INS-${String(state.startedAt).slice(-6)}`
  const started = new Date(state.startedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6 px-4 pb-8 pt-6 sm:px-6 sm:pt-8" data-testid="passport">
      <section className="career-night relative overflow-hidden rounded-[28px] p-6 text-white shadow-lift sm:p-9">
        <span className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">InScene · Career Passport</p>
            <h1 className="mt-3 text-[clamp(2rem,3vw+1rem,3rem)] font-[720] tracking-[-0.035em] text-white">{state.nickname}</h1>
            <p className="mt-1 text-white/80">{levelInfo[level].who} · {levelInfo[level].name}</p>
          </div>
          <dl className="grid grid-cols-3 gap-5 text-sm">
            <div><dt className="text-white/60">Passport no.</dt><dd className="font-semibold tabular-nums">{passNo}</dd></div>
            <div><dt className="text-white/60">Issued</dt><dd className="font-semibold">{started}</dd></div>
            <div><dt className="text-white/60">Stamps</dt><dd className="font-semibold tabular-nums">{passportStamps(state).filter((x) => x.earned).length}</dd></div>
          </dl>
        </div>
      </section>

      <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Stamps</h2>
          <StampCount state={state} />
        </div>
        <p className="mt-1 text-sm text-ink-500">{core ? 'Your core profile is the first stamp. Each simulation you finish adds one more.' : 'Finish your core profile to earn your first stamp.'}</p>
        <PassportStamps state={state} className="mt-4" />
        <h3 className="mt-7 text-sm font-semibold text-navy">Career worlds visited</h3>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {worldOrder.map((id) => {
            const W = worlds[id]
            const visited = missionDone && missionWorlds.includes(id)
            return (
              <li key={id} className={cn('flex items-center gap-2 rounded-xl p-2.5 text-xs font-semibold', visited ? 'bg-violet-50 text-navy' : 'bg-surface text-ink-400')}>
                <W.icon className={cn('size-4', visited ? 'text-violet' : '')} aria-hidden="true" />
                <span className="min-w-0 truncate">{W.name}</span>
                {visited && <Check className="ml-auto size-3.5 text-violet" aria-label="Visited" />}
              </li>
            )
          })}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold">Interest shape</h2>
          <p className="mt-1 text-xs text-ink-500"><strong className="font-semibold text-navy">{core ? status.label : 'In progress'}:</strong> {core ? status.detail : 'based on your answers so far.'}</p>
          <Hexagon now={p.norm} before={withMission ? profile(state, false).norm : undefined} counts={p.counts} className="mx-auto mt-2" size={320} nowLabel="Now" beforeLabel="Core profile" />
        </section>
        <section>
          <h2 className="text-lg font-semibold">Careers to explore</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[...list.picks, ...(list.wildcard ? [list.wildcard] : [])].map((sc) => <CareerCard key={sc.career.id} sc={sc} compact />)}
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold">Next steps</h2>
          <ul className="mt-4 space-y-2.5">
            {plan.map((x) => {
              const done = !!state.checklist[x.id]
              return (
                <li key={x.id}>
                  <button type="button" aria-pressed={done} onClick={() => update((s) => ({ ...s, checklist: { ...s.checklist, [x.id]: !s.checklist[x.id] } }))} className={cn('flex w-full items-start gap-3 rounded-2xl border p-4 text-left', done ? 'border-teal/40 bg-teal-50' : 'border-line hover:border-violet/40')}>
                    <span className={cn('mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-2', done ? 'border-teal bg-teal text-white' : 'border-ink-400/50')} aria-hidden="true">{done && <Check className="size-3" strokeWidth={3} />}</span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-violet-700">{x.label}</span>
                      <span className={cn('mt-0.5 block text-sm leading-relaxed', done ? 'text-ink-500 line-through' : 'text-navy')}>{x.text}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          {(state.reflect.surprise.length > 0 || state.reflect.note.trim()) && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-navy">My reflections</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">{state.reflect.surprise.map((x) => <span key={x} className="rounded-full bg-surface px-3 py-1 text-xs text-navy">{x}</span>)}</div>
              {state.reflect.note.trim() && <p className="mt-2 text-sm italic text-ink-600">“{state.reflect.note.trim()}”</p>}
            </div>
          )}
        </section>
        {missionDone ? <WardPlan state={state} /> : (
          <section className="grid place-items-center rounded-[22px] border border-dashed border-line bg-white/60 p-6 text-center">
            <div>
              <p className="text-3xl" aria-hidden="true">🌧️</p>
              <p className="mt-2 font-semibold text-navy">Your Ward Plan will appear here</p>
              <p className="mt-1 text-sm text-ink-500">Play the Rain Ready simulation to add it.</p>
              {core && <Button variant="secondary" className="mt-4" onClick={openRainReady}>{missionStarted(state) ? 'Continue Rain Ready' : 'Play Rain Ready'} <ArrowRight className="size-4" aria-hidden="true" /></Button>}
            </div>
          </section>
        )}
      </div>

      {missionDone && (
        <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6" data-testid="passport-skills">
          <h2 className="text-lg font-semibold">Skills you’ve shown</h2>
          <p className="mt-1 text-sm text-ink-500">From what you did in your simulations, with the proof. These grow as you play more.</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {skills(state.mission, level).map((sk) => (
              <li key={sk.id} className="rounded-2xl border border-line p-4">
                <p className="font-semibold text-navy">{sk.name}</p>
                <p className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-navy">
                  <span className="flex gap-1" aria-hidden="true">{[0, 1, 2].map((k) => <span key={k} className={cn('size-2.5 rounded-full', k < sk.score ? 'bg-violet' : 'bg-line')} />)}</span>
                  {skillLabel(sk.score)}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-500">{sk.proof[0]}</p>
                <p className="mt-1 text-[11px] text-ink-400">Rain Ready</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
        <h2 className="text-lg font-semibold">Pro words and fun facts</h2>
        <div className="mt-3 grid gap-6 md:grid-cols-2">
          <ul className="space-y-1.5 text-sm">
            {state.proWords.length ? state.proWords.map((w) => <li key={w}><strong className="text-navy">{proWords[w]?.word}:</strong> <span className="text-ink-600">{proWords[w]?.meaning}</span></li>) : <li className="text-ink-500">No pro words yet.</li>}
          </ul>
          <ul className="space-y-1.5 text-sm text-ink-600">
            {state.facts.length ? state.facts.map((f) => <li key={f}>💡 {facts[f]?.text}</li>) : <li className="text-ink-500">No facts yet.</li>}
          </ul>
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-3">
        {core ? (
          <>
            <Button size="lg" onClick={() => navigate('/career')}>Explore simulations <ArrowRight className="size-4" aria-hidden="true" /></Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/career/play')}>See my full profile</Button>
          </>
        ) : (
          <Button size="lg" onClick={() => navigate('/career/play')}>Finish my core profile <ArrowRight className="size-4" aria-hidden="true" /></Button>
        )}
        <Button size="lg" variant="secondary" onClick={() => { if (window.confirm('Start a new journey? Your current answers on this device will be cleared.')) { reset(); navigate('/career/play') } }}>Start over</Button>
      </div>
    </div>
  )
}
