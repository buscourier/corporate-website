import {Action, createReducer, on} from '@ngrx/store'
import {
  sendMessageAction,
  sendMessageFailureAction,
  sendMessageSuccessAction,
} from './actions/send-message.action'
import {SupportFormStateInterface} from '../types/support-form-state.interface'
import {initialState} from './state'

const sendMessageReducer = createReducer(
  initialState,
  on(
    sendMessageAction,
    (state): SupportFormStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    sendMessageSuccessAction,
    (state, {response}): SupportFormStateInterface => ({
      ...state,
      isSubmitting: false,
      response,
    })
  ),
  on(
    sendMessageFailureAction,
    (state, {errors}): SupportFormStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    })
  )
)

export function reducer(state: SupportFormStateInterface, action: Action) {
  return sendMessageReducer(state, action)
}
