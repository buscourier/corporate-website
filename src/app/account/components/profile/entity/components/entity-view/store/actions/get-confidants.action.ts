import {createAction, props} from '@ngrx/store'
import {ConfidantInterface} from '../../../../../../../../shared/types/confidant.interface'
import {ActionTypes} from '../action-types'

export const getConfidantsAction = createAction(
  ActionTypes.GET_CONFIDANTS,
  props<{userId: string}>()
)
export const getConfidantsSuccessAction = createAction(
  ActionTypes.GET_CONFIDANTS_SUCCESS,
  props<{confidants: ConfidantInterface[]}>()
)
export const getConfidantsFailureAction = createAction(
  ActionTypes.GET_CONFIDANTS_FAILURE
)
