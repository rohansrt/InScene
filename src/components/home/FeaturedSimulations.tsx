import { ArrowRight } from 'lucide-react'
import { featuredSlugs, getSimulation, type Simulation } from '../../data/simulations'
import { FeaturedSimulationCard } from '../simulation/FeaturedSimulationCard'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

const featured = featuredSlugs.map(getSimulation).filter((s): s is Simulation => Boolean(s))

export function FeaturedSimulations() {
  return (
    <section className="border-y border-line bg-surface py-20 sm:py-28">
      <div className="container-site">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Featured simulations</p>
            <h2 className="h2 mt-3">A closer look inside.</h2>
            <p className="lead mt-4 text-ink-500">Preview a few of the scenarios in the InScene catalog.</p>
          </div>
          <ButtonLink to="/products" variant="secondary" className="shrink-0">
            View all simulations
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {featured.map((sim, i) => (
            <li key={sim.slug}>
              <Reveal delay={(i % 2) * 100} className="h-full">
                <FeaturedSimulationCard simulation={sim} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
