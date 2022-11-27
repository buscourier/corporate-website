import {Action, createReducer, on} from '@ngrx/store'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from '../../../store/actions/send-order.action'
import {StepFourStateInterface} from '../types/step-four-state.interface'
import {initialState} from './state'

const stepFourReducer = createReducer(
  initialState,
  on(sendOrderAction, (state: StepFourStateInterface) => ({
    ...state,
    isSubmitting: true,
  })),
  on(sendOrderSuccessAction, (state: StepFourStateInterface) => ({
    ...state,
    isSubmitting: false,
  })),
  on(sendOrderFailureAction, (state: StepFourStateInterface) => ({
    ...state,
    isSubmitting: false,
  }))
)

export function reducer(state: StepFourStateInterface, action: Action) {
  return stepFourReducer(state, action)
}
