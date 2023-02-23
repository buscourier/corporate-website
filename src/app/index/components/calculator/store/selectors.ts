import {createSelector} from '@ngrx/store'
import {IndexFeatureSelector} from '../../../store/selectors'
import {IndexStateInterface} from '../../../types/index-state.interface'
import {CalculatorStateInterface} from '../types/calculator-state.interface'

export const calculatorSelector = createSelector(
  IndexFeatureSelector,
  (state: IndexStateInterface) => state.calculator
)

export const isStartCitiesLoadingSelector = createSelector(
  calculatorSelector,
  (state: CalculatorStateInterface) => state.isStartCitiesLoading
)

export const isEndCitiesLoadingSelector = createSelector(
  calculatorSelector,
  (state: CalculatorStateInterface) => state.isEndCitiesLoading
)

export const startCitiesSelector = createSelector(
  calculatorSelector,
  (state: CalculatorStateInterface) => state.startCities
)

export const endCitiesSelector = createSelector(
  calculatorSelector,
  (state: CalculatorStateInterface) => state.endCities
)

export const backendErrorsSelector = createSelector(
  calculatorSelector,
  (state: CalculatorStateInterface) => state.backendErrors
)
