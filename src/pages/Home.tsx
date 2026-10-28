import { CategoryShowcase } from '../components/home/CategoryShowcase'
import { FeaturedSimulations } from '../components/home/FeaturedSimulations'
import { FinalCta } from '../components/home/FinalCta'
import { Hero } from '../components/home/Hero'
import { HowItWorks } from '../components/home/HowItWorks'
import { WhyScenarioLearning } from '../components/home/WhyScenarioLearning'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle(
    undefined,
    'InScene by Anagat AI Solutions builds scenario-based learning: realistic situations, meaningful decisions and reflection, for police training institutions and schools.',
  )
  return (
    <>
      <Hero />
      <HowItWorks />
      <CategoryShowcase />
      <FeaturedSimulations />
      <WhyScenarioLearning />
      <FinalCta />
    </>
  )
}
