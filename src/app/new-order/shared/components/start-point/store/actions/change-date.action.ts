import {createAction, props} from '@ngrx/store'
import {TuiDay} from '@taiga-ui/cdk'
import {ActionTypes} from '../action-types'

export const changeDateAction = createAction(
  ActionTypes.CHANGE_DATE,
  props<{date: TuiDay}>()
)
