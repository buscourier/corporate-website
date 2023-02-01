import {ResponseInterface} from './response.interface'

export interface SupportFormStateInterface {
  isSubmitting: boolean
  isPristine: boolean
  response: ResponseInterface | null
  backendErrors: string | null
}
