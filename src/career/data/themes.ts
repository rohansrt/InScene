import {
  Briefcase, CodeXml, Cpu, FlaskConical, Globe, HeartPulse, Palette, Rocket, Scale, Search,
  Sparkles, Users, Wrench, Hammer, LayoutGrid, GraduationCap, type LucideIcon,
} from 'lucide-react'
import type { ThemeId, ValueId, WorldId } from '../types'

export interface Theme {
  id: ThemeId
  name: string
  /** Short description in plain words. */
  line: string
  /** Validated categorical hue (identity only; always paired with a text label + icon). */
  color: string
  tint: string
  icon: LucideIcon
  /** Used in "what we don't know yet". */
  untried: string
}

// Hues come from the validated dataviz reference palette (slots 1–5 + 7). Theme identity is
// never colour-only: every use carries the theme name and icon.
export const themes: Record<ThemeId, Theme> = {
  make: { id: 'make', name: 'Make', line: 'Build, fix and make real things.', color: '#eb6834', tint: '#fdf0ea', icon: Hammer, untried: 'a hands-on task where you build or fix something' },
  discover: { id: 'discover', name: 'Discover', line: 'Ask why, find clues and test ideas.', color: '#2a78d6', tint: '#eaf2fc', icon: Search, untried: 'a task where you investigate clues or data' },
  create: { id: 'create', name: 'Create', line: 'Imagine, design and express ideas.', color: '#e87ba4', tint: '#fdeff4', icon: Palette, untried: 'a creative task like designing, writing or filming' },
  help: { id: 'help', name: 'Help', line: 'Teach, care for and support people.', color: '#1baf7a', tint: '#e8f7f1', icon: Users, untried: 'a task where you teach or care for someone' },
  lead: { id: 'lead', name: 'Lead', line: 'Persuade, start things and take charge.', color: '#6250d6', tint: '#efedfb', icon: Rocket, untried: 'a task where you lead a group or pitch an idea' },
  organise: { id: 'organise', name: 'Organise', line: 'Plan, sort and make systems work.', color: '#eda100', tint: '#fdf5e3', icon: LayoutGrid, untried: 'a task where you plan, sort or manage details' },
}

export const themeOrder: ThemeId[] = ['make', 'discover', 'create', 'help', 'lead', 'organise']

export interface World {
  id: WorldId
  name: string
  line: string
  icon: LucideIcon
}

export const worlds: Record<WorldId, World> = {
  build: { id: 'build', name: 'Build & Engineer', line: 'Design and build the things around us.', icon: Wrench },
  science: { id: 'science', name: 'Science & Discovery', line: 'Ask why, test ideas, discover new things.', icon: FlaskConical },
  tech: { id: 'tech', name: 'Tech & Data', line: 'Code, data, apps and AI.', icon: CodeXml },
  health: { id: 'health', name: 'Health & Care', line: 'Keep people healthy and help them heal.', icon: HeartPulse },
  teach: { id: 'teach', name: 'Teach & Support', line: 'Help people learn, grow and feel better.', icon: GraduationCap },
  create: { id: 'create', name: 'Create & Communicate', line: 'Design, write, film and tell stories.', icon: Sparkles },
  business: { id: 'business', name: 'Business & Money', line: 'Start, sell, plan and run things.', icon: Briefcase },
  society: { id: 'society', name: 'Law & Society', line: 'Rules, rights, cities and government.', icon: Scale },
  earth: { id: 'earth', name: 'Earth, Food & Climate', line: 'Protect nature and feed the planet.', icon: Globe },
  trades: { id: 'trades', name: 'Skilled Trades', line: 'Fix, wire, install and make with your hands.', icon: Cpu },
}

export const worldOrder: WorldId[] = ['build', 'science', 'tech', 'health', 'teach', 'create', 'business', 'society', 'earth', 'trades']

export interface Value {
  id: ValueId
  name: string
  emoji: string
}

export const values: Value[] = [
  { id: 'creativity', name: 'Creating new things', emoji: '🎨' },
  { id: 'helping', name: 'Helping people', emoji: '🤝' },
  { id: 'discovery', name: 'Discovering', emoji: '🔭' },
  { id: 'stability', name: 'Steady, secure work', emoji: '🛡️' },
  { id: 'freedom', name: 'Freedom to choose how I work', emoji: '🕊️' },
  { id: 'leading', name: 'Leading', emoji: '🚀' },
  { id: 'money', name: 'Earning well', emoji: '💰' },
  { id: 'teamwork', name: 'Teamwork', emoji: '👥' },
  { id: 'impact', name: 'Making a difference', emoji: '🌍' },
]

export const valueById = Object.fromEntries(values.map((v) => [v.id, v])) as Record<ValueId, Value>
