import {ActionTypes} from '../action-types'
import {createAction} from '@ngrx/store'

export const clearValidationErrorsAction = createAction(
  ActionTypes.CLEAR_VALIDATION_ERRORS
)
