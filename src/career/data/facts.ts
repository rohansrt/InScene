export interface Fact {
  id: string
  text: string
  /** Which kind of work the fact connects to. */
  tag: string
}

// Every fact here was checked before it was added. Keep them short and true; if a number
// cannot be confirmed, leave it out.
export const facts: Record<string, Fact> = {
  robot: { id: 'robot', tag: 'Engineering', text: 'The word “robot” comes from a 1920 Czech play called R.U.R., by Karel Čapek.' },
  bug: { id: 'bug', tag: 'Tech', text: 'In 1947, engineers found a real moth stuck inside the Harvard Mark II computer. They taped it into their logbook as the first actual “bug”.' },
  mangalyaan: { id: 'mangalyaan', tag: 'Space', text: 'India’s Mangalyaan reached Mars orbit in 2014, on the country’s very first try.' },
  velcro: { id: 'velcro', tag: 'Design', text: 'Velcro was invented after an engineer noticed how burrs from plants stuck to his dog’s fur. Copying nature is called biomimicry.' },
  litre: { id: 'litre', tag: 'Engineering', text: '1 mm of rain falling on 1 square metre of ground is exactly 1 litre of water. Engineers use this to size drains.' },
  chennai: { id: 'chennai', tag: 'Planning', text: 'In 2003, Tamil Nadu made rainwater harvesting compulsory for buildings, to refill groundwater.' },
  concrete: { id: 'concrete', tag: 'Environment', text: 'Concrete and tar stop rain from soaking into the ground, so more water rushes into drains. More concrete means more runoff.' },
  heart: { id: 'heart', tag: 'Health', text: 'Your heart beats about 100,000 times a day.' },
  stepwell: { id: 'stepwell', tag: 'Architecture', text: 'Rani ki Vav in Gujarat is a stepwell built over 900 years ago to store water. It is a UNESCO World Heritage Site.' },
  monsoon: { id: 'monsoon', tag: 'Climate', text: 'Mumbai gets most of its yearly rain in just four monsoon months, June to September.' },
  email: { id: 'email', tag: 'Tech', text: 'The first network email was sent in 1971 by Ray Tomlinson. He picked the @ sign to separate the name from the computer.' },
  raman: { id: 'raman', tag: 'Science', text: 'India celebrates National Science Day on 28 February, the day C.V. Raman announced the Raman effect.' },
}

export interface ProWord {
  id: string
  word: string
  meaning: string
}

export const proWords: Record<string, ProWord> = {
  contour: { id: 'contour', word: 'Contour line', meaning: 'A line on a map joining places of the same height. Water flows from high to low.' },
  runoff: { id: 'runoff', word: 'Runoff', meaning: 'Rain that flows over the ground instead of soaking in.' },
  silt: { id: 'silt', word: 'Desilting', meaning: 'Clearing mud, sand and rubbish out of drains so water can flow.' },
  stakeholder: { id: 'stakeholder', word: 'Stakeholder', meaning: 'Anyone affected by a decision, who should be heard.' },
  tradeoff: { id: 'tradeoff', word: 'Trade-off', meaning: 'Giving up some of one thing to get more of another.' },
  permeable: { id: 'permeable', word: 'Permeable', meaning: 'Lets water pass through, like soil or special paving.' },
  recharge: { id: 'recharge', word: 'Recharge pit', meaning: 'A pit filled with stones that lets rainwater soak deep into the ground.' },
  coefficient: { id: 'coefficient', word: 'Runoff coefficient', meaning: 'The share of rain that runs off a surface. Concrete is high, grass is low.' },
}
