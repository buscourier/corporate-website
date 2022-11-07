import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const citiesLoadedAction = createAction(
  ActionTypes.CITIES_LOADED,
  props<{isCitiesLoaded: boolean}>()
)
