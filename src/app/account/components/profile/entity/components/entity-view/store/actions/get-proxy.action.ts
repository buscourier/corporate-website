import {createAction, props} from '@ngrx/store'
import {ProxyPersonInterface} from '../../../../../../../../shared/types/proxy-person.interface'
import {ActionTypes} from '../action-types'

export const getProxyAction = createAction(
  ActionTypes.GET_PROXY,
  props<{userId: string}>()
)
export const getProxySuccessAction = createAction(
  ActionTypes.GET_PROXY_SUCCESS,
  props<{proxy: ProxyPersonInterface}>()
)
export const getProxyFailureAction = createAction(ActionTypes.GET_PROXY_FAILURE)
