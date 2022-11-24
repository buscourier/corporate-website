import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {SenderStateInterface} from '../../types/sender-state.interface'

export const changeValuesAction = createAction(
  ActionTypes.CHANGE_VALUES,
  props<SenderStateInterface>()
)
