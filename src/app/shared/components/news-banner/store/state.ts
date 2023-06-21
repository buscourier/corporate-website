import {createEntityAdapter, EntityState} from '@ngrx/entity'
import {NewsItemInterface} from '../../../types/news-item.interface'
import {BackendErrorsInterface} from '../../../types/backend-errors.interface'

export const NEWS_BANNER_FEATURE = 'news-banner'

export interface NewsBannerStateInterface
  extends EntityState<NewsItemInterface> {
  isLoading: boolean
  backendErrors: BackendErrorsInterface | null
}

export const newsBannerAdapter = createEntityAdapter({
  selectId: ({news_id}: NewsItemInterface) => news_id,
})

export const initialState: NewsBannerStateInterface =
  newsBannerAdapter.getInitialState({
    isLoading: false,
    backendErrors: null,
  })
