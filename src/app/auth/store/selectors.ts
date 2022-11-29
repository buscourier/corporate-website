import {createFeatureSelector, createSelector} from '@ngrx/store'
import {CurrentUserInterface} from '../../shared/types/current-user.interface'
import {AuthStateInterface} from '../types/auth-state.interface'
import {AUTH_FEATURE} from './state'

export const authFeatureSelector =
  createFeatureSelector<AuthStateInterface>(AUTH_FEATURE)

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
)

export const isLoadingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoading
)

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
)

export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn === false
)

// export const isAnonymousSelector = createSelector(
//   isLoggedInSelector,
//   isLoggedInSelector => !isLoggedInSelector
// )

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser
)

export const isEntitySelector = createSelector(
  currentUserSelector,
  (user: CurrentUserInterface) => user.user_type === 'ur'
)

export const isPersonalSelector = createSelector(
  currentUserSelector,
  (user: CurrentUserInterface) => user.user_type !== 'ur'
)

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authSate: AuthStateInterface) => authSate.validationErrors
)
