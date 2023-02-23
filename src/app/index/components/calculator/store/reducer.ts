import {Action, createReducer, on} from '@ngrx/store'
import {CalculatorStateInterface} from '../types/calculator-state.interface'
import {
  getEndCitiesAction,
  getEndCitiesFailureAction,
  getEndCitiesSuccessAction,
} from './actions/get-end-cities.action'
import {
  getStartCitiesAction,
  getStartCitiesFailureAction,
  getStartCitiesSuccessAction,
} from './actions/get-start-cities.action'
import {initialState} from './state'

const reducer = createReducer(
  initialState,
  on(getStartCitiesAction, (state: CalculatorStateInterface) => ({
    ...state,
    isStartCitiesLoading: true,
  })),
  on(
    getStartCitiesSuccessAction,
    (state: CalculatorStateInterface, action) => ({
      ...state,
      isStartCitiesLoading: false,
      startCities: action.cities,
    })
  ),
  on(getStartCitiesFailureAction, (state: CalculatorStateInterface) => ({
    ...state,
    isStartCitiesLoading: false,
  })),
  on(getEndCitiesAction, (state: CalculatorStateInterface) => ({
    ...state,
    isEndCitiesLoading: true,
  })),
  on(getEndCitiesSuccessAction, (state: CalculatorStateInterface, action) => ({
    ...state,
    isEndCitiesLoading: false,
    endCities: action.cities,
  })),
  on(getEndCitiesFailureAction, (state: CalculatorStateInterface) => ({
    ...state,
    isEndCitiesLoading: false,
  }))
)

export function calculatorReducer(
  state: CalculatorStateInterface,
  action: Action
) {
  return reducer(state, action)
}
