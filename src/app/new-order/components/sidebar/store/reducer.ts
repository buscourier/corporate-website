import {Action, createReducer, on} from '@ngrx/store'
import {SidebarStateInterface} from '../types/sidebar-state.interface'
import {calculateTotalSumAction} from './actions/calculate-total-sum.action'
import {initialState} from './state'

const sidebarReducer = createReducer(
  initialState,
  on(
    calculateTotalSumAction,
    (state: SidebarStateInterface, {isTotalSumCalculated}) => ({
      ...state,
      isTotalSumCalculated,
    })
  )
)

export function reducer(state: SidebarStateInterface, action: Action) {
  return sidebarReducer(state, action)
}
