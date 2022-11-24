import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {RecipientStateInterface} from '../../types/recipient-state.interface'

export const changeValuesAction = createAction(
  ActionTypes.CHANGE_VALUES,
  props<RecipientStateInterface>()
)
