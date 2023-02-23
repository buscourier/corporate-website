import {createSelector} from '@ngrx/store'
import {newOrderFeatureSelector} from '../../../../store/selectors'
import {NewOrderStateInterface} from '../../../../types/new-order-state.interface'
import {StartPointStateInterface} from '../types/start-point-state.interface'

export const startPointSelector = createSelector(
  newOrderFeatureSelector,
  (state: NewOrderStateInterface) => state.startPoint
)

export const isCitiesLoadingSelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => state.isCitiesLoading
)

export const isCitiesLoadedSelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => state.isCitiesLoaded
)

export const isOfficesLoadingSelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => state.isOfficesLoading
)

export const citiesSelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => state.cities
)

export const officesSelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => state.offices
)

export const tabsSelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => {
    return state.offices
  }
)

export const startCitySelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => state.city
)

export const startOfficeSelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => state.give
)

export const startCourierSelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => state.pickup
)

export const dateSelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => state.date
)

export const activeTabSelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => state.activeTab
)

export const isStartPointValidSelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => state.isValid
)

export const isStartPointPristineSelector = createSelector(
  startPointSelector,
  (state: StartPointStateInterface) => state.isPristine
)
