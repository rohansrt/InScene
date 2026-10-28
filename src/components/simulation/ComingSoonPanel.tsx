import { useEffect, useRef, type ReactNode } from 'react'
import { brand } from '../../config/brand'

interface Props {
  titleId: string
  heading?: string
  message?: string
  context?: ReactNode
  actions: ReactNode
}

export function ComingSoonPanel({
  titleId,
  heading = 'Your next learning experience is on its way.',
  message = 'Interactive simulations are coming soon to InScene.',
  context,
  actions,
}: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <div className="relative flex flex-col items-center px-6 pb-10 pt-14 text-center sm:px-12 sm:pb-14 sm:pt-16" data-testid="coming-soon">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgb(37_99_235/0.10),transparent_70%)]" />
      <div className="relative mb-7 grid size-20 place-items-center rounded-[22px] bg-white shadow-[0_12px_32px_-10px_rgb(16_36_58/0.25)] ring-1 ring-navy/5">
        <img src={brand.markSrc} alt="" width={34} height={40} className="h-11 w-auto" />
        <span className="absolute -right-1.5 -top-1.5 flex size-4">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal/60 motion-reduce:hidden" />
          <span className="relative inline-flex size-4 rounded-full border-2 border-white bg-teal" />
        </span>
      </div>
      <p className="eyebrow mb-3 text-teal-700">Coming soon</p>
      <h2
        id={titleId}
        ref={headingRef}
        tabIndex={-1}
        className="max-w-md text-2xl font-[640] tracking-[-0.025em] outline-none sm:text-[1.75rem]"
      >
        {heading}
      </h2>
      <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-500">{message}</p>
      {context && <div className="mt-5">{context}</div>}
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">{actions}</div>
    </div>
  )
}
