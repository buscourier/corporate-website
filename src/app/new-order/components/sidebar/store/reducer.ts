import {Action, createReducer, on} from '@ngrx/store'
import {SidebarStateInterface} from '../types/sidebar-state.interface'
import {calculateTotalSumAction} from './actions/calculate-total-sum.action'
import {initialState} from './state'

const reducer = createReducer(
  initialState,
  on(
    calculateTotalSumAction,
    (state: SidebarStateInterface, {isTotalSumCalculated}) => ({
      ...state,
      isTotalSumCalculated,
    })
  )
)

export function sidebarReducer(state: SidebarStateInterface, action: Action) {
  return reducer(state, action)
}
