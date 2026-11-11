import { useNavigate } from 'react-router-dom'
import { RAIN_READY_PATH } from '../engine/results'
import { useCareer } from '../store'

/** Opens Rain Ready, starting it if this is the first visit. */
export function useOpenRainReady() {
  const { update } = useCareer()
  const navigate = useNavigate()
  return () => {
    update((s) => (s.missionStage ? s : { ...s, missionStage: 'team' }))
    navigate(RAIN_READY_PATH)
  }
}
