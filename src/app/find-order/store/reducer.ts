import {Action, createReducer, on} from '@ngrx/store'
import {FindOrderStateInterface} from '../types/find-order-state.interface'
import {
  getStatusesAction,
  getStatusesFailureAction,
  getStatusesSuccessAction,
} from './actions/get-statuses.action'
import {initialState} from './state'

const findOrderReducer = createReducer(
  initialState,
  on(
    getStatusesAction,
    (state): FindOrderStateInterface => ({
      ...state,
      isStatusesLoading: true,
    })
  ),
  on(
    getStatusesSuccessAction,
    (state, {statuses}): FindOrderStateInterface => ({
      ...state,
      isStatusesLoading: false,
      statuses,
    })
  ),
  on(
    getStatusesFailureAction,
    (state, {errors}): FindOrderStateInterface => ({
      ...state,
      isStatusesLoading: false,
      backendErrors: errors,
    })
  )
)

export function reducer(state: FindOrderStateInterface, action: Action) {
  return findOrderReducer(state, action)
}
