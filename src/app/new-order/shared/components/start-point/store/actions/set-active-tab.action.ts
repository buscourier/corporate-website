import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const setActiveTabAction = createAction(
  ActionTypes.SET_ACTIVE_TAB,
  props<{index: number}>()
)
