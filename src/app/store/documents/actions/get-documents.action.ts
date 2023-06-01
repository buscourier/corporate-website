import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {DocumentInterface} from '../../../shared/types/document.interface'

export const getDocumentsAction = createAction(ActionTypes.GET_DOCUMENTS)

export const getDocumentsSuccessAction = createAction(
  ActionTypes.GET_DOCUMENTS_SUCCESS,
  props<{documents: DocumentInterface[]}>()
)

export const getDocumentsFailureAction = createAction(
  ActionTypes.GET_DOCUMENTS_FAILURE,
  props<{backendErrors: string}>()
)
