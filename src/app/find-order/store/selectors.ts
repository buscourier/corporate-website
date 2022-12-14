import {createFeatureSelector, createSelector} from '@ngrx/store'
import {FindOrderStateInterface} from '../types/find-order-state.interface'
import {FIND_ORDER_FEATURE} from './state'

export const findOrderFeatureSelector =
  createFeatureSelector<FindOrderStateInterface>(FIND_ORDER_FEATURE)

export const isStatusesLoadingSelector = createSelector(
  findOrderFeatureSelector,
  (state: FindOrderStateInterface) => state.isStatusesLoading
)

export const statusesSelector = createSelector(
  findOrderFeatureSelector,
  (state: FindOrderStateInterface) => state.statuses
)

export const backendErrorsSelector = createSelector(
  findOrderFeatureSelector,
  (state: FindOrderStateInterface) => state.backendErrors
)
