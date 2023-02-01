import {createFeatureSelector, createSelector} from '@ngrx/store'
import {FeedbackStateInterface} from '../types/feedback-state.interface'
import {FEEDBACK_FEATURE} from './state'

export const feedbackFeatureSelector =
  createFeatureSelector<FeedbackStateInterface>(FEEDBACK_FEATURE)

export const isSubmittingSelector = createSelector(
  feedbackFeatureSelector,
  (state: FeedbackStateInterface) => state.isSubmitting
)

export const isPristineSelector = createSelector(
  feedbackFeatureSelector,
  (state: FeedbackStateInterface) => state.isPristine
)

export const responseSelector = createSelector(
  feedbackFeatureSelector,
  (state: FeedbackStateInterface) => state.response
)

export const backendErrorsSelector = createSelector(
  feedbackFeatureSelector,
  (state: FeedbackStateInterface) => state.backendErrors
)
