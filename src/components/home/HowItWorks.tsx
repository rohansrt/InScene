import { Reveal } from '../ui/Reveal'

const steps = [
  {
    image: 'enter-scenario',
    title: 'Enter a realistic scenario',
    text: 'Start inside a situation drawn from real life.',
  },
  {
    image: 'make-decisions',
    title: 'Interact and make decisions',
    text: 'Talk to the people involved and choose how to respond.',
  },
  {
    image: 'experience-outcomes',
    title: 'Experience how it unfolds',
    text: 'Your choices shape what happens next.',
  },
  {
    image: 'reflect-improve',
    title: 'Reflect, learn and improve',
    text: 'A short debrief shows what worked and what to try next time.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-line bg-surface py-20 sm:py-28">
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">How InScene works</p>
          <h2 className="h2 mt-3">Learning by stepping inside the situation.</h2>
        </Reveal>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 80} className="h-full">
                <div className="relative h-full rounded-2xl bg-white p-6 shadow-card">
                  <div className="relative overflow-hidden rounded-xl bg-blue-50">
                    <img
                      src={`${import.meta.env.BASE_URL}images/how-it-works/${s.image}.webp`}
                      alt=""
                      width={768}
                      height={512}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover"
                    />
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 font-mono text-xs font-medium text-ink-500">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-[620] tracking-[-0.015em]">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
