import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const changeScreenSizeAction = createAction(
  ActionTypes.CHANGE_SCREEN_SIZE,
  props<{screenSize: string}>()
)
