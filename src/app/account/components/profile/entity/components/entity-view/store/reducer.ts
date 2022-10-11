import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {EntityProfileStateInterface} from '../types/entity-profile-state.interface'
import {
  getEntityProfileAction,
  getEntityProfileFailureAction,
  getEntityProfileSuccessAction,
} from './actions/get-entity-profile.action'

const entityProfileReducer = createReducer(
  initialState,
  on(getEntityProfileAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getEntityProfileSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.profile,
  })),
  on(getEntityProfileFailureAction, (state) => ({
    ...state,
    isLoading: false,
  }))
)

export function reducer(state: EntityProfileStateInterface, action: Action) {
  return entityProfileReducer(state, action)
}
