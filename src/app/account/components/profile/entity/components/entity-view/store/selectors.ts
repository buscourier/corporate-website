import {createFeatureSelector, createSelector} from '@ngrx/store'
import {EntityProfileStateInterface} from '../types/entity-profile-state.interface'
import {ENTITY_PROFILE_FEATURE} from './state'

export const EntityProfileFeatureSelector =
  createFeatureSelector<EntityProfileStateInterface>(ENTITY_PROFILE_FEATURE)

export const isProfileLoadingSelector = createSelector(
  EntityProfileFeatureSelector,
  (profileState: EntityProfileStateInterface) => profileState.isProfileLoading
)

export const entityProfileSelector = createSelector(
  EntityProfileFeatureSelector,
  (profileState: EntityProfileStateInterface) => profileState.data
)

export const backendErrorsSelector = createSelector(
  EntityProfileFeatureSelector,
  (profileState: EntityProfileStateInterface) => profileState.backendErrors
)
