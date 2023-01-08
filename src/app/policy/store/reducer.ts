import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  getMarkupAction,
  getMarkupFailureAction,
  getMarkupSuccessAction,
} from './actions/get-markup.action'
import {PolicyStateInterface} from '../types/policy-state.interface'

const policyReducer = createReducer(
  initialState,
  on(
    getMarkupAction,
    (state): PolicyStateInterface => ({
      ...state,
      isMarkupLoading: true,
    })
  ),
  on(
    getMarkupSuccessAction,
    (state, {markup}): PolicyStateInterface => ({
      ...state,
      isMarkupLoading: false,
      markup,
    })
  ),
  on(
    getMarkupFailureAction,
    (state, {backendErrors}): PolicyStateInterface => ({
      ...state,
      isMarkupLoading: false,
      backendErrors,
    })
  )
)

export function reducer(state: PolicyStateInterface, action: Action) {
  return policyReducer(state, action)
}
