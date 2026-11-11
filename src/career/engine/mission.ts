import { evidence as evidenceCards, fixById, fixes, MISSION, people, places, salimOptions, twistOptions, zones, type Fix } from '../data/mission'
import type { FixId, Level, MissionAnswers, Mood, MoreAnswer, ReflectAnswers, RoleId, ZoneId } from '../types'

export const zoneIds: ZoneId[] = ['market', 'school', 'lake']

export function units(m: MissionAnswers, id: FixId) {
  return m.fixes[id] ?? 0
}

/** Money available for fixes before the twist (night work costs extra). */
export function fixBudget(m: MissionAnswers) {
  return MISSION.budget - (m.salim === 'night' ? 3 : 0)
}

export function fixSpend(m: MissionAnswers) {
  return fixes.reduce((sum, f) => sum + f.cost * units(m, f.id), 0)
}

export function twistCost(m: MissionAnswers) {
  return twistOptions.find((t) => t.id === m.twist)?.cost ?? 0
}

export function totalSpend(m: MissionAnswers) {
  return fixSpend(m) + (m.salim === 'night' ? 3 : 0) + twistCost(m)
}

export function budgetLeft(m: MissionAnswers) {
  return MISSION.budget - totalSpend(m)
}

/**
 * When the twist costs money the plan can't cover, trim the least protective units first,
 * so the student can see exactly what was given up.
 */
export function cutsForTwist(m: MissionAnswers, cost: number): { fixes: MissionAnswers['fixes']; cuts: FixId[] } {
  const next = { ...m.fixes }
  const cuts: FixId[] = []
  let short = cost - (MISSION.budget - fixSpend({ ...m, fixes: next }) - (m.salim === 'night' ? 3 : 0))
  const order: FixId[] = ['pits', 'alerts', 'desilt', 'rainGardens', 'underpass', 'bigDrain', 'lakePond']
  for (const id of order) {
    while (short > 0 && (next[id] ?? 0) > 0) {
      next[id] = (next[id] ?? 0) - 1
      short -= fixById[id].cost
      cuts.push(id)
    }
    if (short <= 0) break
  }
  return { fixes: next, cuts }
}

export function zoneRisk(m: MissionAnswers, opts: { twist?: boolean } = {}): Record<ZoneId, number> {
  const out = {} as Record<ZoneId, number>
  for (const z of zoneIds) {
    let r = zones[z].base
    for (const f of fixes) r -= f.effect[z] * units(m, f.id)
    if (opts.twist) {
      const blocked = z === 'market' ? 15 : z === 'school' ? 10 : 0
      r += blocked
      if (m.twist === 'clear' || m.twist === 'both') r -= blocked
      else if (m.twist === 'builder') r -= blocked * 0.45
      else if (m.twist === 'keep' && units(m, 'bigDrain') > 0) r -= blocked * 0.65
    }
    out[z] = Math.round(Math.min(100, Math.max(5, r)))
  }
  return out
}

export function overallRisk(m: MissionAnswers, opts: { twist?: boolean } = {}) {
  const r = zoneRisk(m, opts)
  return Math.round(zoneIds.reduce((s, z) => s + r[z], 0) / zoneIds.length)
}

export const START_RISK = Math.round(zoneIds.reduce((s, z) => s + zones[z].base, 0) / zoneIds.length)
export const START_TRUST = 40

export function trust(m: MissionAnswers) {
  let t = START_TRUST
  if (m.rank[0] === 'kamla' || m.rank[0] === 'lakshmi') t += 8
  else if (m.rank[0]) t += 3
  t += salimOptions.find((o) => o.id === m.salim)?.trust ?? 0
  for (const f of fixes) t += f.trust * units(m, f.id)
  if (m.twist === 'both') t += 4
  if (m.twist === 'builder') t += 2
  if (m.twist === 'keep') t -= 4
  return Math.round(Math.min(100, Math.max(0, t)))
}

export interface Severity {
  label: string
  short: string
  tone: 'good' | 'ok' | 'warn' | 'bad' | 'critical'
}

export function severity(risk: number): Severity {
  if (risk <= 25) return { label: 'Mostly dry', short: 'Dry', tone: 'good' }
  if (risk <= 45) return { label: 'Puddles that clear in an hour', short: 'Puddles', tone: 'ok' }
  if (risk <= 62) return { label: 'Ankle-deep for a few hours', short: 'Ankle-deep', tone: 'warn' }
  if (risk <= 78) return { label: 'Knee-deep most of the day', short: 'Knee-deep', tone: 'bad' }
  return { label: 'Flooded for a day or more', short: 'Flooded', tone: 'critical' }
}

export function hotspotScore(m: MissionAnswers) {
  const pools = new Set(places.filter((p) => p.pools).map((p) => p.id))
  return m.hotspots.filter((h) => pools.has(h)).length
}

export function causeBacked(m: MissionAnswers) {
  if (!m.cause) return false
  return evidenceCards.some((e) => m.evidence.includes(e.id) && e.supports.includes(m.cause!))
}

export interface CalcChoice {
  value: number
  /** Shown when this wrong answer is picked, so the student can see the slip and try again. */
  nudge?: string
}

/** The engineer's maths, as four choices. The rule is given, so it tests reasoning, not recall. */
export function calcQuestion(level: Level) {
  if (level === 'planner' || level === 'pro') {
    return {
      prompt: 'The new mall car park is 2,000 m² of concrete. A storm drops 50 mm of rain. Concrete lets about 9 of every 10 litres run off. How many litres run off into the drains?',
      steps: ['Rain that lands = mm × m² (1 mm on 1 m² is 1 litre)', 'Runoff = rain that lands × 0.9'],
      answer: 90000,
      choices: [
        { value: 100000, nudge: 'That’s all the rain that lands (50 × 2,000). But only 9 in every 10 litres run off.' },
        { value: 90000 },
        { value: 45000, nudge: 'That’s half of it. Concrete lets 9 in 10 litres run off, not 5 in 10.' },
        { value: 10000, nudge: 'That’s the 1 litre in 10 that stays behind. Which part runs off?' },
      ] as CalcChoice[],
      unit: 'litres',
      explain: '50 × 2,000 = 1,00,000 litres land, and 9 in 10 run off: 90,000 litres. With permeable paving only about 4 in 10 run off, so 40,000 litres. That’s 50,000 litres less rushing into the drains!',
      word: 'coefficient',
    }
  }
  return {
    prompt: 'In a big storm, 50 mm of rain falls. The school roof is 400 m². How many litres of rain land on the roof?',
    steps: ['1 mm of rain on 1 m² is exactly 1 litre', 'So litres = mm × m²'],
    answer: 20000,
    choices: [
      { value: 450, nudge: 'That’s 50 + 400. Rain lands on every square metre, so multiply instead.' },
      { value: 2000, nudge: 'Close! That’s 50 × 40. Check the zeros: the roof is 400 m².' },
      { value: 20000 },
      { value: 200000, nudge: 'One zero too many. Try 5 × 4 first, then add the zeros.' },
    ] as CalcChoice[],
    unit: 'litres',
    explain: '50 × 400 = 20,000 litres. That’s about 100 big bathtubs, from one roof, in one storm! A rainwater tank or recharge pit could catch it.',
    word: 'runoff',
  }
}

export function calcCorrect(m: MissionAnswers, level: Level) {
  return m.calc !== undefined && Math.abs(m.calc - calcQuestion(level).answer) < 1
}

// ── Ward Plan (built from the student's choices; nothing to type) ─────

const quickFixes: FixId[] = ['desilt', 'alerts', 'pits']
const lastingFixes: FixId[] = ['bigDrain', 'rainGardens', 'lakePond', 'underpass']

/** The zone each resident cares about most. */
export const residentZone: Record<string, ZoneId> = { salim: 'market', lakshmi: 'school', kamla: 'lake', ravi: 'market' }

export function protection(m: MissionAnswers, f: Fix) {
  return zoneIds.reduce((sum, z) => sum + f.effect[z], 0) * units(m, f.id)
}

export interface WardPlanSummary {
  headline?: Fix
  why?: string
  tradeoff: string
  unknowns: string[]
  mixed: boolean
}

export function wardPlan(m: MissionAnswers): WardPlanSummary {
  const chosen = fixes.filter((f) => units(m, f.id) > 0)
  const headline = [...chosen].sort((a, b) => protection(m, b) - protection(m, a))[0]
  const zr = zoneRisk(m, { twist: !!m.twist })
  const worst = [...zoneIds].sort((a, b) => zr[b] - zr[a])[0]
  const spend = fixSpend(m)
  const biggest = [...chosen].sort((a, b) => b.cost * units(m, b.id) - a.cost * units(m, a.id))[0]

  let tradeoff = 'Some streets will still get puddles in the heaviest rain.'
  if (zr[worst] > 62) tradeoff = `${zones[worst].name} will still flood: ${severity(zr[worst]).label.toLowerCase()}.`
  else if (m.salim === 'now') tradeoff = 'Shops on Market Road lose business while the road is dug up before Diwali.'
  else if (biggest && spend > 0 && (biggest.cost * units(m, biggest.id)) / spend >= 0.5) tradeoff = `Over half the money went on one fix: ${biggest.name.toLowerCase()}.`
  else if (units(m, 'desilt')) tradeoff = 'The drains need cleaning again every year, or the risk comes back.'

  const unknowns = ['Will heavy-rain days keep going up?']
  if (units(m, 'lakePond')) unknowns.push('Is the land for the pond really free?')
  if (m.twist === 'builder' || m.twist === 'both') unknowns.push('Will the builder actually pay?')
  if (units(m, 'alerts') || units(m, 'desilt')) unknowns.push('Will people stop throwing plastic in the drains?')
  else unknowns.push('Who will look after the fixes every year?')

  const mixed = chosen.some((f) => quickFixes.includes(f.id)) && chosen.some((f) => lastingFixes.includes(f.id))
  return { headline, why: headline?.why, tradeoff, unknowns: unknowns.slice(0, 3), mixed }
}

export type Reaction = 'cheer' | 'ok' | 'worried'

export interface TownHallLine {
  who: string
  reaction: Reaction
  text: string
}

/** How each resident reacts when the plan is presented, in the order the student ranked them. */
export function townHall(m: MissionAnswers): TownHallLine[] {
  const zr = zoneRisk(m, { twist: !!m.twist })
  const feel = (r: number): Reaction => (r <= 45 ? 'cheer' : r <= 62 ? 'ok' : 'worried')
  const order = m.rank.length === 4 ? m.rank : ['kamla', 'lakshmi', 'salim', 'ravi']
  const lines: Record<string, TownHallLine> = {
    kamla: {
      who: 'kamla',
      reaction: feel(zr.lake),
      text: { cheer: 'This year I won’t be stuck at home. Thank you, beta.', ok: 'Better than before. I’ll still keep my things up high, but I won’t be trapped.', worried: 'My lane will still flood. Please don’t forget the old people down here.' }[feel(zr.lake)],
    },
    lakshmi: {
      who: 'lakshmi',
      reaction: feel(zr.school),
      text: { cheer: 'Our 600 children can reach school this monsoon. That’s what matters.', ok: 'The underpass will still get wet, but the children can get through. We’ll manage.', worried: 'The underpass will still fill up. How will the children get to class?' }[feel(zr.school)],
    },
    salim: {
      who: 'salim',
      reaction: m.salim === 'now' ? 'worried' : feel(zr.market),
      text:
        m.salim === 'now'
          ? 'You dug up the road before Diwali. The floods are less, but we lost our best weeks.'
          : m.salim === 'night'
            ? 'Working at night kept our shops open. Very clever!'
            : m.salim === 'vote'
              ? 'The market association agreed to the plan. We feel heard.'
              : 'You waited until after Diwali, like I asked. I won’t forget that.',
    },
    ravi: {
      who: 'ravi',
      reaction: units(m, 'alerts') ? 'cheer' : feel(zr.market),
      text: units(m, 'alerts') ? 'Street bins and SMS alerts! Fewer blocked drains, and I’ll know which roads to avoid.' : feel(zr.market) === 'worried' ? 'Market Road will still flood. No roads, no fares.' : 'The roads should stay open most days. That means I can work.',
    },
  }
  return order.map((id) => lines[id]).filter(Boolean)
}

/** Mr Joseph's verdict on the plan. */
export function verdict(m: MissionAnswers): { approved: boolean; text: string } {
  const risk = overallRisk(m, { twist: !!m.twist })
  const t = trust(m)
  if (risk <= 50 && t >= 50) return { approved: true, text: 'Clear, fair and within budget. The ward council approves your plan. Work starts on Monday!' }
  if (risk <= 50) return { approved: true, text: 'The ward will be much safer. Some residents feel left out, so we’ll hold one more meeting. Approved!' }
  if (t >= 50) return { approved: true, text: 'People trust this plan, and that matters. We’ll add more fixes next year. Approved, as a first step.' }
  return { approved: true, text: 'It’s a start. Next year we’ll need to do more, and listen more. Approved, as a first step.' }
}

// ── Debrief ───────────────────────────────────────────────────────────

export interface SkillResult {
  id: 'evidence' | 'people' | 'limits' | 'bigPicture'
  name: string
  score: number
  proof: string[]
  tip: string
}

export function skills(m: MissionAnswers, level: Level): SkillResult[] {
  const hs = hotspotScore(m)
  const finalRisk = overallRisk(m, { twist: true })
  const spend = fixSpend(m)

  const ev: string[] = []
  let evS = 0
  if (hs >= 2) { evS++; ev.push(`You found ${hs} of the 3 low spots by reading the map.`) }
  else ev.push(`You found ${hs} of the 3 low spots. Next time, follow the contour lines downhill.`)
  if (causeBacked(m)) { evS++; ev.push('The cause you picked was backed by the evidence you checked.') }
  else if (m.cause) ev.push('The cause you picked wasn’t backed by the evidence you checked, so it was more of a guess.')
  if (m.twist && !(m.twist === 'keep' && units(m, 'bigDrain') === 0)) { evS++; ev.push('When new evidence arrived, you used it to update your plan.') }
  else if (m.twist) ev.push('When the blocked drain showed up, you kept a plan that couldn’t cope with it.')

  const pe: string[] = []
  let peS = 0
  if (m.rank[0] === 'kamla' || m.rank[0] === 'lakshmi') { peS++; pe.push('You put the people most at risk first.') }
  else if (m.rank[0]) pe.push('You put livelihoods first. That’s defensible, but say why safety can wait.')
  if (m.salim && m.salim !== 'now') { peS++; pe.push('You found a way to respect the shop owners’ worries.') }
  else if (m.salim) pe.push('You overruled the shop owners. Fast, but trust dropped.')
  if (units(m, 'lakePond') || units(m, 'underpass') || units(m, 'alerts')) { peS++; pe.push('Your plan includes a fix aimed at the most vulnerable people.') }

  const li: string[] = []
  let liS = 0
  if (START_RISK - finalRisk >= 30) { liS++; li.push(`You cut the flood risk from ${START_RISK} to ${finalRisk}.`) }
  else li.push(`Flood risk went from ${START_RISK} to ${finalRisk}. There was room to do more with the budget.`)
  if (spend >= 0.8 * fixBudget(m)) { liS++; li.push(`You used ₹${spend} lakh of ₹${fixBudget(m)} lakh wisely, without overspending.`) }
  else li.push(`You left ₹${fixBudget(m) - spend} lakh unspent before the twist.`)
  if (calcCorrect(m, level)) { liS++; li.push(m.calcTries <= 1 ? 'You got the water calculation right first time.' : 'You stuck with the water calculation until you got it.') }

  const bp: string[] = []
  let bpS = 0
  const zr = zoneRisk(m, { twist: !!m.twist })
  const first = m.rank[0]
  if (first && zr[residentZone[first]] <= 62) { bpS++; bp.push(`Your plan kept ${people[first].name} safe, and you put them first.`) }
  else if (first) bp.push(`You put ${people[first].name} first, but their area still floods badly.`)
  if (wardPlan(m).mixed) { bpS++; bp.push('You mixed quick fixes with long-lasting ones.') }
  else bp.push('Your fixes were all quick, or all long-term. Mixing them covers this year and the next ten.')
  if (zoneIds.every((z) => zr[z] <= 62)) { bpS++; bp.push('No part of the ward was left badly flooded.') }
  else bp.push(`${zones[[...zoneIds].sort((a, b) => zr[b] - zr[a])[0]].name} was left badly flooded.`)

  return [
    { id: 'evidence', name: 'Using evidence', score: evS, proof: ev, tip: 'Check the evidence before you decide, and change your mind when new facts arrive.' },
    { id: 'people', name: 'Thinking about people', score: peS, proof: pe, tip: 'Ask who is most at risk, and who will be upset, before you choose.' },
    { id: 'limits', name: 'Working within limits', score: liS, proof: li, tip: 'Every rupee should buy the most safety. Compare cost against impact.' },
    { id: 'bigPicture', name: 'Seeing the big picture', score: bpS, proof: bp, tip: 'Check your plan against every group, not just the loudest, and mix quick wins with lasting fixes.' },
  ]
}

export function skillLabel(score: number) {
  return ['Just starting', 'Growing', 'Solid', 'Strong'][Math.max(0, Math.min(3, score))]
}

const moodValue: Record<Mood, number> = { love: 1, ok: 0.6, hard: 0.55, meh: 0.1 }
const moreValue: Record<MoreAnswer, number> = { yes: 1, maybe: 0.5, no: 0.1 }

/** 0–1: how much each part of the work felt like the student. */
export function roleFeel(m: MissionAnswers, r: ReflectAnswers, role: RoleId): number | null {
  const parts: number[] = []
  const mood = m.moods[role]
  if (mood) parts.push(moodValue[mood])
  const more = r.more[role]
  if (more) parts.push(moreValue[more])
  if (!parts.length) return null
  return parts.reduce((a, b) => a + b, 0) / parts.length
}
