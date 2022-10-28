import {createAction, props} from '@ngrx/store'
import {EntityProfileInterface} from '../../../../types/entity-profile.interface'
import {ActionTypes} from '../action-types'

export const updateEntityProfileAction = createAction(
  ActionTypes.UPDATE_ENTITY_PROFILE,
  props<{currentUserId: string; profileInput: unknown}>()
)

export const updateEntityProfileSuccessAction = createAction(
  ActionTypes.UPDATE_ENTITY_PROFILE_SUCCESS,
  props<{profile: EntityProfileInterface}>()
)

export const updateEntityProfileFailureAction = createAction(
  ActionTypes.UPDATE_ENTITY_PROFILE_FAILURE,
  props<{errors: string}>()
)
