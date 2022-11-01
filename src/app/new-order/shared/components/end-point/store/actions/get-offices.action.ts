import {createAction, props} from '@ngrx/store'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {ActionTypes} from '../action-types'

export const getOfficesAction = createAction(
  ActionTypes.GET_OFFICES,
  props<{id: string}>()
)

export const getOfficesSuccessAction = createAction(
  ActionTypes.GET_OFFICES_SUCCESS,
  props<{offices: OfficeInterface[]}>()
)

export const getOfficesFailureAction = createAction(
  ActionTypes.GET_OFFICES_FAILURE,
  props<{error: string}>()
)
