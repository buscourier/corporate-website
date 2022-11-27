import {NewOrderInputInterface} from './new-order-input.interface'

export interface CheckoutStateInterface {
  currentStep: number
  previousStep: number
  isCurrentStepValid: boolean
  finishedSteps: {
    [key: number]: boolean
  }
  isSubmitting: boolean
  orderInput: NewOrderInputInterface
  orderResponse: any
  backendErrors: string
}
