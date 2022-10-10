import {createFeatureSelector, createSelector} from '@ngrx/store'
import {PERSONAL_PROFILE_FEATURE} from './state'
import {PersonalProfileStateInterface} from '../types/personal-profile-state.interface'

export const PersonalProfileFeatureSelector =
  createFeatureSelector<PersonalProfileStateInterface>(PERSONAL_PROFILE_FEATURE)

export const isLoadingSelector = createSelector(
  PersonalProfileFeatureSelector,
  (profileState: PersonalProfileStateInterface) => profileState.isLoading
)

export const personalProfileSelector = createSelector(
  PersonalProfileFeatureSelector,
  (profileState: PersonalProfileStateInterface) => profileState.data
)

export const backendErrorsSelector = createSelector(
  PersonalProfileFeatureSelector,
  (profileState: PersonalProfileStateInterface) => profileState.backendErrors
)
