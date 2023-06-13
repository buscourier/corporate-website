import {createEntityAdapter, EntityState} from '@ngrx/entity'
import {ArticleInterface} from '../../shared/types/article.interface'
import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface'

export const NEWS_FEATURE = 'news'

export interface NewsStateInterface extends EntityState<ArticleInterface> {
  isLoading: boolean
  backendErrors: BackendErrorsInterface | null
}

export const newsAdapter = createEntityAdapter({
  selectId: ({id}: ArticleInterface) => id,
})

export const initialState: NewsStateInterface = newsAdapter.getInitialState({
  isLoading: false,
  backendErrors: null,
})
