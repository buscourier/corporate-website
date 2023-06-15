import {BackendErrorsInterface} from '../../../../shared/types/backend-errors.interface'
import {BalanceInterface} from './balance.interface'

export interface BalanceStateInterface {
  isLoading: boolean
  balance: BalanceInterface | null
  backendErrors: BackendErrorsInterface | null
}
