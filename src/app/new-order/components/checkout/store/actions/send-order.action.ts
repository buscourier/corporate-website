import {createAction, props} from '@ngrx/store'
import {NewOrderInputInterface} from '../../types/new-order-input.interface'
import {ActionTypes} from '../action-types'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
import {NewOrderResponseInterface} from '../../types/new-order-response.interface'
import {HttpErrorResponse} from '@angular/common/http'

export const sendOrderAction = createAction(
  ActionTypes.SEND_ORDER,
  props<{order: NewOrderInputInterface}>()
)

export const sendOrderSuccessAction = createAction(
  ActionTypes.SEND_ORDER_SUCCESS,
  props<{order: NewOrderResponseInterface}>() //TODO: set type of order
)

export const sendOrderFailureAction = createAction(
  ActionTypes.SEND_ORDER_FAILURE,
  props<{backendErrors: HttpErrorResponse}>()
)
