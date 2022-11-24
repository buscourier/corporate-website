import {createFeatureSelector, createSelector} from '@ngrx/store'
import {RECIPIENT_FEATURE} from './state'
import {RecipientStateInterface} from '../types/recipient-state.interface'

export const recipientFeatureSelector =
  createFeatureSelector<RecipientStateInterface>(RECIPIENT_FEATURE)

export const recipientSelector = createSelector(
  recipientFeatureSelector,
  (state: RecipientStateInterface) => state
)
