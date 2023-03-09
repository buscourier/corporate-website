import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ContactsStateInterface} from '../types/contacts-state.interface'
import {CONTACTS_FEATURE} from './state'

export const contactsFeatureSelector =
  createFeatureSelector<ContactsStateInterface>(CONTACTS_FEATURE)

export const isOfficesLoadingSelector = createSelector(
  contactsFeatureSelector,
  (state: ContactsStateInterface) => state.isOfficesLoading
)

export const isOfficesLoadedSelector = createSelector(
  contactsFeatureSelector,
  (state: ContactsStateInterface) => state.isOfficesLoaded
)

export const officesSelector = createSelector(
  contactsFeatureSelector,
  (state: ContactsStateInterface) => state.offices
)

export const backendErrorsSelector = createSelector(
  contactsFeatureSelector,
  (state: ContactsStateInterface) => state.backendErrors
)
