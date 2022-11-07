import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const changeActiveTabAction = createAction(
  ActionTypes.CHANGE_ACTIVE_TAB,
  props<{activeTabIndex: number}>()
)
