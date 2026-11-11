export type ThemeId = 'make' | 'discover' | 'create' | 'help' | 'lead' | 'organise'
export type WorldId = 'build' | 'science' | 'tech' | 'health' | 'teach' | 'create' | 'business' | 'society' | 'earth' | 'trades'
export type ValueId = 'creativity' | 'helping' | 'discovery' | 'stability' | 'freedom' | 'leading' | 'money' | 'teamwork' | 'impact'
export type Level = 'explorer' | 'investigator' | 'planner' | 'pro'
export type Reaction = 'love' | 'maybe' | 'nah' | 'never'
export type Mood = 'love' | 'ok' | 'hard' | 'meh'
export type MoreAnswer = 'yes' | 'maybe' | 'no'
export type RoleId = 'scientist' | 'planner' | 'engineer'
/** The core profile, which every student completes first. */
export type Stage = 'welcome' | 'quickstart' | 'reveal'
/** An optional simulation, played after the core profile. */
export type MissionStage = 'team' | 'mission' | 'reflect' | 'results'

export type FixId = 'desilt' | 'bigDrain' | 'rainGardens' | 'pits' | 'lakePond' | 'underpass' | 'alerts'
export type ZoneId = 'market' | 'school' | 'lake'

export interface QuickStartAnswers {
  round: number
  index: number
  tot: Record<string, 0 | 1>
  cards: Record<string, Reaction>
  myths: Record<string, boolean>
  values: ValueId[]
  heard: WorldId[]
  subjects: string[]
  stream?: string
  routes: string[]
  study?: string
  degree?: string
  goal?: string
}

export interface MissionAnswers {
  step: number
  hotspots: string[]
  evidence: string[]
  cause?: string
  moods: Partial<Record<RoleId, Mood>>
  heardResidents: string[]
  rank: string[]
  salim?: string
  fixes: Partial<Record<FixId, number>>
  calc?: number
  calcTries: number
  twist?: string
  twistCuts: FixId[]
}

export interface ReflectAnswers {
  more: Partial<Record<RoleId, MoreAnswer>>
  surprise: string[]
  note: string
}

export interface CareerState {
  v: 2
  /** Core profile stage. */
  stage: Stage
  /** Set when the core profile is finished: the first Passport stamp. */
  coreDoneAt?: number
  /** Rain Ready simulation stage; undefined until the student opens it. */
  missionStage?: MissionStage
  nickname: string
  level: Level | null
  qs: QuickStartAnswers
  mission: MissionAnswers
  reflect: ReflectAnswers
  proWords: string[]
  facts: string[]
  checklist: Record<string, boolean>
  startedAt: number
  /** Set when Rain Ready is finished: its Passport stamp. */
  missionDoneAt?: number
}
