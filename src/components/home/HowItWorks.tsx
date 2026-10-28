import { DoorOpen, MessagesSquare, Route, NotebookPen } from 'lucide-react'
import { Reveal } from '../ui/Reveal'

const steps = [
  {
    icon: DoorOpen,
    title: 'Enter a realistic scenario',
    text: 'Start inside a situation drawn from real life.',
  },
  {
    icon: MessagesSquare,
    title: 'Interact and make decisions',
    text: 'Talk to the people involved and choose how to respond.',
  },
  {
    icon: Route,
    title: 'Experience how it unfolds',
    text: 'Your choices shape what happens next.',
  },
  {
    icon: NotebookPen,
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
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue">
                      <s.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-medium text-ink-500">0{i + 1}</span>
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
