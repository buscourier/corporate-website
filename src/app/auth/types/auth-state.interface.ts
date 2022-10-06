import {CurrentUserInterface} from '../../shared/types/current-user.interface'
import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  isLoading: boolean
  currentUser: CurrentUserInterface | null
  isLoggedIn: boolean
  validationErrors: BackendErrorsInterface | null
}
