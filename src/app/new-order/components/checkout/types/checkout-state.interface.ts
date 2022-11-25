export interface CheckoutStateInterface {
  currentStep: number
  previousStep: number
  isCurrentStepValid: boolean
  finishedSteps: {
    [key: number]: boolean
  }
  isSubmitting: boolean
  backendErrors: string
}
