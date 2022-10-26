import {createFeatureSelector, createSelector} from '@ngrx/store'
import {REPORT_FILTER_FEATURE} from './state'
import {FilterStateInterface} from '../types/filter-state.interface'

export const filterFeatureSelector =
  createFeatureSelector<FilterStateInterface>(REPORT_FILTER_FEATURE)

export const isStartCitiesLoadingSelector = createSelector(
  filterFeatureSelector,
  (state: FilterStateInterface) => state.isStartCitiesLoading
)

export const isEndCitiesLoadingSelector = createSelector(
  filterFeatureSelector,
  (state: FilterStateInterface) => state.isEndCitiesLoading
)

export const startCitiesSelector = createSelector(
  filterFeatureSelector,
  (state: FilterStateInterface) => state.startCities
)

export const endCitiesSelector = createSelector(
  filterFeatureSelector,
  (state: FilterStateInterface) => state.endCities
)

export const backendErrorsSelector = createSelector(
  filterFeatureSelector,
  (state: FilterStateInterface) => state.backendErrors
)
