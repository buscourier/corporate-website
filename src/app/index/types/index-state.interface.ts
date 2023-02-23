import {CALCULATOR_FEATURE} from '../components/calculator/store/state'
import {CalculatorStateInterface} from '../components/calculator/types/calculator-state.interface'
import {TASK_FEATURE} from '../components/task-form/store/state'
import {TaskFormStateInterface} from '../components/task-form/types/task-form-state.interface'

export interface IndexStateInterface {
  [CALCULATOR_FEATURE]: CalculatorStateInterface
  [TASK_FEATURE]: TaskFormStateInterface
}
