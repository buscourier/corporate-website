import {ResponseInterface} from './response.interface'

export interface SupportFormStateInterface {
  isSubmitting: boolean
  response: ResponseInterface | null
  validationErrors: string | null
}
