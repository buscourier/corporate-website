import {createAction} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const clearValidationErrorsAction = createAction(
  ActionTypes.CLEAR_VALIDATION_ERRORS
)
