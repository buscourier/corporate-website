import {Action, createReducer, on} from '@ngrx/store'
import {EntityProfileStateInterface} from '../types/entity-profile-state.interface'
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
  on(getEntityProfileSuccessAction, (state, action) => ({
    ...state,
    isProfileLoading: false,
    data: action.profile,
  })),
  on(getEntityProfileFailureAction, (state) => ({
    ...state,
    isProfileLoading: false,
  }))
)

export function reducer(state: EntityProfileStateInterface, action: Action) {
  return entityProfileReducer(state, action)
}
