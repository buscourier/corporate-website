import {CalculatorStateInterface} from '../types/calculator-state.interface'

export const CALCULATOR_FEATURE = 'calculator'

export const initialState: CalculatorStateInterface = {
  isStartCitiesLoading: false,
  isEndCitiesLoading: false,
  isSubmitting: false,
  startCities: null,
  endCities: null,
  backendErrors: null,
}
