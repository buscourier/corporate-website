import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const setCurrentStepAction = createAction(
  ActionTypes.SET_CURRENT_STEP,
  props<{currentStep: number}>()
)
