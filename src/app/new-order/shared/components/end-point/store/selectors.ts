import {createSelector} from '@ngrx/store'
import {newOrderFeatureSelector} from '../../../../store/selectors'
import {NewOrderStateInterface} from '../../../../types/new-order-state.interface'
import {EndPointStateInterface} from '../types/end-point-state.interface'

export const endPointSelector = createSelector(
  newOrderFeatureSelector,
  (state: NewOrderStateInterface) => state.endPoint
)

export const isCitiesLoadingSelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => state.isCitiesLoading
)

export const isOfficesLoadingSelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => state.isOfficesLoading
)

export const citiesSelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => state.cities
)

export const isCitiesLoadedSelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => state.isCitiesLoaded
)

export const officesSelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => state.offices
)

export const tabsSelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => {
    return state.offices
  }
)

export const endCitySelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => state.city
)

export const endOfficeSelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => state.get
)

export const endCourierSelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => state.delivery
)

export const busSelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => state.needToMeet
)

export const activeTabSelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => state.activeTab
)

export const isEndPointValidSelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => state.isValid
)

export const isEndPointPristineSelector = createSelector(
  endPointSelector,
  (state: EndPointStateInterface) => state.isPristine
)
