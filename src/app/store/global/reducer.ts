import {Action, createReducer, on} from '@ngrx/store'
import {changeScreenSizeAction} from './actions/change-screen-size.action'
import {initialState} from './state'
import {GlobalStateInterface} from './types/global-state.interface'

const reducer = createReducer(
  initialState,
  on(changeScreenSizeAction, (state: GlobalStateInterface, {screenSize}) => ({
    ...initialState,
    screenSize,
  }))
)

export function globalReducer(state: GlobalStateInterface, action: Action) {
  return reducer(state, action)
}
