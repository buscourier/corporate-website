import {Action, createReducer, on} from '@ngrx/store'
import {TariffsStateInterface} from '../types/tariffs-state.interface'
import {
  getCitiesAction,
  getCitiesFailureAction,
  getCitiesSuccessAction,
} from './actions/get-cities.action'
import {
  getZoneTariffsAction,
  getZoneTariffsFailureAction,
  getZoneTariffsSuccessAction,
} from './actions/get-zone-tariffs.action'
import {
  getZonesAction,
  getZonesFailureAction,
  getZonesSuccessAction,
} from './actions/get-zones.action'
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
      isCitiesLoaded: true,
      cities,
    })
  ),
  on(
    getCitiesFailureAction,
    (state): TariffsStateInterface => ({
      ...state,
      isCitiesLoading: false,
    })
  ),
  on(
    getZonesAction,
    (state): TariffsStateInterface => ({
      ...state,
      isZonesLoading: true,
    })
  ),
  on(
    getZonesSuccessAction,
    (state, {zones}): TariffsStateInterface => ({
      ...state,
      isZonesLoading: false,
      zones,
    })
  ),
  on(
    getZonesFailureAction,
    (state, {errors}): TariffsStateInterface => ({
      ...state,
      isZonesLoading: false,
      backendErrors: errors,
    })
  ),
  on(
    getZoneTariffsAction,
    (state): TariffsStateInterface => ({
      ...state,
      isZoneTariffsLoading: true,
    })
  ),
  on(
    getZoneTariffsSuccessAction,
    (state, {tariffs}): TariffsStateInterface => ({
      ...state,
      isZoneTariffsLoading: false,
      zoneTariffs: tariffs,
    })
  ),
  on(
    getZoneTariffsFailureAction,
    (state, {errors}): TariffsStateInterface => ({
      ...state,
      isZoneTariffsLoading: false,
      backendErrors: errors,
    })
  )
)

export function reducer(state, action: Action) {
  return citiesReducer(state, action)
}
