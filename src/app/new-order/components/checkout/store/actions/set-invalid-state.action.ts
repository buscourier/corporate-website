import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const setInvalidStateAction = createAction(
  ActionTypes.SET_INVALID_STATE,
  props<{isInvalid: boolean}>()
)
