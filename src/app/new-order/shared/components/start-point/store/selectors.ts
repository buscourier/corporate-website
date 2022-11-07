import {createFeatureSelector, createSelector} from '@ngrx/store'
import {OfficeInterface} from '../../../../../shared/types/office.interface'
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
  (state: StartPointStateInterface) => {
    return state.offices
      ? state.offices.map((office: OfficeInterface) => ({
          ...office,
          name: office.address,
        }))
      : []
  }
)

export const startCitySelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.city
)

export const officeSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.give
)

export const courierSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.pickup
)

export const dateSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.date
)

export const activeTabSelector = createSelector(
  startPointFeatureSelector,
  (state: StartPointStateInterface) => state.activeTabIndex
)
