import {Action, createReducer, on} from '@ngrx/store'
import {EditPersonalProfileStateInterface} from '../types/edit-personal-profile-state.interface'
import {
  getPersonalProfileAction,
  getPersonalProfileFailureAction,
  getPersonalProfileSuccessAction,
} from './actions/get-personal-profile.action'
import {
  updatePersonalProfileAction,
  updatePersonalProfileFailureAction,
  updatePersonalProfileSuccessAction,
} from './actions/update-personal-profile.action'
import {initialState} from './state'

const editPersonalProfileReducer = createReducer(
  initialState,
  on(getPersonalProfileAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getPersonalProfileSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.profile,
  })),
  on(getPersonalProfileFailureAction, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(updatePersonalProfileAction, (state) => ({
    ...state,
    isSubmitting: true,
  })),
  on(updatePersonalProfileSuccessAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    data: action.profile,
  })),
  on(updatePersonalProfileFailureAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    backendErrors: action.errors,
  }))
)

export function reducer(
  state: EditPersonalProfileStateInterface,
  action: Action
) {
  return editPersonalProfileReducer(state, action)
}
