import {createAction, props} from '@ngrx/store'
import {PersonStateInterface} from '../../types/person-state.interface'
import {ActionTypes} from '../action-types'

export const valueChangesAction = createAction(
  ActionTypes.VALUE_CHANGES,
  props<PersonStateInterface>()
)
