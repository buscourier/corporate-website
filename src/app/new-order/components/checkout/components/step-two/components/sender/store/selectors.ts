import {createFeatureSelector, createSelector} from '@ngrx/store'
import {SenderStateInterface} from '../types/sender-state.interface'
import {SENDER_FEATURE} from './state'

export const senderFeatureSelector =
  createFeatureSelector<SenderStateInterface>(SENDER_FEATURE)

export const senderSelector = createSelector(
  senderFeatureSelector,
  (state: SenderStateInterface) => state
)

export const isSenderValidSelector = createSelector(
  senderFeatureSelector,
  (state: SenderStateInterface) => state.isValid
)

export const isConfidantsLoadingSelector = createSelector(
  senderFeatureSelector,
  (state: SenderStateInterface) => state.isConfidantsLoading
)

export const confidantsSelector = createSelector(
  senderFeatureSelector,
  (state: SenderStateInterface) => state.confidants
)

export const isSenderPristineSelector = createSelector(
  senderFeatureSelector,
  (state: SenderStateInterface) => state.isPristine
)
