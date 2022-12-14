import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {OfficeInterface} from '../../../../../shared/types/office.interface'

export const getPointsAction = createAction(ActionTypes.GET_POINTS)

export const getPointsSuccessAction = createAction(
  ActionTypes.GET_POINTS_SUCCESS,
  props<{points: OfficeInterface[]}>()
)

export const getPointsFailureAction = createAction(
  ActionTypes.GET_POINTS_FAILURE,
  props<{errors: string}>()
)
