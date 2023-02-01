import {createAction, props} from '@ngrx/store'
import {BackendErrorsInterface} from '../../../../types/backend-errors.interface'
import {WebhookInterface} from '../../../../types/webhook.interface'
import {SupportFormInterface} from '../../types/support-form.interface'
import {ActionTypes} from '../action-types'

export const sendWebhookAction = createAction(
  ActionTypes.SEND_WEBHOOK,
  props<{payload: SupportFormInterface}>()
)

export const sendWebhookSuccessAction = createAction(
  ActionTypes.SEND_WEBHOOK_SUCCESS,
  props<{response: WebhookInterface}>()
)

export const sendWebhookFailureAction = createAction(
  ActionTypes.SEND_WEBHOOK_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
