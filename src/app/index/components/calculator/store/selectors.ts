import {createFeatureSelector, createSelector} from '@ngrx/store'
import {CalculatorStateInterface} from '../types/calculator-state.interface'
import {CALCULATOR_FEATURE} from './state'

export const calculatorFeatureSelector =
  createFeatureSelector<CalculatorStateInterface>(CALCULATOR_FEATURE)

export const isStartCitiesLoadingSelector = createSelector(
  calculatorFeatureSelector,
  (state: CalculatorStateInterface) => state.isStartCitiesLoading
)

export const isEndCitiesLoadingSelector = createSelector(
  calculatorFeatureSelector,
  (state: CalculatorStateInterface) => state.isEndCitiesLoading
)

export const startCitiesSelector = createSelector(
  calculatorFeatureSelector,
  (state: CalculatorStateInterface) => state.startCities
)

export const endCitiesSelector = createSelector(
  calculatorFeatureSelector,
  (state: CalculatorStateInterface) => state.endCities
)

export const backendErrorsSelector = createSelector(
  calculatorFeatureSelector,
  (state: CalculatorStateInterface) => state.backendErrors
)
