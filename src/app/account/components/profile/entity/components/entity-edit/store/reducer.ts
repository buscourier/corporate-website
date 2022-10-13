import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {EditEntityProfileStateInterface} from '../types/edit-entity-profile-state.interface'
import {
  getEntityProfileAction,
  getEntityProfileFailureAction,
  getEntityProfileSuccessAction,
} from './actions/get-entity-profile.action'
import {
  updateEntityProfileAction,
  updateEntityProfileFailureAction,
  updateEntityProfileSuccessAction,
} from './actions/update-entity-profile.action'

const editEntityProfileReducer = createReducer(
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
  })),
  on(updateEntityProfileAction, (state) => ({
    ...state,
    isSubmitting: true,
  })),
  on(updateEntityProfileSuccessAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    data: action.profile,
  })),
  on(updateEntityProfileFailureAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    backendErrors: action.errors,
  }))
)

export function reducer(
  state: EditEntityProfileStateInterface,
  action: Action
) {
  return editEntityProfileReducer(state, action)
}