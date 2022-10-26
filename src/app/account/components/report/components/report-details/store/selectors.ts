import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ReportDetailsStateInterface} from '../types/report-details-state.interface'
import {REPORT_DETAILS_FEATURE} from './state'

export const orderDetailsFeatureSelector =
  createFeatureSelector<ReportDetailsStateInterface>(REPORT_DETAILS_FEATURE)

export const isLoadingSelector = createSelector(
  orderDetailsFeatureSelector,
  (state: ReportDetailsStateInterface) => state.isLoading
)

export const isSubmittingSelector = createSelector(
  orderDetailsFeatureSelector,
  (state: ReportDetailsStateInterface) => state.isSubmitting
)

export const orderCanceledSelector = createSelector(
  orderDetailsFeatureSelector,
  (state: ReportDetailsStateInterface) => state.orderCanceled
)

export const backendErrorsSelector = createSelector(
  orderDetailsFeatureSelector,
  (state: ReportDetailsStateInterface) => state.backendErrors
)

export const detailsSelector = createSelector(
  orderDetailsFeatureSelector,
  (state: ReportDetailsStateInterface) => state.order
)
