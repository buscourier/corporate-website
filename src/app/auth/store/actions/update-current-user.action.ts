import {createAction, props} from '@ngrx/store'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {CurrentUserInputInterface} from '../../../shared/types/current-user-input.interface'
import {CurrentUserInterface} from '../../../shared/types/current-user.interface'
import {ActionTypes} from '../action-types'

export const updateCurrentUserAction = createAction(
  ActionTypes.UPDATE_CURRENT_USER,
  props<{currentUserInput: CurrentUserInputInterface}>()
)

export const updateCurrentUserSuccessAction = createAction(
  ActionTypes.UPDATE_CURRENT_USER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const updateCurrentUserFailureAction = createAction(
  ActionTypes.UPDATE_CURRENT_USER_FAILURE,
  props<{errors: BackendErrorsInterface}>()
)
