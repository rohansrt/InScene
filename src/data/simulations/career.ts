import type { Simulation, SimulationLevel } from './types'

const SOURCE = 'InScene Career Simulator design (2026)'

const planned: { levels: SimulationLevel[]; careerStep: 'optional' } = { levels: [{ id: 'basic', availability: 'planned' }, { id: 'advanced', availability: 'planned' }], careerStep: 'optional' }

export const careerSimulations: Simulation[] = [
  {
    id: 'career-00',
    code: 'C0',
    slug: 'career-discovery',
    title: 'Career Profile',
    category: 'career',
    audience: 'Ages 12–20 · Class 7 to college',
    area: 'Core · Start here',
    duration: '10 min',
    complexity: 'Quick Start game and layered profile results',
    summary: 'Find out what kinds of work you enjoy, see 10 career worlds and get four careers to explore, each with a reason. Everyone starts here.',
    situation:
      'Most students know only a handful of careers from family, school and social media. The Career Profile starts with what students enjoy doing, not job titles. It is the required first step: finishing it earns the first Career Passport stamp and unlocks the career simulations.',
    mission: 'Build your career profile: what you enjoy, what you value, and which careers are worth exploring first.',
    howItPlays: [
      'Pick a nickname and your stage (Class 7–8, 9–10, 11–12 or college). No email or phone number.',
      'Quick Start (6 min): This or That, swipeable activity cards with a “never tried” option, myth-busters, values and the career worlds you already know.',
      'Your Career Profile: an interest hexagon, a map of 10 career worlds and four careers to explore (one is a Wildcard), each with a visible reason.',
      'Earn your first Passport stamp, then choose which simulations to try.',
    ],
    interactionDesign:
      'No right or wrong answers and no fit percentages. A transparent, rules-based engine turns answers into themes and explains every suggestion. The profile gets clearer with each simulation the student finishes.',
    learningOutcomes: [
      'Recognise kinds of work they enjoy, separately from what they are good at today.',
      'Discover career worlds they had not considered, including skilled trades.',
      'Leave with careers to explore and what is still unknown about them.',
    ],
    debrief: 'An interest shape, a career-world map, four careers with reasons, and an honest list of what we do not know yet, saved to a Career Passport.',
    guardrails:
      'Suggestions are explorations, not predictions. No caste, income or health questions. Course and entrance information is illustrative and points students to official sources.',
    levels: [
      { id: 'basic', availability: 'documented', description: 'Explorer and Investigator (Class 7–10): picture cards and subject connections.' },
      { id: 'advanced', availability: 'documented', description: 'Planner and Pro (Class 11–12 and college): stream, degree and goal questions.' },
    ],
    icon: 'compass',
    imageKey: 'simulation.career-discovery',
    playPath: '/career/play',
    careerStep: 'required',
    sourceReference: SOURCE,
  },
  {
    id: 'career-01',
    code: 'C1',
    slug: 'rain-ready',
    title: 'Rain Ready',
    category: 'career',
    audience: 'Ages 12–20 · Class 7 to college',
    area: 'Earth · Society · Build',
    duration: '15 min',
    complexity: 'An 18-step mission in five parts, with a mood check after each',
    summary: 'Save a flooding neighbourhood with an environmental scientist, an urban planner and a civil engineer, and see which work feels like you.',
    situation:
      'Ward 12 floods every monsoon. With ₹50 lakh and 12 weeks, the student works with an environmental scientist, an urban planner and a civil engineer, and finds out which kind of work feels like them.',
    mission: 'Cut the flood risk for Ward 12 within budget, keep residents’ trust, and present your plan at a town hall.',
    characters: [
      { role: 'Dr Meera Iyer, environmental scientist', note: 'Leads the Investigate part: maps, evidence and causes.' },
      { role: 'Arjun Mehta, urban planner', note: 'Leads the Listen part: residents, priorities and trade-offs.' },
      { role: 'Priya Nair, civil engineer', note: 'Leads the Design part: fixes, budget and the maths of rain.' },
      { role: 'Residents of Ward 12', note: 'A shop owner, a school principal, an elderly resident and an auto driver, each with a different need.' },
    ],
    howItPlays: [
      'Investigate: read a contour map, choose 2 of 4 pieces of evidence and name the cause.',
      'Listen: hear four residents, rank whose problem comes first and answer a shop owner’s Diwali request.',
      'Design: spend ₹50 lakh across seven fixes on a live water map, then do the engineer’s rain maths (four choices, try until right).',
      'Test and present: survive a monsoon replay and a plot twist, then watch the ward react to your plan at a town hall.',
      'After each part, say how the work felt. That answer counts the most, and it updates your Career Profile.',
    ],
    interactionDesign:
      'No single right plan, only trade-offs. Three meters (flood risk, budget, trust) move with every choice. Mission choices count ×2 and how the work felt counts ×3 in the profile.',
    learningOutcomes: [
      'Experience how scientists, planners and engineers use evidence, listen and work within limits.',
      'Notice which kind of work felt most like them, and why.',
      'Leave with careers to explore, how to get there at their stage, and one small next step.',
    ],
    debrief:
      'Shows what the student made (a Ward Plan), which part felt like them, the skills they used with proof, how their suggestions changed, and what is still unknown. Earns the Rain Ready Passport stamp.',
    guardrails: 'A made-up ward and pretend numbers. Suggestions are explorations, not predictions.',
    levels: [
      { id: 'basic', availability: 'documented', description: 'Explorer and Investigator (Class 7–10): simple rain maths and routes after Class 10.' },
      { id: 'advanced', availability: 'documented', description: 'Planner and Pro (Class 11–12 and college): runoff-coefficient maths and degree, entrance and internship routes.' },
    ],
    icon: 'rain',
    imageKey: 'simulation.rain-ready',
    playPath: '/career/rain-ready',
    careerStep: 'optional',
    unlockNote: 'Unlocks after your Career Profile',
    sourceReference: SOURCE,
  },
  {
    id: 'career-02', code: 'C2', slug: 'water-detectives', title: 'Water Detectives', category: 'career', audience: 'Class 7–8',
    area: 'Science · Earth', duration: '10 min', summary: 'Be an environmental scientist and find out why the school pond looks unhealthy.',
    situation: 'The pond near school has turned green and the fish are struggling. As an environmental scientist, inspect observations, choose which sample to test and recommend how to fix it.',
    howItPlays: ['Observe the pond and pick what to sample.', 'Compare simple test results.', 'Choose an intervention and explain it.'],
    learningOutcomes: ['See how environmental scientists ask questions and use evidence.'], ...planned,
    icon: 'fish', imageKey: 'simulation.water-detectives', sourceReference: SOURCE,
  },
  {
    id: 'career-03', code: 'C3', slug: 'design-the-play-space', title: 'Design the Play Space', category: 'career', audience: 'Class 7–8',
    area: 'Build · Create', duration: '10 min', summary: 'Plan a school play space with limited room, different needs and a fixed budget.',
    situation: 'The school has a small empty corner and ₹2 lakh. As a designer, choose equipment, arrange a layout and get feedback from students who want very different things.',
    howItPlays: ['Meet the users.', 'Pick and place equipment within budget.', 'Test the layout with fictional students.'],
    learningOutcomes: ['Experience design as creativity plus trade-offs.'], ...planned,
    icon: 'sparkles', imageKey: 'simulation.design-the-play-space', sourceReference: SOURCE,
  },
  {
    id: 'career-04', code: 'C4', slug: 'power-cut-at-the-clinic', title: 'Power Cut at the Clinic', category: 'career', audience: 'Class 9–10',
    area: 'Skilled Trades · Health', duration: '15 min', summary: 'Be the electrician who finds out why a village clinic keeps losing power, safely.',
    situation: 'A clinic’s lights and vaccine fridge keep tripping. As an electrician, follow safety rules, test circuits, find the fault and explain the fix to the doctor.',
    howItPlays: ['Run a safety check.', 'Test circuits and read clues.', 'Fix the fault and brief the clinic staff.'],
    learningOutcomes: ['See skilled trades as expert problem-solving work.'], ...planned,
    icon: 'zap', imageKey: 'simulation.power-cut-at-the-clinic', sourceReference: SOURCE,
  },
  {
    id: 'career-05', code: 'C5', slug: 'solar-school', title: 'Solar School', category: 'career', audience: 'Class 11–12',
    area: 'Build · Earth · Business', duration: '20 min', summary: 'Advise a school on solar panels using real-looking electricity data and costs.',
    situation: 'Given an electricity bill history, a rooftop layout and cost options, compare solar designs, estimate output and payback, and recommend a plan with its limits.',
    howItPlays: ['Read the energy data.', 'Compare system sizes.', 'Write a recommendation with assumptions.'],
    learningOutcomes: ['Experience how energy work mixes engineering, numbers and communication.'], ...planned,
    icon: 'sun', imageKey: 'simulation.solar-school', sourceReference: SOURCE,
  },
  {
    id: 'career-06', code: 'C6', slug: 'you-are-the-product-manager', title: 'You’re the Product Manager', category: 'career', audience: 'Class 11–12 · college',
    area: 'Tech · Business', duration: '20 min', summary: 'Three feature requests, one budget. Decide what the app builds next, then defend it when new data arrives.',
    situation: 'With customer feedback, usage numbers and a limited budget, define a success metric, prioritise features and present a plan, until a new piece of evidence challenges it.',
    howItPlays: ['Study users and numbers.', 'Prioritise features.', 'Revisit the plan when the data changes.'],
    learningOutcomes: ['See how product work balances evidence, people and limits.'], ...planned,
    icon: 'smartphone', imageKey: 'simulation.you-are-the-product-manager', sourceReference: SOURCE,
  },
]
