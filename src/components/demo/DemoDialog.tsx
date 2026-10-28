import { useEffect, useId, useRef, useState, type RefObject } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, GraduationCap, Play, ShieldHalf } from 'lucide-react'
import { brand } from '../../config/brand'
import { categoryLabels, simulations, type Category } from '../../data/simulations'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { ComingSoonPanel } from '../simulation/ComingSoonPanel'

const options: Array<{ value: Category; icon: typeof GraduationCap; blurb: string }> = [
  {
    value: 'police',
    icon: ShieldHalf,
    blurb: 'Public order, first response, community safety, cyber first response and incident coordination.',
  },
  {
    value: 'school',
    icon: GraduationCap,
    blurb: 'Academic and non-academic scenarios for Grades 6–8, 9–10 and 11–12.',
  },
]

export function DemoDialog({ onClose, returnFocusRef }: { onClose: () => void; returnFocusRef: RefObject<HTMLElement | null> }) {
  const [view, setView] = useState<'intro' | 'coming-soon'>('intro')
  const [category, setCategory] = useState<Category>('police')
  const navigate = useNavigate()
  const uid = useId()
  const titleId = `${uid}-title`
  const soonId = `${uid}-soon`
  const count = simulations.filter((s) => s.category === category).length
  const playRef = useRef<HTMLButtonElement>(null)
  const returned = useRef(false)
  useEffect(() => {
    if (view === 'intro' && returned.current) playRef.current?.focus()
    if (view === 'coming-soon') returned.current = true
  }, [view])

  return (
    <Dialog
      open
      onClose={onClose}
      labelledBy={view === 'intro' ? titleId : soonId}
      describedBy={view === 'intro' ? `${uid}-desc` : undefined}
      returnFocusRef={returnFocusRef}
      className="sm:max-w-[600px]"
      closeLabel="Close demo dialog"
    >
      {view === 'coming-soon' ? (
        <ComingSoonPanel
          titleId={soonId}
          message="The interactive InScene demo is coming soon. In the meantime, you can preview every simulation in the catalog."
          actions={
            <>
              <Button variant="secondary" onClick={() => setView('intro')}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back
              </Button>
              <Button onClick={() => navigate(`/products?category=${category}`)}>
                Browse {categoryLabels[category]}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </>
          }
        />
      ) : (
        <div className="px-6 pb-7 pt-9 sm:px-9 sm:pb-9 sm:pt-10" data-testid="demo-dialog">
          <img src={brand.markSrc} alt="" width={34} height={40} className="h-10 w-auto" />
          <h2 id={titleId} className="mt-5 text-[1.75rem] font-[650] tracking-[-0.03em]">
            Experience InScene
          </h2>
          <p id={`${uid}-desc`} className="mt-2.5 leading-relaxed text-ink-500">
            Step into a realistic situation, talk with the people in it, make decisions and see how things unfold — then
            reflect on what you would do differently. Choose a track to preview.
          </p>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-navy">Choose a training track</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {options.map(({ value, icon: Icon, blurb }) => {
                const selected = value === category
                return (
                  <label
                    key={value}
                    className={cn(
                      'relative flex cursor-pointer flex-col rounded-xl border p-4 transition-[border-color,box-shadow,background-color] duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue',
                      selected ? 'border-blue bg-blue-50/60 shadow-[0_0_0_1px_var(--color-blue)]' : 'border-line hover:border-ink-400/60',
                    )}
                  >
                    <input
                      type="radio"
                      name={`${uid}-track`}
                      value={value}
                      checked={selected}
                      onChange={() => setCategory(value)}
                      className="sr-only"
                    />
                    <span className="flex items-center justify-between">
                      <Icon className={cn('size-5', selected ? 'text-blue' : 'text-navy')} aria-hidden="true" />
                      <span
                        aria-hidden="true"
                        className={cn('size-4 rounded-full border-2', selected ? 'border-blue bg-[radial-gradient(var(--color-blue)_40%,white_45%)]' : 'border-ink-400/60')}
                      />
                    </span>
                    <span className="mt-3 font-semibold text-navy">{categoryLabels[value]}</span>
                    <span className="mt-1 text-sm leading-relaxed text-ink-500">{blurb}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="ghost" onClick={() => navigate(`/products?category=${category}`)} className="-ml-2 justify-start">
              Browse {count} {category === 'police' ? 'police' : 'school'} simulations
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button ref={playRef} size="lg" onClick={() => setView('coming-soon')} data-testid="play-demo">
              <Play className="size-4 fill-current" aria-hidden="true" />
              Play Demo
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  )
}
