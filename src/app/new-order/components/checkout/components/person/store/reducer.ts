import {Action, createReducer, on} from '@ngrx/store'
import {PersonStateInterface} from '../types/person-state.interface'
import {valueChangesAction} from './actions/value-chages.action'
import {initialState} from './state'

const personReducer = createReducer(
  initialState,
  on(valueChangesAction, (state, action) => ({
    ...state,
    ...action,
  }))
)

export function reducer(state: PersonStateInterface, action: Action) {
  return personReducer(state, action)
}
