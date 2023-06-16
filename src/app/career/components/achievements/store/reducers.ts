import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  getAchievementsAction,
  getAchievementsFailureAction,
  getAchievementsSuccessAction,
} from './actions/get-achievements.action'
import {AchievementsStateInterface} from '../types/achievements-state.interface'

export const achievementsReducer = createReducer(
  initialState,
  on(getAchievementsAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getAchievementsSuccessAction, (state, {data}) => ({
    ...state,
    isLoading: false,
    data,
  })),
  on(getAchievementsFailureAction, (state, {backendErrors}) => ({
    ...state,
    isLoading: false,
    backendErrors,
  }))
)

export function reducers(state: AchievementsStateInterface, action: Action) {
  return achievementsReducer(state, action)
}
