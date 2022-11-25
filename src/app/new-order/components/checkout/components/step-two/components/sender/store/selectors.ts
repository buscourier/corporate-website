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
