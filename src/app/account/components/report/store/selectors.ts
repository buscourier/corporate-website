import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ReportStateInterface} from '../types/report-state.interface'
import {REPORT_FEATURE} from './state'

export const reportFeatureSelector =
  createFeatureSelector<ReportStateInterface>(REPORT_FEATURE)

export const isLoadingSelector = createSelector(
  reportFeatureSelector,
  (state: ReportStateInterface) => state.isLoading
)

export const ordersSelector = createSelector(
  reportFeatureSelector,
  (state: ReportStateInterface) => state.orders
)

export const isOrderDetailsLoadingSelector = createSelector(
  reportFeatureSelector,
  (state: ReportStateInterface) => state.isOrderDetailsLoading
)

export const orderDetailsSelector = createSelector(
  reportFeatureSelector,
  (state: ReportStateInterface) => state.orderDetails
)

export const backendErrorsSelector = createSelector(
  reportFeatureSelector,
  (state: ReportStateInterface) => state.backendErrors
)
