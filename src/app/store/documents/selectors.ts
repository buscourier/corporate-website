import {createFeatureSelector, createSelector} from '@ngrx/store'
import {
  DOCUMENTS_FEATURE,
  documentsAdapter,
  DocumentsStateInterface,
} from './state'
import {DocumentInterface} from '../../shared/types/document.interface'
import {Dictionary} from '@ngrx/entity'

export const documentsFeatureSelector =
  createFeatureSelector<DocumentsStateInterface>(DOCUMENTS_FEATURE)

export const isDocumentsLoadingSelector = createSelector(
  documentsFeatureSelector,
  ({isLoading}: DocumentsStateInterface) => isLoading
)

export const backendErrorsSelector = createSelector(
  documentsFeatureSelector,
  ({backendErrors}: DocumentsStateInterface) => backendErrors
)

export const {selectAll: documentsSelector, selectEntities} =
  documentsAdapter.getSelectors(documentsFeatureSelector)

export const documentByIdSelector = (id: string) => {
  return createSelector(
    selectEntities,
    (entities: Dictionary<DocumentInterface>) => entities[id]
  )
}
