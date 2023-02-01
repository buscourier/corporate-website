import {createAction, props} from '@ngrx/store'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {WebhookInterface} from '../../../shared/types/webhook.interface'
import {FeedbackFormInterface} from '../../types/feedback-form.interface'
import {ActionTypes} from '../action-types'

export const sendWebhookAction = createAction(
  ActionTypes.SEND_WEBHOOK,
  props<{payload: FeedbackFormInterface}>()
)

export const sendWebhookSuccessAction = createAction(
  ActionTypes.SEND_WEBHOOK_SUCCESS,
  props<{response: WebhookInterface}>()
)

export const sendWebhookFailureAction = createAction(
  ActionTypes.SEND_WEBHOOK_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
