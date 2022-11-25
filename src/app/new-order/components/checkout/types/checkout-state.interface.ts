export interface CheckoutStateInterface {
  currentStep: number
  isCurrentStepInvalid: boolean
  isSubmitting: boolean
  backendErrors: string
}
