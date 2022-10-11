import {createAction, props} from '@ngrx/store'
import {PersonalProfileInterface} from '../../../../types/personal-profile.interface'
import {ActionTypes} from '../action-types'

export const updatePersonalProfileAction = createAction(
  ActionTypes.UPDATE_PERSONAL_PROFILE,
  props<{currentUserId: string; profileInput: unknown}>()
)

export const updatePersonalProfileSuccessAction = createAction(
  ActionTypes.UPDATE_PERSONAL_PROFILE_SUCCESS,
  props<{profile: PersonalProfileInterface}>()
)

export const updatePersonalProfileFailureAction = createAction(
  ActionTypes.UPDATE_PERSONAL_PROFILE_FAILURE,
  props<{errors: string}>()
)
