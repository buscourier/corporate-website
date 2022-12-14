import {createFeatureSelector, createSelector} from '@ngrx/store'
import {PickupPointsStateInterface} from '../types/pickup-points-state.interface'
import {PICKUP_POINTS_FEATURE} from './state'

export const pickupPointsFeatureSelector =
  createFeatureSelector<PickupPointsStateInterface>(PICKUP_POINTS_FEATURE)

export const isDepartmentsLoadingSelector = createSelector(
  pickupPointsFeatureSelector,
  (state: PickupPointsStateInterface) => state.isDepartmentsLoading
)

export const departmentsSelector = createSelector(
  pickupPointsFeatureSelector,
  (state: PickupPointsStateInterface) => state.departments
)

export const backendErrorsSelector = createSelector(
  pickupPointsFeatureSelector,
  (state: PickupPointsStateInterface) => state.backendErrors
)
