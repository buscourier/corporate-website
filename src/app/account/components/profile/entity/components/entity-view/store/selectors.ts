import {createFeatureSelector, createSelector} from '@ngrx/store'
import {EntityProfileStateInterface} from '../types/entity-profile-state.interface'
import {ENTITY_PROFILE_FEATURE} from './state'

export const EntityProfileFeatureSelector =
  createFeatureSelector<EntityProfileStateInterface>(ENTITY_PROFILE_FEATURE)

export const isProfileLoadingSelector = createSelector(
  EntityProfileFeatureSelector,
  (state: EntityProfileStateInterface) => state.isProfileLoading
)

export const isConfidantsLoadingSelector = createSelector(
  EntityProfileFeatureSelector,
  (state: EntityProfileStateInterface) => state.isConfidantsLoading
)

//TODO entityProfileSelector or profileSelector?
export const entityProfileSelector = createSelector(
  EntityProfileFeatureSelector,
  (state: EntityProfileStateInterface) => state.profile
)

export const confidantsSelector = createSelector(
  EntityProfileFeatureSelector,
  (state: EntityProfileStateInterface) => state.confidants
)

export const backendErrorsSelector = createSelector(
  EntityProfileFeatureSelector,
  (state: EntityProfileStateInterface) => state.backendErrors
)
