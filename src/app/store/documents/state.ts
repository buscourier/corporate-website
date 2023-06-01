import {createEntityAdapter, EntityState} from '@ngrx/entity'
import {DocumentInterface} from '../../shared/types/document.interface'

export const DOCUMENTS_FEATURE = 'documents'

export interface DocumentsStateInterface
  extends EntityState<DocumentInterface> {
  isLoading: boolean
  backendErrors: string | null
}

export const documentsAdapter = createEntityAdapter({
  selectId: ({charcode}: DocumentInterface) => charcode,
})

export const initialState: DocumentsStateInterface =
  documentsAdapter.getInitialState({
    isLoading: false,
    backendErrors: null,
  })
