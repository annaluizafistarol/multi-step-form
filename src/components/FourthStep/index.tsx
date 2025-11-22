import { useFormContext } from '@utils/context/FormContext/useFormContext'
import { JSX } from 'react'
import styles from './FourthStep.module.css'

/**
 * FourthStep
 * @description This is the FourthStep of the application.
 * @returns {JSX.Element} The JSX element representing the FourthStep.
 */
export default function FourthStep(): JSX.Element {
  const { formData } = useFormContext()

  const plansAndPrices = {
    arcade: 9,
    advanced: 12,
    pro: 15,
  }

  const addonsAndPrices = {
    'online-service': 1,
    'larger-storage': 2,
    'customizable-profile': 2,
  }

  return (
    <form className={styles.fourthStep} noValidate>
      <div className={styles.summaryContainer}>
        <div className={styles.planSummary}>
          <div className={styles.planInfo}>
            <span className={styles.planName}>
              {formData.plan} {formData.recurrence === 'yearly' ? '(Yearly)' : '(Monthly)'}
            </span>

            <a className={styles.changeLink} href="/step-1">
              Change
            </a>
          </div>

          <span className={styles.planPrice}>
            {formData.recurrence === 'yearly'
              ? `$${plansAndPrices[formData.plan as keyof typeof plansAndPrices] * 10}/yr`
              : `$${plansAndPrices[formData.plan as keyof typeof plansAndPrices]}/mo`}
          </span>
        </div>

        {formData.addons.length > 0 && <div className={styles.planDivider} />}

        <div className={styles.addOnsSummary}>
          {formData.addons.map((addon) => (
            <div key={addon} className={styles.addOnItem}>
              <span className={styles.addOnName}>{addon.replace(/-/g, ' ')}</span>
              <span className={styles.addOnPrice}>
                {formData.recurrence === 'yearly'
                  ? `+$${addonsAndPrices[addon as keyof typeof addonsAndPrices] * 10}/yr`
                  : `+$${addonsAndPrices[addon as keyof typeof addonsAndPrices]}/mo`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.totalContainer}>
        <span className={styles.totalLabel}>Total (per {formData.recurrence === 'yearly' ? 'year' : 'month'})</span>
        <span className={styles.totalPrice}>
          {formData.recurrence === 'yearly'
            ? `$${
                plansAndPrices[formData.plan as keyof typeof plansAndPrices] * 10 +
                formData.addons.reduce(
                  (acc, addon) => acc + addonsAndPrices[addon as keyof typeof addonsAndPrices] * 10,
                  0
                )
              }/yr`
            : `$${
                plansAndPrices[formData.plan as keyof typeof plansAndPrices] +
                formData.addons.reduce((acc, addon) => acc + addonsAndPrices[addon as keyof typeof addonsAndPrices], 0)
              }/mo`}
        </span>
      </div>
    </form>
  )
}
