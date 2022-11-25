import {CheckoutStateInterface} from '../types/checkout-state.interface'

export const CHECKOUT_FEATURE = 'checkout'

export const initialState: CheckoutStateInterface = {
  currentStep: 0,
  isCurrentStepValid: false,
  isSubmitting: false,
  backendErrors: null,
}
