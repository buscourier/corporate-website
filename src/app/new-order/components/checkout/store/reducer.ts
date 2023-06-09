import {Action, createReducer, on} from '@ngrx/store'
import {CheckoutStateInterface} from '../types/checkout-state.interface'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from './actions/send-order.action'
import {sendWebhookFailureAction} from './actions/send-webhook.action'
import {setCurrentStepStateAction} from './actions/set-current-step-state.action'
import {setCurrentStepAction} from './actions/set-current-step.action'
import {setPreviousStepAction} from './actions/set-previous-step.action'
import {updateFinishedStepsAction} from './actions/update-finished-steps.action'
import {initialState} from './state'

const reducer = createReducer(
  initialState,
  on(setCurrentStepAction, (state: CheckoutStateInterface, {step}) => {
    const previousStep = step - 1
    const finishedSteps = {...state.finishedSteps}
    const validSteps = {...state.validSteps}

    if (finishedSteps[previousStep]) {
      delete finishedSteps[previousStep + 1]
    } else {
      finishedSteps[previousStep] = true
    }

    if (state.isCurrentStepValid) {
      validSteps[state.currentStep] = true
    }

    const isCheckoutValid = !(
      Object.keys(finishedSteps).length === 1 &&
      !finishedSteps[-1] &&
      Object.keys(validSteps).length
    )

    return {
      ...state,
      currentStep: step,
      previousStep,
      finishedSteps,
      validSteps,
      isCheckoutValid,
    }
  }),
  on(setPreviousStepAction, (state: CheckoutStateInterface, {step}) => ({
    ...state,
    previousStep: step,
  })),
  on(setCurrentStepStateAction, (state: CheckoutStateInterface, {isValid}) => ({
    ...state,
    isCurrentStepValid: isValid,
  })),
  on(sendOrderAction, (state: CheckoutStateInterface, {order}) => ({
    ...state,
    // isSubmitting: true,
    orderInput: order,
  })),
  on(sendOrderSuccessAction, (state: CheckoutStateInterface, {order}) => ({
    ...state,
    orderResponse: order,
  })),
  on(
    sendOrderFailureAction,
    (state: CheckoutStateInterface, {backendErrors}) => ({
      ...state,
      // isSubmitting: false,
      backendErrors,
    })
  ),
  on(
    sendWebhookFailureAction,
    (state: CheckoutStateInterface, {backendErrors}) => ({
      ...state,
      // isSubmitting: false,
      backendErrors,
    })
  ),
  on(updateFinishedStepsAction, (state: CheckoutStateInterface, {steps}) => ({
    ...state,
    finishedSteps: {...steps},
  }))
)

export function checkoutReducer(state: CheckoutStateInterface, action: Action) {
  return reducer(state, action)
}
