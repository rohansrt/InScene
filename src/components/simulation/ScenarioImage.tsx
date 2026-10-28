import { imageRegistry } from '../../assets'
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

const toneStyles: Record<ImageTone, { from: string; to: string; orb: string }> = {
  police: { from: '#0d1f35', to: '#1e4fd0', orb: '#5b8cff' },
  school: { from: '#0b2f3a', to: '#0d8f86', orb: '#4fe0cf' },
  brand: { from: '#10243a', to: '#1f5fd6', orb: '#3fd2c0' },
}

/** Small deterministic hash so each scene gets its own composition. */
function seed(key: string) {
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return h
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
  const h = seed(imageKey)
  const angle = 120 + (h % 60)
  const orbX = 15 + (h % 50)
  const orbY = 10 + ((h >> 6) % 40)
  const tileSize = { sm: 'size-12', md: 'size-16', lg: 'size-24' }[iconSize]
  const glyph = { sm: 'size-5', md: 'size-7', lg: 'size-10' }[iconSize]

  return (
    <div
      className={cn('relative isolate overflow-hidden', aspect, className)}
      data-image-key={imageKey}
      data-placeholder="true"
      aria-hidden="true"
    >
      <div
        className={cn('absolute inset-0', zoom)}
        style={{ background: `linear-gradient(${angle}deg, ${t.from} 0%, ${t.to} 100%)` }}
      >
        <div
          className="absolute size-[70%] rounded-full opacity-50 blur-3xl"
          style={{ left: `${orbX}%`, top: `${orbY}%`, background: t.orb }}
        />
        <div className="absolute -bottom-1/4 -right-1/4 size-[60%] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.14)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative grid place-items-center">
            <span className="absolute size-[260%] rounded-full border border-white/10" />
            <span className="absolute size-[190%] rounded-full border border-white/15" />
            <span
              className={cn(
                'relative grid place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-sm shadow-[0_12px_30px_-10px_rgb(0_0_0/0.45)]',
                tileSize,
              )}
            >
              {icon ? <SimulationIcon name={icon} className={glyph} /> : null}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
