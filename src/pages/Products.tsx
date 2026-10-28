import { useEffect, useId, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GraduationCap, ShieldHalf, Info } from 'lucide-react'
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

const categoryCopy: Record<Category, { title: string; intro: string }> = {
  police: {
    title: 'Police Training',
    intro:
      'Scenarios for public order, first response, community safety, cyber first response and incident coordination. Each offers a Basic and an Advanced level.',
  },
  school: {
    title: 'School Training',
    intro:
      'Academic and non-academic scenarios designed for each grade band — from concrete observation in Grades 6–8 to multi-variable, defended decisions in Grades 11–12.',
  },
}

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
        <div className="container-site pb-10 pt-10 sm:pb-12 sm:pt-16">
          <p className="eyebrow">Products</p>
          <h1 className="h2 mt-3 max-w-2xl">Simulation catalog</h1>
          <p className="lead mt-4 max-w-2xl text-ink-500">
            Preview every InScene scenario: the situation, how it plays, what learners take away and the levels planned
            for each.
          </p>
          <div className="mt-8">
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
                      <span className="hidden text-xs font-medium text-ink-500 sm:inline">{counts.police}</span>
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
                      <span className="hidden text-xs font-medium text-ink-500 sm:inline">{counts.school}</span>
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
        className="container-site pt-10"
        data-testid="catalog"
        data-category={category}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-[650] tracking-[-0.025em]">{categoryCopy[category].title}</h2>
            <p className="mt-2 leading-relaxed text-ink-500">{categoryCopy[category].intro}</p>
          </div>
          {category === 'school' && (
            <div className="flex flex-col gap-3 lg:items-end">
              <SegmentedTabs<GradeBand>
                label="Grade band"
                value={grade}
                onChange={(g) => update({ grade: g })}
                controls={gradePanelId}
                options={gradeBands.map((g) => ({ value: g, label: gradeBandLabels[g], id: `${uid}-grade-${g}` }))}
                className="w-full sm:w-auto"
                fullWidth
              />
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
        </div>

        <div
          {...(category === 'school' ? { id: gradePanelId, role: 'tabpanel', 'aria-labelledby': `${uid}-grade-${grade}` } : {})}
        >
        <p className="mt-8 text-sm text-ink-500" aria-live="polite" data-testid="result-count">
          <span className="font-semibold text-navy">{results.length}</span> simulation{results.length === 1 ? '' : 's'}
          {category === 'school' && <> · {gradeBandLabels[grade]}{strand && <> · {strandLabels[strand]}</>}</>}
        </p>

        {results.length > 0 ? (
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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

        <div className="mt-10 flex gap-3 rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-ink-500">
          <Info className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden="true" />
          {category === 'police' ? (
            <p>
              Police scenarios are proposed designs. They are to be reviewed with experienced police trainers and
              jurisdiction-specific SOPs before being used as operational instruction. Durations marked “proposed” are
              illustrative.
            </p>
          ) : (
            <p>
              Target lengths and interaction counts are flexible design targets. Scenario content is to be validated by
              teachers or subject-matter experts and adapted to the relevant board syllabus before classroom use.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
