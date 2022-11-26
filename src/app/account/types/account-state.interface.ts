import {BalanceInterface} from './balance.interface'

export interface AccountStateInterface {
  isUserProfileLoading: boolean
  isBalanceLoading: boolean
  isSubmitting: boolean
  userProfile: any | null
  balance: BalanceInterface | null
  backendErrors: string | null
}
