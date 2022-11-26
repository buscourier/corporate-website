export interface AccountStateInterface {
  isUserProfileLoading: boolean
  isBalanceLoading: boolean
  isSubmitting: boolean
  userProfile: any | null
  balance: any | null
  backendErrors: string | null
}
