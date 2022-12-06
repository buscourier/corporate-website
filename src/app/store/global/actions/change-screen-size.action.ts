import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const changeScreenSize = createAction(
  ActionTypes.CHANGE_SCREEN_SIZE,
  props<{screenSize: string}>()
)
