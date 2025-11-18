import { useFormContext } from '@utils/context/FormContext/useFormContext'
import { JSX } from 'react/jsx-runtime'
import style from './style.module.css'

/**
 * StepsMenu Component
 * @description This is the StepsMenu component of the application.
 * @returns {JSX.Element} The JSX element representing the StepsMenu component.
 */
export default function StepsMenu(): JSX.Element {
  const { currentStep } = useFormContext()
  const steps = [
    {
      stepNumber: 1,
      stepText: 'Your Info',
    },
    {
      stepNumber: 2,
      stepText: 'Select Plan',
    },
    {
      stepNumber: 3,
      stepText: 'Add-ons',
    },
    {
      stepNumber: 4,
      stepText: 'Summary',
    },
  ]

  return (
    <>
      <div className={style.desktopStepsMenu}>
        <ul>
          {steps.map((step) => {
            return (
              <li key={step.stepNumber}>
                <button
                  className={
                    currentStep === step.stepNumber ? style.active + ' ' + style.stepsButton : style.stepsButton
                  }
                >
                  {step.stepNumber}
                </button>

                <div className={style.stepsDescription}>
                  <p>STEP {step.stepNumber}</p>
                  <h3>{step.stepText}</h3>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div className={style.mobileStepsMenu}>
        <ul>
          {steps.map((step) => {
            return (
              <li key={step.stepNumber}>
                <button
                  className={
                    currentStep === step.stepNumber ? style.active + ' ' + style.stepsButton : style.stepsButton
                  }
                >
                  {step.stepNumber}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
