import { useState } from 'react'
import { AlertTriangle, CalendarPlus, Check, Lock, MessagesSquare } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { SegmentedTabs } from '../../components/ui/SegmentedTabs'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { cn } from '../../lib/cn'
import { ThemeTag } from '../components/ui'
import { themeOrder, worldOrder, worlds } from '../data/themes'
import { comingSoon } from '../engine/results'
import type { ThemeId, WorldId } from '../types'

// Sample data for a made-up class. Shown so schools can see what the dashboard measures:
// meaningful exposure, not clicks.
const CLASS = { name: 'Class 9B', students: 32, quickStart: 30, mission: 26, reflections: 21, avgWorlds: 3.4 }
const exposure: Record<WorldId, number> = { build: 26, earth: 26, society: 26, tech: 14, create: 11, health: 9, science: 8, business: 6, teach: 5, trades: 3 }
const themeCounts: Record<ThemeId, number> = { discover: 12, make: 10, help: 9, create: 8, lead: 7, organise: 6 }
const feltMost = [
  { label: 'Investigate (environmental scientist)', n: 9 },
  { label: 'Listen (urban planner)', n: 8 },
  { label: 'Design (civil engineer)', n: 9 },
]
const voices = [
  'I didn’t know planners have to listen to so many people.',
  'The maths for the drain was actually fun when it was about real rain.',
  'I always thought engineers just sit with numbers. Priya was outside a lot.',
  'I want to try something with animals next.',
]
const nudges = [
  { n: 5, text: 'students marked most activity cards “never tried”. Hands-on missions could widen their map.' },
  { n: 4, text: 'students said no part of Rain Ready felt like them. Suggest a different world next (Create, Health or Trades).' },
  { n: 3, text: 'students haven’t finished Quick Start. A 6-minute class slot would cover it.' },
]
const guides = [
  { topic: 'Assumptions', prompts: ['Who do you picture when you hear “engineer” or “nurse”? Why that picture?', 'Which job in Rain Ready surprised you the most?'] },
  { topic: 'Emerging interests', prompts: ['Which part of the mission would you happily do again tomorrow?', 'What did you enjoy even though it was hard?'] },
  { topic: 'Subject choices', prompts: ['Which subjects did the careers you liked use?', 'Is there a route (diploma, ITI, degree) you hadn’t heard of before?'] },
  { topic: 'Next exploration', prompts: ['Which foggy world on your map are you curious about?', 'Who could you talk to this month about their job?'] },
]

type Tab = 'see' | 'assign' | 'review' | 'talk'

function Bar({ label, value, max, flag }: { label: string; value: number; max: number; flag?: boolean }) {
  const pct = Math.round((value / max) * 100)
  return (
    <li className="grid grid-cols-[minmax(0,10rem)_1fr_auto] items-center gap-3 text-sm" title={`${label}: ${value} of ${max} students (${pct}%)`}>
      <span className="truncate text-navy">{label}</span>
      <span className="h-3 overflow-hidden rounded-[4px] bg-surface"><span className="block h-full rounded-[4px] bg-violet" style={{ width: `${pct}%` }} /></span>
      <span className="flex w-24 items-center justify-end gap-1.5 text-xs tabular-nums text-ink-600">
        {flag && <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700"><AlertTriangle className="size-3" aria-hidden="true" />Gap</span>}
        {value}/{max}
      </span>
    </li>
  )
}

export default function SchoolView() {
  const [tab, setTab] = useState<Tab>('see')
  const [assigned, setAssigned] = useState(false)
  const [scheduled, setScheduled] = useState(false)
  useDocumentTitle('School view · Career Simulator', 'See which career worlds a class has explored, where the gaps are, and what to discuss next.')
  const gapLimit = CLASS.students * 0.25

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6 px-4 pb-8 pt-6 sm:px-6 sm:pt-8" data-testid="school-view">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-violet">School & counsellor view</p>
          <h1 className="mt-2 text-[clamp(1.9rem,2.4vw+1rem,2.6rem)] font-[680] leading-tight tracking-[-0.03em]">{CLASS.name} · career exposure</h1>
          <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Sample data for a made-up class</p>
        </div>
        <SegmentedTabs<Tab>
          label="School view section"
          value={tab}
          onChange={setTab}
          options={[
            { value: 'see', label: 'See' },
            { value: 'assign', label: 'Assign' },
            { value: 'review', label: 'Review' },
            { value: 'talk', label: 'Talk' },
          ]}
        />
      </header>

      {tab === 'see' && (
        <>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { k: 'Finished Quick Start', v: `${CLASS.quickStart}/${CLASS.students}` },
              { k: 'Finished a mission', v: `${CLASS.mission}/${CLASS.students}` },
              { k: 'Worlds explored per student', v: CLASS.avgWorlds.toFixed(1), note: 'The number that matters most' },
              { k: 'Wrote a reflection', v: `${CLASS.reflections}/${CLASS.students}` },
            ].map((x) => (
              <li key={x.k} className="rounded-2xl bg-white p-4 shadow-card">
                <p className="text-xs text-ink-500">{x.k}</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-navy">{x.v}</p>
                {x.note && <p className="mt-0.5 text-[11px] font-semibold text-violet-700">{x.note}</p>}
              </li>
            ))}
          </ul>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
              <h2 className="text-lg font-semibold">Which career worlds has the class explored?</h2>
              <p className="mt-1 text-sm text-ink-500">Students who explored at least one career in each world. “Gap” means fewer than a quarter of the class.</p>
              <ul className="mt-5 space-y-2.5">
                {[...worldOrder].sort((a, b) => exposure[b] - exposure[a]).map((w) => <Bar key={w} label={worlds[w].name} value={exposure[w]} max={CLASS.students} flag={exposure[w] < gapLimit} />)}
              </ul>
            </section>
            <section className="space-y-6">
              <div className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
                <h2 className="text-lg font-semibold">Strongest interest themes</h2>
                <p className="mt-1 text-sm text-ink-500">Students with each theme in their top two.</p>
                <ul className="mt-4 space-y-2">
                  {themeOrder.slice().sort((a, b) => themeCounts[b] - themeCounts[a]).map((t) => (
                    <li key={t} className="flex items-center justify-between gap-3 text-sm"><ThemeTag id={t} /><span className="tabular-nums text-ink-600">{themeCounts[t]} students</span></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
                <h2 className="text-lg font-semibold">Rain Ready: what felt most like them</h2>
                <ul className="mt-4 space-y-2.5">{feltMost.map((f) => <Bar key={f.label} label={f.label} value={f.n} max={CLASS.mission} />)}</ul>
              </div>
            </section>
          </div>
          <section className="rounded-[22px] border border-amber/30 bg-amber-50 p-5 sm:p-6">
            <h2 className="flex items-center gap-2 font-semibold text-navy"><AlertTriangle className="size-5 text-amber-700" aria-hidden="true" />Suggested nudges</h2>
            <ul className="mt-3 space-y-2 text-sm text-navy">{nudges.map((n) => <li key={n.text}><strong>{n.n}</strong> {n.text}</li>)}</ul>
          </section>
        </>
      )}

      {tab === 'assign' && (
        <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-lg font-semibold">Assign missions and sessions</h2>
          <ul className="mt-4 divide-y divide-line">
            <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="font-semibold text-navy">🌧️ Rain Ready</p><p className="text-sm text-ink-500">Build · Earth · Society · about 15 minutes</p></div>
              <Button variant={assigned ? 'dark' : 'primary'} onClick={() => setAssigned((a) => !a)}>{assigned ? <><Check className="size-4" aria-hidden="true" />Assigned to {CLASS.name}</> : `Assign to ${CLASS.name}`}</Button>
            </li>
            {comingSoon.map((m) => (
              <li key={m.title} className="flex items-center justify-between gap-3 py-4">
                <div><p className="font-semibold text-navy">{m.emoji} {m.title}</p><p className="text-sm text-ink-500">{m.worlds}</p></div>
                <span className="inline-flex items-center gap-1.5 text-sm text-ink-400"><Lock className="size-4" aria-hidden="true" />Coming soon</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-navy"><strong>Debrief session:</strong> a 20-minute class discussion after the mission, using the Talk guides.</p>
            <Button variant="secondary" onClick={() => setScheduled((s) => !s)}><CalendarPlus className="size-4" aria-hidden="true" />{scheduled ? 'Scheduled for Friday ✓' : 'Schedule for Friday'}</Button>
          </div>
          <p className="mt-3 text-xs text-ink-500">Demo only. In the full product, assignments reach students’ accounts.</p>
        </section>
      )}

      {tab === 'review' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
            <h2 className="text-lg font-semibold">What students said</h2>
            <p className="mt-1 text-sm text-ink-500">Shared reflections, without names.</p>
            <ul className="mt-4 space-y-2.5">{voices.map((v) => <li key={v} className="rounded-xl bg-surface p-3 text-sm italic text-navy">“{v}”</li>)}</ul>
          </section>
          <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
            <h2 className="text-lg font-semibold">Work and next steps</h2>
            <ul className="mt-4 space-y-3 text-sm text-navy">
              <li className="flex justify-between gap-3"><span>Ward plans submitted</span><strong className="tabular-nums">26</strong></li>
              <li className="flex justify-between gap-3"><span>Plans that named a trade-off</span><strong className="tabular-nums">22</strong></li>
              <li className="flex justify-between gap-3"><span>Plans that named an unknown</span><strong className="tabular-nums">19</strong></li>
              <li className="flex justify-between gap-3"><span>Students who committed to a weekly step</span><strong className="tabular-nums">17</strong></li>
              <li className="flex justify-between gap-3"><span>Most common surprise</span><strong>“There’s no single right answer”</strong></li>
            </ul>
          </section>
        </div>
      )}

      {tab === 'talk' && (
        <section className="rounded-[22px] bg-white p-5 shadow-card sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold"><MessagesSquare className="size-5 text-violet" aria-hidden="true" />Counsellor discussion guide</h2>
          <p className="mt-1 text-sm text-ink-500">Open questions for one-to-one or small-group chats. Listen more than you tell.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {guides.map((g) => (
              <article key={g.topic} className="rounded-2xl border border-line p-4">
                <h3 className="text-sm font-semibold text-violet-700">{g.topic}</h3>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-navy">{g.prompts.map((p) => <li key={p}>• {p}</li>)}</ul>
              </article>
            ))}
          </div>
          <p className={cn('mt-4 rounded-xl bg-violet-50 p-3 text-sm text-navy')}>Tip: avoid “What do you want to be?”. Ask “What kind of work did you enjoy doing?” instead.</p>
        </section>
      )}
    </div>
  )
}
