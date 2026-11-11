import { createContext, useContext } from 'react'
import type { CareerState, MissionAnswers, MissionStage, ReflectAnswers } from './types'

const KEY = 'inscene.career.v1'

export function freshMission(): MissionAnswers {
  return { step: 0, hotspots: [], evidence: [], moods: {}, heardResidents: [], rank: [], fixes: {}, calcTries: 0, twistCuts: [] }
}

export function freshReflect(): ReflectAnswers {
  return { more: {}, surprise: [], note: '' }
}

export function freshState(): CareerState {
  return {
    v: 2,
    stage: 'welcome',
    nickname: '',
    level: null,
    qs: { round: 0, index: 0, tot: {}, cards: {}, myths: {}, values: [], heard: [], subjects: [], routes: [] },
    mission: freshMission(),
    reflect: freshReflect(),
    proWords: [],
    facts: [],
    checklist: {},
    startedAt: Date.now(),
  }
}

// Storage can be unavailable (private mode, blocked site data); the journey still works,
// it just won't survive a refresh.
export function load(): CareerState {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as CareerState | LegacyState
      if (parsed?.v === 1 || parsed?.v === 2) {
        const base = freshState()
        const merged: CareerState = { ...base, ...(parsed as CareerState), v: 2, qs: { ...base.qs, ...parsed.qs }, mission: { ...base.mission, ...parsed.mission }, reflect: { ...base.reflect, ...parsed.reflect } }
        return parsed.v === 1 ? migrate(merged, parsed as LegacyState) : merged
      }
    }
  } catch {
    /* ignore */
  }
  return freshState()
}

/** v1 kept the Rain Ready mission inside the core journey. */
interface LegacyState {
  v: 1
  stage: string
  finishedAt?: number
  startedAt: number
  qs: CareerState['qs']
  mission: MissionAnswers
  reflect: ReflectAnswers
}

const legacyMission: Record<string, MissionStage> = { team: 'team', mission: 'mission', reflect: 'reflect', results: 'results' }

function migrate(s: CareerState, old: LegacyState): CareerState {
  const missionStage = legacyMission[old.stage]
  if (!missionStage && old.stage !== 'reveal') return s
  return {
    ...s,
    stage: 'reveal',
    coreDoneAt: old.startedAt,
    missionStage,
    missionDoneAt: missionStage === 'results' ? (old.finishedAt ?? Date.now()) : undefined,
  }
}

export function save(s: CareerState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

export interface Ctx {
  state: CareerState
  update: (fn: (s: CareerState) => CareerState) => void
  reset: () => void
}

export const CareerContext = createContext<Ctx | null>(null)

export function useCareer() {
  const ctx = useContext(CareerContext)
  if (!ctx) throw new Error('useCareer must be used inside CareerProvider')
  return ctx
}

/** Records that a pro word or fact has been seen (idempotent). */
export function addUnique(list: string[], id: string) {
  return list.includes(id) ? list : [...list, id]
}
