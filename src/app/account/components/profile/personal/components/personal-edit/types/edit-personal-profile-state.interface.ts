import {BackendErrorsInterface} from 'src/app/shared/types/backend-errors.interface'
import {PersonalProfileInterface} from '../../../types/personal-profile.interface'

export interface EditPersonalProfileStateInterface {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: null | string
  data: null | PersonalProfileInterface
}
