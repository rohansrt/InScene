import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { coreDone } from '../engine/results'
import { Mission } from '../screens/Mission'
import { Reflect } from '../screens/Reflect'
import { Results } from '../screens/Results'
import { Team } from '../screens/Team'
import { useCareer } from '../store'

const titles = {
  team: 'Meet the team',
  mission: 'Rain Ready',
  reflect: 'Reflect',
  results: 'Rain Ready results',
} as const

/** The Rain Ready simulation: optional, and unlocked by finishing the core profile. */
export default function RainReady() {
  const { state, update } = useCareer()
  const ready = coreDone(state)
  const stage = state.missionStage ?? 'team'
  useDocumentTitle(`${titles[stage]} · Career Simulator`, 'Rain Ready: stop a neighbourhood flooding with a scientist, a planner and an engineer.')
  useEffect(() => {
    if (ready && !state.missionStage) update((s) => ({ ...s, missionStage: 'team' }))
  }, [ready, state.missionStage, update])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [stage])

  if (!ready) return <Navigate to="/career/play" replace />

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-8 pt-6 sm:px-6 sm:pt-8" data-testid="career-mission" data-stage={stage}>
      {stage === 'team' && <Team />}
      {stage === 'mission' && <Mission />}
      {stage === 'reflect' && <Reflect />}
      {stage === 'results' && <Results />}
    </div>
  )
}
