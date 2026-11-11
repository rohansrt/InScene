import { useNavigate } from 'react-router-dom'
import { ArrowRight, BookMarked, Clock, RotateCcw, School } from 'lucide-react'
import { getSimulationThumbnail } from '../../assets'
import { Button, ButtonLink } from '../../components/ui/Button'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { PassportStamps, ProfileSnapshot, SimulationPicker, StampCount } from '../components/Progress'
import { coreDone, missionDone } from '../engine/results'
import { useCareer } from '../store'

export default function CareerHome() {
  const { state, reset } = useCareer()
  const navigate = useNavigate()
  const art = getSimulationThumbnail('career-discovery')
  const started = state.stage !== 'welcome' || !!state.nickname
  const core = coreDone(state)
  useDocumentTitle('Career Simulator', 'Build your career profile in about 10 minutes, then try real work in career simulations and collect Passport stamps.')

  const startOver = () => {
    if (window.confirm('Start again? Your current answers and stamps on this device will be cleared.')) {
      reset()
      navigate('/career/play')
    }
  }

  if (core) {
    return (
      <div className="mx-auto w-full max-w-[1200px] space-y-6 px-4 pb-16 pt-6 sm:px-6 sm:pt-8" data-testid="career-home" data-core="done">
        <section className="animate-rise-in overflow-hidden rounded-[28px] bg-white shadow-card">
          <div className="career-night relative px-6 py-6 text-white sm:px-9 sm:py-8">
            <span className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
            <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">InScene · Career Passport</p>
                <h1 className="mt-2 text-[clamp(1.9rem,2.6vw+1rem,2.9rem)] font-[720] leading-tight tracking-[-0.035em] text-white">Welcome back, {state.nickname} 👋</h1>
                <p className="mt-1 text-white/80">{missionDone(state) ? 'Your profile is getting clearer. Keep collecting stamps.' : 'Your core profile is done. Pick a simulation to earn your next stamp.'}</p>
              </div>
              <ButtonLink to="/career/passport" variant="secondary" className="shrink-0"><BookMarked className="size-4" aria-hidden="true" />Open my Passport</ButtonLink>
            </div>
          </div>
          <div className="p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-500">Your stamps</h2>
              <StampCount state={state} />
            </div>
            <PassportStamps state={state} className="mt-4" />
          </div>
        </section>

        <ProfileSnapshot state={state} />

        <section className="space-y-4" aria-labelledby="choose-sim">
          <div>
            <p className="eyebrow text-violet">Choose what to explore</p>
            <h2 id="choose-sim" className="mt-1.5 text-[clamp(1.5rem,1.5vw+1rem,2rem)] font-[680] tracking-[-0.03em]">Simulations</h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-600">Pick any, in any order. Doing real work tells us more about you than any card, so every simulation you finish updates your profile.</p>
          </div>
          <SimulationPicker state={state} />
        </section>

        <SideLinks />
        <div className="flex justify-center">
          <Button variant="ghost" onClick={startOver}><RotateCcw className="size-4" aria-hidden="true" />Start over</Button>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="career-home" data-core="todo">
      <section className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:pt-14">
        <div className="animate-rise-in">
          <p className="eyebrow text-violet">Career Simulator · Ages 12–20</p>
          <h1 className="display mt-4 text-[clamp(2.4rem,3.6vw+1rem,4.25rem)]">
            Don’t just guess your career. <span className="bg-gradient-to-r from-blue to-violet bg-clip-text text-transparent">Try it.</span>
          </h1>
          <p className="lead mt-5 max-w-xl text-ink-600">
            Build your career profile in about 10 minutes. Then pick simulations to try real work, and collect a stamp for each one in your Career Passport.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {started ? (
              <>
                <Button size="lg" onClick={() => navigate('/career/play')} data-testid="career-continue">
                  Continue my profile
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
                <Button size="lg" variant="secondary" onClick={startOver}>
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Start over
                </Button>
              </>
            ) : (
              <Button size="lg" onClick={() => navigate('/career/play')} data-testid="career-start">
                Build my profile
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            )}
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-500">
            <Clock className="size-4" aria-hidden="true" /> About 10 minutes · Saves as you go · No sign-up
          </p>
        </div>
        <div className="relative animate-pop-in">
          <div className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-blue/20 via-violet/20 to-transparent blur-2xl" />
          {art && (
            <img
              src={art.src}
              srcSet={art.srcSet}
              sizes="(min-width: 1024px) 600px, 100vw"
              alt={art.alt}
              width={art.width}
              height={art.height}
              className="aspect-video w-full rounded-[28px] object-cover shadow-lift ring-1 ring-white/60"
            />
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] space-y-8 px-4 pb-16 sm:px-6">
        <div className="rounded-[24px] bg-white p-5 shadow-card sm:p-7" data-testid="home-passport">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold"><BookMarked className="size-5 text-violet" aria-hidden="true" />Your Career Passport</h2>
              <p className="mt-1 text-sm text-ink-500">Your first stamp comes from finishing your profile. Simulations add the rest.</p>
            </div>
            <StampCount state={state} />
          </div>
          <PassportStamps state={state} className="mt-5" />
        </div>

        <SideLinks />
      </section>
    </div>
  )
}

function SideLinks() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="flex items-start gap-4 rounded-2xl border border-line bg-white/70 p-5">
        <BookMarked className="mt-0.5 size-5 shrink-0 text-violet" aria-hidden="true" />
        <div>
          <p className="font-semibold text-navy">Your Career Passport</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-500">Stamps, your interest shape, careers to explore, skills you’ve shown and next steps, all in one place.</p>
          <ButtonLink to="/career/passport" variant="ghost" size="sm" className="-ml-3 mt-2">Open my Passport <ArrowRight className="size-4" aria-hidden="true" /></ButtonLink>
        </div>
      </div>
      <div className="flex items-start gap-4 rounded-2xl border border-line bg-white/70 p-5">
        <School className="mt-0.5 size-5 shrink-0 text-violet" aria-hidden="true" />
        <div>
          <p className="font-semibold text-navy">For schools and counsellors</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-500">See which career worlds a class has explored, where the gaps are, and what to talk about next.</p>
          <ButtonLink to="/career/school" variant="ghost" size="sm" className="-ml-3 mt-2">See the school view <ArrowRight className="size-4" aria-hidden="true" /></ButtonLink>
        </div>
      </div>
    </div>
  )
}
