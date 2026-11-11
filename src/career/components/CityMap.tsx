import { useMemo } from 'react'
import { MapPin } from 'lucide-react'
import { cn } from '../../lib/cn'
import { places } from '../data/mission'
import { severity } from '../engine/mission'
import type { ZoneId } from '../types'

interface Props {
  /** Tap-to-select places (hotspot step). */
  selectable?: boolean
  selected?: string[]
  onToggle?: (id: string) => void
  /** Reveal which places really collect water. */
  revealed?: boolean
  /** 0–100 flood risk by zone; draws water. */
  water?: Record<ZoneId, number> | null
  raining?: boolean
  showOldLake?: boolean
  showBlockage?: boolean
  className?: string
}

const waterAt: Record<ZoneId, { cx: number; cy: number; rx: number; ry: number }> = {
  market: { cx: 208, cy: 124, rx: 46, ry: 14 },
  school: { cx: 330, cy: 170, rx: 30, ry: 16 },
  lake: { cx: 132, cy: 212, rx: 64, ry: 26 },
}

/** Illustrated, not-to-scale map of the fictional Ward 12. Coordinates are 400×260. */
export function CityMap({ selectable, selected = [], onToggle, revealed, water, raining, showOldLake, showBlockage, className }: Props) {
  const drops = useMemo(
    () => Array.from({ length: 42 }, (_, i) => ({ left: (i * 37) % 100, delay: ((i * 53) % 100) / 100, dur: 0.55 + ((i * 29) % 40) / 100 })),
    [],
  )

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-line bg-[#eef4ea]', className)}>
      <svg viewBox="0 0 400 260" className="block w-full" role="img" aria-label="Map of Ward 12, Sundarpur. High ground in the north, low ground in the south.">
        <defs>
          <pattern id="park-dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#9fcf9a" />
          </pattern>
          <linearGradient id="height" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e3ecd9" />
            <stop offset="1" stopColor="#f3f7ef" />
          </linearGradient>
        </defs>
        <rect width="400" height="260" fill="url(#height)" />

        {/* Contour lines: water flows from high (north) to low (south). */}
        <g fill="none" stroke="#b9c9a8" strokeWidth="1" strokeDasharray="3 3">
          <path d="M0 70 C 80 55, 150 85, 230 70 S 360 55, 400 72" />
          <path d="M0 150 C 90 140, 160 165, 250 150 S 360 140, 400 158" />
          <path d="M0 200 C 70 192, 120 225, 200 205" />
        </g>
        <text x="8" y="12" className="fill-[#7d9468] text-[8px] font-semibold">HIGHER ↑</text>
        <text x="392" y="252" textAnchor="end" className="fill-[#7d9468] text-[8px] font-semibold">LOWER ↓</text>

        {/* Old lake (1990) */}
        {showOldLake && <ellipse cx="128" cy="214" rx="80" ry="34" fill="none" stroke="#2a78d6" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.7" />}
        {showOldLake && <text x="60" y="186" className="fill-blue-700 text-[8px] font-semibold">Lake in 1990</text>}

        {/* Main drain (nala) */}
        <path d="M200 0 C 205 50, 190 90, 210 124 S 260 170, 300 196 S 360 236, 400 246" fill="none" stroke="#7fb2e5" strokeWidth="4" strokeLinecap="round" />
        <text x="385" y="238" textAnchor="end" className="fill-blue-700 text-[7.5px] font-medium">to river →</text>
        {showBlockage && (
          <g>
            <circle cx="202" cy="58" r="9" fill="#a16207" opacity="0.9" />
            <text x="216" y="61" className="fill-[#7a4a00] text-[8px] font-bold">debris!</text>
          </g>
        )}

        {/* Roads */}
        <path d="M0 124 L400 120" stroke="#cfd6df" strokeWidth="12" />
        <path d="M0 124 L400 120" stroke="#fff" strokeWidth="1" strokeDasharray="6 6" />
        <path d="M300 0 L300 120 L330 170 L330 260" fill="none" stroke="#cfd6df" strokeWidth="9" />
        <path d="M90 124 L120 210" stroke="#d8dee6" strokeWidth="8" />
        <text x="112" y="116" className="fill-ink-500 text-[8px] font-medium">Market Road</text>
        <text x="40" y="250" className="fill-ink-500 text-[8px] font-medium">Lake View Lane</text>

        {/* Railway */}
        <path d="M250 260 L400 140" stroke="#8a94a6" strokeWidth="3" />
        <path d="M250 260 L400 140" stroke="#8a94a6" strokeWidth="9" strokeDasharray="1.5 6" />

        {/* Hilltop houses */}
        <g fill="#f6e3c8" stroke="#d9b98f" strokeWidth="1">
          {[[40, 22], [62, 30], [84, 18], [52, 48], [96, 42]].map(([x, y], i) => <rect key={i} x={x} y={y} width="14" height="11" rx="2" />)}
        </g>
        {/* Mall car park */}
        <rect x="250" y="20" width="88" height="56" rx="4" fill="#dde2ea" stroke="#c3cad6" />
        <g stroke="#fff" strokeWidth="1">{[262, 276, 290, 304, 318].map((x) => <line key={x} x1={x} y1="26" x2={x} y2="44" />)}</g>
        <rect x="350" y="22" width="40" height="40" rx="3" fill="#cfd5f5" stroke="#b6bfe9" />
        {/* Park */}
        <rect x="30" y="134" width="70" height="48" rx="10" fill="#cfe8c7" />
        <rect x="30" y="134" width="70" height="48" rx="10" fill="url(#park-dots)" />
        {[[45, 148], [70, 160], [88, 146], [52, 170]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" fill="#8fc485" />)}
        {/* Market shops */}
        <g fill="#fde7c7" stroke="#e8c48f">{[160, 178, 196, 214, 232].map((x) => <rect key={x} x={x} y="98" width="15" height="14" rx="2" />)}</g>
        {/* School */}
        <rect x="344" y="190" width="46" height="34" rx="3" fill="#fbd5df" stroke="#eab0c0" />
        <path d="M344 190 L367 178 L390 190" fill="#f3b8c8" />
        {/* Lake View Lane houses */}
        <g fill="#f6e3c8" stroke="#d9b98f">{[[70, 196], [92, 214], [140, 200], [164, 222], [118, 230]].map(([x, y], i) => <rect key={i} x={x} y={y} width="14" height="11" rx="2" />)}</g>

        {/* Water */}
        {water &&
          (Object.keys(waterAt) as ZoneId[]).map((z) => {
            const w = waterAt[z]
            const r = water[z] / 100
            return (
              <ellipse
                key={z}
                cx={w.cx}
                cy={w.cy}
                rx={w.rx * (0.35 + 0.75 * r)}
                ry={w.ry * (0.35 + 0.75 * r)}
                fill="#3b82f6"
                opacity={0.18 + 0.5 * r}
                className="transition-all duration-[1600ms] ease-out-cubic"
              />
            )
          })}
      </svg>

      {raining && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-navy/10 motion-reduce:hidden">
          {drops.map((d, i) => (
            <span key={i} className="rain-drop" style={{ left: `${d.left}%`, animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s` }} />
          ))}
        </div>
      )}

      {water && (
        <ul className="pointer-events-none absolute inset-x-2 top-2 flex flex-wrap gap-1.5" aria-label="Water level by area">
          {(Object.keys(waterAt) as ZoneId[]).map((z) => (
            <li key={z} className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-navy shadow-xs">
              {{ market: 'Market', school: 'School', lake: 'Lake View' }[z]}: {severity(water[z]).short}
            </li>
          ))}
        </ul>
      )}

      {(selectable || revealed) &&
        places.map((p) => {
          const on = selected.includes(p.id)
          const show = revealed
          return (
            <div key={p.id} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <button
                type="button"
                role={selectable ? 'checkbox' : undefined}
                aria-checked={selectable ? on : undefined}
                disabled={!selectable}
                onClick={() => onToggle?.(p.id)}
                className={cn(
                  'group flex flex-col items-center disabled:cursor-default',
                  selectable && 'transition-transform hover:-translate-y-0.5 active:scale-95',
                )}
              >
                <span
                  className={cn(
                    'whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold shadow-xs ring-1 sm:text-[11px]',
                    show && p.pools ? 'bg-blue text-white ring-blue' : on ? 'bg-violet text-white ring-violet' : 'bg-white text-navy ring-line',
                  )}
                >
                  {show && p.pools ? '💧 ' : ''}{p.name}
                </span>
                <MapPin className={cn('size-5 drop-shadow', on ? 'fill-violet text-white' : show && p.pools ? 'fill-blue text-white' : 'fill-white text-navy')} aria-hidden="true" />
              </button>
            </div>
          )
        })}
      <p className="absolute bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-ink-500">Ward 12, Sundarpur (made up, not to scale)</p>
    </div>
  )
}
