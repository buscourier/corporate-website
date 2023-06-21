import {createEntityAdapter, EntityState} from '@ngrx/entity'
import {NewsItemInterface} from '../../shared/types/news-item.interface'
import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface'

export const NEWS_FEATURE = 'news'

export interface NewsStateInterface extends EntityState<NewsItemInterface> {
  isLoading: boolean
  isCurrentItemLoading: boolean
  currentItem: NewsItemInterface | null
  backendErrors: BackendErrorsInterface | null
}

export const newsAdapter = createEntityAdapter({
  selectId: ({news_id}: NewsItemInterface) => news_id,
})

export const initialState: NewsStateInterface = newsAdapter.getInitialState({
  isLoading: false,
  isCurrentItemLoading: false,
  currentItem: null,
  backendErrors: null,
})
