import { careers, type Career } from '../data/careers'
import { roles, roleOrder, salimOptions } from '../data/mission'
import { activityCards, subjectThemes, thisOrThat } from '../data/quickstart'
import { themeOrder, themes, valueById, worlds } from '../data/themes'
import type { CareerState, Mood, MoreAnswer, ThemeId, WorldId } from '../types'
import { hotspotScore, roleFeel, wardPlan } from './mission'

/**
 * Transparent, rules-based matching. Every number here is a weight a counsellor could read:
 *   quick-start answers ×1 · choices inside the mission ×2 · how the work felt ×3.
 * Nothing is a prediction or a fit percentage. See docs/career-simulator.md.
 */
export interface Signal {
  theme: ThemeId
  w: number
  label: string
  source: 'cards' | 'mission'
  /** The career world an activity card belongs to, used to pick the most relevant reason. */
  world?: WorldId
}

const moodWeight: Record<Mood, number> = { love: 3, ok: 1.2, hard: 1.5, meh: -1.5 }
const moodWords: Record<Mood, string> = { love: 'felt great', ok: 'felt okay', hard: 'was hard but interesting', meh: 'wasn’t really your thing' }
const moreWeight: Record<MoreAnswer, number> = { yes: 3, maybe: 1, no: -1.5 }

export function quickStartSignals(s: CareerState): Signal[] {
  const out: Signal[] = []
  for (const pair of thisOrThat) {
    const pick = s.qs.tot[pair.id]
    if (pick === undefined) continue
    const chosen = pick === 0 ? pair.a : pair.b
    const other = pick === 0 ? pair.b : pair.a
    out.push({ theme: chosen.theme, w: 1, label: `You picked “${chosen.label}” over “${other.label}”`, source: 'cards' })
  }
  for (const card of activityCards) {
    const r = s.qs.cards[card.id]
    if (!r || r === 'never') continue
    const each = { love: 2, maybe: 0.75, nah: -1 }[r] / Math.sqrt(card.themes.length)
    const label = r === 'love' ? `You loved the idea of “${card.label}”` : r === 'maybe' ? `“${card.label}” sounded interesting` : `“${card.label}” wasn’t for you`
    for (const t of card.themes) out.push({ theme: t, w: each, label, source: 'cards', world: card.world })
  }
  for (const subject of s.qs.subjects) {
    for (const t of subjectThemes[subject] ?? []) out.push({ theme: t, w: 0.5, label: `You enjoy ${subject}`, source: 'cards' })
  }
  return out
}

export function missionSignals(s: CareerState): Signal[] {
  const out: Signal[] = []
  const m = s.mission
  for (const id of roleOrder) {
    const role = roles[id]
    const split = 1 / Math.sqrt(role.themes.length)
    const mood = m.moods[id]
    if (mood) for (const t of role.themes) out.push({ theme: t, w: moodWeight[mood] * split, label: `The ${role.part} part of Rain Ready ${moodWords[mood]}`, source: 'mission' })
    const more = s.reflect.more[id]
    if (more) {
      const label = more === 'yes' ? `You’d happily do more ${role.verb}, like ${shortName(role.person)}` : more === 'maybe' ? `You might do more ${role.verb}` : `You wouldn’t choose more ${role.verb}`
      for (const t of role.themes) out.push({ theme: t, w: moreWeight[more] * split, label, source: 'mission' })
    }
  }
  if (hotspotScore(m) >= 2) out.push({ theme: 'discover', w: 1, label: 'You read the map and found the low spots', source: 'mission' })
  const salim = salimOptions.find((o) => o.id === m.salim)
  if (salim) for (const t of salim.themes) out.push({ theme: t, w: 1, label: `With Salim bhai, you chose: “${salim.label}”`, source: 'mission' })
  if (m.rank[0] === 'kamla' || m.rank[0] === 'lakshmi') out.push({ theme: 'help', w: 1, label: 'You put the people most at risk first', source: 'mission' })
  if (m.twist === 'both') out.push({ theme: 'lead', w: 0.8, label: 'You fixed the blocked drain and held the builder responsible', source: 'mission' })
  if (m.twist && wardPlan(m).mixed) out.push({ theme: 'organise', w: 0.8, label: 'You planned for this monsoon and the next ten, mixing quick and lasting fixes', source: 'mission' })
  if ((m.fixes.lakePond ?? 0) > 0 || (m.fixes.rainGardens ?? 0) > 0) out.push({ theme: 'discover', w: 0.6, label: 'You used nature (a lake, soil, plants) to solve the problem', source: 'mission' })
  return out
}

function shortName(personId: string) {
  return { meera: 'Dr Meera', arjun: 'Arjun', priya: 'Priya' }[personId] ?? personId
}

export function signals(s: CareerState, withMission: boolean) {
  return withMission ? [...quickStartSignals(s), ...missionSignals(s)] : quickStartSignals(s)
}

export type ThemeScores = Record<ThemeId, number>

export function themeScores(sig: Signal[]): ThemeScores {
  const out = Object.fromEntries(themeOrder.map((t) => [t, 0])) as ThemeScores
  for (const x of sig) out[x.theme] += x.w
  return out
}

/** 0–1 per theme, relative to the student's own strongest theme. */
export function normalise(scores: ThemeScores): ThemeScores {
  const max = Math.max(...themeOrder.map((t) => scores[t]), 0)
  return Object.fromEntries(themeOrder.map((t) => [t, max > 0 ? Math.max(0, scores[t]) / max : 0])) as ThemeScores
}

export function topThemes(norm: ThemeScores, n = 2): ThemeId[] {
  return [...themeOrder].sort((a, b) => norm[b] - norm[a]).filter((t) => norm[t] > 0).slice(0, n)
}

export function strengthWord(v: number, hasSignals: boolean) {
  if (!hasSignals) return 'Not tried yet'
  if (v >= 0.75) return 'Strong'
  if (v >= 0.45) return 'Growing'
  if (v > 0.12) return 'Light'
  return 'Not much yet'
}

export interface Profile {
  sig: Signal[]
  raw: ThemeScores
  norm: ThemeScores
  top: ThemeId[]
  counts: Record<ThemeId, number>
}

export function profile(s: CareerState, withMission: boolean): Profile {
  const sig = signals(s, withMission)
  const raw = themeScores(sig)
  const norm = normalise(raw)
  const counts = Object.fromEntries(themeOrder.map((t) => [t, sig.filter((x) => x.theme === t && x.w > 0).length])) as Record<ThemeId, number>
  return { sig, raw, norm, top: topThemes(norm, 3), counts }
}

export interface ScoredCareer {
  career: Career
  score: number
  reasons: string[]
  matched: ThemeId[]
}

const themeWeights = [1, 0.65, 0.4]

function worldLove(s: CareerState, world: WorldId) {
  return activityCards.filter((c) => c.world === world && s.qs.cards[c.id] === 'love').length
}

export function scoreCareers(s: CareerState, withMission: boolean): ScoredCareer[] {
  const p = profile(s, withMission)
  return careers
    .map((career) => {
      let num = 0
      let den = 0
      career.themes.forEach((t, i) => {
        num += themeWeights[i] * p.norm[t]
        den += themeWeights[i]
      })
      let score = den ? num / den : 0
      const sharedValues = career.values.filter((v) => s.qs.values.includes(v))
      score += 0.12 * sharedValues.length
      score += 0.1 * Math.min(1, worldLove(s, career.world))
      if (withMission && career.role) {
        const feel = roleFeel(s.mission, s.reflect, career.role)
        if (feel !== null) score += 0.35 * (feel - 0.5)
      }
      const matched = career.themes.filter((t) => p.norm[t] >= 0.45)
      return { career, score, reasons: reasonsFor(career, p, sharedValues, withMission), matched }
    })
    .sort((a, b) => b.score - a.score)
}

/**
 * Up to two plain-language reasons for a suggestion. `used` lets a list of cards share one set,
 * so each card explains itself with different evidence instead of repeating the same line.
 */
function reasonsFor(career: Career, p: Profile, sharedValues: string[], withMission: boolean, used: Set<string> = new Set()): string[] {
  const reasons: string[] = []
  const rank = (x: Signal) =>
    (used.has(x.label) ? 0 : 8) +
    (x.world === career.world ? 4 : 0) +
    (withMission && x.source === 'mission' && career.role ? 2 : 0) +
    x.w / 10
  const pick = (t: ThemeId) => p.sig.filter((x) => x.theme === t && x.w > 0).sort((a, b) => rank(b) - rank(a))[0]
  const ordered = [...career.themes].sort((a, b) => p.norm[b] - p.norm[a])
  const best = ordered[0]
  const first = pick(best)
  if (first) {
    reasons.push(`${first.label}, which is ${themes[best].name} work.`)
    used.add(first.label)
  }
  const second = ordered.find((t) => t !== best && p.norm[t] >= 0.45)
  if (second) {
    const c2 = pick(second)
    if (c2 && c2.label !== first?.label) {
      reasons.push(`${c2.label} (${themes[second].name}).`)
      used.add(c2.label)
    }
  }
  if (reasons.length < 2 && sharedValues.length) reasons.push(`You care about ${sharedValues.slice(0, 2).map((v) => valueById[v as keyof typeof valueById].name.toLowerCase()).join(' and ')}.`)
  return reasons.slice(0, 2)
}

export interface Shortlist {
  picks: ScoredCareer[]
  wildcard: ScoredCareer | null
  wildcardReason: string
  ranked: ScoredCareer[]
}

export function shortlist(s: CareerState, withMission: boolean): Shortlist {
  const ranked = scoreCareers(s, withMission)
  const picks: ScoredCareer[] = []
  for (const c of ranked) {
    if (picks.length === 3) break
    const worldsSoFar = new Set(picks.map((p) => p.career.world))
    // Exposure balance: the three picks always span at least two worlds.
    if (picks.length === 2 && worldsSoFar.size === 1 && worldsSoFar.has(c.career.world)) continue
    picks.push(c)
  }
  const p = profile(s, withMission)
  const used = new Set<string>()
  for (const pk of picks) {
    pk.reasons = reasonsFor(pk.career, p, pk.career.values.filter((v) => s.qs.values.includes(v)), withMission, used)
  }
  const pickWorlds = new Set(picks.map((x) => x.career.world))
  const ids = new Set(picks.map((x) => x.career.id))
  const unfamiliar = ranked.filter(
    (c) => !ids.has(c.career.id) && !pickWorlds.has(c.career.world) && !s.qs.heard.includes(c.career.world) && c.career.themes.some((t) => p.top.includes(t)),
  )
  const wildcard = unfamiliar[0] ?? ranked.find((c) => !ids.has(c.career.id) && !pickWorlds.has(c.career.world)) ?? null
  let wildcardReason = ''
  if (wildcard) {
    const shared = wildcard.career.themes.find((t) => p.top.includes(t)) ?? wildcard.career.themes[0]
    const familiar = s.qs.heard.includes(wildcard.career.world)
    wildcardReason = familiar
      ? `It’s from ${worlds[wildcard.career.world].name}, a world you haven’t looked at closely yet, and it uses ${themes[shared].name}, one of your strong themes.`
      : `You haven’t heard much about ${worlds[wildcard.career.world].name} yet, but this job uses ${themes[shared].name}, one of your strong themes.`
  }
  return { picks, wildcard, wildcardReason, ranked }
}

export function rankOf(list: ScoredCareer[], id: string) {
  return list.findIndex((c) => c.career.id === id)
}

export function unknowns(s: CareerState, withMission: boolean): string[] {
  const p = profile(s, withMission)
  const out: string[] = []
  const weak = themeOrder.filter((t) => p.counts[t] === 0 || p.norm[t] < 0.2).slice(0, 2)
  for (const t of weak) out.push(`You haven’t tried ${themes[t].untried} yet.`)
  const never = activityCards.filter((c) => s.qs.cards[c.id] === 'never')
  if (never.length) out.push(`You marked ${never.length} ${never.length === 1 ? 'activity' : 'activities'} as “never tried”, like “${never[0].label}”. Trying one is the fastest way to learn more about yourself.`)
  if (withMission) out.push('You’ve tried one simulation so far. Each new one makes your map clearer.')
  else out.push('So far this is based on your answers only. Trying real work in a simulation tells us much more.')
  return out.slice(0, 3)
}

export function themeAgreement(s: CareerState) {
  const before = profile(s, false).top.slice(0, 2)
  const after = profile(s, true).top.slice(0, 2)
  return before.some((t) => after.includes(t))
}

const quips: Record<ThemeId, string> = {
  make: 'A Maker streak! 🔧',
  discover: 'Detective mode on! 🔍',
  create: 'Creative spark! ✨',
  help: 'Big helper energy! 🤝',
  lead: 'Leader vibes! 🚀',
  organise: 'Super organiser! 🗂️',
}

export function quip(t: ThemeId) {
  return quips[t]
}
