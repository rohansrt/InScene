import { ArrowRight, Clock } from 'lucide-react'
import type { Simulation } from '../../data/simulations'
import { ScenarioImage } from './ScenarioImage'
import { durationLabel, imageAlt } from './meta'
import { useSimulationModal } from './SimulationModalContext'

/**
 * Compact catalog card. The heading holds a single button stretched over the whole card
 * (after:inset-0), so the card is one click target while its content stays readable
 * to assistive tech.
 */
export function SimulationCard({ simulation: sim, testId = 'simulation-card' }: { simulation: Simulation; testId?: string }) {
  const { openSimulation } = useSimulationModal()
  const isPolice = sim.category === 'police'
  const summaryId = `${testId}-${sim.slug}-summary`

  return (
    <article
      data-testid={testId}
      data-slug={sim.slug}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card transition-[box-shadow,transform] duration-300 ease-out-cubic hover:-translate-y-0.5 hover:shadow-lift has-[:focus-visible]:-translate-y-0.5 has-[:focus-visible]:shadow-lift has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue"
    >
      <ScenarioImage
        imageKey={sim.imageKey}
        alt={imageAlt(sim)}
        tone={sim.category}
        icon={sim.icon}
        iconSize="sm"
        aspect="aspect-[16/10]"
        zoomOnHover
        sizes="(min-width: 1024px) 220px, (min-width: 768px) 33vw, 50vw"
      />

      <div className="flex flex-1 flex-col p-3.5">
        <p className={isPolice ? 'truncate text-[0.6875rem] font-medium text-blue-700' : 'truncate text-[0.6875rem] font-medium text-teal-700'}>
          {sim.area}
        </p>
        <h3 className="mt-1 line-clamp-2 text-[0.875rem] font-[620] leading-snug tracking-[-0.01em]">
          <button
            type="button"
            onClick={(e) => openSimulation(sim.slug, e.currentTarget)}
            data-slug={sim.slug}
            aria-describedby={summaryId}
            className="text-left outline-none after:absolute after:inset-0 after:content-['']"
          >
            {sim.title}
          </button>
        </h3>
        <p id={summaryId} className="sr-only">{sim.summary}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-[0.6875rem] text-ink-500">
          {sim.duration ? (
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" aria-hidden="true" />
              <span className="sr-only">Duration:</span>
              {durationLabel(sim)}
            </span>
          ) : (
            <span />
          )}
          <ArrowRight aria-hidden="true" className="size-3.5 text-blue transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </article>
  )
}
