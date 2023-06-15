import {createFeatureSelector, createSelector} from '@ngrx/store'
import {BALANCE_FEATURE} from './state'
import {BalanceStateInterface} from '../types/balance-state.interface'

export const balanceFeatureSelector =
  createFeatureSelector<BalanceStateInterface>(BALANCE_FEATURE)

export const isLoadingSelector = createSelector(
  balanceFeatureSelector,
  ({isLoading}: BalanceStateInterface) => isLoading
)

export const balanceSelector = createSelector(
  balanceFeatureSelector,
  ({balance}: BalanceStateInterface) => balance
)

export const backendErrorsSelector = createSelector(
  balanceFeatureSelector,
  ({backendErrors}: BalanceStateInterface) => backendErrors
)
