import { cn } from '../../lib/cn'
import { fixes, MISSION, zones } from '../data/mission'
import { overallRisk, severity, START_RISK, totalSpend, trust, units, wardPlan, zoneIds, zoneRisk } from '../engine/mission'
import type { CareerState } from '../types'

/** The student's work product: a one-page plan for Ward 12, built from the choices they made. */
export function WardPlan({ state, className }: { state: CareerState; className?: string }) {
  const m = state.mission
  const chosen = fixes.filter((f) => units(m, f.id) > 0)
  const risk = overallRisk(m, { twist: !!m.twist })
  const zr = zoneRisk(m, { twist: !!m.twist })
  const plan = wardPlan(m)

  return (
    <article className={cn('relative overflow-hidden rounded-[22px] border border-line bg-white shadow-card', className)} data-testid="ward-plan">
      <div className="career-night px-5 py-4 text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">Ward plan · {MISSION.place}</p>
        <p className="mt-1 text-lg font-bold tracking-[-0.01em]">{plan.headline ? `${plan.headline.emoji} ${plan.headline.name}` : 'Your plan'}</p>
        <p className="text-xs text-white/75">Prepared by {state.nickname || 'you'}, junior consultant</p>
      </div>
      <div className="space-y-4 p-5 text-sm">
        {plan.why && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-700">Why lead with it</p>
            <p className="mt-1 text-navy">{plan.why}</p>
          </div>
        )}
        {chosen.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-700">Everything in the plan</p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {chosen.map((f) => (
                <li key={f.id} className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-navy">{f.emoji} {f.name}{f.max > 1 ? ` ×${units(m, f.id)}` : ''}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-surface p-2.5"><p className="text-[10px] text-ink-500">Flood risk</p><p className="font-bold text-navy">{START_RISK} → {risk}</p></div>
          <div className="rounded-xl bg-surface p-2.5"><p className="text-[10px] text-ink-500">Spent</p><p className="font-bold text-navy">₹{totalSpend(m)} / {MISSION.budget} L</p></div>
          <div className="rounded-xl bg-surface p-2.5"><p className="text-[10px] text-ink-500">Trust</p><p className="font-bold text-navy">{trust(m)} / 100</p></div>
        </div>
        <ul className="space-y-1">
          {zoneIds.map((z) => (
            <li key={z} className="flex justify-between gap-3 text-xs"><span className="text-ink-600">{zones[z].name}</span><span className="text-right font-semibold text-navy">{severity(zr[z]).label}</span></li>
          ))}
        </ul>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-700">Trade-off we accepted</p>
          <p className="mt-1 text-navy">{plan.tradeoff}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-700">Still to find out</p>
          <ul className="mt-1 space-y-0.5 text-navy">{plan.unknowns.map((u) => <li key={u}>• {u}</li>)}</ul>
        </div>
      </div>
    </article>
  )
}
