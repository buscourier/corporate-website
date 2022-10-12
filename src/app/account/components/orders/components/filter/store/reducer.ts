import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  getStartCitiesAction,
  getStartCitiesFailureAction,
  getStartCitiesSuccessAction,
} from './actions/get-start-cities.action'
import {FilterStateInterface} from '../types/filter-state.interface'
import {
  getEndCitiesAction,
  getEndCitiesFailureAction,
  getEndCitiesSuccessAction,
} from './actions/get-end-cities.action'
import {OrdersStateInterface} from '../../../types/orders-state.interface'

const filterReducer = createReducer(
  initialState,
  on(getStartCitiesAction, (state: FilterStateInterface) => ({
    ...state,
    isStartCitiesLoading: true,
  })),
  on(getStartCitiesSuccessAction, (state: FilterStateInterface, action) => ({
    ...state,
    isStartCitiesLoading: false,
    startCities: action.cities,
  })),
  on(getStartCitiesFailureAction, (state: FilterStateInterface) => ({
    ...state,
    isStartCitiesLoading: false,
  })),
  on(getEndCitiesAction, (state: FilterStateInterface) => ({
    ...state,
    isEndCitiesLoading: true,
  })),
  on(getEndCitiesSuccessAction, (state: FilterStateInterface, action) => ({
    ...state,
    isEndCitiesLoading: false,
    endCities: action.cities,
  })),
  on(getEndCitiesFailureAction, (state: FilterStateInterface) => ({
    ...state,
    isEndCitiesLoading: false,
  }))
)

export function reducer(state: FilterStateInterface, action: Action) {
  return filterReducer(state, action)
}
