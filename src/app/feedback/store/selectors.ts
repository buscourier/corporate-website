import {createFeatureSelector, createSelector} from '@ngrx/store'
import {FeedbackStateInterface} from '../types/feedback-state.interface'
import {FEEDBACK_FEATURE} from './state'

export const feedbackFeatureSelector =
  createFeatureSelector<FeedbackStateInterface>(FEEDBACK_FEATURE)

export const isSubmittingSelector = createSelector(
  feedbackFeatureSelector,
  (state: FeedbackStateInterface) => state.isSubmitting
)

export const responseSelector = createSelector(
  feedbackFeatureSelector,
  (state: FeedbackStateInterface) => state.response
)

export const validationErrorsSelector = createSelector(
  feedbackFeatureSelector,
  (state: FeedbackStateInterface) => state.validationErrors
)
