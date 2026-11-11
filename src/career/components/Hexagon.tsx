import { useId, useState } from 'react'
import { cn } from '../../lib/cn'
import { themeOrder, themes } from '../data/themes'
import { strengthWord, type ThemeScores } from '../engine/profile'
import type { ThemeId } from '../types'

interface Props {
  now: ThemeScores
  before?: ThemeScores
  counts?: Record<ThemeId, number>
  size?: number
  className?: string
  /** Hide the outer labels (for tiny previews). */
  bare?: boolean
  title?: string
  nowLabel?: string
  beforeLabel?: string
}

const R = 92
const angle = (i: number) => ((i * 60 - 90) * Math.PI) / 180
const point = (i: number, v: number) => {
  const r = R * (0.1 + 0.9 * v)
  return [Math.cos(angle(i)) * r, Math.sin(angle(i)) * r] as const
}
const ring = (f: number) =>
  themeOrder.map((_, i) => [Math.cos(angle(i)) * R * f, Math.sin(angle(i)) * R * f].map((n) => n.toFixed(1)).join(',')).join(' ')

/**
 * Interest hexagon (a 6-axis radar). One axis per theme, values relative to the student's own
 * strongest theme, so it shows a shape, never a score. Two series max: "before" (dashed) and
 * "now" (filled). Words, not numbers, in tooltips and the table view.
 */
export function Hexagon({ now, before, counts, size = 300, className, bare, title = 'Your interest shape', nowLabel = 'Now', beforeLabel = 'Before the mission' }: Props) {
  const [hover, setHover] = useState<ThemeId | null>(null)
  const uid = useId()
  const poly = (s: ThemeScores) => themeOrder.map((t, i) => point(i, s[t]).map((n) => n.toFixed(1)).join(',')).join(' ')
  const has = (t: ThemeId) => (counts ? counts[t] > 0 : true)

  return (
    <figure className={cn('relative', className)} style={{ maxWidth: size }}>
      <svg viewBox="-150 -140 300 280" className="w-full overflow-visible" role="img" aria-labelledby={`${uid}-t`}>
        <title id={`${uid}-t`}>{title}</title>
        {[1, 0.66, 0.33].map((f) => (
          <polygon key={f} points={ring(f)} fill={f === 1 ? '#f7f6ff' : 'none'} stroke="#e4e9f0" strokeWidth={1} />
        ))}
        {themeOrder.map((_, i) => (
          <line key={i} x1={0} y1={0} x2={Math.cos(angle(i)) * R} y2={Math.sin(angle(i)) * R} stroke="#e4e9f0" strokeWidth={1} />
        ))}
        {before && <polygon points={poly(before)} fill="none" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 4" strokeLinejoin="round" className="transition-all duration-700" />}
        <polygon points={poly(now)} fill="rgb(98 80 214 / 0.16)" stroke="#6250d6" strokeWidth={2} strokeLinejoin="round" className="transition-all duration-700 ease-out-cubic" />
        {themeOrder.map((t, i) => {
          const [x, y] = point(i, now[t])
          return (
            <g key={t}>
              <circle cx={x} cy={y} r={hover === t ? 6 : 4.5} fill={themes[t].color} stroke="#fff" strokeWidth={2} className="transition-all duration-700" />
              <circle
                cx={Math.cos(angle(i)) * R * 0.7}
                cy={Math.sin(angle(i)) * R * 0.7}
                r={30}
                fill="transparent"
                onMouseEnter={() => setHover(t)}
                onMouseLeave={() => setHover(null)}
              />
            </g>
          )
        })}
        {!bare &&
          themeOrder.map((t, i) => {
            const lx = Math.cos(angle(i)) * (R + 26)
            const ly = Math.sin(angle(i)) * (R + 22)
            const Icon = themes[t].icon
            const anchor = Math.abs(lx) < 5 ? 'middle' : lx > 0 ? 'start' : 'end'
            const ix = anchor === 'middle' ? lx - 7 : anchor === 'start' ? lx - 4 : lx - 10
            return (
              <g key={t} onMouseEnter={() => setHover(t)} onMouseLeave={() => setHover(null)} className="cursor-default">
                <Icon x={ix} y={ly - 22} width={14} height={14} color={themes[t].color} strokeWidth={2.4} aria-hidden="true" />
                <text x={anchor === 'end' ? lx + 4 : lx} y={ly + 2} textAnchor={anchor} className="fill-navy text-[11px] font-semibold">{themes[t].name}</text>
                <text x={anchor === 'end' ? lx + 4 : lx} y={ly + 15} textAnchor={anchor} className="fill-ink-500 text-[9.5px]">{strengthWord(now[t], has(t))}</text>
              </g>
            )
          })}
      </svg>

      {hover && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-navy px-3 py-2 text-center text-xs text-white shadow-lift">
          <p className="font-semibold">{themes[hover].name}: {strengthWord(now[hover], has(hover))}</p>
          {before && <p className="text-white/70">Before: {strengthWord(before[hover], true)}</p>}
          <p className="mt-0.5 max-w-40 text-white/80">{themes[hover].line}</p>
        </div>
      )}

      {before && (
        <figcaption className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ink-600">
          <span className="inline-flex items-center gap-1.5">
            <svg width="18" height="8" aria-hidden="true"><line x1="0" y1="4" x2="18" y2="4" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" /></svg>
            {beforeLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="18" height="8" aria-hidden="true"><line x1="0" y1="4" x2="18" y2="4" stroke="#6250d6" strokeWidth="2.5" /></svg>
            {nowLabel}
          </span>
        </figcaption>
      )}

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr><th>Theme</th>{before && <th>{beforeLabel}</th>}<th>{nowLabel}</th></tr>
        </thead>
        <tbody>
          {themeOrder.map((t) => (
            <tr key={t}>
              <td>{themes[t].name}</td>
              {before && <td>{strengthWord(before[t], true)}</td>}
              <td>{strengthWord(now[t], has(t))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
