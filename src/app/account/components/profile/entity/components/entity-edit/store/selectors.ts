import {createFeatureSelector, createSelector} from '@ngrx/store'
import {EditEntityProfileStateInterface} from '../types/edit-entity-profile-state.interface'
import {EDIT_ENTITY_PROFILE_FEATURE} from './state'

export const EditEntityProfileFeatureSelector =
  createFeatureSelector<EditEntityProfileStateInterface>(
    EDIT_ENTITY_PROFILE_FEATURE
  )

export const isProfileLoadingSelector = createSelector(
  EditEntityProfileFeatureSelector,
  (profileState: EditEntityProfileStateInterface) => profileState.isLoading
)

export const isSubmittingSelector = createSelector(
  EditEntityProfileFeatureSelector,
  (profileState: EditEntityProfileStateInterface) => profileState.isSubmitting
)

export const entityProfileSelector = createSelector(
  EditEntityProfileFeatureSelector,
  (profileState: EditEntityProfileStateInterface) => profileState.data
)

export const backendErrorsSelector = createSelector(
  EditEntityProfileFeatureSelector,
  (profileState: EditEntityProfileStateInterface) => profileState.backendErrors
)
