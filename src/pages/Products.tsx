import { useEffect, useId, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Compass, GraduationCap, ShieldHalf } from 'lucide-react'
import { SimulationCard } from '../components/simulation/SimulationCard'
import { ButtonLink } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { SegmentedTabs } from '../components/ui/SegmentedTabs'
import {
  filterSimulations,
  gradeBandLabels,
  gradeBands,
  isGradeBand,
  isStrand,
  simulations,
  strandLabels,
  type Category,
  type GradeBand,
  type Strand,
} from '../data/simulations'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { cn } from '../lib/cn'

function CareerBanner() {
  return (
    <div className="mb-8 flex flex-col gap-4 overflow-hidden rounded-2xl bg-[linear-gradient(140deg,#1b2a6b_0%,#3b3aa8_55%,#5a49c9_100%)] p-5 text-white shadow-lift sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">New · Playable demo · Ages 12–20</p>
        <p className="mt-1 text-lg font-semibold text-white">Don’t just guess your career. Try it.</p>
        <ol className="mt-3 flex flex-col gap-2 text-sm sm:flex-row sm:items-stretch" aria-label="How the Career Simulator works">
          <li className="flex items-center gap-2.5 rounded-xl bg-white/12 px-3 py-2 ring-1 ring-inset ring-white/20">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-amber text-xs font-bold text-navy">1</span>
            <span><strong className="font-semibold text-white">Career Profile</strong> <span className="text-white/75">· 10 min · required</span></span>
          </li>
          <li aria-hidden="true" className="hidden items-center text-white/50 sm:flex">→</li>
          <li className="flex items-center gap-2.5 rounded-xl bg-white/6 px-3 py-2 ring-1 ring-inset ring-white/15">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/20 text-xs font-bold text-white">2</span>
            <span><strong className="font-semibold text-white">Pick simulations</strong> <span className="text-white/75">· 15 min each · earn stamps</span></span>
          </li>
        </ol>
        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/80">Each one earns a stamp in your Career Passport and sharpens your profile.</p>
      </div>
      <ButtonLink to="/career" size="lg" variant="secondary" className="shrink-0" data-testid="career-banner-cta">
        Start with my profile
      </ButtonLink>
    </div>
  )
}

export default function Products() {
  const [params, setParams] = useSearchParams()
  const uid = useId()
  const panelId = `${uid}-panel`

  const catParam = params.get('category')
  const category: Category = catParam === 'school' || catParam === 'career' ? catParam : 'police'
  const gradeParam = params.get('grade')
  const grade: GradeBand = isGradeBand(gradeParam) ? gradeParam : '6-8'
  const strandParam = params.get('strand')
  const strand: Strand | undefined = isStrand(strandParam) ? strandParam : undefined
  const gradePanelId = `${uid}-grade-panel`

  // Normalise unknown values out of the URL so it always reflects what is shown.
  useEffect(() => {
    const next = new URLSearchParams(params)
    const cat = params.get('category')
    if (cat && cat !== 'police' && cat !== 'school' && cat !== 'career') next.delete('category')
    if (gradeParam && !isGradeBand(gradeParam)) next.delete('grade')
    if (strandParam && !isStrand(strandParam)) next.delete('strand')
    if (next.toString() !== params.toString()) setParams(next, { replace: true, preventScrollReset: true })
  }, [params, gradeParam, strandParam, setParams])

  useDocumentTitle(
    category === 'police' ? 'Police Training Simulations' : category === 'career' ? 'Career Simulator' : `School Training Simulations · ${gradeBandLabels[grade]}`,
    'Browse InScene’s scenario-based simulations for police training institutions, schools (Grades 6–8, 9–10 and 11–12) and career discovery.',
  )

  const results = useMemo(
    () => filterSimulations({ category, grade: category === 'school' ? grade : undefined, strand: category === 'school' ? strand : undefined }),
    [category, grade, strand],
  )

  function update(changes: Record<string, string | null>) {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(changes)) {
      if (v === null) next.delete(k)
      else next.set(k, v)
    }
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const counts = {
    police: simulations.filter((s) => s.category === 'police').length,
    school: simulations.filter((s) => s.category === 'school').length,
    career: simulations.filter((s) => s.category === 'career').length,
  }

  return (
    <div className="pb-24 sm:pb-32">
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_80%_at_80%_0%,rgb(37_99_235/0.06),transparent_70%)]" />
        <div className="container-site pb-8 pt-8 sm:pb-10 sm:pt-12">
          <h1 className="h2 max-w-2xl">Simulation catalog</h1>
          <div className="mt-6">
            <SegmentedTabs<Category>
              label="Training category"
              size="lg"
              value={category}
              controls={panelId}
              onChange={(c) => update({ category: c, grade: null, strand: null })}
              options={[
                {
                  value: 'police',
                  id: `${uid}-tab-police`,
                  label: (
                    <>
                      <ShieldHalf className="size-4" aria-hidden="true" />
                      Police Training
                      <span className="hidden text-xs font-medium opacity-70 sm:inline">{counts.police}</span>
                    </>
                  ),
                },
                {
                  value: 'school',
                  id: `${uid}-tab-school`,
                  label: (
                    <>
                      <GraduationCap className="size-4" aria-hidden="true" />
                      School Training
                      <span className="hidden text-xs font-medium opacity-70 sm:inline">{counts.school}</span>
                    </>
                  ),
                },
                {
                  value: 'career',
                  id: `${uid}-tab-career`,
                  label: (
                    <>
                      <Compass className="size-4" aria-hidden="true" />
                      Career Simulator
                      <span className="hidden text-xs font-medium opacity-70 sm:inline">{counts.career}</span>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${category}`}
        className="container-site pt-8"
        data-testid="catalog"
        data-category={category}
      >
        {category === 'career' && <CareerBanner />}

        {category === 'school' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-sm font-semibold text-navy">Class</span>
              <SegmentedTabs<GradeBand>
                label="Grade band"
                size="lg"
                value={grade}
                onChange={(g) => update({ grade: g })}
                controls={gradePanelId}
                options={gradeBands.map((g) => ({ value: g, label: gradeBandLabels[g], id: `${uid}-grade-${g}` }))}
                className="w-full sm:w-auto"
                fullWidth
              />
            </div>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
              <Chip active={!strand} onClick={() => update({ strand: null })}>All</Chip>
              {(Object.keys(strandLabels) as Strand[]).map((s) => (
                <Chip key={s} active={strand === s} onClick={() => update({ strand: strand === s ? null : s })}>
                  {strandLabels[s]}
                </Chip>
              ))}
            </div>
          </div>
        )}

        <div
          {...(category === 'school' ? { id: gradePanelId, role: 'tabpanel', 'aria-labelledby': `${uid}-grade-${grade}` } : {})}
        >
        <p className={cn('text-sm text-ink-500', category === 'school' && 'mt-8')} aria-live="polite" data-testid="result-count">
          <span className="font-semibold text-navy">{results.length}</span> simulation{results.length === 1 ? '' : 's'}
          {category === 'school' && <> · {gradeBandLabels[grade]}{strand && <> · {strandLabels[strand]}</>}</>}
        </p>

        {results.length > 0 ? (
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {results.map((sim) => (
              <li key={sim.slug}>
                <SimulationCard simulation={sim} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-line p-12 text-center">
            <p className="font-medium text-navy">No simulations match these filters yet.</p>
            <button type="button" className="mt-3 text-sm font-semibold text-blue" onClick={() => update({ strand: null })}>
              Clear filters
            </button>
          </div>
        )}
        </div>


      </section>
    </div>
  )
}
