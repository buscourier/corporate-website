import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const changeValidityAction = createAction(
  ActionTypes.CHANGE_VALIDITY,
  props<{isValid: boolean}>()
)
