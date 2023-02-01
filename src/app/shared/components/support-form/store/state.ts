import {SupportFormStateInterface} from '../types/support-form-state.interface'

export const SUPPORT_FORM_FEATURE = 'supportForm'

export const initialState: SupportFormStateInterface = {
  isSubmitting: false,
  isPristine: true,
  response: null,
  backendErrors: null,
}
