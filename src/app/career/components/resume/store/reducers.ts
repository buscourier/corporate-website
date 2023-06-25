import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {ResumeStateInterface} from '../types/resume-state.interface'
import {
  sendMessageAction,
  sendMessageFailureAction,
  sendMessageSuccessAction,
} from './actions/send-message.action'
import {
  sendWebhookFailureAction,
  sendWebhookSuccessAction,
} from './actions/send-webhook.action'
import {clearFormAction} from './actions/clear-form.action'

const resumeReducer = createReducer(
  initialState,
  on(
    sendMessageAction,
    (state): ResumeStateInterface => ({
      ...state,
      isPristine: false,
      isSubmitting: true,
    })
  ),
  on(
    sendMessageSuccessAction,
    (state, {response}): ResumeStateInterface => ({
      ...state,
      response,
    })
  ),
  on(
    sendMessageFailureAction,
    (state, {backendErrors}): ResumeStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors,
    })
  ),
  on(
    sendWebhookSuccessAction,
    (state): ResumeStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    sendWebhookFailureAction,
    (state): ResumeStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(clearFormAction, () => ({
    ...initialState,
  }))
)

export function reducers(state: ResumeStateInterface, action: Action) {
  return resumeReducer(state, action)
}
