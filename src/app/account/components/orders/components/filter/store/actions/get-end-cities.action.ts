import {createAction, props} from '@ngrx/store'
import {EndCityInterface} from '../../../../../../../shared/types/end-city.interface'
import {ActionTypes} from '../action-types'

export const getEndCitiesAction = createAction(
  ActionTypes.GET_END_CITIES,
  props<{cityId: string}>()
)
export const getEndCitiesSuccessAction = createAction(
  ActionTypes.GET_END_CITIES_SUCCESS,
  props<{cities: EndCityInterface[]}>()
)
export const getEndCitiesFailureAction = createAction(
  ActionTypes.GET_END_CITIES_FAILURE
  // props<{errors: string}>()
)
