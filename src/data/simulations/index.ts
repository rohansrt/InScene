import { policeSimulations } from './police'
import { schoolSimulations } from './school'
import type { Category, GradeBand, LevelId, Strand, Simulation } from './types'

export type { Category, GradeBand, LevelId, Strand, Simulation } from './types'

export const simulations: Simulation[] = [...policeSimulations, ...schoolSimulations]

export const categoryLabels: Record<Category, string> = {
  police: 'Police Training',
  school: 'School Training',
}

export const gradeBands: GradeBand[] = ['6-8', '9-10', '11-12']

export const gradeBandLabels: Record<GradeBand, string> = {
  '6-8': 'Grades 6–8',
  '9-10': 'Grades 9–10',
  '11-12': 'Grades 11–12',
}

export const strandLabels: Record<Strand, string> = {
  academic: 'Academic',
  'non-academic': 'Non-academic',
}

export const levelLabels: Record<LevelId, string> = {
  basic: 'Basic',
  advanced: 'Advanced',
}

/** Featured on the homepage: one per audience segment, all from the source PDFs. */
export const featuredSlugs = [
  'fair-exam-march',
  'complaint-at-the-front-desk',
  'forward-or-fact-check',
  'should-the-school-go-solar',
]

const bySlug = new Map(simulations.map((s) => [s.slug, s]))

export function getSimulation(slug: string | null | undefined): Simulation | undefined {
  return slug ? bySlug.get(slug) : undefined
}

export function filterSimulations(opts: {
  category: Category
  grade?: GradeBand
  strand?: Strand
}): Simulation[] {
  return simulations.filter(
    (s) =>
      s.category === opts.category &&
      (opts.category !== 'school' || !opts.grade || s.gradeBands?.includes(opts.grade)) &&
      (!opts.strand || s.strand === opts.strand),
  )
}

export function isGradeBand(v: string | null): v is GradeBand {
  return v === '6-8' || v === '9-10' || v === '11-12'
}

export function isStrand(v: string | null): v is Strand {
  return v === 'academic' || v === 'non-academic'
}
