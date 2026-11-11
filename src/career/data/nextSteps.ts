import type { Level, WorldId } from '../types'

interface Steps {
  week: string
  term: string
  /** Bigger step, by level. */
  big: Record<Level, string>
}

// Small, doable actions first. "Bigger" steps point to subjects, courses or experience,
// depending on how far along the student is.
export const nextSteps: Record<WorldId, Steps> = {
  build: {
    week: 'Build a bridge from paper and tape that holds 20 coins. Then make it stronger.',
    term: 'Join or start a robotics, science or model-making club.',
    big: {
      explorer: 'Keep maths and science strong. They open most building careers.',
      investigator: 'Look at what Physics and Maths lead to after Class 10, including polytechnic diplomas.',
      planner: 'Compare B.Tech, B.Arch and diploma routes. Check entrance-test dates on the official sites.',
      pro: 'Find an internship or a site visit with a construction or design firm.',
    },
  },
  science: {
    week: 'Pick a question (like “Which soap kills the most germs?”) and design a fair test.',
    term: 'Enter a science fair or do a project with a teacher.',
    big: {
      explorer: 'Read about one Indian scientist and what a normal day in their lab looks like.',
      investigator: 'See which streams lead to B.Sc and research courses.',
      planner: 'Look at B.Sc, BS-MS and integrated programmes and how to get in.',
      pro: 'Ask a professor if you can help on a research project this summer.',
    },
  },
  tech: {
    week: 'Try a free beginner coding activity and make something small that moves.',
    term: 'Build a tiny app, game or website and show it to friends.',
    big: {
      explorer: 'Try block-based coding at home or school.',
      investigator: 'Check whether your school offers Computer Science or IT as a subject.',
      planner: 'Compare B.Tech, BCA and B.Sc routes, and the skills each one teaches.',
      pro: 'Put 2–3 projects online and apply for a tech internship.',
    },
  },
  health: {
    week: 'Learn basic first aid from a trusted source and teach it to your family.',
    term: 'Volunteer at a health camp or blood donation drive with an adult.',
    big: {
      explorer: 'Ask a doctor, nurse or physio what surprised them about their job.',
      investigator: 'Biology is key for most health careers. See how it fits your subject choices.',
      planner: 'Compare MBBS, nursing and allied health courses, and the NEET and non-NEET routes.',
      pro: 'Shadow a health professional for a day, if you can arrange it.',
    },
  },
  teach: {
    week: 'Teach someone younger one thing you are good at. Notice what made it click.',
    term: 'Become a peer tutor or help run a club for juniors.',
    big: {
      explorer: 'Ask a teacher what they plan before a class.',
      investigator: 'Notice which subjects you enjoy explaining to others.',
      planner: 'Look at B.Ed, ITEP and psychology degrees.',
      pro: 'Volunteer with a learning NGO for a semester.',
    },
  },
  create: {
    week: 'Make a 30-second video, poster or comic about something you care about.',
    term: 'Start a small portfolio: 5 pieces you are proud of.',
    big: {
      explorer: 'Join an art, writing or media club.',
      investigator: 'Find out which design and media courses accept students from any stream.',
      planner: 'Look at design entrance tests (like NID DAT or UCEED) and when they happen.',
      pro: 'Take on one real client project, even a small one, and get feedback.',
    },
  },
  business: {
    week: 'Think of a problem at school that people would pay to fix. Ask 5 people about it.',
    term: 'Run a stall at a school or college fair and track your money.',
    big: {
      explorer: 'Help plan a class event and manage its budget.',
      investigator: 'Look at what Commerce and Business Studies cover.',
      planner: 'Compare BBA, B.Com and CA routes.',
      pro: 'Join your college’s entrepreneurship cell or an internship at a startup.',
    },
  },
  society: {
    week: 'Read one news story about your city and list who is affected by it.',
    term: 'Join a debate, MUN or student council.',
    big: {
      explorer: 'Visit your local municipal office or a court with a parent or teacher.',
      investigator: 'See how Social Science and Geography connect to law, planning and policy.',
      planner: 'Look at CLAT, B.Planning and humanities degrees.',
      pro: 'Intern with a city body, NGO or legal aid clinic.',
    },
  },
  earth: {
    week: 'Track how much plastic your home throws away in a week.',
    term: 'Join an eco club, tree survey or bird count.',
    big: {
      explorer: 'Grow a plant and keep a diary of how it changes.',
      investigator: 'See how Biology, Chemistry and Geography connect to environment careers.',
      planner: 'Compare B.Sc Environmental Science, Agriculture and Food Technology.',
      pro: 'Find a field project or an internship with a conservation group.',
    },
  },
  trades: {
    week: 'Watch an electrician, plumber or mechanic at work (with permission), and ask one question.',
    term: 'Try a hands-on workshop: basic wiring, repairs or a maker space.',
    big: {
      explorer: 'Help fix something at home with an adult. Notice how you find the fault.',
      investigator: 'Look at ITI trades and polytechnic diplomas you can join after Class 10.',
      planner: 'Compare ITI, diploma and apprenticeship routes, and what each leads to.',
      pro: 'Look at short certified skill courses that add to your degree.',
    },
  },
}

export const routeNote = 'Routes and entrance tests change. Always check the official website of a course or exam before you decide.'
