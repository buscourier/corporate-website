import {Action, createReducer, on} from '@ngrx/store'
import {EntityProfileStateInterface} from '../types/entity-profile-state.interface'
import {
  getConfidantsAction,
  getConfidantsFailureAction,
  getConfidantsSuccessAction,
} from './actions/get-confidants.action'
import {
  getEntityProfileAction,
  getEntityProfileFailureAction,
  getEntityProfileSuccessAction,
} from './actions/get-entity-profile.action'
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
  on(getConfidantsAction, (state) => ({
    ...state,
    isConfidantsLoading: true,
  })),
  on(getConfidantsSuccessAction, (state, {confidants}) => ({
    ...state,
    isConfidantsLoading: false,
    confidants,
  })),
  on(getConfidantsFailureAction, (state) => ({
    ...state,
    isConfidantsLoading: false,
  }))
)

export function reducer(state: EntityProfileStateInterface, action: Action) {
  return entityProfileReducer(state, action)
}
