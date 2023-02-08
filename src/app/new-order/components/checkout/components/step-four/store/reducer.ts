import {Action, createReducer, on} from '@ngrx/store'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from '../../../store/actions/send-order.action'
import {StepFourStateInterface} from '../types/step-four-state.interface'
import {initialState} from './state'
import {
  sendWebhookFailureAction,
  sendWebhookSuccessAction,
} from '../../../store/actions/send-webhook.action'

const stepFourReducer = createReducer(
  initialState,
  on(sendOrderAction, (state: StepFourStateInterface) => ({
    ...state,
    isSubmitting: true,
  })),
  on(sendOrderFailureAction, (state: StepFourStateInterface) => ({
    ...state,
    isSubmitting: false,
  })),
  on(sendWebhookSuccessAction, (state: StepFourStateInterface) => ({
    ...state,
    isSubmitting: false,
  })),
  on(sendWebhookFailureAction, (state: StepFourStateInterface) => ({
    ...state,
    isSubmitting: false,
  }))
)

export function reducer(state: StepFourStateInterface, action: Action) {
  return stepFourReducer(state, action)
}
