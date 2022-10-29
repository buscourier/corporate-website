import {createAction, props} from '@ngrx/store'
import {StartCityInterface} from '../../../../../../shared/types/start-city.interface'
import {ActionTypes} from '../action-types'

export const getCitiesAction = createAction(ActionTypes.GET_CITIES)

export const getCitiesSuccessAction = createAction(
  ActionTypes.GET_CITIES_SUCCESS,
  props<{cities: StartCityInterface[]}>()
)

export const getCitiesFailureAction = createAction(
  ActionTypes.GET_CITIES_FAILURE,
  props<{error: string}>()
)
