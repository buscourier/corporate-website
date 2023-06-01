import {Action, createReducer, on} from '@ngrx/store'
import {
  getDocumentsAction,
  getDocumentsFailureAction,
  getDocumentsSuccessAction,
} from './actions/get-documents.action'
import {documentsAdapter, DocumentsStateInterface, initialState} from './state'

export const reducer = createReducer(
  initialState,
  on(
    getDocumentsAction,
    (state): DocumentsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getDocumentsSuccessAction,
    (state, {documents}): DocumentsStateInterface =>
      documentsAdapter.upsertMany(documents, {
        ...state,
        isLoading: false,
      })
  ),
  on(
    getDocumentsFailureAction,
    (state, {backendErrors}): DocumentsStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors,
    })
  )
)

export function documentsReducer(
  state: DocumentsStateInterface,
  action: Action
) {
  return reducer(state, action)
}
