import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {CurrentUserInputInterface} from '../../../shared/types/current-user-input.interface'
import {CurrentUserInterface} from '../../../shared/types/current-user.interface'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'

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
