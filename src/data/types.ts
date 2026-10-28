export type Category = 'police' | 'school'
export type GradeBand = '6-8' | '9-10' | '11-12'
export type Strand = 'academic' | 'non-academic'
export type LevelId = 'basic' | 'advanced'

export interface SimulationLevel {
  id: LevelId
  /** Present only when the source document describes this level. */
  description?: string
  /** "documented" = described in the source PDF; "planned" = part of the product structure, not yet described. */
  availability: 'documented' | 'planned'
}

export interface Character {
  role: string
  note: string
}

export interface LabelledText {
  label: string
  text: string
}

export interface Simulation {
  id: string
  /** Code used in the source document, e.g. "01" (police) or "A6" (school). */
  code: string
  slug: string
  title: string
  category: Category
  /** School only. An array so a simulation can apply to several bands. */
  gradeBands?: GradeBand[]
  /** School only: Academic / Non-academic, as grouped in the source. */
  strand?: Strand
  /** Police track (e.g. "Public Order") or school area (e.g. "Science"). */
  area: string
  /** Police card subtitle, verbatim from the source. */
  subtitle?: string
  duration?: string
  /** True when the source labels the duration as proposed / illustrative. */
  durationProposed?: boolean
  /** School only: complexity line, e.g. "Concrete observation; about 10 interaction points". */
  complexity?: string
  /** One-to-two sentence card description condensed from the source situation. */
  summary: string
  situation: string
  /** Police only: scene setting paragraph. */
  setting?: string
  /** School only: learner mission. */
  mission?: string
  characters?: Character[]
  howItPlays: string[]
  /** School: interaction and state design. */
  interactionDesign?: string
  /** Police: names of the five illustrative decision points. */
  decisionPoints?: string[]
  /** Police: possible branch outcomes. */
  branchOutcomes?: LabelledText[]
  learningOutcomes: string[]
  /** School: debrief and assessment approach. */
  debrief?: string
  /** School: content guardrails. */
  guardrails?: string
  /** Police: sample character prompts. */
  quotes?: string[]
  levels: SimulationLevel[]
  /** Lucide icon used in the placeholder artwork until illustrations exist. */
  icon: string
  imageKey: string
  sourceReference: string
}
