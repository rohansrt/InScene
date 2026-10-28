import { ShieldCheck, GitBranch, Lightbulb, ClipboardCheck } from 'lucide-react'
import { Reveal } from '../ui/Reveal'

const points = [
  {
    icon: ShieldCheck,
    title: 'Practise before it is real',
    text: 'Rehearse difficult conversations and decisions in a setting where mistakes become learning rather than consequences.',
  },
  {
    icon: GitBranch,
    title: 'See how choices play out',
    text: 'Branching situations make the link between a decision and its outcome visible — including trade-offs with no single right answer.',
  },
  {
    icon: Lightbulb,
    title: 'Reflect and improve',
    text: 'Feedback and a structured debrief connect what happened to the reasoning behind it, so the insight carries into real situations.',
  },
]

export function WhyScenarioLearning() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-site grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Why scenario-based learning?</p>
          <h2 className="h2 mt-3">Judgement is learned in context.</h2>
          <p className="lead mt-5 text-ink-500">
            Real situations rarely arrive as multiple-choice questions. Scenario-based learning lets people explore a
            situation, weigh competing priorities and understand consequences — then reflect on what they would do next
            time.
          </p>
          <div className="mt-8 flex gap-3 rounded-2xl border border-line p-5">
            <ClipboardCheck className="mt-0.5 size-5 shrink-0 text-teal-700" aria-hidden="true" />
            <p className="text-sm leading-relaxed">
              <span className="font-semibold text-navy">Designed responsibly. </span>
              Each scenario starts from a structured brief — situation, learning objectives, decision points and content
              guardrails — and is intended to be validated by teachers, trainers and subject-matter experts before use.
            </p>
          </div>
        </Reveal>
        <ul className="grid gap-4">
          {points.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 90}>
                <div className="flex gap-5 rounded-2xl bg-white p-6 shadow-card">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700">
                    <p.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-[620] tracking-[-0.015em]">{p.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-500">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
