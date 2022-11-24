import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {changeValuesAction} from './actions/change-values.action'
import {SenderStateInterface} from '../types/sender-state.interface'

export const senderReducer = createReducer(
  initialState,
  on(changeValuesAction, (state: SenderStateInterface, action) => ({
    ...state,
    ...action,
  }))
)

export function reducer(state: SenderStateInterface, action: Action) {
  return senderReducer(state, action)
}
