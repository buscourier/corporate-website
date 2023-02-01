import {TaskFormStateInterface} from '../types/task-form-state.interface'

export const TASK_FORM_FEATURE = 'taskForm'

export const initialState: TaskFormStateInterface = {
  isSubmitting: false,
  isPristine: true,
  response: null,
  backendErrors: null,
}
