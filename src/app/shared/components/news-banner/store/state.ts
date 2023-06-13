import {createEntityAdapter, EntityState} from '@ngrx/entity'
import {ArticleInterface} from '../../../types/article.interface'
import {BackendErrorsInterface} from '../../../types/backend-errors.interface'

export const NEWS_BANNER_FEATURE = 'news-banner'

export interface NewsBannerStateInterface
  extends EntityState<ArticleInterface> {
  isLoading: boolean
  backendErrors: BackendErrorsInterface | null
}

export const newsBannerAdapter = createEntityAdapter({
  selectId: ({id}: ArticleInterface) => id,
})

export const initialState: NewsBannerStateInterface =
  newsBannerAdapter.getInitialState({
    isLoading: false,
    backendErrors: null,
  })
