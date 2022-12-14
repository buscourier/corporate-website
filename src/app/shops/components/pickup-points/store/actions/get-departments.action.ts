import {createAction, props} from '@ngrx/store'
import {OfficeInterface} from '../../../../../shared/types/office.interface'
import {ActionTypes} from '../action-types'

export const getDepartmentsAction = createAction(ActionTypes.GET_DEPARTMENTS)

export const getDepartmentsSuccessAction = createAction(
  ActionTypes.GET_DEPARTMENTS_SUCCESS,
  props<{departments: OfficeInterface[]}>()
)

export const getDepartmentsFailureAction = createAction(
  ActionTypes.GET_DEPARTMENTS_FAILURE,
  props<{errors: string}>()
)
