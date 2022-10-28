import {Action, createReducer, on} from '@ngrx/store'
import {PersonalProfileStateInterface} from '../types/personal-profile-state.interface'
import {
  getPersonalProfileAction,
  getPersonalProfileFailureAction,
  getPersonalProfileSuccessAction,
} from './actions/get-personal-profile.action'
import {initialState} from './state'

const personalProfileReducer = createReducer(
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

export function reducer(state: PersonalProfileStateInterface, action: Action) {
  return personalProfileReducer(state, action)
}
