import {createFeatureSelector, createSelector} from '@ngrx/store'
import {StartPointStateInterface} from '../types/start-point-state.interface'
import {START_POINT_FEATURE} from './state'

export const startPointFeatureSelector =
  createFeatureSelector<StartPointStateInterface>(START_POINT_FEATURE)

export const isCitiesLoadingSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.isCitiesLoading
)

export const isCitiesLoadedSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.isCitiesLoaded
)

export const isOfficesLoadingSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.isOfficesLoading
)

export const citiesSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.cities
)

export const officesSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.offices
)

export const tabsSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => {
    return state.offices
  }
)

export const startCitySelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.city
)

export const startOfficeSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.give
)

export const startCourierSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.pickup
)

export const dateSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.date
)

export const activeTabSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.activeTab
)

export const isStartPointValidSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.isValid
)

export const isStartPointPristineSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.isPristine
)

export const startPointSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state
)
