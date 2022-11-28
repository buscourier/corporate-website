import {CheckoutStateInterface} from '../types/checkout-state.interface'

export const CHECKOUT_FEATURE = 'checkout'

export const initialState: CheckoutStateInterface = {
  currentStep: 0,
  previousStep: 0,
  finishedSteps: {},
  validSteps: {},
  isCurrentStepValid: false,
  isSubmitting: false,
  isCheckoutValid: false,
  orderInput: null,
  orderResponse: null,
  backendErrors: null,
}
