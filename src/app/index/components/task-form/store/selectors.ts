import {createFeatureSelector, createSelector} from '@ngrx/store'
import {TaskFormStateInterface} from '../types/task-form-state.interface'
import {TASK_FORM_FEATURE} from './state'

export const taskFormFeatureSelector =
  createFeatureSelector<TaskFormStateInterface>(TASK_FORM_FEATURE)

export const isSubmittingSelector = createSelector(
  taskFormFeatureSelector,
  (state: TaskFormStateInterface) => state.isSubmitting
)

export const responseSelector = createSelector(
  taskFormFeatureSelector,
  (state: TaskFormStateInterface) => state.response
)

export const backendErrorsSelector = createSelector(
  taskFormFeatureSelector,
  (state: TaskFormStateInterface) => state.backendErrors
)
