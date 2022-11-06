import {createAction, props} from '@ngrx/store'
import {CourierInterface} from '../../../../types/courier.interface'
import {ActionTypes} from '../action-types'

export const courierValueChangesAction = createAction(
  ActionTypes.COURIER_VALUE_CHANGES,
  props<{pickup: CourierInterface}>()
)
