import {Action, createReducer, on} from '@ngrx/store'
import {FeedbackStateInterface} from '../types/feedback-state.interface'
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
    (state, {errors}): FeedbackStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    })
  )
)

export function reducer(state: FeedbackStateInterface, action: Action) {
  return feedbackReducer(state, action)
}
