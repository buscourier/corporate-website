import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  getPersonalProfileAction,
  getPersonalProfileFailureAction,
  getPersonalProfileSuccessAction,
} from './actions/get-personal-profile.action'
import {EditPersonalProfileStateInterface} from '../types/edit-personal-profile-state.interface'

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
  }))
)

export function reducer(
  state: EditPersonalProfileStateInterface,
  action: Action
) {
  return editPersonalProfileReducer(state, action)
}
