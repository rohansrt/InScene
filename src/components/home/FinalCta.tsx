import { ArrowRight } from 'lucide-react'
import { brand } from '../../config/brand'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

export function FinalCta() {
  return (
    <section className="pb-24 sm:pb-32">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-line bg-[linear-gradient(140deg,#f3f7fe_0%,#eaf1fd_50%,#e6f6f4_100%)] px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
            <img src={brand.markSrc} alt="" width={34} height={40} className="relative mx-auto h-12 w-auto" />
            <h2 className="h2 relative mx-auto mt-6 max-w-xl">Ready to step inside?</h2>
            <p className="lead relative mx-auto mt-4 max-w-lg text-ink-500">
              Browse the full catalog of police and school simulations, or talk to the team about your institution.
            </p>
            <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink to="/products" size="lg">
                Explore Simulations
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/reach-out" variant="secondary" size="lg">
                Reach Out
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
