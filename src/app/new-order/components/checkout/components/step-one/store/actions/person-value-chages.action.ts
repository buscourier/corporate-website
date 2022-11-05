import {createAction, props} from '@ngrx/store'
import {PersonInterface} from '../../types/person.interface'
import {ActionTypes} from '../action-types'

export const personValueChangesAction = createAction(
  ActionTypes.PERSON_VALUE_CHANGES,
  props<PersonInterface>()
)
