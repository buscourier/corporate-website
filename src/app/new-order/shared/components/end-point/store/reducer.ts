import {Action, createReducer, on} from '@ngrx/store'
import {EndPointStateInterface} from '../types/end-point-state.interface'
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
import {setBusAction} from './actions/set-bus.action'
import {setCityAction} from './actions/set-city.action'
import {setOfficeAction} from './actions/set-office.action'
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
  on(setCityAction, (state: EndPointStateInterface, {city}) => ({
    ...state,
    city,
  })),
  on(setOfficeAction, (state: EndPointStateInterface, {get}) => ({
    ...state,
    get,
  })),
  on(setBusAction, (state: EndPointStateInterface, {isBus}) => ({
    ...state,
    isBus,
  })),
  on(setActiveTabAction, (state: EndPointStateInterface, {activeTab}) => ({
    ...state,
    activeTab,
  }))
)

export function reducer(state: EndPointStateInterface, action: Action) {
  return endPointReducer(state, action)
}
