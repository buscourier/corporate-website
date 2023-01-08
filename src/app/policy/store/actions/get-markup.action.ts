import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const getMarkupAction = createAction(ActionTypes.GET_MARKUP)

export const getMarkupSuccessAction = createAction(
  ActionTypes.GET_MARKUP_SUCCESS,
  props<{markup: string}>()
)

export const getMarkupFailureAction = createAction(
  ActionTypes.GET_MARKUP_FAILURE,
  props<{backendErrors: string}>()
)
