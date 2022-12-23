import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ViewOrderStateInterface} from '../types/view-order-state.interface'
import {VIEW_ORDER_FEATURE} from './state'

export const viewOrderFeatureSelector =
  createFeatureSelector<ViewOrderStateInterface>(VIEW_ORDER_FEATURE)

export const isSubmittingSelector = createSelector(
  viewOrderFeatureSelector,
  (state: ViewOrderStateInterface) => state.isSubmitting
)

export const backendErrorsSelector = createSelector(
  viewOrderFeatureSelector,
  (state: ViewOrderStateInterface) => state.backendErrors
)
