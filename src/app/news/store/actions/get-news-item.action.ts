import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {NewsItemInterface} from '../../../shared/types/news-item.interface'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'

export const getNewsItemAction = createAction(
  ActionTypes.GET_NEWS_ITEM,
  props<{id: string}>()
)

export const getNewsItemSuccessAction = createAction(
  ActionTypes.GET_NEWS_ITEM_SUCCESS,
  props<{currentItem: NewsItemInterface}>()
)

export const getNewsItemFailureAction = createAction(
  ActionTypes.GET_NEWS_ITEM_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
