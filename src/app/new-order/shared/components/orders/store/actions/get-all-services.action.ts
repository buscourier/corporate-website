import {createAction, props} from '@ngrx/store'
import {ServiceInterface} from '../../../../types/service.interface'
import {ActionTypes} from '../action-types'

export const getAllServicesAction = createAction(
  ActionTypes.GET_ALL_SERVICES,
  props<{startCityId: string}>()
)

export const getAllServicesSuccessAction = createAction(
  ActionTypes.GET_ALL_SERVICES_SUCCESS,
  props<{services: ServiceInterface[]}>()
)

export const getAllServicesFailureAction = createAction(
  ActionTypes.GET_ALL_SERVICES_FAILURE,
  props<{errors: string}>()
)
