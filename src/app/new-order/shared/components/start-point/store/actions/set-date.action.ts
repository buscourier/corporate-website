import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const setDateAction = createAction(
  ActionTypes.SET_DATE,
  props<{date: string}>()
)
