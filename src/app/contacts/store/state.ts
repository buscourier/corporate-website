import {ContactsStateInterface} from '../types/contacts-state.interface'

export const CONTACTS_FEATURE = 'contacts'

export const initialState: ContactsStateInterface = {
  isOfficesLoading: false,
  offices: null,
  backendErrors: null,
}
