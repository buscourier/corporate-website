import {createAction, props} from '@ngrx/store'
import {StartCityInterface} from '../../../../../shared/types/start-city.interface'
import {ActionTypes} from '../action-types'

export const getStartCitiesAction = createAction(ActionTypes.GET_START_CITIES)
export const getStartCitiesSuccessAction = createAction(
  ActionTypes.GET_START_CITIES_SUCCESS,
  props<{cities: StartCityInterface[]}>()
)
export const getStartCitiesFailureAction = createAction(
  ActionTypes.GET_START_CITIES_FAILURE
  // props<{errors: string}>()
)
