import {BalanceStateInterface} from '../types/balance-state.interface'

export const BALANCE_FEATURE = 'balance'

export const initialState: BalanceStateInterface = {
  isLoading: false,
  balance: null,
  backendErrors: null,
}
