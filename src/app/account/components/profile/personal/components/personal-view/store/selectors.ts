import {createFeatureSelector, createSelector} from '@ngrx/store'
import {PersonalProfileStateInterface} from '../types/personal-profile-state.interface'
import {PERSONAL_PROFILE_FEATURE} from './state'

export const PersonalProfileFeatureSelector =
  createFeatureSelector<PersonalProfileStateInterface>(PERSONAL_PROFILE_FEATURE)

export const isProfileLoadingSelector = createSelector(
  PersonalProfileFeatureSelector,
  (state: PersonalProfileStateInterface) => state.isLoading
)

export const personalProfileSelector = createSelector(
  PersonalProfileFeatureSelector,
  (state: PersonalProfileStateInterface) => state.data
)

export const backendErrorsSelector = createSelector(
  PersonalProfileFeatureSelector,
  (state: PersonalProfileStateInterface) => state.backendErrors
)
