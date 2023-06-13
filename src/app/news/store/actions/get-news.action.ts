import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {ArticleInterface} from '../../../shared/types/article.interface'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'

export const getNewsAction = createAction(ActionTypes.GET_NEWS)

export const getNewsSuccessAction = createAction(
  ActionTypes.GET_NEWS_SUCCESS,
  props<{news: ArticleInterface[]}>()
)

export const getNewsFailureAction = createAction(
  ActionTypes.GET_NEWS_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
