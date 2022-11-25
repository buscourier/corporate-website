import {Action, createReducer, on} from '@ngrx/store'
import {SenderStateInterface} from '../types/sender-state.interface'
import {changeValidityAction} from './actions/change-validity.action'
import {changeValuesAction} from './actions/change-values.action'
import {initialState} from './state'

export const senderReducer = createReducer(
  initialState,
  on(changeValuesAction, (state: SenderStateInterface, action) => ({
    ...state,
    ...action,
  })),
  on(changeValidityAction, (state: SenderStateInterface, {isValid}) => ({
    ...state,
    isValid,
  }))
)

export function reducer(state: SenderStateInterface, action: Action) {
  return senderReducer(state, action)
}
