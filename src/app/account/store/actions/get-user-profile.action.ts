import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {UserProfileInterface} from '../../types/user-profile.interface'

export const getUserProfileAction = createAction(
  ActionTypes.GET_USER_PROFILE,
  props<{userId: string}>()
)

export const getUserProfileSuccessAction = createAction(
  ActionTypes.GET_USER_PROFILE_SUCCESS,
  props<{profile: UserProfileInterface}>()
)

export const getUserProfileFailureAction = createAction(
  ActionTypes.GET_USER_PROFILE_FAILURE,
  props<{errors: string}>()
)
