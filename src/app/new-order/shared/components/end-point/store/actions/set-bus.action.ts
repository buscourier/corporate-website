import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const setBusAction = createAction(
  ActionTypes.SET_BUS,
  props<{bus: string}>()
)
