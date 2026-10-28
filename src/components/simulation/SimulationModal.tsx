import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from 'react'
import { ArrowLeft, CircleCheck, Clock, Gauge, Info, Play, Quote, ShieldCheck } from 'lucide-react'
import { categoryLabels, levelLabels, type LevelId, type Simulation } from '../../data/simulations'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Chip'
import { Dialog } from '../ui/Dialog'
import { SegmentedTabs } from '../ui/SegmentedTabs'
import { ComingSoonPanel } from './ComingSoonPanel'
import { ScenarioImage } from './ScenarioImage'
import { contextLine, durationLabel, imageAlt } from './meta'

interface Props {
  simulation: Simulation | undefined
  onClose: () => void
  returnFocusRef: RefObject<HTMLElement | null>
}

export function SimulationModal({ simulation, onClose, returnFocusRef }: Props) {
  if (!simulation) return null
  return <SimulationDialog key={simulation.slug} sim={simulation} onClose={onClose} returnFocusRef={returnFocusRef} />
}

function SimulationDialog({ sim, onClose, returnFocusRef }: { sim: Simulation; onClose: () => void; returnFocusRef: RefObject<HTMLElement | null> }) {
  const [view, setView] = useState<'details' | 'coming-soon'>('details')
  // Level and scroll position survive a round-trip through the Coming Soon panel.
  const [level, setLevel] = useState<LevelId>(sim.levels[0]?.id ?? 'basic')
  const playRef = useRef<HTMLButtonElement>(null)
  const savedScroll = useRef<number | null>(null)
  const uid = useId()
  const titleId = `${uid}-title`
  const soonId = `${uid}-soon`
  const isPolice = sim.category === 'police'

  function playNow() {
    savedScroll.current = playRef.current?.closest('[role="dialog"]')?.querySelector('[data-dialog-scroll]')?.scrollTop ?? 0
    setView('coming-soon')
  }

  useEffect(() => {
    if (view !== 'details' || savedScroll.current === null) return
    const scroller = playRef.current?.closest('[role="dialog"]')?.querySelector('[data-dialog-scroll]')
    if (scroller) scroller.scrollTop = savedScroll.current
    savedScroll.current = null
    playRef.current?.focus({ preventScroll: true })
  }, [view])

  const footer =
    view === 'details' ? (
      <div className="flex items-center justify-between gap-4 border-t border-line bg-white/95 px-5 py-3.5 backdrop-blur sm:px-8">
        <p className="hidden min-w-0 truncate text-sm text-ink-500 sm:block">
          <span className="font-medium text-navy">{sim.title}</span>
          {sim.duration && <> · {durationLabel(sim)}</>}
        </p>
        <Button ref={playRef} size="lg" className="w-full sm:w-auto" onClick={playNow} data-testid="play-now">
          <Play className="size-4 fill-current" aria-hidden="true" />
          Play Now
        </Button>
      </div>
    ) : null

  return (
    <Dialog
      open
      onClose={onClose}
      labelledBy={view === 'details' ? titleId : soonId}
      returnFocusRef={returnFocusRef}
      className="sm:max-w-[880px]"
      footer={footer}
      closeLabel="Close simulation preview"
    >
      {view === 'coming-soon' ? (
        <ComingSoonPanel
          titleId={soonId}
          context={<Badge tone="blue">{sim.title}</Badge>}
          actions={
            <>
              <Button variant="secondary" onClick={() => setView('details')}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back to simulation
              </Button>
              <Button onClick={onClose}>Back to simulations</Button>
            </>
          }
        />
      ) : (
        <article data-testid="simulation-modal" data-slug={sim.slug}>
          <ScenarioImage
            imageKey={sim.imageKey}
            alt={imageAlt(sim)}
            tone={sim.category}
            icon={sim.icon}
            aspect="aspect-[16/8] sm:aspect-[21/8]"
            className="[&_img]:object-top"
            iconSize="lg"
            sizes="(min-width: 640px) 880px, 100vw"
            priority
          />

          <div className="px-5 pb-10 pt-7 sm:px-10 sm:pt-9">
            <header>
              <p className="eyebrow">{categoryLabels[sim.category]}{!isPolice && <span className="text-ink-500"> · {contextLine(sim)}</span>}</p>
              <h2 id={titleId} className="mt-2.5 text-[clamp(1.6rem,2vw+1rem,2.15rem)] font-[650] leading-tight tracking-[-0.03em]">
                {sim.title}
              </h2>
              {sim.subtitle && <p className="mt-2 text-lg text-ink-500">{sim.subtitle}</p>}
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Simulation details">
                <li><Badge tone={isPolice ? 'blue' : 'teal'}>{isPolice ? `Track: ${sim.area}` : sim.area}</Badge></li>
                {sim.duration && (
                  <li>
                    <Badge>
                      <Clock className="size-3.5" aria-hidden="true" />
                      {isPolice ? 'Duration' : 'Target length'}: {durationLabel(sim)}
                    </Badge>
                  </li>
                )}
                {sim.complexity && (
                  <li>
                    <Badge>
                      <Gauge className="size-3.5" aria-hidden="true" />
                      {sim.complexity}
                    </Badge>
                  </li>
                )}
                <li><Badge>Levels: Basic + Advanced</Badge></li>
              </ul>
            </header>

            <Section index="01" title="The Situation">
              <p className="text-[1.0625rem] leading-relaxed text-ink-600">{sim.situation}</p>
              {sim.mission && (
                <div className="mt-5 rounded-xl bg-blue-50 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-700">Learner mission</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-navy">{sim.mission}</p>
                </div>
              )}
              {sim.setting && (
                <div className="mt-5 rounded-xl border border-line bg-surface p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">Scene setting</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{sim.setting}</p>
                </div>
              )}
              {sim.characters && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold">Key characters</h4>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {sim.characters.map((c) => (
                      <li key={c.role} className="rounded-xl border border-line p-3.5">
                        <p className="text-sm font-semibold text-navy">{c.role}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-ink-500">{c.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {sim.quotes && sim.quotes.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold">Voices from the scene</h4>
                  <ul className="mt-3 space-y-2.5">
                    {sim.quotes.map((q) => (
                      <li key={q} className="flex gap-3 border-l-2 border-teal pl-4">
                        <Quote className="mt-0.5 size-4 shrink-0 text-teal-700" aria-hidden="true" />
                        <blockquote className="text-[0.9375rem] italic leading-relaxed text-navy">“{q}”</blockquote>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>

            <Section index="02" title="How It Plays">
              <ol className="space-y-3.5">
                {sim.howItPlays.map((step, i) => (
                  <li key={i} className="flex gap-3.5">
                    <span className="mt-px grid size-6 shrink-0 place-items-center rounded-full bg-navy text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    <p className="text-[0.9375rem] leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
              {sim.interactionDesign && <Note label="The interface">{sim.interactionDesign}</Note>}
              {sim.decisionPoints && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold">Illustrative decision points</h4>
                  <ol className="mt-3 flex flex-wrap gap-2">
                    {sim.decisionPoints.map((d, i) => (
                      <li key={d} className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3 text-sm text-navy">
                        <span className="grid size-5 place-items-center rounded-full bg-blue-50 text-[11px] font-semibold text-blue-700">{i + 1}</span>
                        {d}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {sim.branchOutcomes && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold">How the situation may unfold</h4>
                  <ul className="mt-3 divide-y divide-line rounded-xl border border-line">
                    {sim.branchOutcomes.map((o) => (
                      <li key={o.label} className="p-3.5 sm:flex sm:gap-4">
                        <p className="shrink-0 text-sm font-semibold text-navy sm:w-44">{o.label}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-ink-500 sm:mt-0">{o.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>

            <Section index="03" title="What You'll Learn">
              <ul className="grid gap-3">
                {sim.learningOutcomes.map((o) => (
                  <li key={o} className="flex gap-3">
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden="true" />
                    <p className="text-[0.9375rem] leading-relaxed">{o}</p>
                  </li>
                ))}
              </ul>
              {sim.debrief && <Note label="Debrief and assessment">{sim.debrief}</Note>}
            </Section>

            <Section index="04" title="Simulation Levels">
              <LevelSelector sim={sim} level={level} onChange={setLevel} />
            </Section>

            <aside className="mt-10 flex gap-3 rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-ink-500">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden="true" />
              {isPolice ? (
                <p>
                  <span className="font-semibold text-navy">Proposed design. </span>
                  This scenario is to be reviewed with experienced police trainers and jurisdiction-specific SOPs before it is
                  used as operational instruction. It does not represent an approved police SOP or legal interpretation.
                </p>
              ) : (
                <p>
                  <span className="font-semibold text-navy">Content guardrails. </span>
                  {sim.guardrails} Content is to be validated by a teacher or subject-matter expert before classroom use.
                </p>
              )}
            </aside>
          </div>
        </article>
      )}
    </Dialog>
  )
}

function Section({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <section className="mt-10 border-t border-line pt-8">
      <h3 className="flex items-baseline gap-3 text-xl font-[640] tracking-[-0.02em]">
        <span className="font-mono text-xs font-medium tracking-normal text-blue">{index}</span>
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function Note({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-5 flex gap-3 rounded-xl border border-line p-4">
      <Info className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden="true" />
      <p className="text-sm leading-relaxed">
        <span className="font-semibold text-navy">{label}. </span>
        {children}
      </p>
    </div>
  )
}

function LevelSelector({ sim, level, onChange: setLevel }: { sim: Simulation; level: LevelId; onChange: (l: LevelId) => void }) {
  const uid = useId()
  const panelId = `${uid}-level-panel`
  const current = sim.levels.find((l) => l.id === level)

  return (
    <div>
      <SegmentedTabs
        label="Simulation level"
        value={level}
        onChange={setLevel}
        controls={panelId}
        options={sim.levels.map((l) => ({ value: l.id, label: levelLabels[l.id], id: `${uid}-tab-${l.id}` }))}
      />
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${level}`}
        data-testid="level-panel"
        data-level={level}
        className="mt-4 rounded-xl border border-line p-4 sm:p-5"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-500">{levelLabels[level]} level</p>
        {current?.description ? (
          <p className="mt-2 text-[0.9375rem] leading-relaxed">{current.description}</p>
        ) : (
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
            <span className="font-medium text-navy">Details coming soon.</span> A {levelLabels[level]} variation is
            planned for this simulation; its scenario details have not been published yet.
          </p>
        )}
      </div>
    </div>
  )
}
