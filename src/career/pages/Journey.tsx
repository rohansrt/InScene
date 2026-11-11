import { useEffect } from 'react'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { QuickStart } from '../screens/QuickStart'
import { Reveal } from '../screens/Reveal'
import { Welcome } from '../screens/Welcome'
import { useCareer } from '../store'

const titles = {
  welcome: 'Welcome',
  quickstart: 'Quick Start',
  reveal: 'Your Career Profile',
} as const

/** The core profile: required, and always first. Simulations live on their own routes. */
export default function Journey() {
  const { state } = useCareer()
  useDocumentTitle(`${titles[state.stage]} · Career Simulator`, 'Build your career profile, then choose simulations to try real work.')
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [state.stage])

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-8 pt-6 sm:px-6 sm:pt-8" data-testid="career-journey" data-stage={state.stage}>
      {state.stage === 'welcome' && <Welcome />}
      {state.stage === 'quickstart' && <QuickStart />}
      {state.stage === 'reveal' && <Reveal />}
    </div>
  )
}
