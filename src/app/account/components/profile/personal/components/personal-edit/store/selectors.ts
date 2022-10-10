import {createFeatureSelector, createSelector} from '@ngrx/store'
import {EditPersonalProfileStateInterface} from '../types/edit-personal-profile-state.interface'
import {EDIT_PERSONAL_PROFILE_FEATURE} from './state'

export const EditPersonalProfileFeatureSelector =
  createFeatureSelector<EditPersonalProfileStateInterface>(
    EDIT_PERSONAL_PROFILE_FEATURE
  )

export const isLoadingSelector = createSelector(
  EditPersonalProfileFeatureSelector,
  (profileState: EditPersonalProfileStateInterface) => profileState.isLoading
)

export const personalProfileSelector = createSelector(
  EditPersonalProfileFeatureSelector,
  (profileState: EditPersonalProfileStateInterface) => profileState.data
)

export const backendErrorsSelector = createSelector(
  EditPersonalProfileFeatureSelector,
  (profileState: EditPersonalProfileStateInterface) =>
    profileState.backendErrors
)
