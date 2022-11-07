import {Action, createReducer, on} from '@ngrx/store'
import {EndPointStateInterface} from '../types/end-point-state.interface'
import {changeActiveTabAction} from './actions/change-active-tab.action'
import {changeBusAction} from './actions/change-bus.action'
import {changeCityAction} from './actions/change-city.action'
import {changeCourierAction} from './actions/change-courier.action'
import {changeOfficeAction} from './actions/change-office.action'
import {citiesLoadedAction} from './actions/cities-loaded.action'
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
import {initialState} from './state'

const endPointReducer = createReducer(
  initialState,
  on(getCitiesAction, (state: EndPointStateInterface) => ({
    ...state,
    isCitiesLoading: true,
  })),
  on(getCitiesSuccessAction, (state: EndPointStateInterface, {cities}) => ({
    ...state,
    isCitiesLoading: false,
    cities,
  })),
  on(getCitiesFailureAction, (state: EndPointStateInterface, {error}) => ({
    ...state,
    isCitiesLoading: false,
    // backendErrors: errors
  })),
  on(citiesLoadedAction, (state: EndPointStateInterface, {isCitiesLoaded}) => ({
    ...state,
    isCitiesLoaded,
  })),
  on(getOfficesAction, (state: EndPointStateInterface) => ({
    ...state,
    isOfficesLoading: true,
  })),
  on(getOfficesSuccessAction, (state: EndPointStateInterface, {offices}) => ({
    ...state,
    isOfficesLoading: false,
    offices,
  })),
  on(getOfficesFailureAction, (state: EndPointStateInterface, {error}) => ({
    ...state,
    isOfficesLoading: false,
    // backendErrors: errors,
  })),
  on(changeCityAction, (state: EndPointStateInterface, {city}) => ({
    ...state,
    city,
  })),
  on(changeOfficeAction, (state: EndPointStateInterface, {get}) => ({
    ...state,
    get,
  })),
  on(changeCourierAction, (state: EndPointStateInterface, {delivery}) => ({
    ...state,
    delivery,
  })),
  on(changeBusAction, (state: EndPointStateInterface, {needToMeet}) => ({
    ...state,
    needToMeet,
  })),
  on(
    changeActiveTabAction,
    (state: EndPointStateInterface, {activeTabIndex}) => ({
      ...state,
      activeTabIndex,
    })
  )
)

export function reducer(state: EndPointStateInterface, action: Action) {
  return endPointReducer(state, action)
}
