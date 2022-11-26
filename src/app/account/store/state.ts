import {AccountStateInterface} from '../types/account-state.interface'
import {BalanceInterface} from '../types/balance.interface'

export const ACCOUNT_FEATURE = 'account'

export const inititalState: AccountStateInterface = {
  isUserProfileLoading: false,
  isBalanceLoading: false,
  isSubmitting: false,
  userProfile: null,
  balance: null,
  backendErrors: null,
}
