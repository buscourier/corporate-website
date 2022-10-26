import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ReportStateInterface} from '../types/report-state.interface'
import {REPORT_FEATURE} from './state'

export const ordersFeatureSelector =
  createFeatureSelector<ReportStateInterface>(REPORT_FEATURE)

export const isLoadingSelector = createSelector(
  ordersFeatureSelector,
  (state: ReportStateInterface) => state.isLoading
)

export const ordersSelector = createSelector(
  ordersFeatureSelector,
  (state: ReportStateInterface) => state.orders
)

// export const backendErrorsSelector = createSelector(
//   ordersFeatureSelector,
//   // (state: OrdersStateInterface) => state.errors
// )
