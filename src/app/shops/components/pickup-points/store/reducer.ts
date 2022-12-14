import {Action, createReducer, on} from '@ngrx/store'
import {PickupPointsStateInterface} from '../types/pickup-points-state.interface'
import {
  getDepartmentsAction,
  getDepartmentsFailureAction,
  getDepartmentsSuccessAction,
} from './actions/get-departments.action'
import {initialState} from './state'

const pickupPointsReducer = createReducer(
  initialState,
  on(
    getDepartmentsAction,
    (state): PickupPointsStateInterface => ({
      ...state,
      isDepartmentsLoading: true,
    })
  ),
  on(
    getDepartmentsSuccessAction,
    (state, {departments}): PickupPointsStateInterface => ({
      ...state,
      isDepartmentsLoading: false,
      departments,
    })
  ),
  on(
    getDepartmentsFailureAction,
    (state, {errors}): PickupPointsStateInterface => ({
      ...state,
      isDepartmentsLoading: false,
      backendErrors: errors,
    })
  )
)

export function reducer(state: PickupPointsStateInterface, action: Action) {
  return pickupPointsReducer(state, action)
}
