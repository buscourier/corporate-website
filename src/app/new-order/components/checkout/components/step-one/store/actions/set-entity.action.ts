import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const setEntityAction = createAction(
  ActionTypes.SET_ENTITY,
  props<{entity: any}>()
)
