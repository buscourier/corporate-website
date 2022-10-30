import {createAction, props} from '@ngrx/store'
import {CourierInterface} from '../../../../types/courier.interface'
import {ActionTypes} from '../action-types'

export const setCourierAction = createAction(
  ActionTypes.SET_COURIER,
  props<{pickup: CourierInterface}>()
)
