import {createAction, props} from '@ngrx/store'
import {EndCityInterface} from '../../../../../../shared/types/end-city.interface'
import {ActionTypes} from '../action-types'

export const getCitiesAction = createAction(
  ActionTypes.GET_CITIES,
  props<{cityId: string}>()
)

export const getCitiesSuccessAction = createAction(
  ActionTypes.GET_CITIES_SUCCESS,
  props<{cities: EndCityInterface[]}>()
)

export const getCitiesFailureAction = createAction(
  ActionTypes.GET_CITIES_FAILURE,
  props<{error: string}>()
)
