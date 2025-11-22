import { useFormContext } from '@utils/context/FormContext/useFormContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { JSX, useEffect, useState } from 'react'
import FirstStep from '@components/FirstStep'
import SecondStep from '@components/SecondStep'
import ThirdStep from '@components/ThirdStep'
import FourthStep from '@components/FourthStep'
import styles from './StepsContent.module.css'

/**
 * StepsContent Component
 * @description This is the StepsContent component of the application.
 * @returns {JSX.Element} The JSX element representing the StepsContent component.
 */
export default function StepsContent(): JSX.Element {
  const { currentStep, setCurrentStep, formData, setConfirmed } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [stepsValidation, setStepsValidation] = useState({ 1: false, 2: false, 3: false, 4: false })

  const content = [
    {
      stepTitle: 'Personal info',
      stepDescription: 'Please provide your name, email address, and phone number.',
      children: (
        <FirstStep
          needValidateToNextStep={stepsValidation[1]}
          setNeedValidateToNextStep={(v) => setStepsValidation((prev) => ({ ...prev, 1: v }))}
        />
      ),
      validate: () =>
        !!formData.name.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        /^[0-9+\-\s]{6,20}$/.test(formData.phone),
    },
    {
      stepTitle: 'Select your plan',
      stepDescription: 'You have the option of monthly or yearly billing.',
      children: (
        <SecondStep
          needValidateToNextStep={stepsValidation[2]}
          setNeedValidateToNextStep={(v) => setStepsValidation((prev) => ({ ...prev, 2: v }))}
        />
      ),
      validate: () => !!formData.plan,
    },
    {
      stepTitle: 'Pick add-ons',
      stepDescription: 'Add-ons help enhance your gaming experience.',
      children: <ThirdStep />,
    },
    {
      stepTitle: 'Finishing up',
      stepDescription: 'Double-check everything looks OK before confirming.',
      children: <FourthStep />,
    },
  ]

  const current = content[currentStep - 1]

  const getAllowedStep = (): number => {
    if (!content[0].validate!()) {
      return 1
    }

    if (!content[1].validate!()) {
      return 2
    }

    return 4
  }

  // UseEffect to handle route changes and step validation
  useEffect(() => {
    const match = location.pathname.match(/step-(\d+)/)
    const routeStep = match ? Number(match[1]) : 1
    const maxStep = getAllowedStep()

    if (routeStep > maxStep) {
      setCurrentStep(maxStep)
      navigate(`/step-${maxStep}`, { replace: true })
    } else if (routeStep >= 1 && routeStep <= 4 && routeStep !== currentStep) {
      setCurrentStep(routeStep)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, currentStep, formData, navigate, setCurrentStep])

  // Function to handle next step
  function goNext() {
    const isValid = current.validate ? current.validate() : true

    if (!isValid) {
      setStepsValidation((prev) => ({ ...prev, [currentStep]: true }))
      return
    }

    setStepsValidation((prev) => ({ ...prev, [currentStep]: true }))

    if (currentStep < 4) {
      const next = currentStep + 1
      setCurrentStep(next)
      navigate(`/step-${next}`)
    } else {
      setConfirmed(true)
      navigate('/thank-you')
    }
  }

  return (
    <section className={styles.stepsContentSection}>
      <div className={styles.stepsContentDiv}>
        <div className={styles.stepsContent}>
          <h2 className={styles.stepTitle}>{current.stepTitle}</h2>
          <p className={styles.stepDescription}>{current.stepDescription}</p>
          <div className={styles.stepContentChildren}>{current.children}</div>
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
          <button type="button" onClick={goNext} className={currentStep < 4 ? styles.nextButton : styles.confirmButton}>
            {currentStep < 4 ? 'Next Step' : 'Confirm'}
          </button>
        </div>
      </div>
    </section>
  )
}
