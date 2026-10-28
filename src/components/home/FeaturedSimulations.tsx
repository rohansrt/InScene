import { ArrowRight } from 'lucide-react'
import { featuredSlugs, getSimulation, type Simulation } from '../../data/simulations'
import { SimulationCard } from '../simulation/SimulationCard'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

const featured = featuredSlugs.map(getSimulation).filter((s): s is Simulation => Boolean(s))

export function FeaturedSimulations() {
  return (
    <section className="border-t border-line bg-surface py-20 sm:py-28">
      <div className="container-site">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Featured simulations</p>
            <h2 className="h2 mt-3">A closer look inside.</h2>
          </div>
          <ButtonLink to="/products" variant="secondary" className="shrink-0">
            View all simulations
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {featured.map((sim, i) => (
            <li key={sim.slug}>
              <Reveal delay={i * 80} className="h-full">
                <SimulationCard simulation={sim} testId="featured-card" />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
