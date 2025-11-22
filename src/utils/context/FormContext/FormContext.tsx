import { JSX, ReactNode, useEffect, useRef, useState } from 'react'
import { FormContext, TFormData } from './context'
import { decrypt, encrypt } from '@utils/helpers/crypto'

/**
 * FormProvider component that provides form context to its children.
 * It manages the form state, including current step, form data, and confirmation status.
 * It also handles loading and saving form data to localStorage with encryption.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components that will have access to the form context.
 * @returns {JSX.Element} The FormProvider component wrapping its children with FormContext.Provider.
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

  const [confirmed, setConfirmed] = useState(false)

  const isHydrated = useRef(false)

  // UseEffect to load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('form-data')

    if (!saved) {
      isHydrated.current = true
      return
    }

    try {
      const parsed = JSON.parse(saved)
      decrypt({ initializationVector: parsed.initializationVector, data: parsed.data })
        .then((result) => {
          if (result) {
            setFormData(result)
          }
        })
        .finally(() => (isHydrated.current = true))
    } catch (error) {
      console.error('Error decrypting form data', error)
      localStorage.removeItem('form-data')
      isHydrated.current = true
    }
  }, [])

  // UseEffect to save form data to localStorage on changes
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

  const updateFormData = (data: Partial<TFormData>) => setFormData((prev) => ({ ...prev, ...data }))

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', plan: '', recurrence: 'monthly', addons: [] })
    setCurrentStep(1)
    setConfirmed(false)
    localStorage.removeItem('form-data')
  }

  return (
    <FormContext.Provider
      value={{ currentStep, setCurrentStep, formData, updateFormData, resetForm, confirmed, setConfirmed }}
    >
      {children}
    </FormContext.Provider>
  )
}
