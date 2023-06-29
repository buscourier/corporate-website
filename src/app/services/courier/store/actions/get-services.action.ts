import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {CourierServiceInterface} from '../../types/courier-service.interface'
import {BackendErrorsInterface} from '../../../../shared/types/backend-errors.interface'

export const getServicesAction = createAction(ActionTypes.GET_SERVICES)
export const getServicesSuccessAction = createAction(
  ActionTypes.GET_SERVICES_SUCCESS,
  props<{services: CourierServiceInterface[]}>()
)

export const getServicesFailureAction = createAction(
  ActionTypes.GET_SERVICES_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
