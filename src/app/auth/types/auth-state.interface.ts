import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface'
import {CurrentUserInterface} from '../../shared/types/current-user.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  isLoading: boolean
  currentUser: CurrentUserInterface | null
  isLoggedIn: boolean
  validationErrors: BackendErrorsInterface | null
}
