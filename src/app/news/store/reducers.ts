import {
  newsBannerAdapter,
  NewsBannerStateInterface,
} from '../../shared/components/news-banner/store/state'
import {Action, createReducer, on} from '@ngrx/store'
import {initialState, NewsStateInterface} from './state'
import {
  getNewsAction,
  getNewsFailureAction,
  getNewsSuccessAction,
} from './actions/get-news.action'

const newsReducer = createReducer(
  initialState,
  on(
    getNewsAction,
    (state): NewsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getNewsSuccessAction,
    (state, {news}): NewsStateInterface =>
      newsBannerAdapter.upsertMany(news, {
        ...state,
        isLoading: false,
      })
  ),
  on(
    getNewsFailureAction,
    (state, {backendErrors}): NewsStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors,
    })
  )
)

export function reducers(state: NewsStateInterface, action: Action) {
  return newsReducer(state, action)
}
