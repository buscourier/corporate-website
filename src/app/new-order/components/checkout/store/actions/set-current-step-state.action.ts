import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const setCurrentStepStateAction = createAction(
  ActionTypes.SET_CURRENT_STEP_STATE,
  props<{isValid: boolean}>()
)
