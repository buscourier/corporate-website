import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ResumeStateInterface} from '../types/resume-state.interface'
import {RESUME_FEATURE} from './state'

export const resumeFeatureSelector =
  createFeatureSelector<ResumeStateInterface>(RESUME_FEATURE)

export const isSubmittingSelector = createSelector(
  resumeFeatureSelector,
  (state: ResumeStateInterface) => state.isSubmitting
)

export const isPristineSelector = createSelector(
  resumeFeatureSelector,
  (state: ResumeStateInterface) => state.isPristine
)

export const responseSelector = createSelector(
  resumeFeatureSelector,
  (state: ResumeStateInterface) => state.response
)

export const backendErrorsSelector = createSelector(
  resumeFeatureSelector,
  (state: ResumeStateInterface) => state.backendErrors
)
