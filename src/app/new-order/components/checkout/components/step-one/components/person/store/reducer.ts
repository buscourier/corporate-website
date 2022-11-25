import {Action, createReducer, on} from '@ngrx/store'
import {PersonStateInterface} from '../types/person-state.interface'
import {changeValidityAction} from './actions/change-validity.action'
import {changeValuesAction} from './actions/change-values.action'
import {initialState} from './state'

export const personReducer = createReducer(
  initialState,
  on(changeValuesAction, (state: PersonStateInterface, action) => ({
    ...state,
    ...action,
  })),
  on(changeValidityAction, (state: PersonStateInterface, {isValid}) => ({
    ...state,
    isValid,
  }))
)

export function reducer(state: PersonStateInterface, action: Action) {
  return personReducer(state, action)
}
