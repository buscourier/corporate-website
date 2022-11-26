import {createFeatureSelector, createSelector} from '@ngrx/store'
import {StepOneStateInterface} from '../types/step-one-state.interface'
import {STEP_ONE_FEATURE} from './state'

export const stepOneFeatureSelector =
  createFeatureSelector<StepOneStateInterface>(STEP_ONE_FEATURE)

export const activeTabSelector = createSelector(
  stepOneFeatureSelector,
  (state: StepOneStateInterface) => state.activeTabIndex
)

export const entitySelector = createSelector(
  stepOneFeatureSelector,
  (state: StepOneStateInterface) => state.entity
)
