import { ArrowRight } from 'lucide-react'
import { categoryLabels, type Simulation } from '../../data/simulations'
import { Badge } from '../ui/Chip'
import { ScenarioImage } from './ScenarioImage'
import { contextLine, imageAlt, levelNames } from './meta'
import { useSimulationModal } from './SimulationModalContext'

/** Horizontal editorial card (image left / detail right) for highlighted simulations; stacks below xl. */
export function FeaturedSimulationCard({ simulation: sim }: { simulation: Simulation }) {
  const { openSimulation } = useSimulationModal()
  return (
    <article
      data-testid="featured-card"
      data-slug={sim.slug}
      className="group relative grid h-full overflow-hidden rounded-2xl bg-white shadow-card transition-[box-shadow,transform] duration-300 ease-out-cubic hover:-translate-y-0.5 hover:shadow-lift has-[:focus-visible]:shadow-lift has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
    >
      <ScenarioImage
        imageKey={sim.imageKey}
        alt={imageAlt(sim)}
        tone={sim.category}
        icon={sim.icon}
        zoomOnHover
        sizes="(min-width: 1280px) 260px, (min-width: 768px) 50vw, 100vw"
        aspect="aspect-video xl:aspect-auto xl:h-full xl:min-h-[260px]"
      />
      <div className="flex flex-col p-6">
        <div className="flex flex-wrap gap-1.5">
          <Badge tone={sim.category === 'police' ? 'blue' : 'teal'}>{categoryLabels[sim.category]}</Badge>
        </div>
        <p className="mt-3 text-[0.8125rem] font-medium text-ink-500">{contextLine(sim).replace(`${categoryLabels.police} · `, '')}</p>
        <h3 className="mt-1 text-xl font-[640] leading-snug tracking-[-0.02em]">
          <button
            type="button"
            onClick={(e) => openSimulation(sim.slug, e.currentTarget)}
            data-slug={sim.slug}
            aria-describedby={`featured-${sim.slug}-summary`}
            className="text-left outline-none after:absolute after:inset-0 after:content-['']"
          >
            {sim.title}
          </button>
        </h3>
        <p id={`featured-${sim.slug}-summary`} className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-500">
          {sim.summary}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-xs font-medium text-ink-500">{levelNames(sim).join(' · ')}</span>
          <span aria-hidden="true" className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-blue">
            Explore
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  )
}
