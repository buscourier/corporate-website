import {Action, createReducer, on} from '@ngrx/store'
import {FeedbackStateInterface} from '../types/feedback-state.interface'
import {clearFormAction} from './actions/clear-form.action'
import {
  sendMessageAction,
  sendMessageFailureAction,
  sendMessageSuccessAction,
} from './actions/send-message.action'
import {initialState} from './state'

const feedbackReducer = createReducer(
  initialState,
  on(
    sendMessageAction,
    (state): FeedbackStateInterface => ({
      ...state,
      isSubmitting: true,
      isPristine: false,
    })
  ),
  on(
    sendMessageSuccessAction,
    (state, {response}): FeedbackStateInterface => ({
      ...state,
      isSubmitting: false,
      response,
    })
  ),
  on(
    sendMessageFailureAction,
    (state, {backendErrors}): FeedbackStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors,
    })
  ),
  on(clearFormAction, () => ({
    ...initialState,
  }))
)

export function reducer(state: FeedbackStateInterface, action: Action) {
  return feedbackReducer(state, action)
}
