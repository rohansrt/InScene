import type { Level, ThemeId, WorldId } from '../types'

export interface Side {
  label: string
  emoji: string
  theme: ThemeId
}

export interface ThisOrThat {
  id: string
  a: Side
  b: Side
}

// Each theme appears exactly three times across the nine pairs.
export const thisOrThat: ThisOrThat[] = [
  { id: 't1', a: { label: 'Fix a broken bicycle', emoji: '🚲', theme: 'make' }, b: { label: 'Design a poster for the school fest', emoji: '🎨', theme: 'create' } },
  { id: 't2', a: { label: 'Solve a mystery using clues', emoji: '🕵️', theme: 'discover' }, b: { label: 'Teach a friend a new game', emoji: '🎲', theme: 'help' } },
  { id: 't3', a: { label: 'Captain a team in a quiz', emoji: '🏆', theme: 'lead' }, b: { label: 'Make the plan and timetable for it', emoji: '🗓️', theme: 'organise' } },
  { id: 't4', a: { label: 'Build a model bridge', emoji: '🌉', theme: 'make' }, b: { label: 'Find out why leaves change colour', emoji: '🍂', theme: 'discover' } },
  { id: 't5', a: { label: 'Write a song or a story', emoji: '✍️', theme: 'create' }, b: { label: 'Sort 500 photos into perfect folders', emoji: '🗂️', theme: 'organise' } },
  { id: 't6', a: { label: 'Look after a hurt puppy', emoji: '🐶', theme: 'help' }, b: { label: 'Convince the principal to try your idea', emoji: '🎤', theme: 'lead' } },
  { id: 't7', a: { label: 'Spot patterns in cricket stats', emoji: '🏏', theme: 'discover' }, b: { label: 'Edit a short video', emoji: '🎬', theme: 'create' } },
  { id: 't8', a: { label: 'Keep the accounts for the school stall', emoji: '🧾', theme: 'organise' }, b: { label: 'Wire up a small LED circuit', emoji: '💡', theme: 'make' } },
  { id: 't9', a: { label: 'Start a small business', emoji: '🛍️', theme: 'lead' }, b: { label: 'Help a new student feel at home', emoji: '🤗', theme: 'help' } },
]

export interface ActivityCard {
  id: string
  label: string
  emoji: string
  themes: ThemeId[]
  world: WorldId
}

export const activityCards: ActivityCard[] = [
  { id: 'c1', label: 'Take apart an old gadget to see what’s inside', emoji: '🪛', themes: ['make', 'discover'], world: 'build' },
  { id: 'c2', label: 'Look at tiny living things under a microscope', emoji: '🔬', themes: ['discover'], world: 'science' },
  { id: 'c3', label: 'Code a simple game', emoji: '👾', themes: ['make', 'create'], world: 'tech' },
  { id: 'c4', label: 'Draw a comic strip', emoji: '💭', themes: ['create'], world: 'create' },
  { id: 'c5', label: 'Help a younger kid with homework', emoji: '📚', themes: ['help'], world: 'teach' },
  { id: 'c6', label: 'Grow plants and track how they change', emoji: '🌱', themes: ['discover', 'make'], world: 'earth' },
  { id: 'c7', label: 'Plan a class event from start to finish', emoji: '🎉', themes: ['organise', 'lead'], world: 'business' },
  { id: 'c8', label: 'Debate a hot topic in front of the class', emoji: '🗣️', themes: ['lead'], world: 'society' },
  { id: 'c9', label: 'Learn first aid and help someone who is hurt', emoji: '🩹', themes: ['help'], world: 'health' },
  { id: 'c10', label: 'Make a budget for a family trip', emoji: '🧮', themes: ['organise'], world: 'business' },
  { id: 'c11', label: 'Interview people for a school news story', emoji: '🎙️', themes: ['create', 'discover'], world: 'create' },
  { id: 'c12', label: 'Repair a leaking tap or change a fuse', emoji: '🔧', themes: ['make'], world: 'trades' },
]

export interface Myth {
  id: string
  statement: string
  isFact: boolean
  explain: string
}

export const myths: Myth[] = [
  {
    id: 'm1',
    statement: 'You must be top of the class in maths to become an engineer.',
    isFact: false,
    explain: 'Myth! Engineers use maths, but practice, curiosity and teamwork matter just as much. Maths skills grow with time.',
  },
  {
    id: 'm2',
    statement: 'Most people stay in the same job their whole life.',
    isFact: false,
    explain: 'Myth! In one long US study, people born in 1957–64 had about 12.7 jobs between the ages of 18 and 56. Trying new paths is normal.',
  },
  {
    id: 'm3',
    statement: 'Skilled trades, like being an electrician, need real science and problem-solving.',
    isFact: true,
    explain: 'Fact! Electricians use physics, maths and safety rules every day, and many jobs need a licence. Trades are a strong first choice, not a backup.',
  },
]

/** Cards after which a myth appears (1-based card count). */
export const mythAfter: Record<number, string> = { 4: 'm1', 8: 'm2', 12: 'm3' }

export const subjects = ['Maths', 'Science', 'English', 'Languages', 'Social science', 'Art', 'Computers', 'Sports', 'Music', 'Business']

export const subjectThemes: Record<string, ThemeId[]> = {
  Maths: ['organise', 'discover'],
  Science: ['discover'],
  English: ['create'],
  Languages: ['create', 'help'],
  'Social science': ['lead', 'help'],
  Art: ['create'],
  Computers: ['make', 'organise'],
  Sports: ['lead'],
  Music: ['create'],
  Business: ['lead', 'organise'],
}

export const streams = ['Science (PCM)', 'Science (PCB)', 'Science (PCMB)', 'Commerce', 'Arts / Humanities', 'Vocational', 'Not decided']
export const routeOptions = ['University degree', 'Diploma / polytechnic', 'ITI or skill training', 'Apprenticeship', 'Not sure yet']
export const studyOptions = ['Up to 2 years', '3–4 years', '5 years or more', 'Not sure yet']
export const degreeOptions = ['Engineering / Tech', 'Science', 'Commerce / Business', 'Arts / Humanities', 'Design / Media', 'Health / Medicine', 'Law', 'Other']
export const goalOptions = ['Get a job after my degree', 'Study further', 'Switch to a different field', 'Start something of my own', 'Not sure yet']

export const levelInfo: Record<Level, { name: string; who: string; blurb: string }> = {
  explorer: { name: 'Explorer', who: 'Class 7–8', blurb: 'Discover new kinds of work.' },
  investigator: { name: 'Investigator', who: 'Class 9–10', blurb: 'Connect work to subjects.' },
  planner: { name: 'Planner', who: 'Class 11–12', blurb: 'Compare roles and routes.' },
  pro: { name: 'Pro', who: 'College', blurb: 'Test fields before you commit.' },
}
