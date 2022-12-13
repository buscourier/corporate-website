import {createAction, props} from '@ngrx/store'
import {ZoneInterface} from '../../types/zone.interface'
import {ActionTypes} from '../action-types'

export const getZonesAction = createAction(
  ActionTypes.GET_ZONES,
  props<{id: string}>()
)

export const getZonesSuccessAction = createAction(
  ActionTypes.GET_ZONES_SUCCESS,
  props<{zones: ZoneInterface[]}>()
)

export const getZonesFailureAction = createAction(
  ActionTypes.GET_ZONES_FAILURE,
  props<{errors: string}>()
)
