import {createFeatureSelector, createSelector} from '@ngrx/store'
import {POLICY_FEATURE} from './state'
import {PolicyStateInterface} from '../types/policy-state.interface'

export const policyFeatureSelector =
  createFeatureSelector<PolicyStateInterface>(POLICY_FEATURE)

export const isMarkupLoadingSelector = createSelector(
  policyFeatureSelector,
  (state: PolicyStateInterface) => state.isMarkupLoading
)

export const isMarkupLoadedSelector = createSelector(
  policyFeatureSelector,
  (state: PolicyStateInterface) => state.isMarkupLoaded
)

export const markupSelector = createSelector(
  policyFeatureSelector,
  (state: PolicyStateInterface) => state.markup
)

export const backendErrorsSelector = createSelector(
  policyFeatureSelector,
  (state: PolicyStateInterface) => state.backendErrors
)
