import {Action, createReducer, on} from '@ngrx/store'
import {TaskFormStateInterface} from '../types/task-form-state.interface'
import {
  sendMessageAction,
  sendMessageFailureAction,
  sendMessageSuccessAction,
} from './actions/send-message.action'
import {initialState} from './state'

const sendMessageReducer = createReducer(
  initialState,
  on(
    sendMessageAction,
    (state): TaskFormStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    sendMessageSuccessAction,
    (state, {response}): TaskFormStateInterface => ({
      ...state,
      isSubmitting: false,
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
  )
)

export function reducer(state: TaskFormStateInterface, action: Action) {
  return sendMessageReducer(state, action)
}
