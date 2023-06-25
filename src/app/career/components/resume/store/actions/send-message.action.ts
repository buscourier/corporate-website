import {createAction, props} from '@ngrx/store'
import {ResumeInterface} from '../../types/resume.interface'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
import {ActionTypes} from '../action-types'
import {ResponseInterface} from '../../types/response.interface'

export const sendMessageAction = createAction(
  ActionTypes.SEND_MESSAGE,
  props<{payload: ResumeInterface}>()
)

export const sendMessageSuccessAction = createAction(
  ActionTypes.SEND_MESSAGE_SUCCESS,
  props<{response: ResponseInterface}>()
)

export const sendMessageFailureAction = createAction(
  ActionTypes.SEND_MESSAGE_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
