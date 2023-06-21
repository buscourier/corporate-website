import {Dictionary} from '@ngrx/entity'
import {createFeatureSelector, createSelector} from '@ngrx/store'
import {NEWS_FEATURE, newsAdapter, NewsStateInterface} from './state'
import {NewsItemInterface} from '../../shared/types/news-item.interface'

export const newsFeatureSelector =
  createFeatureSelector<NewsStateInterface>(NEWS_FEATURE)

export const isLoadingSelector = createSelector(
  newsFeatureSelector,
  ({isLoading}: NewsStateInterface) => isLoading
)

export const isCurrentItemLoadingSelector = createSelector(
  newsFeatureSelector,
  ({isCurrentItemLoading}: NewsStateInterface) => isCurrentItemLoading
)

export const backendErrorsSelector = createSelector(
  newsFeatureSelector,
  ({backendErrors}: NewsStateInterface) => backendErrors
)

export const {selectAll: allNewsSelector, selectEntities} =
  newsAdapter.getSelectors(newsFeatureSelector)

// export const newsByIdSelector = (id: string) => {
//   return createSelector(
//     selectEntities,
//     (entities: Dictionary<NewsItemInterface>) => entities[id]
//   )
// }

export const currentItemSelector = createSelector(
  newsFeatureSelector,
  ({currentItem}: NewsStateInterface) => currentItem
)
