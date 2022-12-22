import {createFeatureSelector, createSelector} from '@ngrx/store'
import {EditPersonalProfileStateInterface} from '../types/edit-personal-profile-state.interface'
import {EDIT_PERSONAL_PROFILE_FEATURE} from './state'

export const EditPersonalProfileFeatureSelector =
  createFeatureSelector<EditPersonalProfileStateInterface>(
    EDIT_PERSONAL_PROFILE_FEATURE
  )

export const isProfileLoadingSelector = createSelector(
  EditPersonalProfileFeatureSelector,
  (state: EditPersonalProfileStateInterface) => state.isLoading
)

export const isSubmittingSelector = createSelector(
  EditPersonalProfileFeatureSelector,
  (state: EditPersonalProfileStateInterface) => state.isSubmitting
)

export const personalProfileSelector = createSelector(
  EditPersonalProfileFeatureSelector,
  (state: EditPersonalProfileStateInterface) => state.data
)

export const backendErrorsSelector = createSelector(
  EditPersonalProfileFeatureSelector,
  (state: EditPersonalProfileStateInterface) => state.backendErrors
)
