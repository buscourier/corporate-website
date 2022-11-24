import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {PersonStateInterface} from '../../types/person-state.interface'

export const changeValuesAction = createAction(
  ActionTypes.CHANGE_VALUES,
  props<PersonStateInterface>()
)
