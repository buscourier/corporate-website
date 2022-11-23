import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const initOrdersAction = createAction(
  ActionTypes.INIT_ORDERS,
  props<{isInitialized: boolean}>()
)
