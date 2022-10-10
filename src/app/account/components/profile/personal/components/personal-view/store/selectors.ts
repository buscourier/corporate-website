import {createFeatureSelector, createSelector} from '@ngrx/store'
import {AuthStateInterface} from '../../../../../../../auth/types/auth-state.interface'
import {AUTH_FEATURE} from '../../../../../../../auth/store/state'
import {PERSONAL_PROFILE_FEATURE} from './state'
import {PersonalProfileStateInterface} from '../types/personal-profile-state.interface'

export const PersonalProfileFeatureSelector =
  createFeatureSelector<PersonalProfileStateInterface>(PERSONAL_PROFILE_FEATURE)

export const isLoadingSelector = createSelector(
  PersonalProfileFeatureSelector,
  (profileState: PersonalProfileStateInterface) => profileState.isLoading
)

export const userProfileSelector = createSelector(
  PersonalProfileFeatureSelector,
  (profileState: PersonalProfileStateInterface) => profileState.data
)

export const errorSelector = createSelector(
  PersonalProfileFeatureSelector,
  (profileState: PersonalProfileStateInterface) => profileState.backendErrors
)
