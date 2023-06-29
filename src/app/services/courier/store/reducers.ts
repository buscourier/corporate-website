import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  getServicesAction,
  getServicesFailureAction,
  getServicesSuccessAction,
} from './actions/get-services.action'
import {CourierStateInterface} from '../types/courier-state.interface'

export const courierReducer = createReducer(
  initialState,
  on(
    getServicesAction,
    (state): CourierStateInterface => ({
      ...state,
      isServicesLoading: true,
    })
  ),
  on(
    getServicesSuccessAction,
    (state, {services}): CourierStateInterface => ({
      ...state,
      isServicesLoading: false,
      services,
    })
  ),
  on(
    getServicesFailureAction,
    (state, {backendErrors}): CourierStateInterface => ({
      ...state,
      isServicesLoading: false,
      backendErrors,
    })
  )
)

export function reducers(state: CourierStateInterface, action: Action) {
  return courierReducer(state, action)
}
