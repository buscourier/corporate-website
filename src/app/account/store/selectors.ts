import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ACCOUNT_FEATURE} from './state'
import {AccountStateInterface} from '../types/account-state.interface'

export const accountFeatureSelector =
  createFeatureSelector<AccountStateInterface>(ACCOUNT_FEATURE)

export const isUserProfileLoadingSelector = createSelector(
  accountFeatureSelector,
  (state: AccountStateInterface) => state.isUserProfileLoading
)

export const isBalanceLoadingSelector = createSelector(
  accountFeatureSelector,
  (state: AccountStateInterface) => state.isBalanceLoading
)

export const isSubmittingSelector = createSelector(
  accountFeatureSelector,
  (state: AccountStateInterface) => state.isSubmitting
)

export const userProfileSelector = createSelector(
  accountFeatureSelector,
  (state: AccountStateInterface) => state.userProfile
)

export const accountBalanceSelector = createSelector(
  accountFeatureSelector,
  (state: AccountStateInterface) => state.balance
)

export const backendErrorsSelector = createSelector(
  accountFeatureSelector,
  (state: AccountStateInterface) => state.backendErrors
)
