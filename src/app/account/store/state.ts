import {AccountStateInterface} from '../types/account-state.interface'

export const ACCOUNT_FEATURE = 'account'

export const inititalState: AccountStateInterface = {
  isUserProfileLoading: false,
  isSubmitting: false,
  userProfile: null,
  backendErrors: null,
}
