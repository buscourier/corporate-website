import {createFeatureSelector, createSelector} from '@ngrx/store'
import {TariffsStateInterface} from '../types/tariffs-state.interface'
import {TARIFFS_FEATURE} from './state'

export const tariffsFeatureSelector =
  createFeatureSelector<TariffsStateInterface>(TARIFFS_FEATURE)

export const isCitiesLoadingSelector = createSelector(
  tariffsFeatureSelector,
  (state: TariffsStateInterface) => state.isCitiesLoading
)

export const isCitiesLoadedSelector = createSelector(
  tariffsFeatureSelector,
  (state: TariffsStateInterface) => state.isCitiesLoaded
)

export const citiesSelector = createSelector(
  tariffsFeatureSelector,
  (state: TariffsStateInterface) => state.cities
)

export const backendErrorsSelector = createSelector(
  tariffsFeatureSelector,
  (state: TariffsStateInterface) => state.backendErrors
)

export const isZonesLoadingSelector = createSelector(
  tariffsFeatureSelector,
  (state: TariffsStateInterface) => state.isZonesLoading
)

export const zonesSelector = createSelector(
  tariffsFeatureSelector,
  (state: TariffsStateInterface) => state.zones
)

export const isZoneTariffsLoadingSelector = createSelector(
  tariffsFeatureSelector,
  (state: TariffsStateInterface) => state.isZoneTariffsLoading
)

export const zoneTariffsSelector = createSelector(
  tariffsFeatureSelector,
  (state: TariffsStateInterface) => state.zoneTariffs
)
