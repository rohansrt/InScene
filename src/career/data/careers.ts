import type { RoleId, ThemeId, ValueId, WorldId } from '../types'

export interface Career {
  id: string
  title: string
  emoji: string
  world: WorldId
  /** Ordered: the first theme is the strongest part of the work. */
  themes: ThemeId[]
  values: ValueId[]
  oneLiner: string
  /** A typical task, written as something you would do. */
  task: string
  place: string
  people: string
  challenge: string
  skills: string[]
  subjects: string[]
  routes: {
    /** Optional route that starts after Class 10 (ITI, polytechnic, skill courses). */
    afterTen?: string
    afterTwelve: string
    college: string
  }
  /** The Rain Ready mission role this career is part of, if any. */
  role?: RoleId
}

// Routes are general Indian pathways written for students. They are illustrative, not
// guaranteed, and the UI always tells students to check official course and exam sites.
export const careers: Career[] = [
  // ── Build & Engineer ──
  {
    id: 'civil-engineer', title: 'Civil engineer', emoji: '🏗️', world: 'build',
    themes: ['make', 'organise', 'discover'], values: ['stability', 'impact', 'teamwork'],
    oneLiner: 'Designs roads, bridges, drains and buildings that keep people safe.',
    task: 'Check if a new drain is big enough for the heaviest monsoon rain.',
    place: 'Office and construction sites. You are outdoors a lot.',
    people: 'Architects, site workers and city officials.',
    challenge: 'Building safely on a tight budget and a tight deadline.',
    skills: ['Maths and physics', 'Drawing plans on computer (CAD)', 'Thinking about safety'],
    subjects: ['Maths', 'Physics'],
    routes: {
      afterTen: 'Diploma in Civil Engineering at a polytechnic (3 years). Diploma holders can often join B.Tech in the second year.',
      afterTwelve: 'B.Tech / B.E. in Civil Engineering, through JEE Main or state entrance tests. Needs Physics, Chemistry and Maths.',
      college: 'Internships with construction or infrastructure firms. Learn AutoCAD and site safety. An M.Tech helps for specialist roles.',
    },
    role: 'engineer',
  },
  {
    id: 'architect', title: 'Architect', emoji: '🏛️', world: 'build',
    themes: ['create', 'make', 'organise'], values: ['creativity', 'impact', 'freedom'],
    oneLiner: 'Designs buildings and spaces that look good and work well for people.',
    task: 'Sketch a school building that stays cool without air conditioning.',
    place: 'A design studio, plus visits to building sites.',
    people: 'Clients, engineers and builders.',
    challenge: 'Balancing beauty, budget, safety and building rules.',
    skills: ['Sketching and 3D models', 'Understanding what people need', 'Maths for space and structure'],
    subjects: ['Maths', 'Art'],
    routes: {
      afterTwelve: 'B.Arch (5 years), through NATA or JEE Main Paper 2A. Maths in Class 12 is needed.',
      college: 'Work in an architecture studio and build a portfolio. M.Arch or urban design later.',
    },
  },
  {
    id: 'robotics-engineer', title: 'Robotics engineer', emoji: '🤖', world: 'build',
    themes: ['make', 'discover', 'organise'], values: ['discovery', 'creativity', 'money'],
    oneLiner: 'Builds machines and robots that move, sense and help.',
    task: 'Program a robot arm to pick up parts without dropping them.',
    place: 'Labs and factories.',
    people: 'Software developers, technicians and designers.',
    challenge: 'Making a robot work outside the lab, in the messy real world.',
    skills: ['Electronics', 'Coding', 'Testing and fixing'],
    subjects: ['Maths', 'Physics', 'Computers'],
    routes: {
      afterTen: 'Diploma in Mechatronics or Electronics at a polytechnic.',
      afterTwelve: 'B.Tech in Mechanical, Mechatronics, Electronics or Robotics, through JEE Main or state tests.',
      college: 'Robotics clubs and competitions, internships in automation, and learning embedded systems.',
    },
  },

  // ── Science & Discovery ──
  {
    id: 'forensic-scientist', title: 'Forensic scientist', emoji: '🔬', world: 'science',
    themes: ['discover', 'organise'], values: ['discovery', 'impact', 'stability'],
    oneLiner: 'Studies clues like fingerprints and fibres to help solve crimes.',
    task: 'Match a fibre from a crime scene to a jacket.',
    place: 'A lab, and sometimes crime scenes.',
    people: 'Police, lawyers and other scientists.',
    challenge: 'Being extremely careful, because a mistake can affect someone’s life.',
    skills: ['Careful observation', 'Chemistry and biology', 'Writing clear reports'],
    subjects: ['Chemistry', 'Biology'],
    routes: {
      afterTwelve: 'B.Sc in Forensic Science, or Chemistry/Biology followed by an M.Sc in Forensic Science.',
      college: 'Lab internships and an M.Sc. Government forensic labs hire through exams.',
    },
  },
  {
    id: 'space-scientist', title: 'Space scientist', emoji: '🔭', world: 'science',
    themes: ['discover', 'organise'], values: ['discovery', 'freedom'],
    oneLiner: 'Studies stars, planets and space missions.',
    task: 'Look through telescope data to spot a planet around another star.',
    place: 'Research labs, observatories and space agencies.',
    people: 'Engineers, other scientists and students.',
    challenge: 'Working for years on questions with no quick answers.',
    skills: ['Physics and maths', 'Coding for data', 'Patience'],
    subjects: ['Physics', 'Maths'],
    routes: {
      afterTwelve: 'B.Sc or BS-MS in Physics (for example at IISERs or IISc), or B.Tech in Engineering Physics or Aerospace.',
      college: 'Summer research programmes, then an M.Sc and PhD. Space agencies also hire engineers.',
    },
  },
  {
    id: 'biotech-researcher', title: 'Biotech researcher', emoji: '🧬', world: 'science',
    themes: ['discover', 'help'], values: ['discovery', 'impact'],
    oneLiner: 'Uses living cells to make new medicines, crops and materials.',
    task: 'Test which bacteria can break down plastic the fastest.',
    place: 'Labs in universities and companies.',
    people: 'Doctors, scientists and companies.',
    challenge: 'Most experiments fail before one works.',
    skills: ['Biology and chemistry', 'Running experiments', 'Recording data carefully'],
    subjects: ['Biology', 'Chemistry'],
    routes: {
      afterTwelve: 'B.Sc or B.Tech in Biotechnology (some need Biology, some Maths).',
      college: 'Lab internships, then an M.Sc or M.Tech. Research jobs in pharma and agriculture companies.',
    },
  },

  // ── Tech & Data ──
  {
    id: 'software-developer', title: 'Software developer', emoji: '💻', world: 'tech',
    themes: ['make', 'organise', 'create'], values: ['creativity', 'money', 'freedom'],
    oneLiner: 'Writes the code behind apps, websites and games.',
    task: 'Fix a bug that makes a school app crash.',
    place: 'An office, or from home.',
    people: 'Designers, product managers and testers.',
    challenge: 'Code that works today can break tomorrow.',
    skills: ['Coding', 'Logical thinking', 'Teamwork'],
    subjects: ['Maths', 'Computers'],
    routes: {
      afterTen: 'Diploma in Computer Engineering at a polytechnic.',
      afterTwelve: 'B.Tech in Computer Science, BCA or B.Sc Computer Science. Many skills can also be learned online.',
      college: 'Build projects and share them, contribute to open source, and do internships.',
    },
  },
  {
    id: 'data-analyst', title: 'Data analyst', emoji: '📊', world: 'tech',
    themes: ['discover', 'organise'], values: ['discovery', 'stability', 'money'],
    oneLiner: 'Finds patterns in numbers to help people make better decisions.',
    task: 'Find which bus routes are always late, and why.',
    place: 'An office, or from home.',
    people: 'Managers, engineers and researchers.',
    challenge: 'Real data is often messy or missing.',
    skills: ['Maths and statistics', 'Spreadsheets and SQL', 'Explaining charts simply'],
    subjects: ['Maths', 'Computers'],
    routes: {
      afterTwelve: 'Any degree with maths: B.Sc Statistics or Maths, Economics, B.Com, BCA or B.Tech.',
      college: 'Learn Excel, SQL and Python, and do projects with real public data. Internships help a lot.',
    },
  },
  {
    id: 'cybersecurity-analyst', title: 'Cybersecurity analyst', emoji: '🛡️', world: 'tech',
    themes: ['discover', 'organise', 'make'], values: ['stability', 'money', 'impact'],
    oneLiner: 'Protects computers and people’s data from hackers.',
    task: 'Spot a fake login page before people get tricked.',
    place: 'Security teams in companies, banks and government.',
    people: 'IT teams, police cyber cells and companies.',
    challenge: 'Hackers keep inventing new tricks.',
    skills: ['Networks and coding', 'Thinking like an attacker', 'Staying calm in a crisis'],
    subjects: ['Computers', 'Maths'],
    routes: {
      afterTwelve: 'B.Tech in Computer Science or IT, BCA, or B.Sc in Cyber Security.',
      college: 'Capture-the-flag contests, security certifications and internships in security teams.',
    },
  },
  {
    id: 'ux-designer', title: 'UX designer', emoji: '📱', world: 'tech',
    themes: ['create', 'help', 'discover'], values: ['creativity', 'helping', 'teamwork'],
    oneLiner: 'Makes apps and websites easy and pleasant to use.',
    task: 'Watch students use an app and find where they get confused.',
    place: 'An office, or from home.',
    people: 'Users, developers and product managers.',
    challenge: 'What looks nice is not always easy to use.',
    skills: ['Understanding people', 'Sketching screens', 'Testing ideas'],
    subjects: ['Art', 'Computers', 'English'],
    routes: {
      afterTwelve: 'B.Des (entrance tests like UCEED or NID DAT), or any degree plus a strong portfolio.',
      college: 'Redesign a real app as a case study, learn Figma, and do internships.',
    },
  },
  {
    id: 'game-designer', title: 'Game designer', emoji: '🎮', world: 'tech',
    themes: ['create', 'make'], values: ['creativity', 'freedom', 'teamwork'],
    oneLiner: 'Invents the rules, levels and stories that make games fun.',
    task: 'Make level 3 harder, but not so hard that players quit.',
    place: 'Game studios, or from home.',
    people: 'Artists, programmers and testers.',
    challenge: 'Fun is hard to plan, so you test again and again.',
    skills: ['Storytelling', 'Logic and maths', 'Playtesting'],
    subjects: ['Computers', 'Art', 'Maths'],
    routes: {
      afterTwelve: 'B.Des in game design, BCA or B.Tech, or animation and game courses.',
      college: 'Make small games and share them, join game jams, and intern at studios.',
    },
  },

  // ── Health & Care ──
  {
    id: 'doctor', title: 'Doctor', emoji: '🩺', world: 'health',
    themes: ['help', 'discover'], values: ['helping', 'impact', 'stability'],
    oneLiner: 'Finds out what is making someone ill and helps them get better.',
    task: 'Ask questions and run tests to find out why a child has a fever.',
    place: 'Hospitals and clinics.',
    people: 'Patients, nurses and families.',
    challenge: 'Long training and tough days.',
    skills: ['Biology', 'Listening carefully', 'Deciding under pressure'],
    subjects: ['Biology', 'Chemistry', 'Physics'],
    routes: {
      afterTwelve: 'MBBS (about 5.5 years including internship), through NEET-UG. Needs Physics, Chemistry and Biology.',
      college: 'After MBBS, NEET-PG leads to specialisation (MD/MS).',
    },
  },
  {
    id: 'nurse', title: 'Nurse', emoji: '💉', world: 'health',
    themes: ['help', 'organise'], values: ['helping', 'stability', 'teamwork'],
    oneLiner: 'Cares for patients every day and keeps them safe.',
    task: 'Check a patient’s medicines and explain them to the family.',
    place: 'Hospitals, clinics, schools and homes.',
    people: 'Patients, doctors and families.',
    challenge: 'Long shifts and caring for many people at once.',
    skills: ['Care and patience', 'Biology', 'Staying organised'],
    subjects: ['Biology', 'Chemistry'],
    routes: {
      afterTwelve: 'B.Sc Nursing (4 years) or a nursing diploma (GNM).',
      college: 'Specialise (children, ICU, mental health) with post-basic courses or an M.Sc Nursing.',
    },
  },
  {
    id: 'physiotherapist', title: 'Physiotherapist', emoji: '🏃', world: 'health',
    themes: ['help', 'discover'], values: ['helping', 'freedom'],
    oneLiner: 'Helps people move again after injuries.',
    task: 'Plan exercises for a cricketer with a knee injury.',
    place: 'Clinics, hospitals and sports teams.',
    people: 'Patients, doctors and coaches.',
    challenge: 'Keeping patients motivated week after week.',
    skills: ['How the body moves', 'Coaching', 'Patience'],
    subjects: ['Biology', 'Physical education'],
    routes: {
      afterTwelve: 'Bachelor of Physiotherapy (BPT), about 4.5 years including internship.',
      college: 'Sports physio courses, or an MPT to specialise.',
    },
  },

  // ── Teach & Support ──
  {
    id: 'teacher', title: 'Teacher', emoji: '🍎', world: 'teach',
    themes: ['help', 'lead', 'create'], values: ['helping', 'impact', 'stability'],
    oneLiner: 'Helps students understand ideas and grow.',
    task: 'Turn a boring chapter into a fun class activity.',
    place: 'Schools and colleges.',
    people: 'Students, parents and other teachers.',
    challenge: 'Every student learns differently.',
    skills: ['Explaining clearly', 'Patience', 'Planning lessons'],
    subjects: ['Any subject you love', 'English'],
    routes: {
      afterTwelve: 'A bachelor’s degree followed by a B.Ed (2 years), or a 4-year integrated teacher education programme (ITEP).',
      college: 'Teach at a club or NGO, complete a B.Ed, and take teacher eligibility tests like CTET.',
    },
  },
  {
    id: 'psychologist', title: 'Psychologist', emoji: '🧠', world: 'teach',
    themes: ['help', 'discover'], values: ['helping', 'impact'],
    oneLiner: 'Helps people understand their thoughts and feelings.',
    task: 'Listen to a student who is stressed about exams and plan small steps together.',
    place: 'Schools, clinics, hospitals and companies.',
    people: 'Clients, families and doctors.',
    challenge: 'Some problems take a long time to get better.',
    skills: ['Listening', 'Understanding research', 'Keeping things private'],
    subjects: ['Biology', 'English', 'Social science'],
    routes: {
      afterTwelve: 'BA or B.Sc in Psychology, then an MA or M.Sc.',
      college: 'For clinical work you need an RCI-recognised professional course. Volunteering with helplines helps.',
    },
  },
  {
    id: 'sports-coach', title: 'Sports coach', emoji: '⚽', world: 'teach',
    themes: ['lead', 'help'], values: ['teamwork', 'leading', 'helping'],
    oneLiner: 'Trains players and teams to get better and stay healthy.',
    task: 'Plan a practice session that fixes the team’s weak defence.',
    place: 'Grounds, gyms and sports academies.',
    people: 'Players, parents and physios.',
    challenge: 'Keeping everyone motivated after a loss.',
    skills: ['Leadership', 'Fitness knowledge', 'Giving clear feedback'],
    subjects: ['Physical education', 'Biology'],
    routes: {
      afterTwelve: 'B.P.Ed or B.Sc in Sports Science, plus coaching certificates from sports bodies.',
      college: 'Assist a coach, get certified, or do a master’s in sports science.',
    },
  },

  // ── Create & Communicate ──
  {
    id: 'graphic-designer', title: 'Graphic designer', emoji: '🖌️', world: 'create',
    themes: ['create', 'organise'], values: ['creativity', 'freedom'],
    oneLiner: 'Creates posters, logos and visuals that grab attention.',
    task: 'Design a poster that makes people stop and read.',
    place: 'Studios, agencies, or freelance from home.',
    people: 'Clients, writers and marketers.',
    challenge: 'Clients change their minds!',
    skills: ['Drawing and layout', 'Design software', 'Taking feedback well'],
    subjects: ['Art', 'Computers'],
    routes: {
      afterTen: 'Short design courses and diplomas.',
      afterTwelve: 'B.Des, BFA or a design diploma. Some colleges use entrance tests like NID DAT or UCEED.',
      college: 'Build an online portfolio, freelance small projects, and do internships.',
    },
  },
  {
    id: 'journalist', title: 'Journalist', emoji: '📰', world: 'create',
    themes: ['create', 'discover', 'help'], values: ['impact', 'discovery', 'freedom'],
    oneLiner: 'Finds out what is really happening and tells the story.',
    task: 'Interview residents about floods and check every fact.',
    place: 'Newsrooms, out in the field, and online.',
    people: 'Editors, the public and experts.',
    challenge: 'Getting the facts right, fast.',
    skills: ['Writing', 'Asking good questions', 'Checking facts'],
    subjects: ['English', 'Languages', 'Social science'],
    routes: {
      afterTwelve: 'BA in Journalism and Mass Communication, or any degree plus lots of writing practice.',
      college: 'Write for the college paper, start a blog or podcast, and intern in newsrooms.',
    },
  },
  {
    id: 'animator', title: 'Animator', emoji: '🎬', world: 'create',
    themes: ['create', 'make'], values: ['creativity', 'freedom'],
    oneLiner: 'Brings characters and stories to life, frame by frame.',
    task: 'Animate a 5-second scene of a character jumping over a puddle.',
    place: 'Studios, or from home.',
    people: 'Directors, artists and sound designers.',
    challenge: 'A few seconds of animation can take days.',
    skills: ['Drawing', 'Animation software', 'Patience'],
    subjects: ['Art', 'Computers'],
    routes: {
      afterTwelve: 'B.Des or B.Sc in Animation, or a diploma in animation and VFX.',
      college: 'Make a showreel, join animation challenges, and intern at studios.',
    },
  },

  // ── Business & Money ──
  {
    id: 'entrepreneur', title: 'Entrepreneur', emoji: '🚀', world: 'business',
    themes: ['lead', 'create'], values: ['freedom', 'leading', 'money'],
    oneLiner: 'Spots a problem and builds a business to solve it.',
    task: 'Test if students would pay for a healthy tiffin service.',
    place: 'Anywhere. Many start at home.',
    people: 'Customers, a team and investors.',
    challenge: 'Risk: many first ideas don’t work.',
    skills: ['Selling ideas', 'Handling money', 'Bouncing back'],
    subjects: ['Business studies', 'Maths', 'English'],
    routes: {
      afterTwelve: 'No fixed route. A BBA, B.Com or any degree helps, and many start with a small project.',
      college: 'Join your college’s entrepreneurship cell or an incubator, run a small business, and learn from customers.',
    },
  },
  {
    id: 'chartered-accountant', title: 'Chartered accountant', emoji: '🧮', world: 'business',
    themes: ['organise', 'discover'], values: ['stability', 'money'],
    oneLiner: 'Checks money records and helps businesses follow the rules.',
    task: 'Find out why a company’s numbers don’t add up.',
    place: 'Offices and accounting firms.',
    people: 'Business owners, tax officials and teams.',
    challenge: 'Very busy seasons near deadlines.',
    skills: ['Numbers and accuracy', 'Rules and laws', 'Honesty'],
    subjects: ['Accounts', 'Maths'],
    routes: {
      afterTwelve: 'CA Foundation after Class 12, then CA Intermediate, practical training (articleship) and CA Final, all through ICAI.',
      college: 'Graduates can also join the CA course. Internships at CA firms help.',
    },
  },
  {
    id: 'product-manager', title: 'Product manager', emoji: '🧭', world: 'business',
    themes: ['lead', 'organise', 'help'], values: ['leading', 'teamwork', 'money'],
    oneLiner: 'Decides what an app or product should do next, and why.',
    task: 'Choose which of three new features to build first.',
    place: 'Tech companies and startups.',
    people: 'Designers, developers and customers.',
    challenge: 'Everyone wants something different.',
    skills: ['Listening to users', 'Prioritising', 'Explaining decisions'],
    subjects: ['Maths', 'English', 'Computers'],
    routes: {
      afterTwelve: 'Any degree. Many product managers study engineering, business or design first.',
      college: 'Lead a college project from start to finish, do internships, and write product case studies. An MBA is optional.',
    },
  },
  {
    id: 'event-manager', title: 'Event manager', emoji: '🎪', world: 'business',
    themes: ['organise', 'lead'], values: ['teamwork', 'creativity', 'freedom'],
    oneLiner: 'Plans fests, weddings and concerts so everything runs on time.',
    task: 'Plan a college fest for 2,000 people on a fixed budget.',
    place: 'Offices, venues, and always on the move.',
    people: 'Clients, vendors and performers.',
    challenge: 'Rain, delays and last-minute changes.',
    skills: ['Planning', 'Negotiating', 'Staying calm'],
    subjects: ['Business studies', 'English'],
    routes: {
      afterTwelve: 'BBA or a diploma in Event Management, or Hotel Management.',
      college: 'Volunteer for fests and intern with event companies.',
    },
  },

  // ── Law & Society ──
  {
    id: 'urban-planner', title: 'Urban planner', emoji: '🗺️', world: 'society',
    themes: ['lead', 'help', 'organise'], values: ['impact', 'teamwork'],
    oneLiner: 'Plans how a city uses its land so it works for everyone.',
    task: 'Decide where a new park, bus stop and drain should go.',
    place: 'Government offices, planning firms and site visits.',
    people: 'Residents, engineers and officials.',
    challenge: 'Many people want different things from the same land.',
    skills: ['Listening', 'Maps and data', 'Explaining plans'],
    subjects: ['Geography', 'Maths', 'Social science'],
    routes: {
      afterTwelve: 'B.Planning (4 years), through JEE Main Paper 2B. Or a degree in architecture, civil engineering or geography, then M.Plan.',
      college: 'Internships with city bodies or planning firms. Learn GIS mapping.',
    },
    role: 'planner',
  },
  {
    id: 'lawyer', title: 'Lawyer', emoji: '⚖️', world: 'society',
    themes: ['lead', 'help', 'discover'], values: ['impact', 'leading', 'money'],
    oneLiner: 'Stands up for people’s rights, in court and outside it.',
    task: 'Read the facts of a case and build an argument.',
    place: 'Courts, law firms, companies and NGOs.',
    people: 'Clients, judges and other lawyers.',
    challenge: 'Lots of reading and long cases.',
    skills: ['Reading closely', 'Arguing clearly', 'Being fair'],
    subjects: ['English', 'Social science'],
    routes: {
      afterTwelve: 'A 5-year integrated law degree (like BA LLB), for example through CLAT. Or a 3-year LLB after any degree.',
      college: 'Moot courts, legal aid clinics and internships with lawyers.',
    },
  },
  {
    id: 'civil-servant', title: 'Civil servant', emoji: '📋', world: 'society',
    themes: ['lead', 'organise', 'help'], values: ['impact', 'stability', 'leading'],
    oneLiner: 'Runs government work, from districts to national plans.',
    task: 'Plan how a district gets ready for the monsoon.',
    place: 'Government offices and out in the field.',
    people: 'Citizens, officials and ministers.',
    challenge: 'Big responsibility and tough exams.',
    skills: ['Making decisions', 'Understanding society', 'Leadership'],
    subjects: ['Social science', 'English'],
    routes: {
      afterTwelve: 'Finish any bachelor’s degree, then take the UPSC Civil Services Exam or a state PSC exam.',
      college: 'Read the news daily, join debate or policy clubs, and intern with government programmes.',
    },
  },

  // ── Earth, Food & Climate ──
  {
    id: 'environmental-scientist', title: 'Environmental scientist', emoji: '🌿', world: 'earth',
    themes: ['discover', 'help'], values: ['impact', 'discovery'],
    oneLiner: 'Studies water, air, soil and nature to protect them.',
    task: 'Test pond water to find out why the fish are dying.',
    place: 'Outdoors, in labs and in offices.',
    people: 'Engineers, officials and local communities.',
    challenge: 'Nature is complicated, with many causes at once.',
    skills: ['Science and fieldwork', 'Using data', 'Explaining findings'],
    subjects: ['Biology', 'Chemistry', 'Geography'],
    routes: {
      afterTwelve: 'B.Sc in Environmental Science, Chemistry, Biology or Geography, then an M.Sc.',
      college: 'Field projects, internships with NGOs or pollution control boards, and GIS skills.',
    },
    role: 'scientist',
  },
  {
    id: 'agri-scientist', title: 'Agricultural scientist', emoji: '🌾', world: 'earth',
    themes: ['discover', 'make'], values: ['impact', 'stability'],
    oneLiner: 'Helps farmers grow more food with less water and fewer chemicals.',
    task: 'Test which seed grows best in salty soil.',
    place: 'Farms, labs and research stations.',
    people: 'Farmers, companies and scientists.',
    challenge: 'Weather you can’t control.',
    skills: ['Biology', 'Fieldwork', 'Talking with farmers'],
    subjects: ['Biology', 'Chemistry'],
    routes: {
      afterTwelve: 'B.Sc Agriculture (4 years). Admission is through university or state entrance tests.',
      college: 'Farm internships, an M.Sc in Agriculture, or agritech startups.',
    },
  },
  {
    id: 'wildlife-conservationist', title: 'Wildlife conservationist', emoji: '🐅', world: 'earth',
    themes: ['discover', 'help'], values: ['impact', 'freedom', 'discovery'],
    oneLiner: 'Protects animals and the places they live.',
    task: 'Set up camera traps to count tigers in a forest.',
    place: 'Forests, field stations and offices.',
    people: 'Forest officers, villagers and researchers.',
    challenge: 'Remote places and slow progress.',
    skills: ['Field observation', 'Biology', 'Working with communities'],
    subjects: ['Biology', 'Geography'],
    routes: {
      afterTwelve: 'B.Sc in Zoology, Botany or Environmental Science, then an M.Sc in Wildlife Science or Ecology.',
      college: 'Volunteer for bird and animal counts, and do field internships with conservation groups.',
    },
  },
  {
    id: 'food-technologist', title: 'Food technologist', emoji: '🧪', world: 'earth',
    themes: ['discover', 'make', 'organise'], values: ['stability', 'impact'],
    oneLiner: 'Makes food safe, tasty and long-lasting.',
    task: 'Keep a snack fresh for 6 months without harmful chemicals.',
    place: 'Food factories and labs.',
    people: 'Chefs, scientists and factory teams.',
    challenge: 'Safety rules are strict, for good reason.',
    skills: ['Chemistry and biology', 'Testing', 'Hygiene and safety'],
    subjects: ['Chemistry', 'Biology'],
    routes: {
      afterTwelve: 'B.Tech in Food Technology or B.Sc in Food Science.',
      college: 'Internships at food companies, and learning food safety standards.',
    },
  },

  // ── Skilled Trades ──
  {
    id: 'electrician', title: 'Electrician', emoji: '⚡', world: 'trades',
    themes: ['make', 'organise'], values: ['stability', 'freedom', 'money'],
    oneLiner: 'Installs and fixes wiring so homes, schools and hospitals have safe power.',
    task: 'Find out why a clinic’s lights keep tripping, and fix it safely.',
    place: 'Homes, buildings and construction sites.',
    people: 'Customers, builders and engineers.',
    challenge: 'Safety first, every single time.',
    skills: ['Wiring and tools', 'Problem-solving', 'Safety rules'],
    subjects: ['Physics', 'Maths'],
    routes: {
      afterTen: 'ITI Electrician trade (2 years) after Class 10, then an apprenticeship. Many jobs need a state electrical licence.',
      afterTwelve: 'ITI Electrician, or a Diploma in Electrical Engineering.',
      college: 'With a diploma or degree you can grow into a supervisor or electrical engineer.',
    },
  },
  {
    id: 'solar-technician', title: 'Solar technician', emoji: '☀️', world: 'trades',
    themes: ['make', 'discover'], values: ['impact', 'stability'],
    oneLiner: 'Installs and looks after solar panels on roofs and farms.',
    task: 'Fit panels on a school roof so they catch the most sun.',
    place: 'Rooftops and solar farms.',
    people: 'Customers, engineers and electricians.',
    challenge: 'Working at heights in the heat.',
    skills: ['Electrical basics', 'Measuring and fitting', 'Safety'],
    subjects: ['Physics'],
    routes: {
      afterTen: 'ITI Electrician, or short solar-technician skill courses (for example under Skill India).',
      afterTwelve: 'A Diploma in Electrical Engineering, or solar installer training.',
      college: 'Engineers can move into solar design and project management.',
    },
  },
  {
    id: 'ev-technician', title: 'EV technician', emoji: '🔧', world: 'trades',
    themes: ['make', 'discover'], values: ['stability', 'money'],
    oneLiner: 'Repairs and services electric scooters, cars and buses.',
    task: 'Find out why an e-scooter battery drains too fast.',
    place: 'Workshops and service centres.',
    people: 'Customers, engineers and suppliers.',
    challenge: 'The technology keeps changing.',
    skills: ['Mechanics and electronics', 'Finding faults', 'Customer care'],
    subjects: ['Physics'],
    routes: {
      afterTen: 'ITI Mechanic Motor Vehicle, or a Diploma in Automobile Engineering.',
      afterTwelve: 'A Diploma or B.Tech in Automobile or Electrical Engineering.',
      college: 'EV training from manufacturers, then service management roles.',
    },
  },
  {
    id: 'chef', title: 'Chef', emoji: '🍳', world: 'trades',
    themes: ['create', 'make', 'organise'], values: ['creativity', 'teamwork'],
    oneLiner: 'Creates dishes and runs a busy kitchen.',
    task: 'Invent a new menu item that costs under ₹60 to make.',
    place: 'Restaurants, hotels and cloud kitchens.',
    people: 'The kitchen team, customers and suppliers.',
    challenge: 'Long hours on your feet, at a fast pace.',
    skills: ['Cooking', 'Hygiene', 'Teamwork under pressure'],
    subjects: ['Any'],
    routes: {
      afterTen: 'Food production courses at ITIs or skill centres.',
      afterTwelve: 'Hotel Management (for example through NCHM JEE) or a culinary diploma.',
      college: 'Work in kitchens, enter cooking competitions, or start a food business.',
    },
  },
]

export const careerById = Object.fromEntries(careers.map((c) => [c.id, c])) as Record<string, Career>

/** Careers that use the same kind of work as each mission role. */
export const roleCareers: Record<RoleId, string[]> = {
  scientist: ['environmental-scientist', 'data-analyst', 'forensic-scientist', 'wildlife-conservationist'],
  planner: ['urban-planner', 'civil-servant', 'journalist', 'product-manager'],
  engineer: ['civil-engineer', 'architect', 'electrician', 'robotics-engineer'],
}
