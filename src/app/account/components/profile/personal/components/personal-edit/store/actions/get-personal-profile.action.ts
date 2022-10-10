import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {PersonalProfileInterface} from '../../../../types/personal-profile.interface'

export const getPersonalProfileAction = createAction(
  ActionTypes.GET_PERSONAL_PROFILE,
  props<{userId: string}>()
)
export const getPersonalProfileSuccessAction = createAction(
  ActionTypes.GET_PERSONAL_PROFILE_SUCCESS,
  props<{profile: PersonalProfileInterface}>()
)
export const getPersonalProfileFailureAction = createAction(
  ActionTypes.GET_PERSONAL_PROFILE_FAILURE
)
