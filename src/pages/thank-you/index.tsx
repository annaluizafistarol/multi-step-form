import { JSX, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormContext } from '@utils/context/FormContext/useFormContext'
import StepsMenu from '@components/StepsMenu'
import styles from './ThankYou.module.css'

/**
 * ThankYou Component
 * @description This is the ThankYou component of the application.
 * @returns {JSX.Element} The JSX element representing the ThankYou component.
 */
export default function ThankYou(): JSX.Element {
  const { formData, confirmed } = useFormContext()
  const navigate = useNavigate()

  // Function to get the allowed step based on form data
  const getAllowedStep = (): number => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      return 1
    }

    if (!formData.plan) {
      return 2
    }

    return 4
  }

  // UseEffect to redirect to the correct step
  useEffect(() => {
    const allowed = getAllowedStep()

    if (allowed !== 4 || !confirmed) {
      navigate(`/step-${allowed}`, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, confirmed, navigate])

  return (
    <div className={styles.stepContainer}>
      <StepsMenu />
      <section className={styles.stepsContentSection}>
        <div className={styles.stepsContentDiv}>
          <div className={styles.stepsContent}>
            <img src="/assets/images/icon-thank-you.svg" alt="Thank you icon" className={styles.thankYouIcon} />

            <h1 className={styles.thankYouTitle}>Thank you!</h1>

            <p className={styles.thankYouDescription}>
              Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need
              support, please feel free to email us at support@loremgaming.com.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
