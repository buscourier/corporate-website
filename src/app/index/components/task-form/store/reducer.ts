import {Action, createReducer, on} from '@ngrx/store'
import {TaskFormStateInterface} from '../types/task-form-state.interface'
import {clearFormAction} from './actions/clear-form'
import {
  sendMessageAction,
  sendMessageFailureAction,
  sendMessageSuccessAction,
} from './actions/send-message.action'
import {initialState} from './state'
import {
  sendWebhookFailureAction,
  sendWebhookSuccessAction,
} from './actions/send-webhook.action'

const sendMessageReducer = createReducer(
  initialState,
  on(
    sendMessageAction,
    (state): TaskFormStateInterface => ({
      ...state,
      isPristine: false,
      isSubmitting: true,
    })
  ),
  on(
    sendMessageSuccessAction,
    (state, {response}): TaskFormStateInterface => ({
      ...state,
      response,
    })
  ),
  on(
    sendMessageFailureAction,
    (state, {backendErrors}): TaskFormStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors,
    })
  ),
  on(
    sendWebhookSuccessAction,
    (state): TaskFormStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    sendWebhookFailureAction,
    (state): TaskFormStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(clearFormAction, () => ({
    ...initialState,
  }))
)

export function reducer(state: TaskFormStateInterface, action: Action) {
  return sendMessageReducer(state, action)
}
