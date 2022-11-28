import {createFeatureSelector, createSelector} from '@ngrx/store'
import {CitiesStateInterface} from '../types/cities-state.interface'
import {CITIES_FEATURE} from './state'

export const citiesFeatureSelector =
  createFeatureSelector<CitiesStateInterface>(CITIES_FEATURE)

export const isStartCitiesLoadingSelector = createSelector(
  citiesFeatureSelector,
  (state: CitiesStateInterface) => state.isStartCitiesLoading
)

export const isEndCitiesLoadingSelector = createSelector(
  citiesFeatureSelector,
  (state: CitiesStateInterface) => state.isEndCitiesLoading
)

export const startCitiesSelector = createSelector(
  citiesFeatureSelector,
  (state: CitiesStateInterface) => state.startCities
)

export const endCitiesSelector = createSelector(
  citiesFeatureSelector,
  (state: CitiesStateInterface) => state.endCities
)

export const backendErrorsSelector = createSelector(
  citiesFeatureSelector,
  (state: CitiesStateInterface) => state.backendErrors
)
