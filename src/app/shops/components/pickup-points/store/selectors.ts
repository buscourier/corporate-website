import {createFeatureSelector, createSelector} from '@ngrx/store'
import {PICKUP_POINTS_FEATURE} from './state'
import {PickupPointsStateInterface} from '../types/pickup-points-state.interface'

export const pickupPointsFeatureSelector =
  createFeatureSelector<PickupPointsStateInterface>(PICKUP_POINTS_FEATURE)

export const isPointsLoadingSelector = createSelector(
  pickupPointsFeatureSelector,
  (state: PickupPointsStateInterface) => state.isPointsLoading
)

export const pointsSelector = createSelector(
  pickupPointsFeatureSelector,
  (state: PickupPointsStateInterface) => state.points
)

export const backendErrorsSelector = createSelector(
  pickupPointsFeatureSelector,
  (state: PickupPointsStateInterface) => state.backendErrors
)
