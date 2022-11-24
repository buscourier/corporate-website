import {createFeatureSelector, createSelector} from '@ngrx/store'
import {SENDER_FEATURE} from './state'
import {SenderStateInterface} from '../types/sender-state.interface'

export const senderFeatureSelector =
  createFeatureSelector<SenderStateInterface>(SENDER_FEATURE)

export const senderSelector = createSelector(
  senderFeatureSelector,
  (state: SenderStateInterface) => state
)
