import type { FixId, RoleId, ThemeId, ZoneId } from '../types'

export const MISSION = {
  title: 'Rain Ready',
  place: 'Ward 12, Sundarpur',
  budget: 50, // ₹ lakh
  weeks: 12,
}

export interface Person {
  id: string
  name: string
  role: string
  initials: string
  tone: 'blue' | 'teal' | 'violet' | 'amber' | 'rose' | 'slate'
}

export const people: Record<string, Person> = {
  officer: { id: 'officer', name: 'Mr Joseph', role: 'Ward officer', initials: 'J', tone: 'slate' },
  meera: { id: 'meera', name: 'Dr Meera Iyer', role: 'Environmental scientist', initials: 'MI', tone: 'teal' },
  arjun: { id: 'arjun', name: 'Arjun Mehta', role: 'Urban planner', initials: 'AM', tone: 'violet' },
  priya: { id: 'priya', name: 'Priya Nair', role: 'Civil engineer', initials: 'PN', tone: 'amber' },
  salim: { id: 'salim', name: 'Salim bhai', role: 'Shop owner, Market Road', initials: 'S', tone: 'blue' },
  lakshmi: { id: 'lakshmi', name: 'Mrs Lakshmi', role: 'Principal, Ward 12 School', initials: 'L', tone: 'rose' },
  kamla: { id: 'kamla', name: 'Kamla Dadi', role: 'Lives on Lake View Lane, 72', initials: 'K', tone: 'teal' },
  ravi: { id: 'ravi', name: 'Ravi', role: 'Auto-rickshaw driver', initials: 'R', tone: 'amber' },
}

export interface Role {
  id: RoleId
  person: string
  title: string
  part: string
  verb: string
  themes: ThemeId[]
  intro: string
  dayInLife: string[]
  funFact: string
}

export const roles: Record<RoleId, Role> = {
  scientist: {
    id: 'scientist', person: 'meera', title: 'Environmental scientist', part: 'Investigate', verb: 'investigating',
    themes: ['discover'],
    intro: 'I study water, soil and nature. My job is to find out why something is happening, using evidence, not guesses.',
    dayInLife: ['Collect water and soil samples', 'Read maps and rain data', 'Write reports that officials can act on'],
    funFact: 'Environmental scientists often spend mornings outdoors in boots and afternoons analysing data.',
  },
  planner: {
    id: 'planner', person: 'arjun', title: 'Urban planner', part: 'Listen', verb: 'listening and planning',
    themes: ['help', 'lead'],
    intro: 'I plan how a city uses its land, like roads, parks and homes, so it works for everyone. Half my job is listening.',
    dayInLife: ['Meet residents and shop owners', 'Balance what different people need', 'Turn ideas into a plan people agree on'],
    funFact: 'Planners use special maps (GIS) that stack roads, pipes, homes and trees in layers.',
  },
  engineer: {
    id: 'engineer', person: 'priya', title: 'Civil engineer', part: 'Design', verb: 'designing',
    themes: ['make', 'organise'],
    intro: 'I design and build things that must work safely, like drains, roads and bridges. Every rupee and every centimetre counts.',
    dayInLife: ['Calculate how much water a drain must carry', 'Compare costs and choose materials', 'Check the work on site'],
    funFact: 'Drain sizes are worked out from how much rain falls and how much of it runs off the ground.',
  },
}

export const roleOrder: RoleId[] = ['scientist', 'planner', 'engineer']

/** Positions are percentages over the map artwork. */
export interface Place {
  id: string
  name: string
  x: number
  y: number
  pools: boolean
  clue: string
  reveal: string
}

export const places: Place[] = [
  { id: 'hilltop', name: 'Hilltop Colony', x: 18, y: 15, pools: false, clue: 'High ground', reveal: 'High ground. Rain runs down from here instead of staying.' },
  { id: 'mall', name: 'New mall car park', x: 72, y: 18, pools: false, clue: 'All concrete', reveal: 'Concrete everywhere, so rain rushes off it fast, downhill towards Market Road.' },
  { id: 'park', name: 'Ward park', x: 20, y: 46, pools: false, clue: 'Grass and trees', reveal: 'Grass and soil soak up a lot of rain. Only small puddles here.' },
  { id: 'market', name: 'Market Road dip', x: 52, y: 47, pools: true, clue: 'A dip in the road', reveal: 'A dip in the road, and its drain is clogged. Water collects here.' },
  { id: 'school', name: 'School underpass', x: 82, y: 64, pools: true, clue: 'Road goes under the railway', reveal: 'The road dips under the railway line. It fills up like a bowl.' },
  { id: 'lake', name: 'Lake View Lane', x: 34, y: 80, pools: true, clue: 'Lowest ground', reveal: 'The lowest point. Homes here were built on an old lake bed, so water still goes where the lake used to be.' },
]

export interface EvidenceCard {
  id: string
  title: string
  emoji: string
  teaser: string
  finding: string
  /** Causes this evidence supports. */
  supports: string[]
}

export const evidence: EvidenceCard[] = [
  { id: 'rain', title: 'Rain records', emoji: '🌧️', teaser: '10 years of rain data', finding: 'Heavy-rain days have gone up, from about 4 a year to about 7 a year (pretend data).', supports: ['rain', 'mix'] },
  { id: 'drains', title: 'Drain camera', emoji: '📹', teaser: 'A camera crawls through the drains', finding: 'The Market Road drain is about 60% blocked with plastic, mud and leaves.', supports: ['drains', 'mix'] },
  { id: 'maps', title: 'Old vs new maps', emoji: '🗺️', teaser: 'Sundarpur in 1990 vs today', finding: 'In 1990 there was a lake and open fields. Now it is homes, roads and a concrete car park.', supports: ['concrete', 'mix'] },
  { id: 'complaints', title: 'Complaint log', emoji: '📒', teaser: '120 complaints from residents', finding: 'Most complaints come from Lake View Lane and the school underpass, every single monsoon.', supports: ['mix'] },
]

export interface Option {
  id: string
  label: string
  detail?: string
}

export const causeOptions: Option[] = [
  { id: 'drains', label: 'Blocked drains', detail: 'Plastic and mud stop water from flowing away.' },
  { id: 'concrete', label: 'Too much concrete, and the lost lake', detail: 'Rain can’t soak in any more.' },
  { id: 'rain', label: 'Heavier rain than before', detail: 'The weather itself has changed.' },
  { id: 'mix', label: 'A mix of reasons', detail: 'More than one thing is going on.' },
]

export interface Resident {
  id: string
  quote: string
  need: string
}

export const residents: Resident[] = [
  { id: 'salim', need: 'Protect shops and earnings', quote: 'Every monsoon, water enters my shop. Last year I lost ₹80,000 of stock. But please, don’t dig up Market Road before Diwali. That’s when I earn the most.' },
  { id: 'lakshmi', need: 'Keep 600 children safe', quote: 'The underpass to our school floods. 600 children can’t reach school for days. Their safety comes first.' },
  { id: 'kamla', need: 'Keep elderly people safe at home', quote: 'Water comes into my house, knee-high. I can’t climb stairs fast. Last year I was stuck for a whole day.' },
  { id: 'ravi', need: 'Keep roads open for work', quote: 'When roads flood, I can’t work. No work, no money. And the drains fill with plastic because there are no proper bins.' },
]

export const salimOptions: Array<Option & { trust: number; feedback: string; themes: ThemeId[] }> = [
  { id: 'wait', label: 'Agree. Start elsewhere, and dig Market Road after Diwali.', trust: 12, themes: ['help', 'organise'], feedback: 'Shop owners trust you more. But the Market Road work now has less time before the rains, so plan carefully.' },
  { id: 'night', label: 'Work at night, in small sections, so shops stay open.', detail: 'Costs ₹3 lakh extra', trust: 9, themes: ['create', 'make'], feedback: 'A creative middle path! Planners and engineers often find a third option. It costs a little more, though.' },
  { id: 'vote', label: 'Ask the market association to decide together.', trust: 6, themes: ['lead'], feedback: 'People feel heard. Group decisions take longer, but they last longer too.' },
  { id: 'now', label: 'Say no. Flood safety matters more. Dig now.', trust: -12, themes: ['lead'], feedback: 'Defensible: safety is important. But shop owners feel ignored, and they may push back later.' },
]

export interface Fix {
  id: FixId
  name: string
  emoji: string
  cost: number // ₹ lakh per unit
  max: number
  weeks: number
  what: string
  /** Risk reduction per unit, by zone. */
  effect: Record<ZoneId, number>
  trust: number
  note?: string
  /** Why a student would lead with this fix, used on the Ward Plan. */
  why: string
}

export const fixes: Fix[] = [
  { id: 'desilt', name: 'Clean and desilt all drains', emoji: '🧹', cost: 5, max: 1, weeks: 2, what: 'Quick and cheap, but has to be done again every year.', effect: { market: 12, school: 8, lake: 8 }, trust: 2, why: 'It gives the most protection for every rupee.' },
  { id: 'bigDrain', name: 'Bigger drain under Market Road', emoji: '🚇', cost: 20, max: 1, weeks: 8, what: 'Carries much more water to the river. Needs digging up the road.', effect: { market: 30, school: 18, lake: 6 }, trust: 0, why: 'It carries the most water away from the market and the school.' },
  { id: 'rainGardens', name: 'Rain gardens and permeable paving', emoji: '🌳', cost: 10, max: 1, weeks: 6, what: 'Turns the park and car park into sponges that soak up rain.', effect: { market: 8, school: 6, lake: 10 }, trust: 4, why: 'It tackles the root cause: rain can soak into the ground again.' },
  { id: 'pits', name: 'Recharge pits', emoji: '🕳️', cost: 1, max: 10, weeks: 3, what: 'Each pit soaks water from one street deep into the ground.', effect: { market: 1.2, school: 1, lake: 1.6 }, trust: 0.5, note: 'per pit', why: 'Many small pits soak water in, street by street.' },
  { id: 'lakePond', name: 'Bring back part of the old lake', emoji: '🦆', cost: 25, max: 1, weeks: 10, what: 'A holding pond on empty land that stores storm water. Great for Lake View Lane.', effect: { market: 8, school: 2, lake: 38 }, trust: 6, why: 'It protects the families most at risk, on Lake View Lane.' },
  { id: 'underpass', name: 'Raise the school underpass road', emoji: '🛣️', cost: 15, max: 1, weeks: 6, what: 'Lifts the road and adds a pump, just for the school route.', effect: { market: 0, school: 36, lake: 0 }, trust: 5, why: 'It keeps 600 children’s route to school open.' },
  { id: 'alerts', name: 'Flood SMS alerts and street bins', emoji: '📲', cost: 4, max: 1, weeks: 2, what: 'Warns people before floods and stops plastic reaching the drains.', effect: { market: 5, school: 5, lake: 5 }, trust: 8, why: 'It warns people early and keeps plastic out of the drains.' },
]

export const fixById = Object.fromEntries(fixes.map((f) => [f.id, f])) as Record<FixId, Fix>

export const zones: Record<ZoneId, { name: string; base: number; who: string }> = {
  market: { name: 'Market Road', base: 70, who: 'shops and traffic' },
  school: { name: 'School underpass', base: 80, who: '600 students' },
  lake: { name: 'Lake View Lane', base: 90, who: 'families and elderly residents' },
}

export const twistOptions: Array<Option & { cost: number }> = [
  { id: 'clear', label: 'Clear it now, using money from my plan', detail: 'Costs ₹5 lakh', cost: 5 },
  { id: 'both', label: 'Clear it now and send the bill to the builder', detail: 'Costs ₹5 lakh now, maybe repaid later', cost: 5 },
  { id: 'builder', label: 'Make the builder pay and clear it', detail: 'Free, but may take 6 weeks', cost: 0 },
  { id: 'keep', label: 'Keep my plan. My drains can cope.', detail: 'Free', cost: 0 },
]

export const surpriseOptions = [
  'How much listening there is',
  'There’s no single right answer',
  'How money limits everything',
  'How nature helps (lakes, soil, trees)',
  'The maths behind drains',
  'How many jobs one problem needs',
]
