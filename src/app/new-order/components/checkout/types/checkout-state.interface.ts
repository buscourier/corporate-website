export interface CheckoutStateInterface {
  currentStep: number
  isCurrentStepValid: boolean
  isSubmitting: boolean
  backendErrors: string
}
