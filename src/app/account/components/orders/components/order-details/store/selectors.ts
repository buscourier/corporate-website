import {createFeatureSelector, createSelector} from '@ngrx/store'
import {OrderDetailsStateInterface} from '../types/order-details-state.interface'
import {ORDER_DETAILS_FEATURE} from './state'

export const orderDetailsFeatureSelector =
  createFeatureSelector<OrderDetailsStateInterface>(ORDER_DETAILS_FEATURE)

export const isLoadingSelector = createSelector(
  orderDetailsFeatureSelector,
  (state: OrderDetailsStateInterface) => state.isLoading
)

export const isSubmittingSelector = createSelector(
  orderDetailsFeatureSelector,
  (state: OrderDetailsStateInterface) => state.isSubmitting
)

export const orderCanceledSelector = createSelector(
  orderDetailsFeatureSelector,
  (state: OrderDetailsStateInterface) => state.orderCanceled
)

export const backendErrorsSelector = createSelector(
  orderDetailsFeatureSelector,
  (state: OrderDetailsStateInterface) => state.backendErrors
)

export const detailsSelector = createSelector(
  orderDetailsFeatureSelector,
  (state: OrderDetailsStateInterface) => state.data
)
