import { useFormContext } from '@utils/context/FormContext/useFormContext'
import { JSX } from 'react'
import styles from './ThirdStep.module.css'

/**
 * ThirdStep
 * @description This is the ThirdStep of the application.
 * @returns {JSX.Element} The JSX element representing the ThirdStep.
 */
export default function ThirdStep(): JSX.Element {
  const { updateFormData, formData } = useFormContext()

  const addons = [
    {
      title: 'Online service',
      description: 'Access to multiplayer games',
      priceMonthly: 1,
      priceYearly: 10,
      key: 'online-service',
    },
    {
      title: 'Larger storage',
      description: 'Extra 1TB of cloud save',
      priceMonthly: 2,
      priceYearly: 20,
      key: 'larger-storage',
    },
    {
      title: 'Customizable profile',
      description: 'Custom theme on your profile',
      priceMonthly: 2,
      priceYearly: 20,
      key: 'customizable-profile',
    },
  ]

  return (
    <form className={styles.thirdStep} noValidate>
      {addons.map((addon) => {
        const checked = formData.addons.includes(addon.key)

        return (
          <label key={addon.key} htmlFor={addon.key} className={`${styles.addon} ${checked ? styles.checked : ''}`}>
            <input
              id={addon.key}
              type="checkbox"
              checked={checked}
              onChange={() => {
                let newAddons: string[] = []

                if (checked) {
                  newAddons = formData.addons.filter((a) => a !== addon.key)
                } else {
                  newAddons = [...formData.addons, addon.key]
                }

                updateFormData({ addons: newAddons })
              }}
              className={styles.checkbox}
            />

            <div className={styles.addonInfo}>
              <span className={styles.addonName}>{addon.title}</span>
              <span className={styles.addonDescription}>{addon.description}</span>
            </div>

            <span className={styles.addonPrice}>
              +$
              {formData.recurrence === 'monthly' ? addon.priceMonthly : addon.priceYearly}/
              {formData.recurrence === 'monthly' ? 'mo' : 'yr'}
            </span>
          </label>
        )
      })}
    </form>
  )
}
