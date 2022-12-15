import {createAction, props} from '@ngrx/store'
import {ResponseInterface} from '../../types/response.interface'
import {TaskFormInterface} from '../../types/task-form.interface'
import {ActionTypes} from '../action-types'

export const sendMessageAction = createAction(
  ActionTypes.SEND_MESSAGE,
  props<{payload: TaskFormInterface}>()
)

export const sendMessageSuccessAction = createAction(
  ActionTypes.SEND_MESSAGE_SUCCESS,
  props<{response: ResponseInterface}>()
)

export const sendMessageFailureAction = createAction(
  ActionTypes.SEND_MESSAGE_FAILURE,
  props<{errors: string}>()
)
