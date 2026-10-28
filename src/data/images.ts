/** Finished InScene artwork; URLs support GitHub Pages subpaths. */
export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
  srcSet?: string
}

export const imageRegistry: Partial<Record<string, ImageAsset>> = {
  "home.police-category": {
    src: `${import.meta.env.BASE_URL}images/homepage/police-category.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/homepage/police-category-800.webp 800w, ${import.meta.env.BASE_URL}images/homepage/police-category.webp 1600w`,
    alt: "Two police officers listen respectfully to a resident in a quiet station courtyard.",
    width: 1600, height: 900,
  },
  "home.school-category": {
    src: `${import.meta.env.BASE_URL}images/homepage/school-category.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/homepage/school-category-800.webp 800w, ${import.meta.env.BASE_URL}images/homepage/school-category.webp 1600w`,
    alt: "Four students discuss a practical science investigation at a school courtyard table.",
    width: 1600, height: 900,
  },
  "simulation.fair-exam-march": {
    src: `${import.meta.env.BASE_URL}images/simulations/fair-exam-march.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/fair-exam-march-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/fair-exam-march.webp 1600w`,
    alt: "A police officer listens calmly to a student organiser holding a memorandum at a peaceful march on a city street.",
    width: 1600, height: 900,
  },
  "simulation.complaint-at-the-front-desk": {
    src: `${import.meta.env.BASE_URL}images/simulations/complaint-at-the-front-desk.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/complaint-at-the-front-desk-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/complaint-at-the-front-desk.webp 1600w`,
    alt: "An officer at a police station front desk listens attentively to a worried resident reporting a stolen phone.",
    width: 1600, height: 900,
  },
  "simulation.domestic-safety-call": {
    src: `${import.meta.env.BASE_URL}images/simulations/domestic-safety-call.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/domestic-safety-call-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/domestic-safety-call.webp 1600w`,
    alt: "Two officers listen calmly at an apartment doorway in the evening while a concerned resident stands nearby.",
    width: 1600, height: 900,
  },
  "simulation.digital-payment-fraud-report": {
    src: `${import.meta.env.BASE_URL}images/simulations/digital-payment-fraud-report.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/digital-payment-fraud-report-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/digital-payment-fraud-report.webp 1600w`,
    alt: "An officer at a help desk calmly reviews messages on a shop owner's phone while taking notes.",
    width: 1600, height: 900,
  },
  "simulation.crash-at-a-busy-junction": {
    src: `${import.meta.env.BASE_URL}images/simulations/crash-at-a-busy-junction.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/crash-at-a-busy-junction-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/crash-at-a-busy-junction.webp 1600w`,
    alt: "A police officer calmly directs traffic at a city junction after a minor two-wheeler and van collision as an ambulance approaches.",
    width: 1600, height: 900,
  },
  "simulation.the-disappearing-puddle": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-disappearing-puddle.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-disappearing-puddle-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-disappearing-puddle.webp 1600w`,
    alt: "Two students compare a sunlit puddle with a shaded one under a tree on a school playground after rain.",
    width: 1600, height: 900,
  },
  "simulation.is-the-water-filter-enough": {
    src: `${import.meta.env.BASE_URL}images/simulations/is-the-water-filter-enough.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/is-the-water-filter-enough-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/is-the-water-filter-enough.webp 1600w`,
    alt: "Students build a layered sand-and-gravel filter to clear muddy water in a school science classroom.",
    width: 1600, height: 900,
  },
  "simulation.the-lemon-and-soap-mystery": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-lemon-and-soap-mystery.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-lemon-and-soap-mystery-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-lemon-and-soap-mystery.webp 1600w`,
    alt: "Students in goggles add indicator drops to three beakers and watch the colours change in a school lab.",
    width: 1600, height: 900,
  },
  "simulation.the-rs-600-canteen-challenge": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-rs-600-canteen-challenge.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-rs-600-canteen-challenge-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-rs-600-canteen-challenge.webp 1600w`,
    alt: "A student committee compares snack packs and works out a budget at a school canteen table.",
    width: 1600, height: 900,
  },
  "simulation.the-missing-library-book": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-missing-library-book.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-missing-library-book-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-missing-library-book.webp 1600w`,
    alt: "Three students study a hand-drawn library map together while searching for a missing book.",
    width: 1600, height: 900,
  },
  "simulation.the-empty-wrapper": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-empty-wrapper.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-empty-wrapper-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-empty-wrapper.webp 1600w`,
    alt: "A student picks up a dropped wrapper during recess and looks toward an overflowing school bin.",
    width: 1600, height: 900,
  },
  "simulation.the-new-student-at-lunch": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-new-student-at-lunch.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-new-student-at-lunch-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-new-student-at-lunch.webp 1600w`,
    alt: "A student kindly approaches a quiet new classmate sitting alone at lunch, leaving them space to choose.",
    width: 1600, height: 900,
  },
  "simulation.forward-or-fact-check": {
    src: `${import.meta.env.BASE_URL}images/simulations/forward-or-fact-check.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/forward-or-fact-check-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/forward-or-fact-check.webp 1600w`,
    alt: "A student pauses before forwarding an alarming group message and checks an official source on a second screen.",
    width: 1600, height: 900,
  },
  "simulation.thirty-seconds-to-cross": {
    src: `${import.meta.env.BASE_URL}images/simulations/thirty-seconds-to-cross.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/thirty-seconds-to-cross-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/thirty-seconds-to-cross.webp 1600w`,
    alt: "A student on a school-morning pavement points friends toward the pedestrian crossing instead of crossing between cars.",
    width: 1600, height: 900,
  },
  "simulation.the-cricket-match-argument": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-cricket-match-argument.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-cricket-match-argument-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-cricket-match-argument.webp 1600w`,
    alt: "A student calmly mediates between two groups of players after a disputed run-out in a school cricket match.",
    width: 1600, height: 900,
  },
  "simulation.why-is-the-school-gate-rusting": {
    src: `${import.meta.env.BASE_URL}images/simulations/why-is-the-school-gate-rusting.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/why-is-the-school-gate-rusting-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/why-is-the-school-gate-rusting.webp 1600w`,
    alt: "Two students examine rust on a school gate and compare metal test strips for their investigation.",
    width: 1600, height: 900,
  },
  "simulation.the-electricity-bill-that-does-not-add-up": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-electricity-bill-that-does-not-add-up.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-electricity-bill-that-does-not-add-up-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-electricity-bill-that-does-not-add-up.webp 1600w`,
    alt: "A student energy team reads the school meter and studies usage charts beside an empty classroom with fans running.",
    width: 1600, height: 900,
  },
  "simulation.the-fish-pond-mystery": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-fish-pond-mystery.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-fish-pond-mystery-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-fish-pond-mystery.webp 1600w`,
    alt: "Students observe a neighbourhood pond after heavy rain, noting runoff and algae as they investigate.",
    width: 1600, height: 900,
  },
  "simulation.the-survey-that-lied": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-survey-that-lied.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-survey-that-lied-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-survey-that-lied.webp 1600w`,
    alt: "Students interview a classmate to make their school survey more inclusive.",
    width: 1600, height: 900,
  },
  "simulation.the-flooded-crossroads": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-flooded-crossroads.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-flooded-crossroads-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-flooded-crossroads.webp 1600w`,
    alt: "Students with umbrellas study a map and a blocked drain beside a flooded crossroads during the monsoon.",
    width: 1600, height: 900,
  },
  "simulation.the-clean-up-day-that-changed-nothing": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-clean-up-day-that-changed-nothing.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-clean-up-day-that-changed-nothing-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-clean-up-day-that-changed-nothing.webp 1600w`,
    alt: "Students talk with a shopkeeper and a sanitation worker on a street where litter has returned after a clean-up.",
    width: 1600, height: 900,
  },
  "simulation.the-video-everyone-believes": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-video-everyone-believes.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-video-everyone-believes-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-video-everyone-believes.webp 1600w`,
    alt: "Two students pause to check the source of a viral video on a phone instead of sharing it.",
    width: 1600, height: 900,
  },
  "simulation.the-group-project-ghost": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-group-project-ghost.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-group-project-ghost-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-group-project-ghost.webp 1600w`,
    alt: "Four students around a project table work out a fair plan to finish their group assignment.",
    width: 1600, height: 900,
  },
  "simulation.the-online-sale-countdown": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-online-sale-countdown.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-online-sale-countdown-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-online-sale-countdown.webp 1600w`,
    alt: "A student pauses to consider a headphone purchase beside a closed coin purse and face-down phone.",
    width: 1600, height: 900,
  },
  "simulation.the-exam-paper-rumour": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-exam-paper-rumour.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-exam-paper-rumour-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-exam-paper-rumour.webp 1600w`,
    alt: "A student studying the night before an exam turns away from a phone buzzing with a leaked-paper rumour.",
    width: 1600, height: 900,
  },
  "simulation.is-the-cleaning-product-really-better": {
    src: `${import.meta.env.BASE_URL}images/simulations/is-the-cleaning-product-really-better.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/is-the-cleaning-product-really-better-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/is-the-cleaning-product-really-better.webp 1600w`,
    alt: "Senior students in a chemistry lab compare cleaned and stained glassware to test two cleaning products.",
    width: 1600, height: 900,
  },
  "simulation.should-the-school-go-solar": {
    src: `${import.meta.env.BASE_URL}images/simulations/should-the-school-go-solar.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/should-the-school-go-solar-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/should-the-school-go-solar.webp 1600w`,
    alt: "A student energy team measures a school rooftop beside solar panels while reviewing a generation chart.",
    width: 1600, height: 900,
  },
  "simulation.the-antibiotic-resistance-puzzle": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-antibiotic-resistance-puzzle.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-antibiotic-resistance-puzzle-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-antibiotic-resistance-puzzle.webp 1600w`,
    alt: "Senior students compare groups of coloured counters to reason about changes in a bacterial population.",
    width: 1600, height: 900,
  },
  "simulation.which-data-can-we-trust": {
    src: `${import.meta.env.BASE_URL}images/simulations/which-data-can-we-trust.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/which-data-can-we-trust-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/which-data-can-we-trust.webp 1600w`,
    alt: "Two students examine gaps in paper records and question a proposed conclusion.",
    width: 1600, height: 900,
  },
  "simulation.the-archive-dispute": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-archive-dispute.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-archive-dispute-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-archive-dispute.webp 1600w`,
    alt: "A senior student compares an old newspaper, a report, a photograph and oral-history recordings for a heritage exhibition.",
    width: 1600, height: 900,
  },
  "simulation.the-rs-50000-virtual-portfolio": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-rs-50000-virtual-portfolio.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-rs-50000-virtual-portfolio-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-rs-50000-virtual-portfolio.webp 1600w`,
    alt: "Students distribute counters across separate trays while discussing diversification.",
    width: 1600, height: 900,
  },
  "simulation.your-first-independent-month": {
    src: `${import.meta.env.BASE_URL}images/simulations/your-first-independent-month.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/your-first-independent-month-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/your-first-independent-month.webp 1600w`,
    alt: "A student in a small rented room plans a first monthly budget with a notebook and phone.",
    width: 1600, height: 900,
  },
  "simulation.the-market-street-waste-challenge": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-market-street-waste-challenge.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-market-street-waste-challenge-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-market-street-waste-challenge.webp 1600w`,
    alt: "Students discuss waste separation with a shopkeeper and sanitation worker beside market bins.",
    width: 1600, height: 900,
  },
  "simulation.the-deepfake-has-40000-views": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-deepfake-has-40000-views.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-deepfake-has-40000-views-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-deepfake-has-40000-views.webp 1600w`,
    alt: "A student supports a worried friend and reports a fake video rather than reposting it.",
    width: 1600, height: 900,
  },
  "simulation.the-college-fest-one-night-left": {
    src: `${import.meta.env.BASE_URL}images/simulations/the-college-fest-one-night-left.webp`,
    srcSet: `${import.meta.env.BASE_URL}images/simulations/the-college-fest-one-night-left-800.webp 800w, ${import.meta.env.BASE_URL}images/simulations/the-college-fest-one-night-left.webp 1600w`,
    alt: "A student team rearranges the programme the night before a school festival, with an accessible stage behind them.",
    width: 1600, height: 900,
  },
}
