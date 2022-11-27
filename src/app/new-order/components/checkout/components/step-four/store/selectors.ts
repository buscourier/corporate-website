import {createFeatureSelector, createSelector} from '@ngrx/store'
import {StepFourStateInterface} from '../types/step-four-state.interface'
import {STEP_FOUR_FEATURE} from './state'

export const stepFourFeatureSelector =
  createFeatureSelector<StepFourStateInterface>(STEP_FOUR_FEATURE)

export const isSubmittingSelector = createSelector(
  stepFourFeatureSelector,
  (state: StepFourStateInterface) => state.isSubmitting
)
