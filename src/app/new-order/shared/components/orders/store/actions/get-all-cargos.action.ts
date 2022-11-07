import {createAction, props} from '@ngrx/store'
import {CargoInterface} from 'src/app/new-order/shared/types/cargo.interface'
import {ActionTypes} from '../action-types'

export const getAllCargosAction = createAction(
  ActionTypes.GET_ALL_CARGOS,
  props<{startCityId: string; endCityId: string}>()
)

export const getAllCargosSuccessAction = createAction(
  ActionTypes.GET_ALL_CARGOS_SUCCESS,
  props<{cargos: CargoInterface[]}>()
)

export const getAllCargosFailureAction = createAction(
  ActionTypes.GET_ALL_CARGOS_FAILURE,
  props<{errors: string}>()
)
