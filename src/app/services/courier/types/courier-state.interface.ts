import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {CourierServiceInterface} from './courier-service.interface'

export interface CourierStateInterface {
  isServicesLoading: boolean
  services: CourierServiceInterface[] | null
  backendErrors: BackendErrorsInterface | null
}
