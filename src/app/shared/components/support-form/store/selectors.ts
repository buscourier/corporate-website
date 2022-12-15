import {createFeatureSelector, createSelector} from '@ngrx/store'
import {SUPPORT_FORM_FEATURE} from './state'
import {SupportFormStateInterface} from '../types/support-form-state.interface'

export const supportFormFeatureSelector =
  createFeatureSelector<SupportFormStateInterface>(SUPPORT_FORM_FEATURE)

export const isSubmittingSelector = createSelector(
  supportFormFeatureSelector,
  (state: SupportFormStateInterface) => state.isSubmitting
)

export const responseSelector = createSelector(
  supportFormFeatureSelector,
  (state: SupportFormStateInterface) => state.response
)

export const validationErrorsSelector = createSelector(
  supportFormFeatureSelector,
  (state: SupportFormStateInterface) => state.validationErrors
)
