import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {SupportFormInterface} from '../../types/support-form.interface'
import {ResponseInterface} from '../../types/response.interface'

export const sendMessageAction = createAction(
  ActionTypes.SEND_MESSAGE,
  props<{payload: SupportFormInterface}>()
)

export const sendMessageSuccessAction = createAction(
  ActionTypes.SEND_MESSAGE_SUCCESS,
  props<{response: ResponseInterface}>()
)

export const sendMessageFailureAction = createAction(
  ActionTypes.SEND_MESSAGE_FAILURE,
  props<{errors: string}>()
)
