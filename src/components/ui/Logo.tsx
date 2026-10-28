import { brand } from '../../config/brand'
import { cn } from '../../lib/cn'

/**
 * Official InScene mark + wordmark. The mark image comes from `brand.markSrc`,
 * so replacing that file (or the config value) updates the logo everywhere.
 */
export function Logo({ className, markOnly = false }: { className?: string; markOnly?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <img src={brand.markSrc} alt="" width={34} height={40} className="h-8 w-auto" />
      {markOnly ? (
        <span className="sr-only">{brand.name}</span>
      ) : (
        <span className="text-[1.3125rem] font-bold leading-none tracking-[-0.035em] max-[359px]:sr-only">
          <span className="text-navy">In</span>
          <span className="text-blue">Scene</span>
        </span>
      )}
    </span>
  )
}
