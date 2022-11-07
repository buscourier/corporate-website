import {createFeatureSelector, createSelector} from '@ngrx/store'
import {EndPointStateInterface} from '../types/end-point-state.interface'
import {END_POINT_FEATURE} from './state'

export const endPointFeatureSelector =
  createFeatureSelector<EndPointStateInterface>(END_POINT_FEATURE)

export const isCitiesLoadingSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.isCitiesLoading
)

export const isOfficesLoadingSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.isOfficesLoading
)

export const citiesSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.cities
)

export const isCitiesLoadedSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.isCitiesLoaded
)

export const officesSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.offices
)

export const citySelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.city
)

export const officeSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.get
)

export const isBusSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.isBus
)

export const activeTabSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.activeTabIndex
)
