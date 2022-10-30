import {createAction, props} from '@ngrx/store'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {ActionTypes} from '../action-types'

export const setOfficeAction = createAction(
  ActionTypes.SET_OFFICE,
  props<{give: OfficeInterface}>()
)
