import { categoryLabels, gradeBandLabels, levelLabels, strandLabels, type Simulation } from '../../data/simulations'

export function gradeLabel(sim: Simulation) {
  return sim.gradeBands?.map((g) => gradeBandLabels[g]).join(', ')
}

export function durationLabel(sim: Simulation) {
  if (!sim.duration) return undefined
  return sim.durationProposed ? `${sim.duration} (proposed)` : sim.duration
}

/** Short contextual line: police → track; school → grade band · strand. */
export function contextLine(sim: Simulation) {
  return sim.category === 'police'
    ? `${categoryLabels.police} · ${sim.area}`
    : [gradeLabel(sim), sim.strand && strandLabels[sim.strand]].filter(Boolean).join(' · ')
}

export function levelNames(sim: Simulation) {
  return sim.levels.map((l) => levelLabels[l.id])
}

export function imageAlt(sim: Simulation) {
  return `Illustration for the ${sim.title} simulation`
}
