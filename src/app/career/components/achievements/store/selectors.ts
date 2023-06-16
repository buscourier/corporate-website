import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ACHIEVEMENTS_STATE} from './state'
import {AchievementsStateInterface} from '../types/achievements-state.interface'

export const achievementsFeatureSelector =
  createFeatureSelector<AchievementsStateInterface>(ACHIEVEMENTS_STATE)
export const isLoadingSelector = createSelector(
  achievementsFeatureSelector,
  ({isLoading}: AchievementsStateInterface) => isLoading
)

export const backendErrorsSelector = createSelector(
  achievementsFeatureSelector,
  ({backendErrors}: AchievementsStateInterface) => backendErrors
)

export const achievementsSelector = createSelector(
  achievementsFeatureSelector,
  ({data}: AchievementsStateInterface) => data
)
