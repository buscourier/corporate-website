import {Action, createReducer, on} from '@ngrx/store'
import {CheckoutStateInterface} from '../types/checkout-state.interface'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from './actions/send-order.action'
import {setCurrentStepStateAction} from './actions/set-current-step-state.action'
import {setCurrentStepAction} from './actions/set-current-step.action'
import {setPreviousStepAction} from './actions/set-previous-step.action'
import {updateFinishedStepsAction} from './actions/update-finished-steps.action'
import {initialState} from './state'

const checkoutReducer = createReducer(
  initialState,
  on(setCurrentStepAction, (state: CheckoutStateInterface, {currentStep}) => ({
    ...state,
    currentStep,
  })),
  on(
    setPreviousStepAction,
    (state: CheckoutStateInterface, {previousStep}) => ({
      ...state,
      previousStep,
    })
  ),
  on(setCurrentStepStateAction, (state: CheckoutStateInterface, {isValid}) => ({
    ...state,
    isCurrentStepValid: isValid,
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
  })),
  on(updateFinishedStepsAction, (state: CheckoutStateInterface, {steps}) => ({
    ...state,
    finishedSteps: [...steps],
  }))
)

export function reducer(state: CheckoutStateInterface, action: Action) {
  return checkoutReducer(state, action)
}
