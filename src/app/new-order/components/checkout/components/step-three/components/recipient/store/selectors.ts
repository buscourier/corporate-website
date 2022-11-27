import {createFeatureSelector, createSelector} from '@ngrx/store'
import {RecipientStateInterface} from '../types/recipient-state.interface'
import {RECIPIENT_FEATURE} from './state'

export const recipientFeatureSelector =
  createFeatureSelector<RecipientStateInterface>(RECIPIENT_FEATURE)

export const recipientSelector = createSelector(
  recipientFeatureSelector,
  (state: RecipientStateInterface) => state
)

export const isRecipientValidSelector = createSelector(
  recipientFeatureSelector,
  (state: RecipientStateInterface) => state.isValid
)

export const isRecipientPristineSelector = createSelector(
  recipientFeatureSelector,
  (state: RecipientStateInterface) => state.isPristine
)
