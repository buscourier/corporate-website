import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const allServicesLoadedAction = createAction(
  ActionTypes.ALL_SERVICES_LOADED,
  props<{loaded: boolean}>()
)
