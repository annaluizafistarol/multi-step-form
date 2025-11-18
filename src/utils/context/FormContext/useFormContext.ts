import { FormContext, TFormContext } from './context'
import { useContext } from 'react'

/**
 * useFormContext
 * @description This is the useFormContext of the application.
 * @returns {TFormContext} The TFormContext of the application.
 */
export function useFormContext(): TFormContext {
  const ctx = useContext(FormContext)

  if (!ctx) {
    throw new Error('useFormContext must be used inside <FormProvider>')
  }

  return ctx
}
