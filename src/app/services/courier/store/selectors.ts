import {createFeatureSelector, createSelector} from '@ngrx/store'
import {COURIER_FEATURE} from './state'
import {CourierStateInterface} from '../types/courier-state.interface'

export const courierFeatureSelector =
  createFeatureSelector<CourierStateInterface>(COURIER_FEATURE)

export const isServicesLoadingSelector = createSelector(
  courierFeatureSelector,
  ({isServicesLoading}: CourierStateInterface) => isServicesLoading
)

export const servicesSelector = createSelector(
  courierFeatureSelector,
  ({services}: CourierStateInterface) => services
)

export const backendErrorsSelector = createSelector(
  courierFeatureSelector,
  ({backendErrors}: CourierStateInterface) => backendErrors
)
