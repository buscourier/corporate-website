import {createAction, props} from '@ngrx/store'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {CourierInterface} from '../../../../types/courier.interface'
import {ActionTypes} from '../action-types'

export const setActiveTabAction = createAction(
  ActionTypes.SET_ACTIVE_TAB,
  props<{activeTab: OfficeInterface | CourierInterface}>()
)
