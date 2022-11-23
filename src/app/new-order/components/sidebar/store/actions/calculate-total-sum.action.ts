import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const calculateTotalSumAction = createAction(
  ActionTypes.CALCULATE_TOTAL_SUM,
  props<{isTotalSumCalculated: boolean}>()
)
