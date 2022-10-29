import {createAction, props} from '@ngrx/store'
import {StartCityInterface} from '../../../../../../shared/types/start-city.interface'
import {ActionTypes} from '../action-types'

export const setCityAction = createAction(
  ActionTypes.SET_CITY,
  props<{city: StartCityInterface}>()
)
