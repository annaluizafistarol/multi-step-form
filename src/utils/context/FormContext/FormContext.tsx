import { FormContext, TFormData, TFormContext } from './context'
import { useEffect, useState, ReactNode, JSX, useRef } from 'react'
import { decrypt, encrypt } from '@utils/helpers/crypto'

/**
 * Form provider
 * @description This is the Form provider of the application.
 * @returns {JSX.Element} The JSX element representing the Form provider.
 */
export default function FormProvider({ children }: { children: ReactNode }): JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(1)

  const [formData, setFormData] = useState<TFormData>({
    name: '',
    email: '',
    phone: '',
    plan: '',
    recurrence: 'monthly',
    addons: [],
  })

  const isHydrated = useRef(false) // Used to avoid hydration error while we check for localStorage

  // useEffect: First load form data
  useEffect(() => {
    const saved = localStorage.getItem('form-data')

    if (!saved) {
      isHydrated.current = true
      return
    }

    try {
      const parsed = JSON.parse(saved)

      decrypt(parsed)
        .then((result) => {
          if (result) {
            setFormData(result)
            validateSteps(result)
          }
        })
        .finally(() => {
          isHydrated.current = true
        })
    } catch (error) {
      console.error('Error decrypting data', error)
      localStorage.removeItem('form-data')
      isHydrated.current = true
    }
  }, [])

  // useEffect: Save form data
  useEffect(() => {
    if (!isHydrated.current) {
      return
    }

    async function save() {
      const encrypted = await encrypt(formData)
      localStorage.setItem('form-data', JSON.stringify(encrypted))
    }

    save()
  }, [formData])

  function validateSteps(data: TFormData) {
    if (!data.name || !data.email || !data.phone) {
      setCurrentStep(1)
      return
    }

    if (!data.plan) {
      setCurrentStep(2)
      return
    }

    if (data.addons.length === 0) {
      setCurrentStep(3)
      return
    }

    setCurrentStep(4)
  }

  const updateFormData = (data: Partial<TFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }
  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', plan: '', recurrence: 'monthly', addons: [] })
    setCurrentStep(1)
    localStorage.removeItem('form-data')
  }

  const value: TFormContext = {
    currentStep,
    setCurrentStep,
    formData,
    updateFormData,
    resetForm,
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}
