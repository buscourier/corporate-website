import {Action, createReducer, on} from '@ngrx/store'
import {EntityProfileStateInterface} from '../types/entity-profile-state.interface'
import {
  getEntityProfileAction,
  getEntityProfileFailureAction,
  getEntityProfileSuccessAction,
} from './actions/get-entity-profile.action'
import {
  getProxyAction,
  getProxyFailureAction,
  getProxySuccessAction,
} from './actions/get-proxy.action'
import {initialState} from './state'

const entityProfileReducer = createReducer(
  initialState,
  on(getEntityProfileAction, (state) => ({
    ...state,
    isProfileLoading: true,
  })),
  on(getEntityProfileSuccessAction, (state, {profile}) => ({
    ...state,
    isProfileLoading: false,
    profile,
  })),
  on(getEntityProfileFailureAction, (state) => ({
    ...state,
    isProfileLoading: false,
  })),
  on(getProxyAction, (state) => ({
    ...state,
    isProxyLoading: true,
  })),
  on(getProxySuccessAction, (state, {proxy}) => ({
    ...state,
    isProxyLoading: false,
    proxy,
  })),
  on(getProxyFailureAction, (state) => ({
    ...state,
    isProxyLoading: false,
  }))
)

export function reducer(state: EntityProfileStateInterface, action: Action) {
  return entityProfileReducer(state, action)
}
