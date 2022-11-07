import {createAction, props} from '@ngrx/store'
import {EndCityInterface} from 'src/app/shared/types/end-city.interface'
import {ActionTypes} from '../action-types'

export const changeCityAction = createAction(
  ActionTypes.CHANGE_CITY,
  props<{city: EndCityInterface}>()
)
