import {CheckoutStateInterface} from '../types/checkout-state.interface'

export const CHECKOUT_FEATURE = 'checkout'

export const initialState: CheckoutStateInterface = {
  currentStep: 0,
  previousStep: 0,
  finishedSteps: [],
  isCurrentStepValid: false,
  isSubmitting: false,
  backendErrors: null,
}
