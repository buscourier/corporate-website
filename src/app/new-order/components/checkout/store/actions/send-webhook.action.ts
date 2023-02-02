import {createAction, props} from '@ngrx/store'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
import {WebhookInterface} from '../../../../../shared/types/webhook.interface'
import {ActionTypes} from '../action-types'
import {NewOrderResponseInterface} from '../../types/new-order-response.interface'
import {HttpErrorResponse} from '@angular/common/http'

export const sendWebhookAction = createAction(
  ActionTypes.SEND_WEBHOOK,
  props<{order: NewOrderResponseInterface}>()
)

export const sendWebhookSuccessAction = createAction(
  ActionTypes.SEND_WEBHOOK_SUCCESS,
  props<{response: WebhookInterface}>()
)

export const sendWebhookFailureAction = createAction(
  ActionTypes.SEND_WEBHOOK_FAILURE,
  props<{backendErrors: HttpErrorResponse}>()
)
