import {Action, createReducer, on} from '@ngrx/store'
import {ContactsStateInterface} from '../types/contacts-state.interface'
import {
  getOfficesAction,
  getOfficesFailureAction,
  getOfficesSuccessAction,
} from './actions/get-offices.action'
import {initialState} from './state'

//TODO: (state): Interface in all reducers
const contactsReducer = createReducer(
  initialState,
  on(
    getOfficesAction,
    (state): ContactsStateInterface => ({
      ...state,
      isOfficesLoading: true,
    })
  ),
  on(
    getOfficesSuccessAction,
    (state, {offices}): ContactsStateInterface => ({
      ...state,
      isOfficesLoading: false,
      isOfficesLoaded: true,
      offices,
    })
  ),
  on(
    getOfficesFailureAction,
    (state, {errors}): ContactsStateInterface => ({
      ...state,
      isOfficesLoading: false,
      backendErrors: errors,
    })
  )
)

export function reducer(state: ContactsStateInterface, action: Action) {
  return contactsReducer(state, action)
}
