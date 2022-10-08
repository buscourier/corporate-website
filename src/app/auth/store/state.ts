import {AuthStateInterface} from '../types/auth-state.interface'

export const AUTH_FEATURE = 'auth'

export const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
}
