import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {changeValuesAction} from './actions/change-values.action'
import {RecipientStateInterface} from '../types/recipient-state.interface'

export const recipientReducer = createReducer(
  initialState,
  on(changeValuesAction, (state: RecipientStateInterface, action) => ({
    ...state,
    ...action,
  }))
)

export function reducer(state: RecipientStateInterface, action: Action) {
  return recipientReducer(state, action)
}
