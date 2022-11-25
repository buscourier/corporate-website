import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const setPreviousStepAction = createAction(
  ActionTypes.SET_PREVIOUS_STEP,
  props<{previousStep: number}>()
)
