import {ActionReducerMap} from '@ngrx/store'
import {calculatorReducer} from '../components/calculator/store/reducer'
import {CALCULATOR_FEATURE} from '../components/calculator/store/state'
import {taskReducer} from '../components/task-form/store/reducer'
import {TASK_FEATURE} from '../components/task-form/store/state'
import {IndexStateInterface} from '../types/index-state.interface'

export const INDEX_FEATURE = 'index'

export const initialState: IndexStateInterface = {
  [CALCULATOR_FEATURE]: null,
  [TASK_FEATURE]: null,
}

export const reducers: ActionReducerMap<IndexStateInterface> = {
  [CALCULATOR_FEATURE]: calculatorReducer,
  [TASK_FEATURE]: taskReducer,
}
