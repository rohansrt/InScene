import { ArrowRight, Clock } from 'lucide-react'
import { categoryLabels, strandLabels, type Simulation } from '../../data/simulations'
import { Badge } from '../ui/Chip'
import { ScenarioImage } from './ScenarioImage'
import { durationLabel, gradeLabel, imageAlt, levelNames } from './meta'
import { useSimulationModal } from './SimulationModalContext'

/**
 * Catalog card. The heading holds a single button stretched over the whole card
 * (after:inset-0), so the card is one click target while its content stays readable
 * to assistive tech.
 */
export function SimulationCard({ simulation: sim }: { simulation: Simulation }) {
  const { openSimulation } = useSimulationModal()
  const isPolice = sim.category === 'police'
  const meta = [
    <span key="area" className={isPolice ? 'text-blue-700' : 'text-teal-700'}>{sim.area}</span>,
    !isPolice && sim.strand && <span key="strand" className="whitespace-nowrap">{strandLabels[sim.strand]}</span>,
  ].filter(Boolean)

  return (
    <article
      data-testid="simulation-card"
      data-slug={sim.slug}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-[box-shadow,transform] duration-300 ease-out-cubic hover:-translate-y-0.5 hover:shadow-lift has-[:focus-visible]:-translate-y-0.5 has-[:focus-visible]:shadow-lift has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue"
    >
      <div className="relative">
        <ScenarioImage
          imageKey={sim.imageKey}
          alt={imageAlt(sim)}
          tone={sim.category}
          icon={sim.icon}
          zoomOnHover
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge tone="navy">{categoryLabels[sim.category]}</Badge>
          {!isPolice && <Badge tone="navy">{gradeLabel(sim)}</Badge>}
        </div>
        {sim.duration && (
          <div className="absolute bottom-3 right-3">
            <Badge tone="navy">
              <Clock className="size-3.5" aria-hidden="true" />
              <span className="sr-only">Duration:</span>
              {durationLabel(sim)}
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[0.8125rem] font-medium leading-relaxed text-ink-500">
          {meta.map((m, i) => (
            <span key={i}>
              {i > 0 && <span aria-hidden="true" className="text-ink-400">{' · '}</span>}
              {m}
            </span>
          ))}
        </p>

        <h3 className="mt-2 line-clamp-2 text-lg font-[620] leading-snug tracking-[-0.015em]">
          <button
            type="button"
            onClick={(e) => openSimulation(sim.slug, e.currentTarget)}
            data-slug={sim.slug}
            aria-describedby={`${sim.slug}-summary`}
            className="text-left outline-none after:absolute after:inset-0 after:content-['']"
          >
            {sim.title}
          </button>
        </h3>
        {sim.subtitle && <p className="mt-1 line-clamp-2 text-sm font-medium text-navy/75">{sim.subtitle}</p>}
        <p id={`${sim.slug}-summary`} className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-500">
          {sim.summary}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-3 pt-5">
          <span className="flex gap-1.5">
            <span className="sr-only">Levels:</span>
            {levelNames(sim).map((l) => (
              <span key={l} className="rounded-md border border-line px-2 py-0.5 text-xs font-medium text-ink-500">
                {l}
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-blue">
            Explore simulation
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  )
}
