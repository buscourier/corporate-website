import {createFeatureSelector, createSelector} from '@ngrx/store'
import {TariffsStateInterface} from '../types/tariffs-state.interface'
import {TARIFFS_FEATURE} from './state'

export const tariffsFeatureSelector =
  createFeatureSelector<TariffsStateInterface>(TARIFFS_FEATURE)

export const isCitiesLoadingSelector = createSelector(
  tariffsFeatureSelector,
  (state: TariffsStateInterface) => state.isCitiesLoading
)

export const citiesSelector = createSelector(
  tariffsFeatureSelector,
  (state: TariffsStateInterface) => state.cities
)

export const backendErrorsSelector = createSelector(
  tariffsFeatureSelector,
  (state: TariffsStateInterface) => state.backendErrors
)
