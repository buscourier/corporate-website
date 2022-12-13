import {Action, createReducer, on} from '@ngrx/store'
import {TariffsStateInterface} from '../types/tariffs-state.interface'
import {
  getCitiesAction,
  getCitiesFailureAction,
  getCitiesSuccessAction,
} from './actions/get-cities.action'
import {initialState} from './state'

const citiesReducer = createReducer(
  initialState,
  on(
    getCitiesAction,
    (state): TariffsStateInterface => ({
      ...state,
      isCitiesLoading: true,
    })
  ),
  on(
    getCitiesSuccessAction,
    (state, {cities}): TariffsStateInterface => ({
      ...state,
      isCitiesLoading: false,
      cities,
    })
  ),
  on(
    getCitiesFailureAction,
    (state): TariffsStateInterface => ({
      ...state,
      isCitiesLoading: false,
    })
  )
)

export function reducer(state, action: Action) {
  return citiesReducer(state, action)
}
