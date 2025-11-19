import { useFormContext } from '@utils/context/FormContext/useFormContext'
import { JSX } from 'react/jsx-runtime'
import styles from './stepsContent.module.css'

/**
 * StepsContent Component
 * @description This is the StepsContent component of the application.
 * @returns {JSX.Element} The JSX element representing the StepsContent component.
 */
export default function StepsContent({
  children,
  nextStep,
}: {
  children: React.ReactNode
  nextStep: (step: number) => void
}): JSX.Element {
  const { currentStep } = useFormContext()
  const content = [
    {
      stepNumber: 1,
      stepTitle: 'Personal info',
      stepDescription: 'Please provide your name, email address, and phone number.',
    },
    {
      stepNumber: 2,
      stepTitle: 'Select your plan',
      stepDescription: 'You have the option of monthly or yearly billing.',
    },
    {
      stepNumber: 3,
      stepTitle: 'Pick add-ons',
      stepDescription: 'Add-ons help enhance your gaming experience.',
    },
    {
      stepNumber: 4,
      stepTitle: 'Finishing up',
      stepDescription: 'Double-check everything looks OK before confirming.',
    },
  ]

  return (
    <section className={styles.stepsContentSection}>
      <div className={styles.stepsContentDiv}>
        <div className={styles.stepsContent}>
          <h2 className={styles.stepTitle}>{content[currentStep - 1].stepTitle}</h2>
          <p className={styles.stepDescription}>{content[currentStep - 1].stepDescription}</p>

          <div className={styles.stepContentChildren}>{children}</div>
        </div>

        <div className={styles.stepsButtons}>
          {currentStep > 1 && (
            <button type="button" onClick={() => window.history.back()} className={styles.backButton}>
              Go Back
            </button>
          )}

          <button
            type="button"
            onClick={() => nextStep(currentStep)}
            className={currentStep < 4 ? styles.nextButton : styles.confirmButton}
          >
            {currentStep < 4 ? 'Next Step' : 'Confirm'}
          </button>
        </div>
      </div>
    </section>
  )
}
