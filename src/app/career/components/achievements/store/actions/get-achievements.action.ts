import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
import {AchievementsInterface} from '../../types/achievements.interface'

export const getAchievementsAction = createAction(ActionTypes.GET_ACHIEVEMENTS)
export const getAchievementsSuccessAction = createAction(
  ActionTypes.GET_ACHIEVEMENTS_SUCCESS,
  props<{data: AchievementsInterface}>()
)
export const getAchievementsFailureAction = createAction(
  ActionTypes.GET_ACHIEVEMENTS_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
