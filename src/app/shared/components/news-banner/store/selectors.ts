import {createFeatureSelector, createSelector} from '@ngrx/store'
import {
  NEWS_BANNER_FEATURE,
  newsBannerAdapter,
  NewsBannerStateInterface,
} from './state'
import {Dictionary} from '@ngrx/entity'
import {ArticleInterface} from '../../../types/article.interface'

export const newsBannerFeatureSelector =
  createFeatureSelector<NewsBannerStateInterface>(NEWS_BANNER_FEATURE)

export const isLoadingSelector = createSelector(
  newsBannerFeatureSelector,
  ({isLoading}: NewsBannerStateInterface) => isLoading
)

export const backendErrorsSelector = createSelector(
  newsBannerFeatureSelector,
  ({backendErrors}: NewsBannerStateInterface) => backendErrors
)

export const {selectAll: allNewsSelector, selectEntities} =
  newsBannerAdapter.getSelectors(newsBannerFeatureSelector)

export const newsByIdSelector = (id: string) => {
  return createSelector(
    selectEntities,
    (entities: Dictionary<ArticleInterface>) => entities[id]
  )
}
