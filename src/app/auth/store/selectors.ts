import {createFeatureSelector, createSelector} from '@ngrx/store'
import {AppStateInterface} from '../../shared/types/app-state.interface'
import {AuthStateInterface} from '../types/auth-state.interface'

export const authFeatureSelector = (
  state: AppStateInterface
): AuthStateInterface => state.auth

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
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

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authSate: AuthStateInterface) => authSate.validationErrors
)
