// hooks/useSignUpSteps.ts

import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

type Step = 'name' | 'email' | 'password'

export const useSignUpSteps = (
  form: UseFormReturn<
    { name: string; email: string; password: string; confirmPassword: string },
    any
  >,
) => {
  const [step, setStep] = useState<Step>('name')

  const nextStep = async () => {
    if (step === 'name') {
      const nameIsValid = await form.trigger('name')
      if (nameIsValid) {
        setStep('email')
      }
    } else if (step === 'email') {
      const emailIsValid = await form.trigger('email')
      if (emailIsValid) {
        setStep('password')
      }
    }
  }

  const backStep = () => {
    if (step === 'password') {
      form.setValue('password', '')
      form.setValue('confirmPassword', '')
      setStep('email')
    } else if (step === 'email') {
      form.setValue('email', '')
      setStep('name')
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter' && (step === 'name' || step === 'email')) {
      event.preventDefault()
      nextStep()
    }
  }

  return {
    step,
    nextStep,
    backStep,
    handleKeyDown,
  }
}
