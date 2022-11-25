export interface CheckoutStateInterface {
  currentStep: number
  previousStep: number
  isCurrentStepValid: boolean
  finishedSteps: number[]
  isSubmitting: boolean
  backendErrors: string
}
