import { imageRegistry } from '../../data/images'
import { cn } from '../../lib/cn'
import { SimulationIcon } from './SimulationIcon'

export type ImageTone = 'police' | 'school' | 'brand'

interface Props {
  imageKey: string
  /** Alt text used once real artwork exists. */
  alt: string
  tone: ImageTone
  icon?: string
  /** Tailwind aspect class, e.g. "aspect-video". The container keeps this ratio for placeholder and artwork alike. */
  aspect?: string
  className?: string
  priority?: boolean
  sizes?: string
  /** Enables the gentle zoom when an ancestor with `group` is hovered. */
  zoomOnHover?: boolean
  iconSize?: 'sm' | 'md' | 'lg'
}

const toneStyles: Record<ImageTone, { bg: string; tile: string; frame: string; glow: string }> = {
  police: {
    bg: 'bg-[linear-gradient(135deg,#edf2fb_0%,#dfe8f8_55%,#d3e0f7_100%)]',
    tile: 'text-navy',
    frame: 'border-navy/10',
    glow: 'bg-blue/20',
  },
  school: {
    bg: 'bg-[linear-gradient(135deg,#ecf8f7_0%,#e4f1fa_55%,#dde8fb_100%)]',
    tile: 'text-teal-700',
    frame: 'border-teal/20',
    glow: 'bg-teal/25',
  },
  brand: {
    bg: 'bg-[linear-gradient(135deg,#eef3fe_0%,#e3eefc_50%,#e2f5f3_100%)]',
    tile: 'text-blue',
    frame: 'border-blue/15',
    glow: 'bg-blue/20',
  },
}

/**
 * Renders registered artwork for `imageKey`, or a branded placeholder of identical
 * dimensions. Swapping placeholder → artwork never changes layout.
 */
export function ScenarioImage({
  imageKey,
  alt,
  tone,
  icon,
  aspect = 'aspect-video',
  className,
  priority,
  sizes,
  zoomOnHover,
  iconSize = 'md',
}: Props) {
  const asset = imageRegistry[imageKey]
  const zoom = zoomOnHover && 'transition-transform duration-500 ease-out-cubic group-hover:scale-[1.04] motion-safe-transform'

  if (asset) {
    return (
      <div className={cn('relative overflow-hidden bg-surface', aspect, className)} data-image-key={imageKey}>
        <img
          src={asset.src}
          srcSet={asset.srcSet}
          sizes={sizes}
          alt={asset.alt || alt}
          width={asset.width}
          height={asset.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cn('absolute inset-0 size-full object-cover', zoom)}
        />
      </div>
    )
  }

  const t = toneStyles[tone]
  const tileSize = { sm: 'size-11 rounded-xl', md: 'size-14 rounded-2xl', lg: 'size-20 rounded-[22px]' }[iconSize]
  const glyph = { sm: 'size-5', md: 'size-7', lg: 'size-9' }[iconSize]

  return (
    <div
      className={cn('relative isolate overflow-hidden', aspect, className)}
      data-image-key={imageKey}
      data-placeholder="true"
      aria-hidden="true"
    >
      <div className={cn('absolute inset-0', t.bg, zoom)}>
        <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className={cn('absolute left-1/2 top-1/2 size-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl', t.glow)} />
        {/* layered "scene frames", echoing the doorway mark */}
        <div className={cn('absolute left-[22%] top-[20%] h-[56%] w-[40%] -rotate-3 rounded-xl border bg-white/35', t.frame)} />
        <div className={cn('absolute left-[38%] top-[24%] h-[56%] w-[40%] rotate-2 rounded-xl border bg-white/45', t.frame)} />
        <div className="absolute inset-0 grid place-items-center">
          <div className={cn('grid place-items-center bg-white shadow-[0_8px_24px_-6px_rgb(16_36_58/0.18)] ring-1 ring-navy/5', tileSize, t.tile)}>
            {icon ? <SimulationIcon name={icon} className={glyph} /> : null}
          </div>
        </div>
      </div>
      {import.meta.env.DEV && (
        <span className="absolute bottom-2 left-2 rounded bg-white/80 px-1.5 py-0.5 font-mono text-[10px] text-ink-500">
          {imageKey}
        </span>
      )}
    </div>
  )
}
