import {createFeatureSelector, createSelector} from '@ngrx/store'
import {OfficeInterface} from '../../../../../shared/types/office.interface'
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
  (state: EndPointStateInterface) => {
    return state.offices
      ? state.offices.map((office: OfficeInterface) => ({
          ...office,
          name: office.address,
        }))
      : null
  }
)

export const tabsSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => {
    return state.offices
  }
)

export const endCitySelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.city
)

export const endOfficeSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.get
)

export const endCourierSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.delivery
)

export const busSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.needToMeet
)

export const activeTabSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.activeTab
)

export const isEndPointValidSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.isValid
)

export const isEndPointPristineSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state.isPristine
)

export const endPointSelector = createSelector(
  endPointFeatureSelector,
  (state: EndPointStateInterface) => state
)
