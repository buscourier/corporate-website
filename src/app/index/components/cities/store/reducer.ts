import {Action, createReducer, on} from '@ngrx/store'
import {CitiesStateInterface} from '../types/cities-state.interface'
import {
  getEndCitiesAction,
  getEndCitiesFailureAction,
  getEndCitiesSuccessAction,
} from './actions/get-end-cities.action'
import {
  getStartCitiesAction,
  getStartCitiesFailureAction,
  getStartCitiesSuccessAction,
} from './actions/get-start-cities.action'
import {initialState} from './state'

const citiesReducer = createReducer(
  initialState,
  on(getStartCitiesAction, (state: CitiesStateInterface) => ({
    ...state,
    isLoading: true,
  })),
  on(getStartCitiesSuccessAction, (state: CitiesStateInterface, action) => ({
    ...state,
    isLoading: false,
    startCities: action.cities,
  })),
  on(getStartCitiesFailureAction, (state: CitiesStateInterface) => ({
    ...state,
    isLoading: false,
  })),
  on(getEndCitiesAction, (state: CitiesStateInterface) => ({
    ...state,
    isLoading: true,
  })),
  on(getEndCitiesSuccessAction, (state: CitiesStateInterface, action) => ({
    ...state,
    isLoading: false,
    endCities: action.cities,
  })),
  on(getEndCitiesFailureAction, (state: CitiesStateInterface) => ({
    ...state,
    isLoading: false,
  }))
)

export function reducer(state: CitiesStateInterface, action: Action) {
  return citiesReducer(state, action)
}
