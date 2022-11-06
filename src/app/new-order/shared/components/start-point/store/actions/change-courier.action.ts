import {createAction, props} from '@ngrx/store'
import {CourierInterface} from '../../../../types/courier.interface'
import {ActionTypes} from '../action-types'

export const changeCourierAction = createAction(
  ActionTypes.CHANGE_COURIER,
  props<{pickup: CourierInterface}>()
)
