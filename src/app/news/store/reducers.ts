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
import {
  getNewsItemAction,
  getNewsItemFailureAction,
  getNewsItemSuccessAction,
} from './actions/get-news-item.action'
import {clearNewsItemAction} from './actions/clear-news-item.action'

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
  ),
  on(
    getNewsItemAction,
    (state): NewsStateInterface => ({
      ...state,
      isCurrentItemLoading: true,
    })
  ),
  on(
    getNewsItemSuccessAction,
    (state, {currentItem}): NewsStateInterface => ({
      ...state,
      isCurrentItemLoading: false,
      currentItem,
    })
  ),
  on(
    getNewsItemFailureAction,
    (state, {backendErrors}): NewsStateInterface => ({
      ...state,
      isCurrentItemLoading: false,
      backendErrors,
    })
  ),
  on(
    clearNewsItemAction,
    (state): NewsStateInterface => ({
      ...state,
      currentItem: null,
    })
  )
)

export function reducers(state: NewsStateInterface, action: Action) {
  return newsReducer(state, action)
}
