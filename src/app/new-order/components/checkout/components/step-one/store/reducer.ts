import {Action, createReducer, on} from '@ngrx/store'
import {StepOneStateInterface} from '../types/step-one-state.interface'
import {setActiveTabAction} from './actions/set-active-tab.action'
import {initialState} from './state'

const stepOneReducer = createReducer(
  initialState,
  on(setActiveTabAction, (state, {activeTabIndex}) => ({
    ...state,
    activeTabIndex,
  }))
)

export function reducer(state: StepOneStateInterface, action: Action) {
  return stepOneReducer(state, action)
}
