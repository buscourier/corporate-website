import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const changeActiveOrderAction = createAction(
  ActionTypes.CHANGE_ACTIVE_ORDER,
  props<{activeOrderIndex: number}>()
)
