import { JSX } from 'react'
import StepsContent from '@components/StepsContent'
import StepsMenu from '@components/StepsMenu'
import styles from './StepContainer.module.css'

/**
 * StepContainer Component
 * @description This is the StepContainer component of the application.
 * @returns {JSX.Element} The JSX element representing the StepContainer component.
 */
export default function StepContainer({
  children,
  nextStep,
}: {
  children: React.ReactNode
  nextStep: (step: number) => void
}): JSX.Element {
  return (
    <div className={styles.stepContainer}>
      <StepsMenu />
      <StepsContent children={children} nextStep={nextStep} />
    </div>
  )
}
