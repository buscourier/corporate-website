import {createAction, props} from '@ngrx/store'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
import {WebhookInterface} from '../../../../../shared/types/webhook.interface'
import {ResponseInterface} from '../../types/response.interface'
import {TaskFormInterface} from '../../types/task-form.interface'
import {ActionTypes} from '../action-types'

export const sendWebhookAction = createAction(
  ActionTypes.SEND_WEBHOOK,
  props<{payload: TaskFormInterface}>()
)

export const sendWebhookSuccessAction = createAction(
  ActionTypes.SEND_WEBHOOK_SUCCESS,
  props<{response: WebhookInterface}>()
)

export const sendWebhookFailureAction = createAction(
  ActionTypes.SEND_WEBHOOK_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
