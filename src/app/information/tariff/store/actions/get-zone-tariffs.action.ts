import {createAction, props} from '@ngrx/store'
import {ZoneTariffInterface} from '../../types/zone-tariff.interface'
import {ActionTypes} from '../action-types'

export const getZoneTariffsAction = createAction(
  ActionTypes.GET_ZONE_TARIFFS,
  props<{id: string}>()
)

export const getZoneTariffsSuccessAction = createAction(
  ActionTypes.GET_ZONE_TARIFFS_SUCCESS,
  props<{tariffs: ZoneTariffInterface[]}>()
)

export const getZoneTariffsFailureAction = createAction(
  ActionTypes.GET_ZONE_TARIFFS_FAILURE,
  props<{errors: string}>()
)
