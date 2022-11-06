import {createAction, props} from '@ngrx/store'
import {StartCityInterface} from '../../../../../../shared/types/start-city.interface'
import {ActionTypes} from '../action-types'

export const changeCityAction = createAction(
  ActionTypes.CHANGE_CITY,
  props<{city: StartCityInterface}>()
)
