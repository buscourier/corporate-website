import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {changeValuesAction} from './actions/change-values.action'
import {PersonStateInterface} from '../types/person-state.interface'

export const personReducer = createReducer(
  initialState,
  on(changeValuesAction, (state: PersonStateInterface, action) => ({
    ...state,
    ...action,
  }))
)

export function reducer(state: PersonStateInterface, action: Action) {
  return personReducer(state, action)
}
