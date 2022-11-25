import {Action, createReducer, on} from '@ngrx/store'
import {RecipientStateInterface} from '../types/recipient-state.interface'
import {changeValidityAction} from './actions/change-validity.action'
import {changeValuesAction} from './actions/change-values.action'
import {initialState} from './state'

export const recipientReducer = createReducer(
  initialState,
  on(changeValuesAction, (state: RecipientStateInterface, action) => ({
    ...state,
    ...action,
  })),
  on(changeValidityAction, (state: RecipientStateInterface, {isValid}) => ({
    ...state,
    isValid,
  }))
)

export function reducer(state: RecipientStateInterface, action: Action) {
  return recipientReducer(state, action)
}
