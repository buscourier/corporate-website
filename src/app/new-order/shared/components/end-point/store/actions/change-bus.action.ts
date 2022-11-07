import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const changeBusAction = createAction(
  ActionTypes.CHANGE_BUS,
  props<{isBus: boolean}>()
)
