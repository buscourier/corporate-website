import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const updateFinishedStepsAction = createAction(
  ActionTypes.UPDATE_FINISHED_STEPS,
  props<{steps: {[key: number]: boolean}}>()
)
