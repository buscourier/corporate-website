import {createAction, props} from '@ngrx/store'
import {EntityProfileInterface} from '../../../../types/entity-profile.interface'
import {ActionTypes} from '../action-types'

export const getEntityProfileAction = createAction(
  ActionTypes.GET_ENTITY_PROFILE,
  props<{userId: string}>()
)
export const getEntityProfileSuccessAction = createAction(
  ActionTypes.GET_ENTITY_PROFILE_SUCCESS,
  props<{profile: EntityProfileInterface}>()
)
export const getEntityProfileFailureAction = createAction(
  ActionTypes.GET_ENTITY_PROFILE_FAILURE
)
