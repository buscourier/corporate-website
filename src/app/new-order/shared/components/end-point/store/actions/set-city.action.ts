import {createAction, props} from '@ngrx/store'
import {EndCityInterface} from 'src/app/shared/types/end-city.interface'
import {ActionTypes} from '../action-types'

export const setCityAction = createAction(
  ActionTypes.SET_CITY,
  props<{city: EndCityInterface}>()
)
