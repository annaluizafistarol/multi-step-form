import { createContext } from 'react'

export type TFormData = {
  name: string
  email: string
  phone: string
  plan: string // 'arcade' | 'advanced' | 'pro'
  recurrence: 'yearly' | 'monthly'
  addons: string[] // 'online-service' | 'larger-storage' | 'customizable-profile' | 'none'
}

export type TFormContext = {
  currentStep: number
  setCurrentStep: (step: number) => void
  formData: TFormData
  updateFormData: (data: Partial<TFormData>) => void
  resetForm: () => void
}

/**
 * FormContext
 * @description This is the FormContext of the application.
 * @returns {JSX.Element} The JSX element representing the FormContext.
 */
export const FormContext = createContext<TFormContext | null>(null)
