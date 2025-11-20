import { useFormContext } from '@utils/context/FormContext/useFormContext'
import { JSX, useEffect, useState } from 'react'
import styles from './FirstStep.module.css'

/**
 * FirstStep
 * @description This is the FirstStep of the application.
 * @returns {JSX.Element} The JSX element representing the FirstStep.
 */
export default function FirstStep({
  needValidateToNextStep,
  setNeedValidateToNextStep,
}: {
  needValidateToNextStep: boolean
  setNeedValidateToNextStep: (value: boolean) => void
}): JSX.Element {
  const { updateFormData, formData } = useFormContext()

  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    phone?: string
  }>({})

  // UseEffect: Validate inputs
  useEffect(() => {
    if (!needValidateToNextStep) {
      return
    }

    const newErrors: typeof errors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'This field is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'This field is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Looks like this is not an email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'This field is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number'
    }

    setErrors(newErrors)
    setNeedValidateToNextStep(false)
  }, [needValidateToNextStep, formData, setNeedValidateToNextStep])

  // Validate email: email
  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Validate phone: 6 to 20 digits
  function validatePhone(phone: string) {
    return /^[0-9+\-\s]{6,20}$/.test(phone)
  }

  // Handle input change: name, email, phone
  function handleInputChange(field: 'name' | 'email' | 'phone', value: string) {
    updateFormData({ [field]: value })
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <form className={styles.firstStep} noValidate>
      {/* Name */}
      <div className={styles.formGroup}>
        <div className={styles.headForm}>
          <label htmlFor="name">Name</label>
          {errors.name && <span>{errors.name}</span>}
        </div>

        <input
          type="text"
          id="name"
          placeholder="e.g. Stephen King"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          style={errors.name ? { border: '1px solid red' } : {}}
        />
      </div>

      {/* Email */}
      <div className={styles.formGroup}>
        <div className={styles.headForm}>
          <label htmlFor="email">Email Address</label>
          {errors.email && <span>{errors.email}</span>}
        </div>

        <input
          type="email"
          id="email"
          placeholder="e.g. stephenking@lorem.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          style={errors.email ? { border: '1px solid red' } : {}}
        />
      </div>

      {/* Phone */}
      <div className={styles.formGroup}>
        <div className={styles.headForm}>
          <label htmlFor="phone">Phone Number</label>
          {errors.phone && <span>{errors.phone}</span>}
        </div>

        <input
          type="tel"
          id="phone"
          placeholder="e.g. +1 234 567 890"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          style={errors.phone ? { border: '1px solid red' } : {}}
        />
      </div>
    </form>
  )
}
