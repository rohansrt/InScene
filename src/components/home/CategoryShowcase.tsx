import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { simulations } from '../../data/simulations'
import { ScenarioImage } from '../simulation/ScenarioImage'
import { Reveal } from '../ui/Reveal'

const count = (c: 'police' | 'school') => simulations.filter((s) => s.category === c).length

const categories = [
  {
    key: 'police' as const,
    imageKey: 'home.police-category',
    icon: 'megaphone',
    title: 'Police Training',
    intro: 'Public order, first response and community safety scenarios.',
    meta: `${count('police')} simulations`,
    to: '/products?category=police',
  },
  {
    key: 'school' as const,
    imageKey: 'home.school-category',
    icon: 'book',
    title: 'School Training',
    intro: 'Academic and life skills scenarios for Grades 6 to 12.',
    meta: `${count('school')} simulations`,
    to: '/products?category=school',
  },
]

export function CategoryShowcase() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">AI-powered learning</p>
          <h2 className="h2 mt-3">Explore our training experiences.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {categories.map((c, i) => (
            <Reveal key={c.key} delay={i * 100} className="h-full">
              <Link
                to={c.to}
                data-testid={`category-${c.key}`}
                className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-card transition-[box-shadow,transform] duration-300 ease-out-cubic hover:-translate-y-0.5 hover:shadow-lift"
              >
                <ScenarioImage
                  imageKey={c.imageKey}
                  alt={`${c.title} at InScene`}
                  tone={c.key}
                  icon={c.icon}
                  iconSize="md"
                  aspect="aspect-[21/9]"
                  zoomOnHover
                />
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className={c.key === 'police' ? 'text-sm font-medium text-blue-700' : 'text-sm font-medium text-teal-700'}>{c.meta}</p>
                  <h3 className="mt-2 text-2xl font-[650] tracking-[-0.025em]">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-500">{c.intro}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.9375rem] font-semibold text-blue">
                    View {c.title.toLowerCase()} simulations
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
