import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {ResumeInterface} from '../../types/resume.interface'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
import {WebhookInterface} from '../../../../../shared/types/webhook.interface'

export const sendWebhookAction = createAction(
  ActionTypes.SEND_WEBHOOK,
  props<{payload: ResumeInterface}>()
)

export const sendWebhookSuccessAction = createAction(
  ActionTypes.SEND_WEBHOOK_SUCCESS,
  props<{response: WebhookInterface}>()
)

export const sendWebhookFailureAction = createAction(
  ActionTypes.SEND_WEBHOOK_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
