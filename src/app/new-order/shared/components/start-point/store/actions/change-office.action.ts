import {createAction, props} from '@ngrx/store'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {ActionTypes} from '../action-types'

export const changeOfficeAction = createAction(
  ActionTypes.CHANGE_OFFICE,
  props<{give: OfficeInterface}>()
)
