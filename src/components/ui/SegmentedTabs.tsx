import { useRef, type KeyboardEvent, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface TabOption<T extends string> {
  value: T
  label: ReactNode
  /** Accessible id for aria-controls on the tab. */
  id?: string
}

interface Props<T extends string> {
  label: string
  options: TabOption<T>[]
  value: T
  onChange: (value: T) => void
  /** id of the panel these tabs control */
  controls?: string
  size?: 'md' | 'lg'
  className?: string
  fullWidth?: boolean
}

/** Segmented control with WAI-ARIA tab semantics and roving focus (arrows / Home / End). */
export function SegmentedTabs<T extends string>({
  label,
  options,
  value,
  onChange,
  controls,
  size = 'md',
  className,
  fullWidth,
}: Props<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = options.length - 1
    const next =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    onChange(options[next].value)
    refs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        'inline-flex max-w-full gap-1 rounded-xl border border-line bg-surface p-1',
        fullWidth && 'flex w-full',
        className,
      )}
    >
      {options.map((opt, i) => {
        const selected = opt.value === value
        return (
          <button
            key={opt.value}
            ref={(el) => {
              refs.current[i] = el
            }}
            id={opt.id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={controls}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              'inline-flex min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-[background-color,color,box-shadow] duration-200 ease-out-cubic',
              size === 'lg' ? 'h-11 px-4 text-[0.9375rem] sm:px-5' : 'h-9 px-3 text-sm sm:px-4',
              fullWidth && 'flex-1',
              selected
                ? 'bg-white text-navy shadow-card font-semibold'
                : 'text-ink-500 hover:text-navy',
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
