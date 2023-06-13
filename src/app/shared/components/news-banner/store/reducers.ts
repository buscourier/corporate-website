import {Action, createReducer, on} from '@ngrx/store'
import {
  initialState,
  newsBannerAdapter,
  NewsBannerStateInterface,
} from './state'
import {
  getNewsAction,
  getNewsFailureAction,
  getNewsSuccessAction,
} from './actions/get-news.action'

const newsReducer = createReducer(
  initialState,
  on(
    getNewsAction,
    (state): NewsBannerStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getNewsSuccessAction,
    (state, {news}): NewsBannerStateInterface =>
      newsBannerAdapter.upsertMany(news, {
        ...state,
        isLoading: false,
      })
  ),
  on(
    getNewsFailureAction,
    (state, {backendErrors}): NewsBannerStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors,
    })
  )
)

export function reducers(state: NewsBannerStateInterface, action: Action) {
  return newsReducer(state, action)
}
