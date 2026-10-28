import { useEffect, useId, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GraduationCap, ShieldHalf } from 'lucide-react'
import { SimulationCard } from '../components/simulation/SimulationCard'
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

export default function Products() {
  const [params, setParams] = useSearchParams()
  const uid = useId()
  const panelId = `${uid}-panel`

  const category: Category = params.get('category') === 'school' ? 'school' : 'police'
  const gradeParam = params.get('grade')
  const grade: GradeBand = isGradeBand(gradeParam) ? gradeParam : '6-8'
  const strandParam = params.get('strand')
  const strand: Strand | undefined = isStrand(strandParam) ? strandParam : undefined
  const gradePanelId = `${uid}-grade-panel`

  // Normalise unknown values out of the URL so it always reflects what is shown.
  useEffect(() => {
    const next = new URLSearchParams(params)
    const cat = params.get('category')
    if (cat && cat !== 'police' && cat !== 'school') next.delete('category')
    if (gradeParam && !isGradeBand(gradeParam)) next.delete('grade')
    if (strandParam && !isStrand(strandParam)) next.delete('strand')
    if (next.toString() !== params.toString()) setParams(next, { replace: true, preventScrollReset: true })
  }, [params, gradeParam, strandParam, setParams])

  useDocumentTitle(
    category === 'police' ? 'Police Training Simulations' : `School Training Simulations · ${gradeBandLabels[grade]}`,
    'Browse InScene’s scenario-based simulations for police training institutions and schools (Grades 6–8, 9–10 and 11–12).',
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
