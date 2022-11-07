import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const allCargosLoadedAction = createAction(
  ActionTypes.ALL_CARGOS_LOADED,
  props<{loaded: boolean}>()
)
