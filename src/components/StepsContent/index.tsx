import { useFormContext } from '@utils/context/FormContext/useFormContext'
import { useNavigate } from 'react-router-dom'
import { JSX, useState } from 'react'
import FirstStep from '@components/FirstStep'
import SecondStep from '@components/SecondStep'
import styles from './stepsContent.module.css'

/**
 * StepsContent Component
 * @description This is the StepsContent component of the application.
 * @returns {JSX.Element} The JSX element representing the StepsContent component.
 */
export default function StepsContent(): JSX.Element {
  const { currentStep, formData, setCurrentStep } = useFormContext()
  const [needValidateToNextStep, setNeedValidateToNextStep] = useState(false)
  const navigate = useNavigate()

  function goToNext() {
    const step = content[currentStep - 1]

    const isValid = step.validate()

    if (!isValid) {
      return
    }

    const next = currentStep + 1

    setCurrentStep(next)
    navigate(`/step-${next}`)
  }

  const content = [
    {
      stepTitle: 'Personal info',
      stepDescription: 'Please provide your name, email address, and phone number.',
      children: (
        <FirstStep
          needValidateToNextStep={needValidateToNextStep}
          setNeedValidateToNextStep={setNeedValidateToNextStep}
        />
      ),
      validate: () => {
        setNeedValidateToNextStep(true)

        if (
          !formData.name.trim() ||
          !formData.email.trim() ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ||
          !formData.phone.trim() ||
          !/^[0-9+\-\s]{6,20}$/.test(formData.phone)
        ) {
          return false
        }

        return true
      },
    },
    {
      stepTitle: 'Select your plan',
      stepDescription: 'You have the option of monthly or yearly billing.',
      children: (
        <SecondStep
          needValidateToNextStep={needValidateToNextStep}
          setNeedValidateToNextStep={setNeedValidateToNextStep}
        />
      ),
      validate: () => {
        setNeedValidateToNextStep(true)

        if (!formData.plan) {
          return false
        }

        return true
      },
    },
    {
      stepTitle: 'Pick add-ons',
      stepDescription: 'Add-ons help enhance your gaming experience.',
      children: <div />,
      validate: () => formData.addons.length > 0,
    },
    {
      stepTitle: 'Finishing up',
      stepDescription: 'Double-check everything looks OK before confirming.',
      children: <div />,
      validate: () => true,
    },
  ]

  const step = content[currentStep - 1]

  return (
    <section className={styles.stepsContentSection}>
      <div className={styles.stepsContentDiv}>
        <div className={styles.stepsContent}>
          <h2 className={styles.stepTitle}>{step.stepTitle}</h2>
          <p className={styles.stepDescription}>{step.stepDescription}</p>

          <div className={styles.stepContentChildren}>{step.children}</div>
        </div>

        <div className={styles.stepsButtons}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => {
                const prev = currentStep - 1
                setCurrentStep(prev)
                navigate(`/step-${prev}`)
              }}
              className={styles.backButton}
            >
              Go Back
            </button>
          )}

          <button
            type="button"
            onClick={goToNext}
            className={currentStep < 4 ? styles.nextButton : styles.confirmButton}
          >
            {currentStep < 4 ? 'Next Step' : 'Confirm'}
          </button>
        </div>
      </div>
    </section>
  )
}
