import {Action, createReducer, on} from '@ngrx/store'
import {StartPointStateInterface} from '../types/start-point-state.interface'
import {changeActiveTabAction} from './actions/change-active-tab.action'
import {changeCityAction} from './actions/change-city.action'
import {changeCourierAction} from './actions/change-courier.action'
import {changeDateAction} from './actions/change-date.action'
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
  on(changeCityAction, (state: StartPointStateInterface, {city}) => ({
    ...state,
    city,
  })),
  on(changeOfficeAction, (state: StartPointStateInterface, {give}) => ({
    ...state,
    give,
  })),
  on(changeCourierAction, (state: StartPointStateInterface, {pickup}) => ({
    ...state,
    pickup,
  })),
  on(changeDateAction, (state: StartPointStateInterface, {date}) => ({
    ...state,
    date,
  })),
  on(
    changeActiveTabAction,
    (state: StartPointStateInterface, {activeTabIndex}) => ({
      ...state,
      activeTabIndex,
    })
  )
)

export function reducer(state: StartPointStateInterface, action: Action) {
  return startPointReducer(state, action)
}
