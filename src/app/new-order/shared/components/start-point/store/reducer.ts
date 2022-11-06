import {Action, createReducer, on} from '@ngrx/store'
import {StartPointStateInterface} from '../types/start-point-state.interface'
import {citiesLoadedAction} from './actions/cities-loaded.action'
import {courierValueChangesAction} from './actions/courier-value-changes.action'
import {
  getCitiesAction,
  getCitiesFailureAction,
  getCitiesSuccessAction,
} from './actions/get-cities.action'
import {
  getOfficesAction,
  getOfficesFailureAction,
  getOfficesSuccessAction,
} from './actions/get-offices.action'
import {setActiveTabAction} from './actions/set-active-tab.action'
import {setCityAction} from './actions/set-city.action'
import {setDateAction} from './actions/set-date.action'
import {setOfficeAction} from './actions/set-office.action'
import {initialState} from './state'

const startPointReducer = createReducer(
  initialState,
  on(getCitiesAction, (state: StartPointStateInterface) => ({
    ...state,
    isCitiesLoading: true,
  })),
  on(getCitiesSuccessAction, (state: StartPointStateInterface, {cities}) => ({
    ...state,
    isCitiesLoading: false,
    cities,
  })),
  on(getCitiesFailureAction, (state: StartPointStateInterface, {error}) => ({
    ...state,
    isCitiesLoading: false,
    // backendErrors: errors
  })),
  on(
    citiesLoadedAction,
    (state: StartPointStateInterface, {isCitiesLoaded}) => ({
      ...state,
      isCitiesLoaded,
    })
  ),
  on(getOfficesAction, (state: StartPointStateInterface) => ({
    ...state,
    isOfficesLoading: true,
  })),
  on(getOfficesSuccessAction, (state: StartPointStateInterface, {offices}) => ({
    ...state,
    isOfficesLoading: false,
    offices,
  })),
  on(getOfficesFailureAction, (state: StartPointStateInterface, {error}) => ({
    ...state,
    isOfficesLoading: false,
    // backendErrors: errors,
  })),
  on(setCityAction, (state: StartPointStateInterface, {city}) => ({
    ...state,
    city,
  })),
  on(setOfficeAction, (state: StartPointStateInterface, {give}) => ({
    ...state,
    give,
  })),
  on(
    courierValueChangesAction,
    (state: StartPointStateInterface, {pickup}) => ({
      ...state,
      pickup,
    })
  ),
  on(setDateAction, (state: StartPointStateInterface, {date}) => ({
    ...state,
    date,
  })),
  on(setActiveTabAction, (state: StartPointStateInterface, {index}) => ({
    ...state,
    activeTabIndex: index,
  }))
)

export function reducer(state: StartPointStateInterface, action: Action) {
  return startPointReducer(state, action)
}
