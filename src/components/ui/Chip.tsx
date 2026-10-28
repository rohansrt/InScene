import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Chip({
  active,
  className,
  ...rest
}: { active: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        'inline-flex h-8 items-center rounded-full border px-3.5 text-[0.8125rem] font-medium transition-colors duration-150',
        active
          ? 'border-blue/40 bg-blue-50 text-blue-700'
          : 'border-line bg-white text-ink-600 hover:border-ink-400/50 hover:text-navy',
        className,
      )}
      {...rest}
    />
  )
}

export function Badge({ className, tone = 'neutral', children }: { className?: string; tone?: 'neutral' | 'blue' | 'teal' | 'navy'; children: React.ReactNode }) {
  const tones = {
    neutral: 'bg-surface text-ink-600 ring-line',
    blue: 'bg-blue-50 text-blue-700 ring-blue/15',
    teal: 'bg-teal-50 text-teal-700 ring-teal/20',
    navy: 'bg-white/90 text-navy ring-navy/10 backdrop-blur',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium leading-none ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
