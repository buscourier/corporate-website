import {createSelector} from '@ngrx/store'
import {IndexFeatureSelector} from '../../../store/selectors'
import {IndexStateInterface} from '../../../types/index-state.interface'
import {TaskFormStateInterface} from '../types/task-form-state.interface'

export const taskFormSelector = createSelector(
  IndexFeatureSelector,
  (state: IndexStateInterface) => state.task
)

export const isSubmittingSelector = createSelector(
  taskFormSelector,
  (state: TaskFormStateInterface) => state.isSubmitting
)

export const isPristineSelector = createSelector(
  taskFormSelector,
  (state: TaskFormStateInterface) => state.isPristine
)

export const responseSelector = createSelector(
  taskFormSelector,
  (state: TaskFormStateInterface) => state.response
)

export const backendErrorsSelector = createSelector(
  taskFormSelector,
  (state: TaskFormStateInterface) => state.backendErrors
)
