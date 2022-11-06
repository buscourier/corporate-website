import {createAction, props} from '@ngrx/store'
import {TuiDay} from '@taiga-ui/cdk'
import {ActionTypes} from '../action-types'

export const setDateAction = createAction(
  ActionTypes.SET_DATE,
  props<{date: TuiDay}>()
)
