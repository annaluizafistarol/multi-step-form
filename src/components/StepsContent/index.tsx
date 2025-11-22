import { useFormContext } from '@utils/context/FormContext/useFormContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { JSX, useEffect, useState, useCallback } from 'react'
import FirstStep from '@components/FirstStep'
import SecondStep from '@components/SecondStep'
import ThirdStep from '@components/ThirdStep'
import FourthStep from '@components/FourthStep'
import styles from './stepsContent.module.css'

/**
 * StepsContent Component
 * @description This is the StepsContent component of the application.
 * @returns {JSX.Element} The JSX element representing the StepsContent component.
 */
export default function StepsContent(): JSX.Element {
  const { currentStep, formData, setCurrentStep } = useFormContext()
  const [stepsValidation, setStepsValidation] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  })

  const navigate = useNavigate()
  const location = useLocation()

  const getAllowedStep = useCallback(() => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      return 1
    }

    if (!formData.plan) {
      return 2
    }

    if (formData.addons.length === 0) {
      return 3
    }

    return 4
  }, [formData])

  useEffect(() => {
    const match = location.pathname.match(/step-(\d+)/)

    if (match) {
      const routeStep = Number(match[1])

      if (routeStep !== currentStep) {
        setCurrentStep(routeStep)
      }
    } else {
      if (currentStep !== 1) {
        setCurrentStep(1)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    const match = location.pathname.match(/step-(\d+)/)
    const routeStep = match ? Number(match[1]) : 1
    const allowedStep = getAllowedStep()

    if (routeStep > allowedStep) {
      setCurrentStep(allowedStep)
      navigate(`/step-${allowedStep}`, { replace: true })
    } else if (routeStep !== currentStep) {
      setCurrentStep(routeStep)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, currentStep, formData, navigate, getAllowedStep])

  function goToNext() {
    const step = content[currentStep - 1]
    const isValid = step.validate()

    if (!isValid) {
      setStepsValidation((prev) => ({ ...prev, [currentStep]: true }))
      return
    }

    setStepsValidation((prev) => ({ ...prev, [currentStep]: true }))

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
          needValidateToNextStep={stepsValidation[1]}
          setNeedValidateToNextStep={(v) => setStepsValidation((prev) => ({ ...prev, 1: v }))}
        />
      ),
      validate: () => {
        return (
          !!formData.name.trim() &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
          /^[0-9+\-\s]{6,20}$/.test(formData.phone)
        )
      },
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
      validate: () => true,
    },
    {
      stepTitle: 'Finishing up',
      stepDescription: 'Double-check everything looks OK before confirming.',
      children: <FourthStep />,
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
            onClick={currentStep < 4 ? goToNext : () => navigate('/thank-you')}
            className={currentStep < 4 ? styles.nextButton : styles.confirmButton}
          >
            {currentStep < 4 ? 'Next Step' : 'Confirm'}
          </button>
        </div>
      </div>
    </section>
  )
}
