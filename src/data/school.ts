import type { GradeBand, Simulation, Strand } from './types'

const SOURCE = 'YOPPI Scenario Learning for Schools (PDF)'

interface SchoolBrief {
  code: string
  slug: string
  title: string
  area: string
  band: GradeBand
  strand: Strand
  duration: string
  complexity: string
  summary: string
  situation: string
  mission: string
  howItPlays: string[]
  learningOutcomes: string[]
  interactionDesign: string
  debrief: string
  guardrails: string
  icon: string
  pages: string
}

// The school source defines no Basic/Advanced content, so both levels are
// modelled as planned and rendered as "details coming soon".
function school(b: SchoolBrief): Simulation {
  const { band, pages, ...rest } = b
  return {
    ...rest,
    id: `school-${b.code.toLowerCase()}`,
    category: 'school',
    gradeBands: [band],
    levels: [
      { id: 'basic', availability: 'planned' },
      { id: 'advanced', availability: 'planned' },
    ],
    imageKey: `simulation.${b.slug}`,
    sourceReference: `${SOURCE}, ${b.code}, ${pages}`,
  }
}

const SHORT = '5–8 min'
const MID = '8–12 min'
const LONG = '10–15 min'

export const schoolSimulations: Simulation[] = [
  // ───────────── Standards 6–8 · Academic ─────────────
  school({
    code: 'A1',
    slug: 'the-disappearing-puddle',
    title: 'The Disappearing Puddle',
    area: 'Science',
    band: '6-8',
    strand: 'academic',
    duration: SHORT,
    complexity: 'Concrete observation; about 10 interaction points',
    summary:
      'One playground puddle vanishes before lunch while another, under a tree, remains. Investigate why before choosing an explanation.',
    situation:
      'After a rainy morning, one puddle on the sunny playground disappears before lunch, while a puddle under a tree remains. The class has been asked to explain the difference. The learner becomes the junior investigator and must make observations before choosing an explanation.',
    mission:
      'Identify which conditions may affect how quickly water evaporates, and distinguish a fair test from a guess.',
    howItPlays: [
      'Choose what to compare: sunlight, airflow, puddle size or surface type. The interface explains that changing many things at once makes the result hard to interpret.',
      'Inspect a small set of observations from sunny, shaded and windy locations, and identify the pattern rather than just selecting the warmest location.',
      'Predict which puddle will disappear first and choose evidence to support the prediction.',
      'A follow-up reveals two conditions that differ at once. Decide what additional test would isolate the likely cause.',
    ],
    learningOutcomes: [
      'Explain that evaporation is affected by conditions such as temperature and airflow.',
      'Use observation and a simple fair-test idea to support a claim.',
      'Recognise that more than one factor may affect a real puddle.',
    ],
    interactionDesign:
      'A visual playground map lets the learner change one condition at a time. Branch effects change the next evidence card and the confidence of the conclusion, not simply label one click as right or wrong.',
    debrief:
      'Shows the evidence selected, the pattern in the observations and a short explanation of evaporation. Credit is awarded for a sensible test design and evidence-based reasoning, including when the learner correctly notes that the data are insufficient.',
    guardrails:
      'Data are kept simple and consistent with the grade-level science curriculum. The scenario avoids implying that a single observation proves a general rule.',
    icon: 'droplets',
    pages: 'pp. 2–3',
  }),
  school({
    code: 'A2',
    slug: 'is-the-water-filter-enough',
    title: 'Is the Water Filter Enough?',
    area: 'Science',
    band: '6-8',
    strand: 'academic',
    duration: SHORT,
    complexity: 'Hands-on model; about 10 interaction points',
    summary:
      'Muddy demonstration water, cloth, gravel and sand. Propose a way to remove visible particles — and decide what the result does not prove.',
    situation:
      'A class is preparing for a nature camp. The available demonstration water looks muddy, and the student team has cloth, gravel, sand and a settling container. They must propose a sensible way to remove visible particles and decide what the result does and does not prove.',
    mission:
      'Understand separation of mixtures and distinguish clear-looking water from water that is safe to drink.',
    howItPlays: [
      'Choose a settling or filter arrangement using the available materials. Each choice shows a simulated sample before and after treatment.',
      'Compare the samples and identify which method removes more visible particles, noting that the model has limits.',
      'An apparently clear sample is presented. Decide whether appearance alone proves that it is safe for drinking.',
      'Choose the appropriate conclusion: filtration may remove some particles, but safe drinking water requires verified treatment appropriate to possible contamination.',
    ],
    learningOutcomes: [
      'Describe how settling and filtration separate some materials from water.',
      'Understand that clear water can still contain invisible contaminants or pathogens.',
      'Practise drawing a conclusion that matches the available evidence.',
    ],
    interactionDesign:
      'A virtual filter-building bench with selectable layers and a turbidity-style visual indicator. A separate safety indicator stays hidden until the learner considers whether the sample is safe to drink.',
    debrief:
      'Compares the learner’s filter choices, explains what each stage can remove in the model, and explicitly distinguishes particle removal from disinfection and verified drinking-water safety.',
    guardrails:
      'Never invites learners to taste unknown water. Any connected classroom activity requires teacher-approved materials and supervision; improvised filtration is not presented as a guarantee of safe drinking water.',
    icon: 'glass',
    pages: 'pp. 3–4',
  }),
  school({
    code: 'A3',
    slug: 'the-lemon-and-soap-mystery',
    title: 'The Lemon-and-Soap Mystery',
    area: 'Science',
    band: '6-8',
    strand: 'academic',
    duration: SHORT,
    complexity: 'Virtual experiment; about 10 interaction points',
    summary:
      'Three mystery samples for the class science display. Choose a suitable indicator and classify them from the colour changes.',
    situation:
      'The class is building a science display with three mystery samples labelled A, B and C. The teacher has prepared safe examples such as lemon juice, a baking-soda solution and a mild soap solution. The learner must select a suitable indicator and interpret the colour changes.',
    mission:
      'Connect everyday materials with acids, bases and indicators, and use test results rather than guesses to classify samples.',
    howItPlays: [
      'Choose a teacher-approved indicator, such as a prepared red-cabbage indicator, and select which sample to test first.',
      'Observe simulated colour changes and match them with reference results for familiar acidic and basic solutions.',
      'Classify the three samples using the evidence, then explain why colour alone from an unknown product may not identify every substance reliably.',
      'Choose safe next steps for an unknown or unlabelled material: do not taste it or mix it with other household products; ask the teacher or a responsible adult.',
    ],
    learningOutcomes: [
      'Explain the role of an indicator in identifying acidic or basic properties.',
      'Link chemistry concepts to familiar materials.',
      'Apply simple laboratory safety and evidence-based classification.',
    ],
    interactionDesign:
      'A virtual experiment bench with sample cards, indicator selection and visible colour changes. The learner must cite a result before the system confirms a classification.',
    debrief:
      'Shows a simple colour key, explains why indicators give evidence about a property rather than a complete chemical identity, and highlights safe handling.',
    guardrails:
      'Does not encourage tasting, smelling unknown samples closely or mixing household cleaning products. Uses teacher-prepared examples and terminology aligned with the school curriculum.',
    icon: 'flask',
    pages: 'pp. 4–5',
  }),
  school({
    code: 'A4',
    slug: 'the-rs-600-canteen-challenge',
    title: 'The Rs 600 Canteen Challenge',
    area: 'Mathematics',
    band: '6-8',
    strand: 'academic',
    duration: SHORT,
    complexity: 'Budget constraint; about 10 interaction points',
    summary:
      'Rs 600 to order snacks for 24 students — then five more join without any extra budget. Plan with unit prices and fairness.',
    situation:
      'A student committee has Rs 600 to order snacks for a club meeting. There are 24 students, several menu options and different pack sizes. After the first order is planned, five more students are added without increasing the budget.',
    mission:
      'Use arithmetic, fractions, decimals and unit prices to find an affordable plan while considering quantity and fairness.',
    howItPlays: [
      'Compare menu prices and pack sizes; calculate the price per item instead of relying only on the sticker price.',
      'Build an order under Rs 600 that provides one snack for each of the 24 students.',
      'Adjust the plan when five students join. Choose what to change and explain the trade-off.',
      'Compare two feasible plans by total cost, quantity and fairness, then submit a final order.',
    ],
    learningOutcomes: [
      'Calculate totals and unit prices accurately.',
      'Work within a fixed budget and update a plan when constraints change.',
      'Explain a practical trade-off using numbers.',
    ],
    interactionDesign:
      'A canteen shopping cart with item quantities and a live budget meter. The scenario tracks budget remaining, number of students served and items per person.',
    debrief:
      'Shows the cost calculations and compares the learner’s plan with at least one other feasible solution. Valid reasoning is rewarded rather than forcing a single menu choice when multiple solutions fit the constraints.',
    guardrails:
      'Uses fictional prices and menu items. Avoids moralising about food choices; the core lesson is quantitative reasoning and fair allocation.',
    icon: 'cart',
    pages: 'pp. 5–6',
  }),
  school({
    code: 'A5',
    slug: 'the-missing-library-book',
    title: 'The Missing Library Book',
    area: 'Mathematics and English',
    band: '6-8',
    strand: 'academic',
    duration: SHORT,
    complexity: 'Clue-based reasoning; about 10 interaction points',
    summary:
      'A reference book vanishes just before the school exhibition. Use a library map, directional clues and messages to find where to look next.',
    situation:
      'A reference book has gone missing just before a school exhibition. The student team has a simple library map, a few directional clues and short messages from people who last saw it. Some clues are useful; others are distractions or assumptions.',
    mission:
      'Combine map reading, spatial reasoning and close reading to identify the most plausible next place to investigate.',
    howItPlays: [
      'Interpret the library map and a scale or directional clue to eliminate impossible locations.',
      'Read three short messages and mark each statement as relevant evidence, uncertain information or distraction.',
      'Choose which location to investigate next and explain which clues support that choice.',
      'Unlock a final clue that must be combined with an earlier message before selecting the most plausible location.',
    ],
    learningOutcomes: [
      'Use directions and a simple map accurately.',
      'Distinguish a statement from evidence that supports a conclusion.',
      'Combine information from multiple short texts.',
    ],
    interactionDesign:
      'A small mystery board with a map, clue cards and eliminable locations. Earlier decisions affect which clue becomes available, but the final solution is always reachable through reasonable investigation.',
    debrief:
      'Reveals the complete reasoning chain and explains how each clue narrows the possibilities. Gives feedback on unsupported assumptions and shows why the strongest answer uses several clues together.',
    guardrails:
      'Keeps reading load appropriate for the grade band. Success does not depend on culturally specific knowledge unrelated to the stated skills.',
    icon: 'book',
    pages: 'pp. 6–7',
  }),

  // ───────────── Standards 6–8 · Non-academic ─────────────
  school({
    code: 'N1',
    slug: 'the-empty-wrapper',
    title: 'The Empty Wrapper',
    area: 'Civic sense',
    band: '6-8',
    strand: 'non-academic',
    duration: SHORT,
    complexity: 'Everyday choices; about 10 interaction points',
    summary:
      'A snack wrapper is dropped during recess — and the nearest bin is overflowing. Choose a respectful, practical response.',
    situation:
      'During recess, a student drops a snack wrapper and walks away. A friend notices, but the closest bin is overflowing. The learner can respond to the litter, speak to the student, locate another bin or report the overflowing bin.',
    mission:
      'Explore the relationship between personal responsibility and functioning public systems, using respectful and practical action.',
    howItPlays: [
      'Choose an initial response: ignore the wrapper, pick it up if safe, speak respectfully to the student or find a suitable bin.',
      'Discover that the nearest bin is full and litter is collecting nearby. Decide whether to adapt the response.',
      'Choose whether to stop at an individual action or tell the relevant school staff about the bin problem.',
      'Review the corridor after several hours and see how individual actions and a practical school response affect the space.',
    ],
    learningOutcomes: [
      'Recognise personal responsibility for shared spaces.',
      'Use respectful, proportionate ways to address a problem.',
      'Understand that infrastructure and maintenance also affect civic outcomes.',
    ],
    interactionDesign:
      'A short visual trail follows litter across three locations. Branches track both the immediate state of the corridor and whether a recurring problem has been reported.',
    debrief:
      'Contrasts a quick clean-up with a response that also addresses the overflowing bin. Avoids shaming the learner or requiring confrontation; safe, adult-supported choices remain valid.',
    guardrails:
      'Does not require children to handle unsafe, sharp or unknown waste. If a location or bin is unsafe, the appropriate choice is to inform a responsible adult.',
    icon: 'trash',
    pages: 'pp. 7–8',
  }),
  school({
    code: 'N2',
    slug: 'the-new-student-at-lunch',
    title: 'The New Student at Lunch',
    area: 'Empathy and inclusion',
    band: '6-8',
    strand: 'non-academic',
    duration: SHORT,
    complexity: 'Dialogue choices; about 10 interaction points',
    summary:
      'A new student joins mid-year, speaks a different first language and is quiet at lunch. Help them feel welcome without assuming what they want.',
    situation:
      'A new student joins a class halfway through the year. They speak a different first language, are quiet at lunch and have not yet found a group of friends. The learner can help make the environment welcoming without assuming what the new student wants.',
    mission:
      'Practise empathy, inclusive behaviour and respect for another person’s preferences and boundaries.',
    howItPlays: [
      'Choose how to start a conversation, avoiding assumptions about the student’s interests or abilities.',
      'A group makes an insensitive joke. Decide how to respond without escalating the situation unnecessarily.',
      'Choose whether to invite the student to an activity, ask what they enjoy or give them space while leaving the invitation open.',
      'See how respectful follow-through affects comfort and belonging over several school days.',
    ],
    learningOutcomes: [
      'Notice how assumptions can affect inclusion.',
      'Practise respectful communication and supportive bystander behaviour.',
      'Recognise that inclusion involves listening rather than deciding for someone else.',
    ],
    interactionDesign:
      'Dialogue choices change the reactions of several characters. The scenario recognises more than one respectful wording and assesses the principle behind the response.',
    debrief:
      'Asks the learner to identify what they learned from the student’s response and how they could check whether support is welcome. Scores listening, respect and practical follow-through.',
    guardrails:
      'Avoids stereotypes about language, region, disability, religion or background. Does not portray the new student as a problem to be fixed.',
    icon: 'users',
    pages: 'pp. 8–9',
  }),
  school({
    code: 'N3',
    slug: 'forward-or-fact-check',
    title: 'Forward or Fact-check?',
    area: 'Digital citizenship',
    band: '6-8',
    strand: 'non-academic',
    duration: SHORT,
    complexity: 'Verification path; about 10 interaction points',
    summary:
      'A frightening message claims the school is closed after a nearby incident, and classmates are forwarding it. Decide what to do while facts are uncertain.',
    situation:
      'A class group receives a frightening message claiming the school is closed because of a dangerous incident nearby. Students begin forwarding it. The learner must decide what to do while the facts remain uncertain.',
    mission:
      'Practise checking sources, timestamps and official information before sharing a claim, while avoiding further spread of harmful content.',
    howItPlays: [
      'Choose whether to forward, ignore or verify the message, and explain what would count as reliable evidence.',
      'Inspect the source, timestamp and a simulated official school notice.',
      'Discover that the message uses an old photograph from another place. Choose how to correct the rumour.',
      'Decide how to alert classmates without repeatedly reposting the original image or exposing private information.',
    ],
    learningOutcomes: [
      'Check the provenance and date of a claim.',
      'Distinguish a rumour from verified information.',
      'Correct misinformation without amplifying it unnecessarily.',
    ],
    interactionDesign:
      'A simulated group-chat feed updates based on forwards, verification and corrections, showing how one learner’s action changes the amount of unverified content circulating.',
    debrief:
      'Provides a short source-checking checklist and explains why an old image or official-looking format is not proof. Assesses verification and harm reduction, not speed alone.',
    guardrails:
      'Uses fictional school names and incidents. Does not include realistic emergency misinformation that could be mistaken for an actual alert.',
    icon: 'message-alert',
    pages: 'p. 9',
  }),
  school({
    code: 'N4',
    slug: 'thirty-seconds-to-cross',
    title: 'Thirty Seconds to Cross',
    area: 'Personal safety',
    band: '6-8',
    strand: 'non-academic',
    duration: SHORT,
    complexity: 'Hazard awareness; about 10 interaction points',
    summary:
      'Running late for school, a friend suggests crossing between vehicles instead of using the pedestrian crossing. Respond under time pressure and peer influence.',
    situation:
      'A group of friends is late for school. One friend suggests crossing between vehicles rather than walking to the pedestrian crossing. The learner must decide how to respond while dealing with time pressure and peer influence.',
    mission:
      'Recognise pedestrian hazards, make safer crossing decisions and practise resisting pressure to take an unsafe shortcut.',
    howItPlays: [
      'Choose whether to follow the group, challenge the shortcut or suggest a safer route to the marked crossing.',
      'Observe how parked vehicles, turning traffic and limited visibility affect the scene.',
      'A pedestrian signal changes and a friend tries to rush ahead. Choose a safe next step.',
      'Review the time saved against the risk created and identify a better plan for future trips.',
    ],
    learningOutcomes: [
      'Recognise hazards that limit driver and pedestrian visibility.',
      'Make safe pedestrian choices under peer pressure.',
      'Understand that a small time saving does not justify avoidable danger.',
    ],
    interactionDesign:
      'A simple animated crossing changes with traffic and visibility. Learners see the consequences of safe and unsafe paths without graphic collisions or frightening imagery.',
    debrief:
      'Explains the safe sequence appropriate to the depicted road layout, and reinforces using designated crossings and following signals and local road rules.',
    guardrails:
      'Does not reward risky behaviour with a shortcut advantage. Presents general safety guidance and adapts signal behaviour to the local context.',
    icon: 'footprints',
    pages: 'pp. 9–10',
  }),
  school({
    code: 'N5',
    slug: 'the-cricket-match-argument',
    title: 'The Cricket Match Argument',
    area: 'Conflict resolution',
    band: '6-8',
    strand: 'non-academic',
    duration: SHORT,
    complexity: 'Dialogue and mediation; about 10 interaction points',
    summary:
      'A close match ends in a disputed run-out, voices rise and sides form. Help the group resolve it fairly — without pretending everyone will be pleased.',
    situation:
      'A close cricket match ends in a disputed run-out. One player starts shouting, others take sides and the next game is about to start. The learner must help the group address the disagreement fairly without pretending everyone will be pleased.',
    mission:
      'Practise listening, agreed rules, calm communication and constructive resolution of a disagreement.',
    howItPlays: [
      'Choose whether to take a side, ask each participant what happened or pause the argument before it grows.',
      'One player refuses to continue unless the decision is reversed. Decide how to respond and which agreed rules apply.',
      'Choose whether to seek a neutral person, review the available evidence or agree on a fair process for this game.',
      'See how the group responds, then reflect on fairness, relationships and the limits of what can be resolved immediately.',
    ],
    learningOutcomes: [
      'Listen to different accounts before reaching a conclusion.',
      'Use rules and a fair process to resolve a dispute.',
      'Distinguish resolving a problem from making everyone agree.',
    ],
    interactionDesign:
      'A short branching conversation with reactions from players. The scenario rewards listening, proportionate mediation and using previously agreed rules rather than dominance.',
    debrief:
      'Compares the decision path and shows what reduced tension, what escalated it and how a neutral process can preserve trust even when the outcome disappoints someone.',
    guardrails:
      'Avoids humiliating a character or suggesting aggression is an effective way to win disputes.',
    icon: 'trophy',
    pages: 'pp. 10–11',
  }),

  // ───────────── Standards 9–10 · Academic ─────────────
  school({
    code: 'A6',
    slug: 'why-is-the-school-gate-rusting',
    title: 'Why Is the School Gate Rusting?',
    area: 'Chemistry',
    band: '9-10',
    strand: 'academic',
    duration: MID,
    complexity: 'Hypothesis and fair test; about 15 interaction points',
    summary:
      'Rain, air, garden chemicals or salty road spray? Test competing explanations for a rusting gate and recommend prevention grounded in evidence.',
    situation:
      'The school needs to repair a rusting gate. Students offer competing explanations: rain, air exposure, nearby garden chemicals or salty road spray. The maintenance team wants a recommendation grounded in evidence rather than a guess.',
    mission:
      'Investigate corrosion, test a hypothesis by controlling variables and recommend a prevention approach.',
    howItPlays: [
      'Choose a hypothesis about moisture, oxygen and the possible effect of dissolved salts or other environmental conditions.',
      'Design a fair comparison using simulated samples, changing one relevant condition at a time and identifying a suitable control.',
      'Interpret results from samples exposed to different conditions and distinguish evidence from confounding factors.',
      'Recommend a prevention measure and explain why surface preparation and the choice of protective coating matter.',
      'Review a new observation and decide whether it changes the conclusion or calls for another test.',
    ],
    learningOutcomes: [
      'Explain corrosion at a grade-appropriate level.',
      'Design a controlled comparison and interpret evidence.',
      'Connect a scientific finding to a practical maintenance recommendation.',
    ],
    interactionDesign:
      'An experiment board records variables, controls and results. Choices determine which evidence is available and whether the learner can support a defensible recommendation.',
    debrief:
      'Shows how moisture and oxygen contribute to rusting and how dissolved salts can influence corrosion. Scores control of variables, interpretation and appropriate limits on the claim.',
    guardrails:
      'Does not imply that one simulated test proves the cause of the real gate’s corrosion. The chemistry explanation is aligned to the selected board syllabus.',
    icon: 'wrench',
    pages: 'pp. 11–12',
  }),
  school({
    code: 'A7',
    slug: 'the-electricity-bill-that-does-not-add-up',
    title: 'The Electricity Bill That Does Not Add Up',
    area: 'Physics and mathematics',
    band: '9-10',
    strand: 'academic',
    duration: MID,
    complexity: 'Data analysis and trade-offs; about 15 interaction points',
    summary:
      'The school’s bill has risen despite a similar timetable. Use device ratings, usage hours and meter readings to investigate why.',
    situation:
      'The school’s electricity bill has increased despite a similar timetable and student population. The student energy team gets device ratings, usage-hour estimates and meter readings, and must recommend a credible way to investigate the increase.',
    mission:
      'Apply power and electrical-energy concepts to estimate consumption, test explanations and compare conservation options.',
    howItPlays: [
      'Inspect power ratings and daily use for fans, lights, computers and air conditioners, and identify which missing information would improve an estimate.',
      'Calculate approximate energy use in kilowatt-hours for the stated usage patterns.',
      'Compare changes in operating habits with an option to replace a high-use device with a more efficient model.',
      'Receive revised meter readings and decide whether the original explanation is supported.',
      'Present a recommendation distinguishing energy use, tariff changes and total bill cost.',
    ],
    learningOutcomes: [
      'Calculate energy use from power and time.',
      'Interpret a dataset and test competing explanations.',
      'Explain the difference between reduced consumption and lower cost.',
    ],
    interactionDesign:
      'A school energy dashboard lets the learner change usage hours and device efficiency. Meter readings and tariffs remain separate variables to avoid misleading conclusions.',
    debrief:
      'Shows calculations with units, identifies assumptions and explains why bill changes may reflect more than consumption alone. Credit is awarded for explicitly noting uncertainty.',
    guardrails:
      'Uses fictional but plausible figures. Simulated estimates are not presented as an engineering audit or bill forecast.',
    icon: 'zap',
    pages: 'pp. 12–13',
  }),
  school({
    code: 'A8',
    slug: 'the-fish-pond-mystery',
    title: 'The Fish Pond Mystery',
    area: 'Biology and environmental science',
    band: '9-10',
    strand: 'academic',
    duration: MID,
    complexity: 'Evidence investigation; about 15 interaction points',
    summary:
      'Fish are found dead in a neighbourhood pond after heavy rain. Residents blame litter, algae or runoff — investigate without jumping to conclusions.',
    situation:
      'Several fish are found dead in a neighbourhood pond after heavy rain. Residents blame litter, algae or fertiliser runoff, but the initial evidence is incomplete. The student team must investigate possible causes without jumping to conclusions.',
    mission:
      'Use ecosystem knowledge and environmental data to develop and evaluate hypotheses about a water-quality problem.',
    howItPlays: [
      'Examine observations about rainfall, algae, water appearance, dissolved oxygen and nearby land use.',
      'Select additional measurements that could distinguish competing explanations and explain why they are relevant.',
      'Interpret a small dataset and consider how nutrient enrichment, algal growth and oxygen availability may be related.',
      'Choose an immediate investigation and longer-term prevention proposal that matches the strength of the evidence.',
      'Explain what additional evidence would be needed before making a firm claim about the cause.',
    ],
    learningOutcomes: [
      'Connect nutrient enrichment, algae and oxygen to aquatic ecosystem health.',
      'Select relevant evidence to distinguish hypotheses.',
      'Communicate a provisional conclusion with appropriate uncertainty.',
    ],
    interactionDesign:
      'Evidence cards are unlocked by the learner’s investigative choices. A stronger path is one that asks useful questions and avoids premature certainty.',
    debrief:
      'Explains plausible mechanisms without asserting a cause unsupported by the dataset. Scores hypothesis quality, evidence selection and clear communication of limitations.',
    guardrails:
      'All data are fictional. The exercise is not presented as a real environmental diagnosis; actual incidents require qualified sampling and investigation.',
    icon: 'fish',
    pages: 'pp. 13–14',
  }),
  school({
    code: 'A9',
    slug: 'the-survey-that-lied',
    title: 'The Survey That Lied',
    area: 'Mathematics and statistics',
    band: '9-10',
    strand: 'academic',
    duration: MID,
    complexity: 'Survey redesign; about 15 interaction points',
    summary:
      '“80 percent prefer online homework” — but the survey was posted online and barely reached students with limited connectivity. Redesign it.',
    situation:
      'A student council survey reports that 80 percent of students prefer online homework. The school is considering changing its homework policy, but the research team learns that the survey was posted in an online group and received very few responses from students with limited connectivity.',
    mission:
      'Identify sampling and wording bias, analyse percentages and design a more reliable survey before making a recommendation.',
    howItPlays: [
      'Inspect the original sampling method, response rate and question wording.',
      'Compare the original results with a more representative sample that includes students with different access conditions.',
      'Examine non-response and decide how it affects confidence in the headline result.',
      'Design a revised survey with a clear question, appropriate sampling and an achievable collection plan.',
      'Write a conclusion that reflects what the revised evidence supports and what remains unknown.',
    ],
    learningOutcomes: [
      'Recognise sampling bias and the limits of percentage summaries.',
      'Explain how question wording and non-response may distort results.',
      'Design a fairer survey and qualify a conclusion appropriately.',
    ],
    interactionDesign:
      'A sampling tool lets learners select participant groups and see synthetic results change. The dashboard shows sample composition and response rates alongside the headline percentage.',
    debrief:
      'Compares convenience sampling with a more representative approach. Assesses method quality and interpretation rather than rewarding a preferred answer regardless of evidence.',
    guardrails:
      'Uses fictional data and avoids collecting actual student opinions or personal information unless the school separately approves the research.',
    icon: 'chart',
    pages: 'pp. 14–15',
  }),
  school({
    code: 'A10',
    slug: 'the-flooded-crossroads',
    title: 'The Flooded Crossroads',
    area: 'Geography and mathematics',
    band: '9-10',
    strand: 'academic',
    duration: MID,
    complexity: 'Map and budget solution; about 15 interaction points',
    summary:
      'A crossroads near school floods every monsoon. Use maps, rainfall data and a limited budget to reason about runoff and possible interventions.',
    situation:
      'A crossroads near the school floods repeatedly during monsoon. Residents disagree about the cause. The student team receives a map, rainfall observations, drain locations, surface types and a limited fictional budget for recommending further investigation and possible interventions.',
    mission:
      'Use spatial information and rainfall data to reason about runoff, drainage and possible interventions.',
    howItPlays: [
      'Explore a map of slope, drains, paved areas and low-lying spots to identify possible water pathways.',
      'Compare rainfall records and waterlogging observations from different locations.',
      'Evaluate options such as drain clearance, permeable surfaces or changes to runoff routes, noting possible limitations.',
      'Choose a proposal within a budget and decide which missing information matters before construction.',
      'Present a recommendation and explain why it is a hypothesis for planning rather than a guaranteed solution.',
    ],
    learningOutcomes: [
      'Interpret a map and environmental dataset together.',
      'Connect impermeable surfaces and drainage with runoff.',
      'Compare interventions while recognising cost and evidence limitations.',
    ],
    interactionDesign:
      'A neighbourhood map changes according to one intervention. Results are simplified and illustrative; learners compare outcomes rather than optimise a pretend engineering model as if it were exact.',
    debrief:
      'Explains the logic of runoff and drainage, identifies trade-offs and lists the surveys or professional assessments that real works would require.',
    guardrails:
      'Simulated flood maps are not presented as accurate forecasts. No learner-generated proposal is treated as engineering advice.',
    icon: 'rain',
    pages: 'pp. 15–16',
  }),

  // ───────────── Standards 9–10 · Non-academic ─────────────
  school({
    code: 'N6',
    slug: 'the-clean-up-day-that-changed-nothing',
    title: 'The Clean-up Day That Changed Nothing',
    area: 'Civic sense and systems thinking',
    band: '9-10',
    strand: 'non-academic',
    duration: MID,
    complexity: 'Stakeholders and budget; about 15 interaction points',
    summary:
      'Students clean a street, and it is dirty again within two days. Find the underlying causes and build a fair, practical system.',
    situation:
      'Students clean a neighbourhood street, but it becomes dirty again within two days. Residents, shopkeepers, sanitation workers and local organisers have different explanations and constraints. A small fictional budget is available for improving the system.',
    mission:
      'Identify underlying causes and build a practical, fair response that combines individual behaviour with reliable public services.',
    howItPlays: [
      'Review evidence about bin placement, collection timings, waste segregation and where litter accumulates.',
      'Listen to simulated stakeholder views and identify which claims require verification.',
      'Allocate the budget between collection coordination, awareness, segregation and bin placement.',
      'Launch the plan and review follow-up data after a month; some actions work while another has an unintended problem.',
      'Revise the approach and explain who owns each ongoing responsibility.',
    ],
    learningOutcomes: [
      'Distinguish a one-day activity from a sustainable system.',
      'Consider stakeholder needs and use resources transparently.',
      'Evaluate outcomes and adapt a plan using feedback.',
    ],
    interactionDesign:
      'A community dashboard tracks recurring litter, collection reliability, participation and budget. Multiple approaches can succeed if their logic and responsibilities are sound.',
    debrief:
      'Compares short-term cleanliness with durable waste management. Scores diagnosis, stakeholder consideration, feasibility and willingness to revise.',
    guardrails:
      'Avoids blaming sanitation workers or residents as a group. Portrays constraints realistically and keeps the local authority response fictional.',
    icon: 'recycle',
    pages: 'pp. 16–17',
  }),
  school({
    code: 'N7',
    slug: 'the-video-everyone-believes',
    title: 'The Video Everyone Believes',
    area: 'Digital citizenship',
    band: '9-10',
    strand: 'non-academic',
    duration: MID,
    complexity: 'Source checking and response; about 15 interaction points',
    summary:
      'A short clip of a student spreads through class groups and the response is starting to cause harm. Verify the context before acting.',
    situation:
      'A short video apparently showing a school student behaving badly spreads through class groups. Its caption says the incident happened that morning. Context is uncertain, and the online response is beginning to harm the student involved.',
    mission:
      'Verify media context, protect privacy and respond responsibly without amplifying unverified or harmful content.',
    howItPlays: [
      'Choose an initial response and identify which facts would need verification before sharing or commenting.',
      'Inspect timestamps, the original source and an independent contextual account.',
      'Discover that the clip may have been edited or stripped of important context. Decide what conclusions remain justified.',
      'Choose how to correct the record and raise concerns through appropriate channels without spreading the content further.',
      'Review the effect of your response on reach, privacy and the ability to resolve the issue fairly.',
    ],
    learningOutcomes: [
      'Evaluate source provenance and context.',
      'Recognise how editing and captions can mislead.',
      'Reduce harm while correcting inaccurate claims.',
    ],
    interactionDesign:
      'A simulated feed changes its reach and responses depending on forwarding, verification and reporting. Superficial visual inspection is not treated as conclusive proof.',
    debrief:
      'Shows the difference between a verified fact, a plausible inference and an unsupported claim. Explains responsible reporting and why reposting can amplify harm.',
    guardrails:
      'Uses fictional people and non-humiliating content. Avoids realistic defamatory allegations or identifiable images.',
    icon: 'video',
    pages: 'pp. 17–18',
  }),
  school({
    code: 'N8',
    slug: 'the-group-project-ghost',
    title: 'The Group Project Ghost',
    area: 'Collaboration and accountability',
    band: '9-10',
    strand: 'non-academic',
    duration: MID,
    complexity: 'Team negotiation; about 15 interaction points',
    summary:
      'Due tomorrow: two students did most of the work, one missed meetings and another submitted an unreliable section. Build a fair plan that still meets the deadline.',
    situation:
      'A group assignment is due tomorrow. Two students have done most of the work, one group member missed meetings, and another submitted an unreliable section at the last minute. The team needs a fair plan that can still meet the deadline.',
    mission:
      'Practise assertive communication, shared ownership and fair workload renegotiation under time pressure.',
    howItPlays: [
      'Choose whether to confront the group member, redo the work without discussion or renegotiate tasks and scope.',
      'Additional context for the missed meetings is revealed — without assuming that context removes the impact on the team.',
      'Create a short plan with owners, deliverables and check-in times.',
      'Decide how to document contributions and raise an unresolved fairness concern with the teacher if needed.',
      'Review the team outcome and the quality of communication, not only the submitted grade.',
    ],
    learningOutcomes: [
      'Use direct and respectful communication.',
      'Balance empathy with accountability.',
      'Make ownership and deadlines explicit.',
    ],
    interactionDesign:
      'A team timeline shows task completion and bottlenecks. Dialogue choices affect trust and whether the remaining work is realistically allocated.',
    debrief:
      'Compares avoidance, blame and constructive renegotiation. Scores clarity, fairness, listening and follow-through; public shaming is not rewarded.',
    guardrails:
      'Allows an adult-support route where conflict is persistent, discriminatory or unsafe. Students are not required to resolve serious issues alone.',
    icon: 'clipboard',
    pages: 'p. 18',
  }),
  school({
    code: 'N9',
    slug: 'the-online-sale-countdown',
    title: 'The Online Sale Countdown',
    area: 'Consumer awareness and digital safety',
    band: '9-10',
    strand: 'non-academic',
    duration: MID,
    complexity: 'Offer evaluation; about 15 interaction points',
    summary:
      'A dramatic headphone discount, a countdown timer and a payment link from an unverified account. Evaluate the real cost and the risks.',
    situation:
      'A limited-time deal advertises headphones at a dramatic discount. A countdown timer, delivery fee and restrictive return conditions complicate the offer. An unverified account then sends a payment link and asks for extra information.',
    mission:
      'Evaluate marketing claims and total cost while recognising pressure tactics and protecting personal and payment information.',
    howItPlays: [
      'Compare the displayed price, a plausible regular price, delivery cost and return conditions.',
      'Choose whether to buy immediately or check a second source and compare alternatives.',
      'Review a suspicious payment request and identify the risk of using an unverified link or sharing sensitive data.',
      'Decide whether the purchase fits the available budget and what checks are still needed.',
      'Explain which information was material to the decision and which elements created artificial urgency.',
    ],
    learningOutcomes: [
      'Calculate total cost rather than focusing on a discount badge.',
      'Recognise urgency tactics and suspicious payment requests.',
      'Make a considered consumer choice.',
    ],
    interactionDesign:
      'A fictional shopping interface updates cost and available information as the learner inspects the offer. The safest action never depends on guessing a brand or platform.',
    debrief:
      'Provides a consumer checklist covering seller identity, total price, payment safety and return terms. Explains that pressure is a reason to pause, not proof on its own of fraud.',
    guardrails:
      'Does not link to real offers or collect payment information. Uses fictional sellers and synthetic information.',
    icon: 'timer',
    pages: 'p. 19',
  }),
  school({
    code: 'N10',
    slug: 'the-exam-paper-rumour',
    title: 'The Exam Paper Rumour',
    area: 'Integrity and peer pressure',
    band: '9-10',
    strand: 'non-academic',
    duration: MID,
    complexity: 'Ethical uncertainty; about 15 interaction points',
    summary:
      'The evening before an exam, a student claims to have a leaked paper and classmates are forwarding it. Respond without spreading it or making unsupported accusations.',
    situation:
      'On the evening before an exam, a student claims to have a leaked paper. Some classmates are forwarding it and others are unsure whether the claim is genuine. The learner must respond without spreading the material or making unsupported accusations.',
    mission:
      'Practise academic integrity, resisting peer pressure and escalating a concern responsibly when facts are uncertain.',
    howItPlays: [
      'Assess what is known and unknown about the material, and decide whether to access, forward or disengage from it.',
      'Consider the consequences for fairness, other students and the credibility of the assessment.',
      'Choose whether and how to ask a trusted school authority for guidance, preserving relevant information without further circulation.',
      'Respond to a friend who says everyone is using it, without making a public accusation against a named student.',
      'Review the outcome and explain why a fair process is better than rumour-driven punishment.',
    ],
    learningOutcomes: [
      'Apply integrity principles under peer pressure.',
      'Distinguish suspicion from verified evidence.',
      'Choose a proportionate route for reporting concerns.',
    ],
    interactionDesign:
      'Branches affect trust, fairness and how widely the unverified material spreads. The debrief distinguishes an ethical response from a claim the learner cannot substantiate.',
    debrief:
      'Discusses the harms of cheating and of unsupported accusations, and identifies a clear, confidential and proportionate reporting route approved by the school.',
    guardrails:
      'Never provides real leaked papers, exam content or a mechanism to upload them. Uses fictional materials and the school’s approved reporting policy.',
    icon: 'file-warning',
    pages: 'pp. 19–20',
  }),

  // ───────────── Standards 11–12 · Academic ─────────────
  school({
    code: 'A11',
    slug: 'is-the-cleaning-product-really-better',
    title: 'Is the Cleaning Product Really Better?',
    area: 'Chemistry',
    band: '11-12',
    strand: 'academic',
    duration: LONG,
    complexity: 'Quantitative analysis and recommendation; about 20 interaction points',
    summary:
      'Two fictional products for removing mineral deposits from lab glassware: one claims better performance at a higher price. Test the claim with quantitative evidence.',
    situation:
      'A school is comparing two fictional products for removing mineral deposits from laboratory glassware. One supplier claims better performance at a higher price; another is cheaper. The student science team receives label information and simulated, teacher-approved test data.',
    mission:
      'Use concentration and relevant quantitative evidence to compare product claims, cost and suitability, while acknowledging what the test cannot prove.',
    howItPlays: [
      'Inspect product information, stated concentrations and the supplier’s performance claims. Identify information that is missing or not comparable.',
      'Review simulated titration or other curriculum-appropriate lab data and select the relevant calculation or comparison.',
      'Calculate or compare an appropriate measure of acidity and the amount of product used per task, given the data available.',
      'Compare total cost, suitability and evidence quality rather than selecting solely on price or a marketing claim.',
      'Recommend a product for the specified purpose and state at least one limitation or test still needed.',
      'Review new test data and decide whether the recommendation should change.',
    ],
    learningOutcomes: [
      'Apply quantitative chemistry to a practical evaluation.',
      'Interpret evidence and distinguish measured properties from marketing claims.',
      'Make a recommendation that explicitly states assumptions and limits.',
    ],
    interactionDesign:
      'A virtual lab combined with a procurement decision screen. Variables, units and calculation steps are stated clearly; new evidence is revealed at decision points.',
    debrief:
      'Shows the correct interpretation of the data, any valid alternative conclusion and how price, performance and suitability differ. Scores calculation, evidence use and qualified reasoning.',
    guardrails:
      'No mixing household cleaning products. Uses fictional products and teacher-approved lab methods; all simulated results must be chemically coherent and aligned to the chosen curriculum.',
    icon: 'beaker',
    pages: 'pp. 20–21',
  }),
  school({
    code: 'A12',
    slug: 'should-the-school-go-solar',
    title: 'Should the School Go Solar?',
    area: 'Physics and mathematics',
    band: '11-12',
    strand: 'academic',
    duration: LONG,
    complexity: 'Multi-variable model; about 20 interaction points',
    summary:
      'Management is considering rooftop solar. Build a simplified generation model, test it against changing assumptions and recommend transparently.',
    situation:
      'School management is considering rooftop solar and asks the student energy team to estimate what share of demand it might cover. Students receive synthetic load profiles, roof-area constraints, panel ratings, generation assumptions, tariffs and indicative costs.',
    mission:
      'Build and evaluate a simplified solar-generation model, test sensitivity to changing conditions and make a recommendation with transparent assumptions.',
    howItPlays: [
      'Inspect the electricity-demand profile, available roof area and stated panel rating. Identify important missing measurements.',
      'Choose a provisional system size and calculate an initial generation estimate using the supplied assumptions.',
      'Adjust for shading, orientation, seasonality and system losses, observing how predicted output changes.',
      'Compare two options by expected energy generation, cost and match to the school’s load pattern.',
      'Examine an updated tariff or cost assumption and determine whether the recommendation remains robust.',
      'Present a recommendation with assumptions, uncertainty and information needed for a real feasibility study.',
    ],
    learningOutcomes: [
      'Apply power and energy concepts to an infrastructure decision.',
      'Understand how assumptions and losses affect a model.',
      'Communicate a numerical recommendation without overstating precision.',
    ],
    interactionDesign:
      'A solar-planning dashboard updates predicted output and illustrative payback when system size or assumptions change, with explanatory units and a visible assumptions panel.',
    debrief:
      'Reviews the calculation chain, sensitivity to assumptions and limits of simplified payback. Rewards a transparent, defensible estimate, not false precision.',
    guardrails:
      'All data are simulated for learning and labelled as such. The result is not an engineering assessment, financial advice or a real installation quote.',
    icon: 'sun',
    pages: 'pp. 21–22',
  }),
  school({
    code: 'A13',
    slug: 'the-antibiotic-resistance-puzzle',
    title: 'The Antibiotic Resistance Puzzle',
    area: 'Biology',
    band: '11-12',
    strand: 'academic',
    duration: LONG,
    complexity: 'Population model and evidence; about 20 interaction points',
    summary:
      'A fictional dataset shows a bacterial population becoming less susceptible to an antibiotic over several years. Explain the pattern with population thinking.',
    situation:
      'Students receive a fictional public-health dataset showing that a bacterial population has become less susceptible to an antibiotic over several years. They must explain the pattern, consider competing explanations and design an evidence-based public-awareness response.',
    mission:
      'Apply natural selection and population thinking to antibiotic resistance while differentiating population-level explanation from personal medical advice.',
    howItPlays: [
      'Compare simplified population data from several time points and identify the pattern in susceptibility.',
      'Choose which additional evidence could help explain the trend, such as treatment exposure patterns or laboratory methodology.',
      'Explore a simulation of variation and selection under different exposure conditions.',
      'Consider alternative explanations or confounders and qualify the conclusion.',
      'Design a public-awareness message promoting appropriate antibiotic use, hygiene and consultation with qualified health professionals.',
      'Review the proposed message for scientific accuracy and unintended overstatement.',
    ],
    learningOutcomes: [
      'Explain how variation and selection can change a population.',
      'Interpret biological data and identify alternative explanations.',
      'Translate science into accurate public-health communication.',
    ],
    interactionDesign:
      'A population model shows changes in the distribution of susceptibility. The learner adjusts assumptions and compares trends rather than controlling an individual patient’s treatment.',
    debrief:
      'Explains selection at the population level, discusses uncertainty in the dataset and assesses whether the awareness message is accurate, understandable and appropriately bounded.',
    guardrails:
      'Not a diagnostic or treatment tool. Does not recommend medication changes or imply that a simulation predicts an individual’s medical outcome.',
    icon: 'microscope',
    pages: 'pp. 22–23',
  }),
  school({
    code: 'A14',
    slug: 'which-data-can-we-trust',
    title: 'Which Data Can We Trust?',
    area: 'Mathematics and data science',
    band: '11-12',
    strand: 'academic',
    duration: LONG,
    complexity: 'Data-quality investigation; about 20 interaction points',
    summary:
      'A report claims a new timetable improved attendance by 12 percent. Verify it against missing entries, changing classes and seasonality before it is published.',
    situation:
      'A school report claims that a new timetable improved attendance by 12 percent. The student research team is asked to verify the claim before it appears in the annual report. The dataset contains missing entries, changing class composition and a possible seasonal effect.',
    mission:
      'Evaluate data quality, choose appropriate comparisons and decide whether the headline claim is supported.',
    howItPlays: [
      'Inspect the pre- and post-change records and identify missing or inconsistent values.',
      'Choose how to handle missing data and state the consequences of that choice.',
      'Compare relevant groups or periods while considering changes in class composition and seasonality.',
      'Choose a suitable statistic and visualisation that do not conceal the variation in the data.',
      'Write a conclusion that separates association from causation and identifies the evidence still needed.',
      'Review a stakeholder request to use the strongest headline possible and decide whether it fairly represents the findings.',
    ],
    learningOutcomes: [
      'Assess data completeness and comparability.',
      'Choose and interpret appropriate statistical summaries.',
      'Communicate uncertainty and avoid unsupported causal claims.',
    ],
    interactionDesign:
      'A dataset explorer supports filtering, charting and comparing groups, and preserves a record of the learner’s analytical choices so the debrief can show how each affected the conclusion.',
    debrief:
      'Compares the result under reasonable analytic choices. Scores data handling, selection of comparison, interpretation and transparency about limitations.',
    guardrails:
      'Uses synthetic, non-identifiable school data. Students are not asked to upload or analyse actual classmates’ attendance or sensitive records.',
    icon: 'database',
    pages: 'pp. 23–24',
  }),
  school({
    code: 'A15',
    slug: 'the-archive-dispute',
    title: 'The Archive Dispute',
    area: 'History and social science',
    band: '11-12',
    strand: 'academic',
    duration: LONG,
    complexity: 'Conflicting sources; about 20 interaction points',
    summary:
      'A newspaper, an official report, a photograph and oral histories partly conflict. Build a credible exhibition narrative without pretending every question is resolved.',
    situation:
      'A local heritage committee is preparing an exhibition about how a neighbourhood changed over time. An old newspaper, an official report, a photograph and oral histories offer accounts that partly conflict. The learner must build a credible narrative without pretending every question has been resolved.',
    mission:
      'Evaluate sources for origin, context, perspective and corroboration, then communicate a historically responsible conclusion.',
    howItPlays: [
      'Open each source and inspect its author, date, purpose, audience and available context.',
      'Mark which statements are directly supported, inferred or not supported by the source.',
      'Compare contradictions and decide which additional source or corroboration would be most useful.',
      'Construct a timeline and select the claims that are sufficiently supported for the exhibition.',
      'Draft a narrative that acknowledges disagreement and distinguishes established evidence from open questions.',
      'Respond to a stakeholder who asks for a simpler, more certain story than the evidence permits.',
    ],
    learningOutcomes: [
      'Evaluate historical sources critically.',
      'Corroborate claims across materials with different perspectives.',
      'Communicate an evidence-based narrative with transparent uncertainty.',
    ],
    interactionDesign:
      'A digital archive supports opening, comparing and annotating fictional documents. Source choices affect what the learner can substantiate, rather than revealing a single simplistic moral answer.',
    debrief:
      'Shows how source origin, purpose and context affect interpretation. Scores corroboration and quality of argument rather than forcing one interpretation where evidence genuinely allows more than one.',
    guardrails:
      'Uses fictional or properly licensed material. If real history is used, it requires factual review, culturally sensitive presentation and balanced sourcing.',
    icon: 'landmark',
    pages: 'pp. 24–25',
  }),

  // ───────────── Standards 11–12 · Non-academic ─────────────
  school({
    code: 'N11',
    slug: 'the-rs-50000-virtual-portfolio',
    title: 'The Rs 50,000 Virtual Portfolio',
    area: 'Financial literacy',
    band: '11-12',
    strand: 'non-academic',
    duration: LONG,
    complexity: 'Portfolio and event-driven decisions; about 20 interaction points',
    summary:
      'Rs 50,000 in virtual money, a five-year goal and fictional assets whose prices move with simulated news. Learn risk, diversification and fraud red flags.',
    situation:
      'A student investment club receives Rs 50,000 in virtual money and a fictional five-year goal. The available choices include fictional companies, a diversified investment option, bonds and cash. Prices change as the simulation presents market news and uncertainty.',
    mission:
      'Understand risk, diversification, time horizon and investment fraud while learning that a simulated return is not a promise about the future.',
    howItPlays: [
      'Choose a starting portfolio based on the goal, time horizon and stated ability to tolerate simulated losses.',
      'Compare concentration in one company with exposure spread across different assets and discuss the trade-off.',
      'Respond to a simulated earnings disappointment or broad market decline; choose whether to hold, rebalance or investigate further.',
      'Review a misleading online tip and decide what evidence and source checks are needed before acting.',
      'Review returns, volatility, largest loss, cash allocation and performance against an appropriate fictional benchmark.',
      'Write a short rationale explaining the final decision, the risks accepted and what could not be predicted.',
    ],
    learningOutcomes: [
      'Explain diversification and the relationship between risk and potential return.',
      'Consider goals, time horizon, liquidity and loss tolerance.',
      'Identify red flags in investment claims and distinguish simulation from prediction.',
    ],
    interactionDesign:
      'A paper-investing dashboard tracks a virtual wallet and fictional assets. Event-driven prices are deterministic or replayable for assessment, with transparent assumptions and a final performance report.',
    debrief:
      'Compares risk exposure and decision process, not only final profit. A lucky concentrated bet does not automatically score better than a soundly reasoned diversified plan.',
    guardrails:
      'No real-money trading, brokerage links, personalised investment advice or predictive promises. Uses fictional securities and educational data.',
    icon: 'trending',
    pages: 'pp. 25–26',
  }),
  school({
    code: 'N12',
    slug: 'your-first-independent-month',
    title: 'Your First Independent Month',
    area: 'Financial independence',
    band: '11-12',
    strand: 'non-academic',
    duration: LONG,
    complexity: 'Cash-flow planning; about 20 interaction points',
    summary:
      'A first month away from home on a fictional Rs 12,000 allowance — food, commuting, accommodation, data and an unexpected cost. Build a budget that works.',
    situation:
      'A student planning a first month away from home for a course or internship has a fictional monthly allowance of Rs 12,000. They need to plan food, commuting, accommodation contributions, mobile data and personal expenses, while preparing for an unexpected cost.',
    mission:
      'Build a workable budget, understand opportunity cost and evaluate basic borrowing and digital-payment risks.',
    howItPlays: [
      'Allocate the monthly allowance across essential, flexible and discretionary expenses, including a modest emergency reserve if feasible.',
      'Compare two phone purchase options by upfront cost, instalments, fees and consequences of missed payments.',
      'An unexpected expense arrives. Revise the budget without hiding a shortfall.',
      'Evaluate a tempting credit offer or promise of unusually high returns and identify missing or suspicious terms.',
      'Choose a final plan and explain the trade-offs made and what to do if the shortfall persisted.',
    ],
    learningOutcomes: [
      'Prepare a realistic cash-flow budget.',
      'Explain opportunity cost, saving and basic borrowing obligations.',
      'Recognise suspicious financial offers and protect personal information.',
    ],
    interactionDesign:
      'A monthly budget simulator tracks planned versus actual cash. Events change cash flow, and the learner can adjust spending categories while preserving essential needs.',
    debrief:
      'Displays cash remaining, planned saving, unavoidable costs and any debt obligation. Scores realism and adaptability rather than rewarding the most austere plan by default.',
    guardrails:
      'All products and terms are fictional or clearly illustrative. Does not collect real financial information or make personalised financial recommendations.',
    icon: 'wallet',
    pages: 'pp. 26–27',
  }),
  school({
    code: 'N13',
    slug: 'the-market-street-waste-challenge',
    title: 'The Market Street Waste Challenge',
    area: 'Civic leadership',
    band: '11-12',
    strand: 'non-academic',
    duration: LONG,
    complexity: 'Stakeholder negotiation; about 20 interaction points',
    summary:
      'A busy market street struggles with overflowing bins and mixed waste. Diagnose the problem, negotiate across stakeholders and propose a sustainable response.',
    situation:
      'A busy market street struggles with overflowing bins and mixed waste. Shopkeepers, residents, sanitation workers and local organisers have different needs and explanations. The student team receives a fictional budget and must propose a sustainable response.',
    mission:
      'Diagnose a shared civic problem, negotiate across stakeholders and use limited resources transparently.',
    howItPlays: [
      'Inspect waste volumes, collection schedules, bin locations and segregation practices; identify what the evidence does not show.',
      'Listen to stakeholders and record their constraints without assuming one group is solely responsible.',
      'Allocate a fictional budget among collection coordination, segregation, awareness and infrastructure changes.',
      'Present the plan and respond to realistic objections about cost, convenience and responsibility.',
      'Review a follow-up dataset showing partial results and one unintended consequence.',
      'Revise the plan, assign responsibilities and choose measures for continued monitoring.',
    ],
    learningOutcomes: [
      'Apply systems thinking to a public problem.',
      'Negotiate and explain resource-allocation choices.',
      'Monitor results and adapt a plan transparently.',
    ],
    interactionDesign:
      'A multi-stakeholder simulation tracks budget, service reliability, participation and waste outcomes. Choices create trade-offs rather than a single magic solution.',
    debrief:
      'Compares short-term clean-up activity with an operating system that can last. Scores evidence use, inclusion of stakeholders, feasibility and adaptation after feedback.',
    guardrails:
      'Represents public-service workers fairly and realistically. Not framed as a real municipal plan and uses no identifiable allegations about actual neighbourhoods.',
    icon: 'store',
    pages: 'pp. 27–28',
  }),
  school({
    code: 'N14',
    slug: 'the-deepfake-has-40000-views',
    title: 'The Deepfake Has 40,000 Views',
    area: 'AI and digital citizenship',
    band: '11-12',
    strand: 'non-academic',
    duration: LONG,
    complexity: 'Verification and harm reduction; about 20 interaction points',
    summary:
      'A convincing fabricated video involving a student is spreading fast. Respond without assuming that visual inspection alone proves whether it is genuine.',
    situation:
      'A convincing fabricated video involving a student spreads rapidly online. An anonymous account encourages reposting, and the affected student fears for their reputation and privacy. The learner must respond without assuming that visual inspection alone proves whether the video is genuine.',
    mission:
      'Evaluate uncertain digital media, protect privacy, avoid further harm and communicate responsibly.',
    howItPlays: [
      'Choose an initial response and separate what is known from what remains unverified.',
      'Inspect available provenance, contextual evidence and independent confirmation methods; identify the limits of each.',
      'Consider the consequences of downloading, reposting, publicly confronting people or contacting the affected student privately and respectfully.',
      'Choose a platform reporting or trusted-adult escalation route appropriate to the fictional situation.',
      'Draft a short correction that discourages further circulation without repeating the harmful content or exposing private details.',
      'Review how the response affected reach, privacy, support and the quality of verification.',
    ],
    learningOutcomes: [
      'Understand that generated or edited media can mislead.',
      'Distinguish verification clues from conclusive proof.',
      'Protect privacy and reduce harm while seeking appropriate support.',
    ],
    interactionDesign:
      'A simulated social feed tracks views and re-shares. The scenario rewards verification, privacy and careful reporting, not technical guesses about whether a face or voice looks real.',
    debrief:
      'Explains source provenance, uncertainty, reporting and the harm caused by re-circulation. Assesses whether the learner took defensible steps without overclaiming.',
    guardrails:
      'Uses fictional, non-identifiable characters and non-humiliating media. Does not create a realistic deepfake of a real student or teach impersonation techniques.',
    icon: 'scan',
    pages: 'pp. 28–29',
  }),
  school({
    code: 'N15',
    slug: 'the-college-fest-one-night-left',
    title: 'The College Fest, One Night Left',
    area: 'Leadership and project management',
    band: '11-12',
    strand: 'non-academic',
    duration: LONG,
    complexity: 'Budget, risk and stakeholder trade-offs; about 20 interaction points',
    summary:
      'The budget is nearly gone, a performer cancels and a sponsor proposes an activity that conflicts with safety or accessibility. Redesign the programme by morning.',
    situation:
      'A student team is organising a major school festival. The budget is nearly exhausted, a performer cancels and a sponsor proposes an activity that conflicts with the event’s safety or accessibility requirements. The team has to redesign the programme by the next morning.',
    mission:
      'Prioritise obligations, negotiate constraints and build a revised plan that protects safety, inclusion and the event’s core purpose.',
    howItPlays: [
      'Review the programme, budget, venue constraints and essential safety and accessibility needs.',
      'Compare replacement activities and decide which commitments can responsibly be changed or communicated.',
      'Respond when a team member suggests cutting a safety measure to preserve a headline attraction.',
      'Negotiate with the sponsor and reassign roles, timelines and communication responsibilities.',
      'Build a compact risk register with an owner, trigger and backup action for each major risk.',
      'Review the outcome against several measures: safety, inclusion, budget, attendance and team coordination.',
    ],
    learningOutcomes: [
      'Prioritise under time and resource constraints.',
      'Communicate changes transparently to stakeholders.',
      'Apply basic risk management and ethical judgement.',
    ],
    interactionDesign:
      'A live event dashboard tracks budget, programme slots, risks and task owners. Early shortcuts create later consequences, while good planning may still involve difficult trade-offs.',
    debrief:
      'Compares event success across multiple dimensions, not attendance alone. Scores prioritisation, communication, risk ownership, contingency planning and willingness to reject an unsafe proposal.',
    guardrails:
      'All event details are fictional. Offers no guidance for bypassing real safety requirements; school policy and applicable safety rules take precedence.',
    icon: 'calendar',
    pages: 'pp. 29–30',
  }),
]
