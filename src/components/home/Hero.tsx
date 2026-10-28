import { ArrowRight, ArrowDown } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { brand } from '../../config/brand'
import { assetUrl, imageRegistry } from '../../assets'
import { ButtonLink, ButtonAnchor } from '../ui/Button'
import { ScenarioImage } from '../simulation/ScenarioImage'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(60%_50%_at_70%_0%,rgb(37_99_235/0.07),transparent_70%),radial-gradient(40%_40%_at_10%_10%,rgb(18_184_166/0.06),transparent_70%)]" />
      <div className="container-site grid items-center gap-6 pb-20 pt-10 sm:gap-8 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-28 lg:pt-20">
        <div className="contents lg:block">
          <h1 className="display order-1 max-w-[13ch]">{brand.tagline}</h1>
          <p className="lead order-2 max-w-[34rem] text-ink-500 lg:mt-6">
            Step into realistic, AI-driven scenarios, make decisions and learn from how they play out.
          </p>
          <div className="order-4 flex flex-col gap-3 sm:flex-row lg:mt-9">
            <ButtonLink to="/products" size="lg">
              Explore Simulations
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonAnchor href="#how-it-works" variant="secondary" size="lg">
              How It Works
              <ArrowDown className="size-4" aria-hidden="true" />
            </ButtonAnchor>
          </div>
        </div>

        <div className="order-3 min-w-0 lg:order-none lg:col-start-2 lg:row-start-1">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}

function HeroVisual() {
  const { search } = useLocation()
  const concept = import.meta.env.DEV ? new URLSearchParams(search).get('hero') : null
  const conceptDescriptions: Record<string, string> = {
    doorway: 'An open blue doorway into a shaded learning courtyard',
    'decision-landscape': 'A branching blue path connecting everyday learning environments',
    'scenario-stage': 'A miniature classroom, courtyard and civic counter connected by a blue path',
  }
  if (concept && conceptDescriptions[concept]) {
    return <img src={assetUrl(`images/homepage/hero-concepts/${concept}.webp`)} alt={conceptDescriptions[concept]} width={1200} height={900} className="aspect-[16/11] w-full rounded-[24px] object-cover shadow-lift lg:aspect-[4/3]" />
  }
  if (imageRegistry['home.hero']) {
    return (
      <ScenarioImage
        imageKey="home.hero"
        alt="An open blue doorway leads into a learning scenario"
        tone="brand"
        aspect="aspect-[16/11] lg:aspect-[4/3]"
        className="rounded-[24px] shadow-lift"
        priority
      />
    )
  }
  // Placeholder composition until the hero illustration is produced.
  return (
    <div
      className="relative aspect-[16/11] overflow-hidden rounded-[24px] bg-[linear-gradient(140deg,#f1f5fe_0%,#e4edfc_45%,#e0f4f2_100%)] shadow-[0_0_0_1px_rgb(16_36_58/0.06),0_30px_60px_-30px_rgb(16_36_58/0.35)] lg:aspect-[4/3]"
      data-image-key="home.hero"
      data-placeholder="true"
      aria-hidden="true"
    >
      <div className="bg-grid absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_80%)]" />
      <div className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/15 blur-3xl" />
      {/* receding scene layers */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-2xl border border-white/90 bg-white/40 shadow-[0_10px_30px_-12px_rgb(16_36_58/0.25)] backdrop-blur-[2px]"
          style={{
            left: `${14 + i * 9}%`,
            top: `${16 + i * 5}%`,
            width: `${46 - i * 4}%`,
            height: `${66 - i * 10}%`,
            opacity: 1 - i * 0.22,
            transform: `perspective(900px) rotateY(${18 - i * 4}deg)`,
          }}
        />
      ))}
      <div className="absolute inset-y-0 right-[16%] flex items-center">
        <img src={brand.markLargeSrc} alt="" width={320} height={376} className="h-auto w-[clamp(84px,17vw,150px)] drop-shadow-[0_18px_30px_rgb(37_99_235/0.35)]" />
      </div>
    </div>
  )
}
