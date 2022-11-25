import {createFeatureSelector, createSelector} from '@ngrx/store'
import {CheckoutStateInterface} from '../types/checkout-state.interface'
import {CHECKOUT_FEATURE} from './state'

export const checkoutFeatureSelector =
  createFeatureSelector<CheckoutStateInterface>(CHECKOUT_FEATURE)

export const currentStepSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => state.currentStep
)

export const previousStepSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => state.previousStep
)

export const isCurrentStepValidSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => state.isCurrentStepValid
)

export const finishedStepsSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => state.finishedSteps
)
