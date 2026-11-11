import type { Career } from '../data/careers'
import { roleOrder } from '../data/mission'
import { worldOrder } from '../data/themes'
import type { CareerState, Level, RoleId, WorldId } from '../types'
import { roleFeel } from './mission'
import type { ScoredCareer } from './profile'

export const article = (word: string) => (/^[aeiou]/i.test(word) ? 'an' : 'a')

/** The mission role that felt most like the student, if they answered any mood checks. */
export function topRole(s: CareerState): { role: RoleId; feel: number } | null {
  const scored = roleOrder.map((r) => ({ role: r, feel: roleFeel(s.mission, s.reflect, r) ?? 0 })).sort((a, b) => b.feel - a.feel)
  return scored[0].feel > 0 ? scored[0] : null
}

/** The route text that fits the student's stage. */
export function routeFor(c: Career, level: Level) {
  if (level === 'explorer') return `Subjects that help: ${c.subjects.join(', ')}.`
  if (level === 'investigator') return [`Subjects that help: ${c.subjects.join(', ')}.`, c.routes.afterTen ? `After Class 10: ${c.routes.afterTen}` : `After Class 12: ${c.routes.afterTwelve}`].join(' ')
  if (level === 'planner') return [c.routes.afterTwelve, c.routes.afterTen ? `Another route: ${c.routes.afterTen}` : ''].filter(Boolean).join(' ')
  return c.routes.college
}

/** 0–1 per world: the best career score in that world, relative to the best overall. */
export function worldGlow(ranked: ScoredCareer[]): Record<WorldId, number> {
  const best = Object.fromEntries(worldOrder.map((w) => [w, 0])) as Record<WorldId, number>
  for (const c of ranked) best[c.career.world] = Math.max(best[c.career.world], c.score)
  const max = Math.max(...Object.values(best), 0.0001)
  return Object.fromEntries(worldOrder.map((w) => [w, best[w] / max])) as Record<WorldId, number>
}

/** Worlds a completed Rain Ready mission stamps in the Passport. */
export const missionWorlds: WorldId[] = ['earth', 'society', 'build']

export const comingSoon = [
  { title: 'Water Detectives', worlds: 'Science · Earth', emoji: '🐟', time: '10 min', blurb: 'Find out why the school pond has turned green.' },
  { title: 'Design the Play Space', worlds: 'Build · Create', emoji: '🛝', time: '10 min', blurb: 'Plan a play corner with little room and a fixed budget.' },
  { title: 'Power Cut at the Clinic', worlds: 'Skilled Trades · Health', emoji: '⚡', time: '15 min', blurb: 'Find the fault that keeps a clinic’s fridge tripping.' },
  { title: 'Solar School', worlds: 'Build · Earth · Business', emoji: '☀️', time: '20 min', blurb: 'Make the numbers work for solar panels on a school.' },
  { title: 'You’re the Product Manager', worlds: 'Tech · Business', emoji: '📱', time: '20 min', blurb: 'Decide what an app builds first, with users pulling both ways.' },
]

// ── Progress ──────────────────────────────────────────────────────────

/** The core profile is required, and it is the first stamp. */
export const coreDone = (s: CareerState) => !!s.coreDoneAt
/** Rain Ready is optional; its stamp is earned on reaching its results. */
export const missionDone = (s: CareerState) => !!s.missionDoneAt
export const missionStarted = (s: CareerState) => !!s.missionStage

export const RAIN_READY_PATH = '/career/rain-ready'

export interface PassportStamp {
  id: string
  label: string
  sub: string
  color: string
  emoji: string
  earned: boolean
  /** Earned on this date (ms). */
  at?: number
}

export function passportStamps(s: CareerState): PassportStamp[] {
  return [
    { id: 'core', label: 'Career Profile', sub: 'Core', color: '#2a78d6', emoji: '🧭', earned: coreDone(s), at: s.coreDoneAt },
    { id: 'rain-ready', label: 'Rain Ready', sub: 'Mission', color: '#6250d6', emoji: '🌧️', earned: missionDone(s), at: s.missionDoneAt },
    ...comingSoon.slice(0, 4).map((m) => ({ id: m.title, label: m.title, sub: 'Coming soon', color: '#94a3b8', emoji: m.emoji, earned: false })),
  ]
}

/** How sure the profile is, in words. It sharpens with every simulation finished. */
export function profileStatus(s: CareerState): { label: string; detail: string; tone: 'amber' | 'teal' } {
  if (missionDone(s)) return { label: 'Getting clearer', detail: 'Your core profile plus the Rain Ready simulation.', tone: 'teal' }
  return { label: 'Starting profile', detail: 'From your core profile. Each simulation you try sharpens it.', tone: 'amber' }
}
