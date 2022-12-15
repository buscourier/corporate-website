import {SupportFormStateInterface} from '../types/support-form-state.interface'

export const SUPPORT_FORM_FEATURE = 'supportForm'

export const initialState: SupportFormStateInterface = {
  isSubmitting: false,
  response: null,
  validationErrors: null,
}
