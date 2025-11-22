import { useFormContext } from '@utils/context/FormContext/useFormContext'
import { JSX, useEffect, useState } from 'react'
import styles from './SecondStep.module.css'

/**
 * SecondStep
 * @description This is the SecondStep of the application.
 * @returns {JSX.Element} The JSX element representing the SecondStep.
 */
export default function SecondStep({
  needValidateToNextStep,
  setNeedValidateToNextStep,
}: {
  needValidateToNextStep: boolean
  setNeedValidateToNextStep: (v: boolean) => void
}): JSX.Element {
  const { updateFormData, formData } = useFormContext()
  const [errors, setErrors] = useState<{ plan?: string }>({})

  const plansAndPrices = {
    arcade: 9,
    advanced: 12,
    pro: 15,
  }

  useEffect(() => {
    if (!needValidateToNextStep) {
      return
    }

    if (!formData.plan) {
      setErrors({ plan: 'Select your plan to proceed' })
    } else {
      setErrors({})
    }

    setNeedValidateToNextStep(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needValidateToNextStep])

  return (
    <div className={styles.secondStep}>
      <div className={styles.planContainer}>
        {Object.entries(plansAndPrices).map(([key, value]) => {
          const checked = formData.plan === key

          return (
            <div
              key={key}
              onClick={() => {
                updateFormData({ plan: key })
                setErrors({})
              }}
              className={checked ? styles.checked + ' ' + styles.plan : styles.plan}
            >
              <img src={`/assets/images/icon-${key}.svg`} alt={key} />

              <div className={styles.planInfo}>
                <span className={styles.planName}>{key}</span>
                <span className={styles.planPrice}>${value}/mo</span>
                {formData.recurrence === 'yearly' && <span className={styles.planChecked}>2 months free</span>}
              </div>
            </div>
          )
        })}
      </div>

      {errors.plan && <span className={styles.error}>{errors.plan}</span>}

      <div className={styles.recurrenceContainer}>
        <span className={formData.recurrence === 'monthly' ? styles.switchTextChecked : ''}>Monthly</span>

        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={formData.recurrence === 'yearly'}
            onChange={() =>
              updateFormData({
                recurrence: formData.recurrence === 'yearly' ? 'monthly' : 'yearly',
              })
            }
          />
          <span className={styles.slider}></span>
        </label>

        <span className={formData.recurrence === 'yearly' ? styles.switchTextChecked : ''}>Yearly</span>
      </div>
    </div>
  )
}
