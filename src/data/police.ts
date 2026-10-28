import type { Simulation } from './types'

const SOURCE = 'InScene Police Training Scenario Library (PDF)'

export const policeSimulations: Simulation[] = [
  {
    id: 'police-01',
    code: '01',
    slug: 'fair-exam-march',
    title: 'Fair Exam March',
    category: 'police',
    area: 'Public Order',
    subtitle: 'Protest handling, de-escalation and proportionate force',
    duration: '25–40 min',
    summary:
      'A peaceful student march approaches a busy government-office junction. Coordinate a rights-respecting, safety-focused response.',
    situation:
      'A peaceful student march demanding a fair examination process approaches a busy government-office junction. Protest leaders want to submit a memorandum; commuters want the road reopened; some bystanders are frustrated. The learner acts as the responding officer coordinating an immediate, rights-respecting and safety-focused response.',
    setting:
      'Indian urban district, daytime. A crowd of approximately 80–120 people, traffic congestion, visible media, police personnel already on site, and a designated student representative. Crowd size and events are fictional design assumptions.',
    characters: [
      { role: 'Student organiser', note: 'Cooperative but under pressure from marchers.' },
      { role: 'Commuter and shopkeeper', note: 'Frustrated by blocked access.' },
      { role: 'Team colleague', note: 'Asks for instructions and reports crowd movement.' },
      { role: 'Media observer', note: 'Asks what steps police are taking.' },
    ],
    howItPlays: [
      'Receive a short dispatch and inspect a scene dashboard showing the march, traffic and nearby facilities.',
      'Speak with the organiser, colleague and affected public; identify priorities and verify information.',
      'Choose communication, coordination and crowd-management actions at timed decision points.',
      'Observe branching public reactions, scene-safety indicators and a structured after-action review.',
    ],
    decisionPoints: [
      'Initial assessment',
      'Engage the organiser',
      'Manage access',
      'Respond to provocation',
      'Close and document',
    ],
    branchOutcomes: [
      { label: 'Constructive resolution', text: 'Representatives are heard, critical access is restored and the crowd disperses safely.' },
      { label: 'Partial resolution', text: 'Access improves but rumours persist; the learner must communicate carefully and document unresolved risks.' },
      { label: 'Escalation risk', text: 'Poor communication triggers crowd anxiety; the debrief identifies missed de-escalation opportunities.' },
    ],
    learningOutcomes: [
      'Recognise lawful expression and public safety as simultaneous considerations.',
      'Practise calm, respectful communication with organisers and bystanders.',
      'Assess risks and use de-escalation before considering restrictive measures.',
      'Coordinate with team members, emergency access and traffic stakeholders.',
      'Record reasons for decisions and reflect on proportionality and consequences.',
    ],
    quotes: ['We need someone to hear us. We are not here to fight.', 'An ambulance needs the road. What is our next move?'],
    levels: [
      {
        id: 'basic',
        availability: 'documented',
        description:
          'One identifiable organiser, a peaceful crowd and manageable congestion. The learner practises active listening, negotiating safe access and explaining a practical next step. Consequences are visible but time pressure is modest.',
      },
      {
        id: 'advanced',
        availability: 'documented',
        description:
          'A false rumour spreads online; a small group starts pushing a barrier; one participant becomes unwell while an ambulance requests access. The learner must separate verified facts from rumours, prioritise medical access and prevent escalation without treating the entire crowd as hostile.',
      },
    ],
    icon: 'megaphone',
    imageKey: 'simulation.fair-exam-march',
    sourceReference: `${SOURCE}, Scenario 01/05, pp. 3–4`,
  },
  {
    id: 'police-02',
    code: '02',
    slug: 'complaint-at-the-front-desk',
    title: 'Complaint at the Front Desk',
    category: 'police',
    area: 'First Response',
    subtitle: 'Communication and complaint handling',
    duration: '8–10 min',
    summary:
      'A distressed resident reports a stolen phone after an earlier attempt to get help was dismissed. Lead a respectful, useful first interaction.',
    situation:
      'A distressed resident arrives at a police station to report a stolen phone and says a previous attempt to get help was dismissed. They are worried about private information and possible misuse of their accounts. The learner is the first officer at the reception desk and must conduct a respectful, useful initial interaction.',
    setting:
      'Station reception desk in an Indian city, afternoon. A small waiting area and another visitor in earshot. The complainant is anxious, speaks quickly and has partial details of the incident. The exact complaint handling process must be reviewed against local law and station SOPs.',
    characters: [
      { role: 'Complainant', note: 'Worried, impatient and unsure of procedure.' },
      { role: 'Desk colleague', note: 'Can assist with next steps.' },
      { role: 'Waiting visitor', note: 'Creates a privacy concern if sensitive details are discussed openly.' },
    ],
    howItPlays: [
      'The complainant describes the problem in emotionally charged but incomplete terms.',
      'The learner selects questions and responses in a dialogue-driven interface.',
      'The learner identifies urgent needs, captures relevant facts, explains the next procedural step and seeks appropriate assistance.',
      'The simulation shows changes in trust, information completeness and resolution clarity, followed by feedback.',
    ],
    decisionPoints: ['First response', 'Clarify facts', 'Manage privacy', 'Explain procedure', 'Confirm understanding'],
    branchOutcomes: [
      { label: 'Supportive intake', text: 'The person feels heard, key facts are captured and a clear next step is communicated.' },
      { label: 'Incomplete intake', text: 'Trust remains fragile because urgent or sensitive issues were overlooked.' },
      { label: 'Avoidable friction', text: 'Dismissive language or unrealistic promises reduce confidence and delay appropriate action.' },
    ],
    learningOutcomes: [
      'Demonstrate empathy and professional reception behaviour.',
      'Use open questions, clarification and reflective listening.',
      'Protect privacy while gathering a clear initial account.',
      'Recognise urgent safety or account-security concerns and route appropriately.',
      'Explain next steps accurately without making unsupported promises.',
    ],
    quotes: ['I have already explained this once. Is anyone going to help me?', 'There is private information on that phone. What should I do now?'],
    levels: [
      {
        id: 'basic',
        availability: 'documented',
        description:
          'A single complainant, limited facts and no competing emergency. Practise greeting, listening, clarification and a useful handoff within a short encounter.',
      },
      {
        id: 'advanced',
        availability: 'documented',
        description:
          'The complainant raises their voice, a companion interrupts and possible account misuse is disclosed. The learner manages privacy, urgency and expectations while keeping the interaction respectful.',
      },
    ],
    icon: 'messages',
    imageKey: 'simulation.complaint-at-the-front-desk',
    sourceReference: `${SOURCE}, Scenario 02/05, pp. 5–6`,
  },
  {
    id: 'police-03',
    code: '03',
    slug: 'domestic-safety-call',
    title: 'Domestic Safety Call',
    category: 'police',
    area: 'Community Response',
    subtitle: 'Safety assessment, sensitive communication and victim-centred response',
    duration: '15–20 min',
    durationProposed: true,
    summary:
      'A neighbour reports shouting from an apartment late in the evening. Assess immediate safety and communicate without judgment.',
    situation:
      'A neighbour reports shouting from an apartment late in the evening. At the door, one adult says everything is fine while another appears frightened. A young child is present. The learner must assess immediate safety, communicate without judgment and choose an appropriate support and escalation pathway.',
    setting:
      'Residential apartment building, evening. Conflicting accounts, limited privacy, a concerned neighbour and an unsettled child. The scenario intentionally avoids assuming guilt based only on appearances. Laws, mandatory actions and support pathways require local subject-matter review.',
    characters: [
      { role: 'Adult resident A', note: 'Guarded and wants the officers to leave.' },
      { role: 'Adult resident B', note: 'Anxious and initially reluctant to speak.' },
      { role: 'Child', note: 'Present but should not be made responsible for adult decisions.' },
      { role: 'Neighbour', note: 'Provides an initial account but may not know the full context.' },
    ],
    howItPlays: [
      'Receive a welfare-related dispatch with limited reliable information.',
      'Assess visible immediate hazards and decide how to create safe conditions for speaking.',
      'Interact separately and respectfully where safe; ask about injuries, urgent support and immediate needs.',
      'Choose a safe, appropriate follow-up and explain the rationale in the debrief.',
    ],
    decisionPoints: ['Arrival risk check', 'Communication setting', 'Listen and clarify', 'Child present', 'Next steps'],
    branchOutcomes: [
      { label: 'Safer response', text: 'Immediate needs are identified, relevant support is offered and next steps are documented.' },
      { label: 'Incomplete response', text: 'An overlooked safety cue requires reconsideration in the after-action review.' },
      { label: 'Harmful communication', text: 'Assumptions or public questioning reduce openness and raise potential risk.' },
    ],
    learningOutcomes: [
      'Prioritise immediate safety and urgent medical attention.',
      'Avoid blaming or coercive questions when someone may be vulnerable.',
      'Recognise the importance of privacy, dignity and autonomy.',
      'Separate observed facts from assumptions and second-hand statements.',
      'Identify appropriate documentation, referrals and supervisory support.',
    ],
    quotes: ['Please do not ask me all of this while everyone is listening.', 'I heard shouting, but I did not see what happened.'],
    levels: [
      {
        id: 'basic',
        availability: 'documented',
        description:
          'No apparent immediate physical danger. Two adults provide different accounts; the learner focuses on respectful engagement, private fact gathering when safe and identification of support needs.',
      },
      {
        id: 'advanced',
        availability: 'documented',
        description:
          'One adult becomes increasingly controlling, the child is distressed, and a potential injury is disclosed. The learner must recognise changing risk, protect vulnerable persons and request appropriate assistance without escalating the situation through careless language.',
      },
    ],
    icon: 'home',
    imageKey: 'simulation.domestic-safety-call',
    sourceReference: `${SOURCE}, Scenario 03/05, pp. 7–8`,
  },
  {
    id: 'police-04',
    code: '04',
    slug: 'digital-payment-fraud-report',
    title: 'Digital Payment Fraud Report',
    category: 'police',
    area: 'Cyber First Response',
    subtitle: 'Cyber-fraud intake, urgency and evidence-aware guidance',
    duration: '12–18 min',
    durationProposed: true,
    summary:
      'A small-business owner lost money to a caller posing as payment support. Establish the timeline and guide them to authorised reporting.',
    situation:
      'A small-business owner reports losing money after following instructions from a caller posing as payment support. The transfer happened recently; several messages and transaction details are available. The learner must respond without blaming the victim, establish the timeline and direct the person toward urgent authorised reporting and account-protection actions.',
    setting:
      'Police help desk with digital evidence on the complainant’s phone, an active sense of urgency and incomplete transaction details. The simulation does not instruct officers to promise fund recovery or share unverified cybercrime procedures.',
    characters: [
      { role: 'Business owner', note: 'Embarrassed, anxious and worried about further loss.' },
      { role: 'Accompanying relative', note: 'Offers advice that may be inaccurate.' },
      { role: 'Cyber-response liaison', note: 'Available for appropriate escalation and guidance.' },
    ],
    howItPlays: [
      'A complainant describes a suspicious payment and shows recent messages.',
      'The learner gathers a timeline and establishes whether other accounts or contacts are at immediate risk.',
      'The learner chooses privacy-respecting evidence handling and an authorised reporting / escalation route.',
      'Branches show whether urgent concerns were identified and whether the person received clear, non-misleading guidance.',
    ],
    decisionPoints: ['Understand the timeline', 'Address immediate concerns', 'Handle evidence', 'Manage misinformation', 'Close the intake'],
    branchOutcomes: [
      { label: 'Effective intake', text: 'Key facts and potential urgent risks are identified and the complainant is directed appropriately.' },
      { label: 'Missed urgency', text: 'The learner overlooks further account exposure or fails to offer a practical next step.' },
      { label: 'Privacy lapse', text: 'Unnecessary sharing of sensitive details creates a new risk.' },
    ],
    learningOutcomes: [
      'Recognise that potential digital-payment fraud may be time-sensitive.',
      'Gather accurate transaction, contact and communication details without unnecessary exposure of sensitive data.',
      'Avoid victim-blaming and unrealistic recovery promises.',
      'Direct complainants to verified reporting and account-security channels.',
      'Preserve the distinction between original evidence and officer notes.',
    ],
    quotes: ['The transfer was only a little while ago. Is there anything I can do now?', 'I will forward all the screenshots to our group so people can help.'],
    levels: [
      {
        id: 'basic',
        availability: 'documented',
        description:
          'A single suspected fraudulent transaction, a cooperative complainant and an intact message history. The learner prioritises timeline, empathy, information completeness and a clear referral.',
      },
      {
        id: 'advanced',
        availability: 'documented',
        description:
          'A second suspicious message arrives while the interview is underway, the relative wants to post screenshots publicly and the complainant is unsure whether another account is compromised. The learner handles competing advice and privacy risks.',
      },
    ],
    icon: 'smartphone',
    imageKey: 'simulation.digital-payment-fraud-report',
    sourceReference: `${SOURCE}, Scenario 04/05, pp. 9–10`,
  },
  {
    id: 'police-05',
    code: '05',
    slug: 'crash-at-a-busy-junction',
    title: 'Crash at a Busy Junction',
    category: 'police',
    area: 'Incident Response',
    subtitle: 'Emergency priorities, crowd communication and scene coordination',
    duration: '15–25 min',
    durationProposed: true,
    summary:
      'A two-wheeler and a delivery vehicle collide at a busy junction. Balance immediate care, public safety and responder access.',
    situation:
      'A two-wheeler and a delivery vehicle collide at a busy junction. One rider appears injured, traffic is building and onlookers are filming. The learner is the first officer to arrive and must balance immediate care, public safety, access for responders and appropriate documentation.',
    setting:
      'Indian city intersection during a busy afternoon. Emergency responders have been alerted but are not yet on scene. Witness accounts differ; a delivery driver is shaken and pedestrians are gathering near traffic.',
    characters: [
      { role: 'Injured rider', note: 'Needs immediate professional medical assessment.' },
      { role: 'Delivery driver', note: 'Anxious and worried about blame.' },
      { role: 'Witness', note: 'Gives an incomplete and possibly biased account.' },
      { role: 'Team colleague', note: 'Can manage a defined safety task.' },
      { role: 'Bystander', note: 'Concerned, recording the event and asking questions.' },
    ],
    howItPlays: [
      'Arrive to a scene with visual hazard indicators, an injured person and obstructed traffic.',
      'Prioritise scene safety and prompt medical assistance; delegate suitable tasks.',
      'Communicate with involved persons and witnesses without prejudging fault.',
      'Choose a safe documentation and handover plan; receive feedback on changing conditions.',
    ],
    decisionPoints: ['Initial priority', 'Scene safety', 'Delegation', 'Witness handling', 'Handover'],
    branchOutcomes: [
      { label: 'Safe stabilisation', text: 'Responders gain access, hazards are managed and a clear factual handover occurs.' },
      { label: 'Delayed response', text: 'A missed safety priority leads to renewed congestion or exposure to hazards.' },
      { label: 'Unreliable account', text: 'Premature judgments create a confused narrative, corrected during the debrief.' },
    ],
    learningOutcomes: [
      'Prioritise life safety and medical support over administrative convenience.',
      'Identify traffic, crowd and secondary-incident risks.',
      'Coordinate clear roles and access for emergency responders.',
      'Communicate neutrally with witnesses and those involved.',
      'Understand the importance of contemporaneous, accurate scene records.',
    ],
    quotes: ['Someone needs to help the rider. The traffic is still moving.', 'Everyone is blaming me. No one has asked what happened.'],
    levels: [
      {
        id: 'basic',
        availability: 'documented',
        description:
          'The injury is visible, traffic is slow but manageable, and one colleague is available. The learner practises prioritisation, scene communication and a clear handover.',
      },
      {
        id: 'advanced',
        availability: 'documented',
        description:
          'An impatient driver attempts to move through the crowd; onlookers dispute the facts; a second vehicle arrives near the hazard zone. The learner must revisit risk priorities, avoid blame-driven distractions and respond to changes.',
      },
    ],
    icon: 'traffic',
    imageKey: 'simulation.crash-at-a-busy-junction',
    sourceReference: `${SOURCE}, Scenario 05/05, pp. 11–12`,
  },
]
