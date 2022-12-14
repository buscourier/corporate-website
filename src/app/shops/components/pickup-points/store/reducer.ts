import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  getPointsAction,
  getPointsFailureAction,
  getPointsSuccessAction,
} from './actions/get-points.action'
import {PickupPointsStateInterface} from '../types/pickup-points-state.interface'

const pickupPointsReducer = createReducer(
  initialState,
  on(
    getPointsAction,
    (state): PickupPointsStateInterface => ({
      ...state,
      isPointsLoading: true,
    })
  ),
  on(
    getPointsSuccessAction,
    (state, {points}): PickupPointsStateInterface => ({
      ...state,
      isPointsLoading: false,
      points,
    })
  ),
  on(
    getPointsFailureAction,
    (state, {errors}): PickupPointsStateInterface => ({
      ...state,
      isPointsLoading: false,
      backendErrors: errors,
    })
  )
)

export function reducer(state: PickupPointsStateInterface, action: Action) {
  return pickupPointsReducer(state, action)
}
