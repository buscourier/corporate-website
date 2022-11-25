import {Action, createReducer, on} from '@ngrx/store'
import {CheckoutStateInterface} from '../types/checkout-state.interface'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from './actions/send-order.action'
import {setCurrentStepAction} from './actions/set-current-step.action'
import {setInvalidStateAction} from './actions/set-invalid-state.action'
import {initialState} from './state'

const checkoutReducer = createReducer(
  initialState,
  on(setCurrentStepAction, (state: CheckoutStateInterface, {currentStep}) => ({
    ...state,
    currentStep,
  })),
  on(setInvalidStateAction, (state: CheckoutStateInterface, {isInvalid}) => ({
    ...state,
    isCurrentStepInvalid: isInvalid,
  })),
  on(sendOrderAction, (state: CheckoutStateInterface) => ({
    ...state,
    isSubmitting: true,
  })),
  on(sendOrderSuccessAction, (state: CheckoutStateInterface) => ({
    ...state,
    isSubmitting: false,
  })),
  on(sendOrderFailureAction, (state: CheckoutStateInterface, {errors}) => ({
    ...state,
    isSubmitting: false,
    backendErrors: errors,
  }))
)

export function reducer(state: CheckoutStateInterface, action: Action) {
  return checkoutReducer(state, action)
}
